import { useContext, useRef } from "react";
import { Dimensions } from "react-native";
import MapViewDirections from "react-native-maps-directions";
import { LocationContext } from "../../../store/LocationContext";
import MapData, { fetchFare } from "../../../../util/mapApis";
import { fetchUserId } from "../../../../util/localAPIs";

const GOOGLE_API_kEY = "AIzaSyCV2NRNl0uVeY37ID1gIoYgJexr9SBDn2Q";
const { width, height } = Dimensions.get("window");

// const user_id = '66b1c305d27b9a0a022c6005'

interface DirectionProps {
  origin: {
    latitude: number;
    longitude: number;
  };
  destination: {
    latitude: number;
    longitude: number;
  };
  reff: any;
  color: string;
}

export default function AddMapViewDirections({
  origin,
  destination,
  reff,
  color,
}: DirectionProps) {
  const diractionsRef = useRef();
  const { setDistance } = useContext(LocationContext);
  const { pickupAddress, dropAddress, setFare, fare } =
    useContext(LocationContext);

  // const pickupAddressRef = useRef(pickupAddress);
  // const dropAddressRef = useRef(dropAddress);

  return (
    <MapViewDirections
      origin={{
        latitude: origin.latitude,
        longitude: origin.longitude,
      }}
      destination={{
        latitude: destination.latitude,
        longitude: destination.longitude,
      }}
      strokeWidth={4}
      strokeColor={color}
      optimizeWaypoints={true}
      apikey={GOOGLE_API_kEY}
      timePrecision="now"
      onStart={(params) => {
        console.log(
          `Started routing between "${params.origin}" and "${params.destination}"`
        );
      }}
      onReady={(result) => {
        // console.log(result);
        const distance = result.distance.toFixed(2);
        setDistance(distance);
        console.log(`Distance: ${result.distance} km`);
        console.log(`Duration: ${result.duration} min.`);
        async function sendData() {
          const userId = await fetchUserId();
          console.log("fetching fare");

          if (!userId) {
            throw new Error("userId is null, cannot fetch fare");
          }
          const newfare = await fetchFare(
            result.distance,
            result.duration,
            userId
          );

          setFare(Math.round(newfare));
        }

        !fare && sendData();
        reff.current?.fitToCoordinates(result.coordinates, {
          edgePadding: {
            right: width / 20,
            bottom: height / 20,
            left: width / 20,
            top: height / 20,
          },
        });
      }}
      onError={(errorMessage) => {
        console.log("GOT AN ERROR", errorMessage);
      }}
    />
  );
}
