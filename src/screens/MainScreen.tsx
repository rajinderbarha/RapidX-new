import { Text, View } from "react-native";
import MainHeader from "../components/MainHeader";
import Map from "../components/Map";
import { useContext, useEffect, useRef, useState } from "react";
import * as Location from "expo-location";
import MyLocationButton from "../ui/MyLocationButton";
import MapView from "react-native-maps";
import { LocationContext } from "../store/LocationContext";

export default function MainScreen() {
  const {location} = useContext(LocationContext)


  const mapRef = useRef<MapView>(null);

 

  function myLocationButtonHandler() {
    if (location && mapRef.current) {
      console.log("Pressed");
      mapRef.current.animateToRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0222,
        longitudeDelta: 0.0221,
      });
    }
  }

  return (
    <View
      style={{ flex: 1, backgroundColor: "#5c5858", flexDirection: "column" }}
    >
      <View style={{ top: 50, position: "absolute" }}>
        <MainHeader />
      </View>
      <Map location={location?.coords || null} reff={mapRef} />
      <MyLocationButton onPress={myLocationButtonHandler} />
    </View>
  );
}
