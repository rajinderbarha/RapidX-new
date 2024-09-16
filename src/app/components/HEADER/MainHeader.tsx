import React, { useContext, useEffect } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import IconButton from "../../../ui/IconButton";
import getAddress from "../../../../util/location";
import { LocationContext } from "../../../store/LocationContext";
import { useNavigation } from "@react-navigation/native";
import { RideContext } from "../../../store/RideContext";

export default function MainHeader() {
  const { pickedLocation, location, pickupAddress, setPickupAddress } =
    useContext(LocationContext);
    const {rideIsBooked, rideIsStarted} = useContext(RideContext)
  const navigation = useNavigation<any>();

  useEffect(() => {
    async function fetchAddress() {
      if (pickedLocation) {
        const address = await getAddress(
          pickedLocation.latitude,
          pickedLocation.longitude
        );
        setPickupAddress(address);
      }
    }

    fetchAddress();
  }, [pickedLocation]);

  function favouriteHandler() {
    navigation.navigate("Payment", {amount : 69})
    // Handle favourite action here
  }

  function locationPressHandler() {
    navigation.navigate("Drop");
  }

  return (
    <View style={styles.root}>
      <View style={styles.btn}>
        <IconButton
          name="menu"
          size={28}
          color="grey"
          onPress={() => navigation.toggleDrawer()}
        />
      </View>
      <Pressable
      disabled={(rideIsBooked || rideIsStarted)}
        style={({ pressed }) => [
          styles.input,
          pressed && styles.pressedInput,
        ]}
        onPress={locationPressHandler}
      >
        <View style={styles.locationContainer}>
          <Ionicons name="location" size={22} color="green" />
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            style={styles.pickupAddress}
          >
            {pickupAddress || "Select a location"}
          </Text>
        </View>
        <View style={styles.iconButtonContainer}>
          <IconButton
            name="heart-outline"
            color="grey"
            size={24}
            onPress={favouriteHandler}
          />
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flexDirection: "row",
    paddingHorizontal: 15,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
  },
  input: {
    height: 43,
    backgroundColor: "#ffffff",
    width: "87%",
    borderRadius: 25,
    justifyContent: "space-between",
    alignItems: "center",
    elevation: 9,
    flexDirection: "row",
    marginLeft: 10,
    paddingHorizontal: 10,
    overflow: "hidden",
  },
  pressedInput: {
    backgroundColor: "#c9c3c3",
  },
  btn: {
    height: 39,
    width: 39,
    borderRadius: 25,
    backgroundColor: "#ffffff",
    elevation: 9,
    alignItems: "center",
    justifyContent: "center",
  },
  locationContainer: {
    flexDirection: "row",
    gap: 10,
    flex: 1,
    alignItems: "center",
  },
  pickupAddress: {
    color: "grey",
    fontWeight: "600",
    fontSize: 16,
    maxWidth: "85%",
  },
  iconButtonContainer: {
    width: 28,
    borderRadius: 15,
  },
});
