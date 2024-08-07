import React, {
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import { Alert, Dimensions, StyleSheet, View } from "react-native";
import MapView from "react-native-maps";
import { LocationContext } from "../../store/LocationContext";
import getAddress from "../../../util/location";

const { width, height } = Dimensions.get("window");

const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

interface MapProps {
  reff: React.RefObject<MapView>;
  markerType: string;
  children: React.ReactNode;
}

const defaultRegion = {
  latitude: 30.705085033867647,
  longitude: 76.71419969935869,
  latitudeDelta: LATITUDE_DELTA,
  longitudeDelta: LONGITUDE_DELTA,
};

export default function MapViewComponent({
  reff,
  markerType,
  children,
}: PropsWithChildren<MapProps>) {
  const [initialRegion, setInitialRegion] = useState(defaultRegion);
  const {
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
        try {
          const address = await getAddress(
            dropLocation.latitude,
            dropLocation.longitude
          );
          setDropAddress(address);
        } catch (error) {
          console.error("Error fetching address: ", error);
          Alert.alert("Error", "Unable to fetch address.");
        }
      }
    }
    fetchAddress();
  }, [dropLocation, setDropAddress]);

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
  }

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={initialRegion}
        onPress={markerType === "drop" ? dropLocationPicker : locationPicker}
        showsUserLocation={true}
        followsUserLocation={true}
        showsMyLocationButton={false}
        ref={reff}
        showsBuildings={false}
        onMarkerPress={
          markerType === "drop" 
            ? () => setDropLocation(null)
            : () => setPickedLocation(null)
        }
        userLocationUpdateInterval={5000}
        moveOnMarkerPress={false}
      >
        {children}
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
