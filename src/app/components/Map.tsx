import React, { useContext} from "react";
import { StyleSheet } from "react-native";
import MapView from "react-native-maps";
import { LocationContext } from "../../store/LocationContext";
import AddMarker from "./Marker";
import AddMapViewDirections from "./MapViewDirections";
import MapViewComponent from "./MapViewComponent";



interface MapProps {
  location: {
    latitude: number;
    longitude: number;
  } | null;
  reff: React.RefObject<MapView>;
  pickOnMap: any;
}



export default function Map({ reff, pickOnMap }: MapProps) {
  const {
    pickedLocation,
    
    dropLocation,
   
  } = useContext(LocationContext);

 

  return (
    <MapViewComponent reff={reff} pickOnMap={true}>
        {pickedLocation && dropLocation && (
          <AddMapViewDirections
            reff={reff}
            origin={pickedLocation}
            destination={dropLocation}
          />
        )}

        {pickedLocation && (
          <AddMarker color={"#1979e7"} location={pickedLocation} />
        )}
        {dropLocation && <AddMarker color={"red"} location={dropLocation} />}
        </MapViewComponent>
  );
}

