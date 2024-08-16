import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import MainHeader from "../components/HEADER/MainHeader";
import Map from "../components/Map/Map";
import MyLocationButton from "../../ui/MyLocationButton";
import MapView from "react-native-maps";
import { LocationContext } from "../../store/LocationContext";
import {
  useFocusEffect,
  useIsFocused,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import CustomBottomModal from "../components/BottomModals/CustomBottomModal";
import MainScreenModal from "../components/BottomModals/MainScreenModal";
import OnBookedRideModal from "../components/BottomModals/OnBookedRideModal";
import { RideContext } from "../../store/RideContext";
import { driverData } from "../../../util/driverData";
import OnFinishRideModal from "../components/BottomModals/OnFinishRideModal";
import TripReviewModal from "../components/BottomModals/TripReviewModal";



const { height } = Dimensions.get("screen");

export default function MainScreen() {
  const navigation = useNavigation() as any;
  const { location, reset } = useContext(LocationContext);
  const { rideIsBooked, rideIsCompleted, paymentIsDone,setRideIsCompleted, driver } = useContext(RideContext);
  const mapRef = useRef<MapView>(null);
  const [buttonBottomPosition, setButtonBottomPosition] = useState(20);
  const isFocused = useIsFocused();

  const handleModalChange = useCallback((index: any) => {
    const modalHeight = index === 0 ? 0.3 : 0.6; // Update according to your snap points
    setButtonBottomPosition(modalHeight * height + 20); // Adjust button position based on modal height
  }, []);

 

  function myLocationButtonHandler() {
    if (location && mapRef.current) {
      mapRef.current.animateToRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0222,
        longitudeDelta: 0.0221,
      });
      console.log(location);
    }
  }

  
    return (
      <BottomSheetModalProvider>
        <View style={styles.container}>
          <View style={styles.headerContainer}>
            <MainHeader />
          </View>
          <View style={styles.mapContainer}>
            <Map
              markerType={"pickUp"}
              location={location?.coords || null}
              reff={mapRef}
            />
          </View>
          <MyLocationButton
            onPress={myLocationButtonHandler}
            style={{ bottom: buttonBottomPosition }}
          />
        </View>
       {!rideIsBooked && !rideIsCompleted && <MainScreenModal onChange={handleModalChange} isFocused={isFocused} />}
       {rideIsBooked  && driver &&<OnBookedRideModal onChange={handleModalChange} isFocused={isFocused} />}
       {rideIsCompleted  && <OnFinishRideModal onChange={handleModalChange} isFocused={isFocused} />}
       {paymentIsDone  && <TripReviewModal onChange={handleModalChange} isFocused={isFocused} />}
      </BottomSheetModalProvider>
    );
  } 

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#5c5858",
  },
  headerContainer: {
    position: "absolute",
    top: 50,
    left: 0,
    right: 0,
    zIndex: 20,
  },
  mapContainer: {
    flex: 1,
  },
});
