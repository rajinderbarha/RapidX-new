import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { LocationContext } from "../../store/LocationContext";

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

export default function Map({ reff }: MapProps) {
  const [initialRegion, setInitialRegion] = useState(defaultRegion);
  const { pickedLocation, setPickedLocation, location } =
    useContext(LocationContext);

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

  function locationPicker(event: any) {
    setPickedLocation({
      latitude: event.nativeEvent.coordinate.latitude,
      longitude: event.nativeEvent.coordinate.longitude,
    });
    console.log("Pressed");
  }

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        region={initialRegion}
        onPress={locationPicker}
        showsUserLocation={true}
        followsUserLocation={true}
        showsMyLocationButton={false}
        ref={reff}
        showsBuildings={false}
        onMarkerPress={() => setPickedLocation(null)}
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
