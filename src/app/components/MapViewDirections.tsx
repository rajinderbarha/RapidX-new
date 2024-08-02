import { useContext } from "react";
import { Dimensions } from "react-native";
import MapViewDirections from "react-native-maps-directions";
import { LocationContext } from "../../store/LocationContext";



const GOOGLE_API_kEY = "AIzaSyCV2NRNl0uVeY37ID1gIoYgJexr9SBDn2Q";
const { width, height } = Dimensions.get("window");



interface DirectionProps {
    origin : {
        latitude: number;
        longitude: number;
    },
    destination : {
        latitude: number;
        longitude: number;
    },
    reff : any
}


export default function AddMapViewDirections({origin, destination, reff} : DirectionProps){

  const {setDistance} = useContext(LocationContext)


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
      strokeWidth={3}
      strokeColor="hotpink"
      optimizeWaypoints={true}
      apikey={GOOGLE_API_kEY}
      timePrecision="now"
      onStart={(params) => {
        console.log(
          `Started routing between "${params.origin}" and "${params.destination}"`
        );
      }}
      onReady={(result) => {
        const distance = result.distance.toFixed(2)
        setDistance(distance)
        console.log(`Distance: ${result.distance} km`);
        console.log(`Duration: ${result.duration} min.`);

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
};
