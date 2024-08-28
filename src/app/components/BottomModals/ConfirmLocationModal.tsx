import { View, StyleSheet, Text, ActivityIndicator } from "react-native";
import CustomBottomModal from "./CustomBottomModal";
import OrangeButton from "../../../ui/OrangeButton";
import { useContext, useMemo, useCallback, useState, useEffect } from "react";
import { LocationContext } from "../../../store/LocationContext";
import { useNavigation } from "@react-navigation/native";
import { RideContext } from "../../../store/RideContext";

import LoadingBar from "../../../ui/LoadingBar";
import { driverData } from "../../../../util/driverData";
import { getDriverDetails } from "../../../../util/localAPIs";
// import { useSocket } from "../../../../App";

interface BottomModalProps {
  onChange: (index: number) => void;
  isFocused: boolean;
}

export default function ConfirmLocationModal({
  isFocused,
  onChange,
}: BottomModalProps) {
  const { distance, fare,dropAddress,dropLocation,pickedLocation,pickupAddress } = useContext(LocationContext);
  const { rideIsBooked, setRideIsBooked, driver, setDriver } =
    useContext(RideContext);
 

    // const {requestRide, driverDetails} = useSocket()
  const snapPoints = useMemo(() => ["25%"], []);

  const navigation = useNavigation<any>();

  function bookRideHandler() {
    setRideIsBooked(true);
  }
  
  const userData = {
    distance: 15,
    duration: 20,
    dropAddress: dropAddress || "Unknown Drop Address",
    pickupAddress: pickupAddress || "Unknown Pickup Address",
    user_id: "66bc9d0e8f067abcb83e106d",
    user_origin: {
      latitude: pickedLocation?.latitude || 0, // Fallback to 0 if undefined
      longitude: pickedLocation?.longitude || 0, // Fallback to 0 if undefined
    },
    user_destination: {
      latitude: dropLocation?.latitude || 0, // Fallback to 0 if undefined
      longitude: dropLocation?.longitude || 0, // Fallback to 0 if undefined
    }
  };


  function rideBookHandler() {
    // requestRide(userData)
    console.log('userData : ', userData)
  }


  // function getDriver(arr : any){
  //   if (arr.length === 0) {
  //     return null; // or handle empty array case as needed
  //   }
  //   const randomIndex = Math.floor(Math.random() * arr.length);
  //   return arr[randomIndex];
  // }

  // const newDriver = getDriver(driverData)

  useEffect(() => {
    console.log("driver : ", driver);
  }, [driver]);

  useEffect(() => {
    if (rideIsBooked) {
      async function getDriver() {
        await getDriverDetails()
          .then((driverDetails) => setDriver(driverDetails))
          .then(() => navigation.navigate("Main"));
      }
      getDriver();
      // const timer = setTimeout(() => {
      //   navigation.navigate("Main");
      // }, 5000);

      // return () => clearTimeout(timer);
    }
  }, [rideIsBooked, navigation]);

  return (
    <CustomBottomModal
      isFocused={isFocused}
      onChange={onChange}
      snapPoints={snapPoints}
    >
      {!rideIsBooked && (
        <View style={styles.container}>
          <View style={styles.detailsContainer}>
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Distance</Text>
              <Text style={styles.detailValue}>{distance} km</Text>
            </View>
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Price</Text>
              <Text style={styles.detailValue}>{fare} ₹</Text>
            </View>
          </View>

          <View style={styles.buttonContainer}>
            <OrangeButton
              text="Book Ride"
              onPress={()=>rideBookHandler()}
              style={{}}
            />
          </View>
        </View>
      )}

      {rideIsBooked && (
        <View style={styles.container}>
          <LoadingBar />
          <Text style={{ marginTop: 5, fontWeight: "500" }}>
            Assigning you a driver. Please wait...
          </Text>
        </View>
      )}
    </CustomBottomModal>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  detailsContainer: {
    marginBottom: 20,
  },
  detailItem: {
    marginBottom: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  detailLabel: {
    fontSize: 16,
    color: "grey",
  },
  detailValue: {
    fontSize: 18,
    fontWeight: "bold",
    color: "black",
  },
  buttonContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
});
