import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { View, StyleSheet, Dimensions, Alert } from "react-native";
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
import { ProfileContext } from "../../store/ProfileContext";
import socket from "../../../util/socket";

const { height } = Dimensions.get("screen");


interface  driver {
  _id: string,
  phone_number: number,
  first_name: string,
  last_name : string ,
  email: string,
  gender: string,
  profile_picture: string,
  rating: number,
  vehicle_image: string,
  vehicle_plate: string,
  vehicle_type: string,
  location : {
    latitude : number,
    longitude : number
  }
} 

export default function MainScreen() {
  const navigation = useNavigation() as any;
  const { location, reset } = useContext(LocationContext);
  const { isProfileCompleted } = useContext(ProfileContext);
  const {
    rideIsBooked,
    rideIsCompleted,
    paymentIsDone,
    setRideIsCompleted,
    driver,
    setRideIsBooked,
    setDriver,
    setRideIsAccepted,
    rideIsAccepted,
    driverReachedLocation,
    setRideIsStarted
  } = useContext(RideContext);
  const mapRef = useRef<MapView>(null);
  const [buttonBottomPosition, setButtonBottomPosition] = useState(20);
  const isFocused = useIsFocused();

  // useEffect(() => {
  //   if (!isProfileCompleted) {
  //     navigation.replace("Profile");
  //     console.log('meow meow')
  //   }
  // }, [useIsFocused, isProfileCompleted]);

  // if(!isProfileCompleted){
  //   navigation.replace("Profile");
  // }

  // useEffect(() => {
  //   rideIsBooked && updateDriverLocation()

  // }, [rideIsBooked, isFocused]);

  useEffect(() => {
    if (socket) {
      socket.on("rideCancelled", (data) => {
        console.log(data.message);
        console.log("Ride was cancelled by:", data.cancelledBy);
        setRideIsBooked(false);
        reset();
        setDriver(null);
        Alert.alert(`Ride was cancelled by ${data.cancelledBy}`);
      });

      socket.on('driverReachedUser', (data)=>{
        console.log('driver has reached location');
        Alert.alert('Driver Arrived', 'Driver has reached your location');
      })


      socket.on('rideStarted', (data)=>{
        console.log('Ride started');
        setRideIsStarted(true);
      })

      // Cleanup
      return () => {
        socket.off("rideCancelled");
      };
    }
  }, [socket]);

  useEffect(() => {
    if (rideIsAccepted && driver) { // Only listen for updates if ride is accepted and driver is initialized
      const handleLocationUpdate = (newLocation : any) => {
        if (newLocation.driverLocation.lat && newLocation.driverLocation.lng) {
          setDriver((prevDriver : any) => ({
            ...prevDriver,
            location: {
              latitude: newLocation.driverLocation.lat,
              longitude: newLocation.driverLocation.lng,
            },
          }));
        } else {
          console.error("Invalid location data:", newLocation.driverLocation);
        }
      };
  
      socket.on("driverLiveLocationUpdate", handleLocationUpdate);
  
      return () => {
        // Clean up the event listener to avoid memory leaks or multiple listeners
        socket.off("driverLiveLocationUpdate", handleLocationUpdate);
      };
    } else {
      console.log('Driver is not yet initialized or ride is not accepted.');
    }
  }, [rideIsAccepted, driver]); 
  // {lat: 30.70248106104791, lng: 76.70058779418468}

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
      {!rideIsBooked && !rideIsCompleted && (
        <MainScreenModal onChange={handleModalChange} isFocused={isFocused} />
      )}
      {rideIsBooked && driver && (
        <OnBookedRideModal onChange={handleModalChange} isFocused={isFocused} />
      )}
      {rideIsCompleted && !paymentIsDone && (
        <OnFinishRideModal onChange={handleModalChange} isFocused={isFocused} />
      )}
      {paymentIsDone && (
        <TripReviewModal onChange={handleModalChange} isFocused={isFocused} />
      )}
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
