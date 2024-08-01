import React, { useContext, useEffect, useState } from "react";
import { Alert, Dimensions, StyleSheet, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { LocationContext } from "../../store/LocationContext";
import getAddress from "../../../util/location";
// import { MapViewRoute } from "react-native-maps-routes";
import MapViewDirections from "react-native-maps-directions";
import AddMarker from "./Marker";
import AddMapViewDirections from "./MapViewDirections";

const GOOGLE_API_kEY = "AIzaSyCV2NRNl0uVeY37ID1gIoYgJexr9SBDn2Q";
const { width, height } = Dimensions.get("window");

const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

interface MapProps {
  location: {
    latitude: number;
    longitude: number;
  } | null;
  reff: any;
}

const defaultRegion = {
  latitude: 30.705085033867647,
  longitude: 76.71419969935869,
  latitudeDelta: LATITUDE_DELTA,
  longitudeDelta: LONGITUDE_DELTA,
};

export default function Map({ reff, pickOnMap }: any) {
  const [initialRegion, setInitialRegion] = useState(defaultRegion);
  const {
    pickedLocation,
    setPickedLocation,
    location,
    setDropLocation,
    dropLocation,
    setDropAddress,
  } = useContext(LocationContext);

  useEffect(() => {
    if (location) {
      setInitialRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      });
    }
  }, [location]);

  useEffect(() => {
    async function fetchAddress() {
      if (dropLocation) {
        const address = await getAddress(
          dropLocation.latitude,
          dropLocation.longitude
        );
        setDropAddress(address);
      }
    }
    fetchAddress();
  }, [dropLocation]);

  function locationPicker(event: any) {
    setPickedLocation({
      latitude: event.nativeEvent.coordinate.latitude,
      longitude: event.nativeEvent.coordinate.longitude,
    });
  }

  function dropLocationPicker(event: any) {
    setDropLocation({
      latitude: event.nativeEvent.coordinate.latitude,
      longitude: event.nativeEvent.coordinate.longitude,
    });
    console.log("Dropp");
  }

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={initialRegion}
        onPress={pickOnMap ? dropLocationPicker : locationPicker}
        showsUserLocation={true}
        followsUserLocation={true}
        showsMyLocationButton={false}
        ref={reff}
        showsBuildings={false}
        onMarkerPress={
          pickOnMap
            ? () => setDropLocation(null)
            : () => setPickedLocation(null)
        }
        userLocationUpdateInterval={5000}
        moveOnMarkerPress={false}
      >
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
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
});
