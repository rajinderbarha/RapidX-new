import React, { useContext } from "react";
import { StyleSheet, View } from "react-native";
import MapView from "react-native-maps";
import { LocationContext } from "../../store/LocationContext";
import AddMarker from "./AddMarker";
import AddMapViewDirections from "./MapViewDirections";
import MapViewComponent from "./MapViewComponent";

import {driverData} from "../../../util/driverData";
import { Image } from "react-native";
import GifImage from "./GifImage";

interface MapProps {
  location: {
    latitude: number;
    longitude: number;
  } | null;
  reff: React.RefObject<MapView>;
  markerType: string;
}

export default function Map({ reff, markerType }: MapProps) {
  const { pickedLocation, dropLocation } = useContext(LocationContext);

  function GreenLocation() {
    if (pickedLocation && dropLocation) {
      return (
        <GifImage source={require("../../../assets/data/greenPulsee.gif")}/>
      );
    } else {
      return null;
    }
  }

  function RedLocation() {
    if (pickedLocation && dropLocation) {
      return (
        <GifImage source={require("../../../assets/data/redPulsee.gif")}/>
      )
    } else {
      return null;
    }
  }

  return (
    <MapViewComponent reff={reff} markerType={markerType}>
      {pickedLocation && dropLocation && (
        <AddMapViewDirections
          reff={reff}
          origin={pickedLocation}
          destination={dropLocation}
        />
      )}

      



      {pickedLocation && (
        <AddMarker
          color={"#1979e7"}
          location={pickedLocation}
          image={<GreenLocation />}
        />
      )}
      {dropLocation && (
        <AddMarker
          color={"red"}
          location={dropLocation}
          image={<RedLocation />}
        />
      )}

      {driverData.map((driver) => {
        return (
          <AddMarker
            key={driver.driver_id}
            location={{
              latitude: driver.latitude,
              longitude: driver.longitude,
            }}
            color="brown"
            image={
              <Image
                style={styles.markerImage}
                source={require("../../../assets/bike.png")}
              />
            }
          />
        );
      })}
    </MapViewComponent>
  );
}

const styles = StyleSheet.create({
  markerImage: {
    width: 50,
    height: 50,
  },
});
