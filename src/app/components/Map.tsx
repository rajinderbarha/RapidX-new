import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { LocationContext } from "../../store/LocationContext";
import getAddress from "../../../util/location";

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
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
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
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
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
    console.log("Pressed");
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
        region={initialRegion}
        onPress={pickOnMap ? dropLocationPicker : locationPicker}
        showsUserLocation={true}
        followsUserLocation={true}
        showsMyLocationButton={false}
        ref={reff}
        showsBuildings={false}
        onMarkerPress={pickOnMap ? ()=>setDropLocation(null) : ()=>setPickedLocation(null)}
        userLocationUpdateInterval={1000}
        moveOnMarkerPress={false}
      >
        {pickedLocation && (
          <Marker
            pinColor={"#1979e7"}
            coordinate={{
              latitude: pickedLocation.latitude,
              longitude: pickedLocation.longitude,
            }}
          />
        )}
        {dropLocation && (
          <Marker
            pinColor="red"
            coordinate={{
              latitude: dropLocation?.latitude,
              longitude: dropLocation?.longitude,
            }}
          />
        )}
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
