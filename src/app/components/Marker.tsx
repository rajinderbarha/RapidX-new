import { Marker } from "react-native-maps";

interface MapProps {
    location: {
      latitude: number;
      longitude: number;
    } ,
    color : string
}

export default function AddMarker({location , color} : MapProps){
  return (
    <Marker
            pinColor={color}
            coordinate={{
              latitude: location.latitude,
              longitude: location.longitude,
            }}
          />
  );
};
