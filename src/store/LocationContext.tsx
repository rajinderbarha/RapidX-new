import { createContext, PropsWithChildren, useEffect, useState } from "react";
import * as Location from "expo-location";

interface LocationContextType {
  location: Location.LocationObject | null;
  pickedLocation: MarkerProps | null;
  setPickedLocation: (location: MarkerProps | null) => void;
  dropLocation: MarkerProps | null;
  setDropLocation: (location: MarkerProps | null) => void;
  pickupAddress: string;
  setPickupAddress: (address: string) => void;
  dropAddress: string;
  setDropAddress: (address: string) => void;
  distance: string ;
  setDistance: (distance : string)  => void;
}

interface MarkerProps {
  latitude: number;
  longitude: number;
}

export const LocationContext = createContext<LocationContextType>({
  location: null,
  pickedLocation: null,
  setPickedLocation: () => {},
  dropLocation: null,
  setDropLocation: () => {},
  pickupAddress: "",
  setPickupAddress: () => {},
  dropAddress: "",
  setDropAddress: () => {},
  distance : "" ,
  setDistance : ()=>{}
});

export default function LocationContextProvider({
  children,
}: PropsWithChildren) {
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null
  );
  const [pickedLocation, setPickedLocation] = useState<MarkerProps | null>(
    null
  );

  const [dropLocation, setDropLocation] = useState<MarkerProps | null>(null);

  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const [pickupAddress, setPickupAddress] = useState("");
  
  const [dropAddress, setDropAddress] = useState("");
  
  const [distance, setDistance] = useState("");


  useEffect(() => {
    async function fetchLocation() {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        console.log("Error : ", errorMsg);
        return;
      }

      let currentLocation = await Location.getCurrentPositionAsync();
      setLocation(currentLocation);
      console.log("Location : ", JSON.stringify(currentLocation));
    }

    fetchLocation();
  }, []);

  useEffect(() => {
    async function startWatchingPosition() {
      const sub = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.BestForNavigation,
          distanceInterval: 1,
          timeInterval: 1000,
        },
        (newLocation) => {
          setLocation(newLocation);
        }
      );

      return () => sub.remove();
    }

    const unsubscribe = startWatchingPosition();

    return () => {
      unsubscribe
        .then((unsubscribeFn) => unsubscribeFn())
        .catch((err) => console.error(err));
    };
  }, [errorMsg]);

  return (
    <LocationContext.Provider
      value={{
        location,
        pickedLocation,
        setPickedLocation,
        dropLocation,
        setDropLocation,
        pickupAddress,
        setPickupAddress,
        dropAddress,
        setDropAddress,
        distance,
        setDistance
        
      }}
    >
      {children}
    </LocationContext.Provider>
  );
}
