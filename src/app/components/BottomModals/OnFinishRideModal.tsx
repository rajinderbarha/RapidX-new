import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet, Text, Pressable, View, Alert } from "react-native";
import CustomBottomModal from "./CustomBottomModal";
import { Image } from "react-native";
import { Avatar, Icon } from "@rneui/base";
import { colors } from "../../../../constants/colors";
import OrangeButton from "../../../ui/OrangeButton";
import RNPickerSelect from "react-native-picker-select";
import { RideContext } from "../../../store/RideContext";
import { LocationContext } from "../../../store/LocationContext";
import getShortAddress from "../../../../util/getShortAddress";
import { ProfileContext } from "../../../store/ProfileContext";
import ProfileInitial from "../ProfileInitial";

interface BottomModalProps {
  onChange: (index: number) => void;
  isFocused: boolean;
}

export default function OnFinishRideModal({
  onChange,
  isFocused,
}: BottomModalProps) {
  const navigation = useNavigation<any>();
  const { setPaymentIsDone, driver } = useContext(RideContext);
  const { pickupAddress, dropAddress, reset, fare } =
    useContext<any>(LocationContext);
  const { firstName, email, phoneNumber } = useContext(ProfileContext);
  const [paymentMethod, setPaymentMethod] = useState("");
  const snapPoints = useMemo(() => ["69%", "90%"], []);

  const shortPickupAddress = getShortAddress(pickupAddress);
  const shortDropAddress = getShortAddress(dropAddress);

  const tripRoute = [
    { name: "Douglas Crescent Road", sub: "Venie" },
    { name: "Logan Avenue", sub: "Aura" },
  ];

  const paymentOptions = [
    { label: "UPI/CARDS", value: "UPI/CARDS" },
    { label: "Cash", value: "Cash" },
    { label: "Wallet", value: "Wallet" },
  ];

  const totalAmount = Math.round(fare);

  function payNowHandler() {
    if (!paymentMethod) {
      Alert.alert("Please select a payment method first");
      return;
    }

    if (paymentMethod === "Cash") {
      setPaymentIsDone(true);
      reset();
      Alert.alert("Paisa Paisa");
    } else if (paymentMethod === "UPI/CARDS") {
      navigation.navigate("Payment", {
        amount: totalAmount,
        profile: { firstName, email, phoneNumber },
      });
    } else if (paymentMethod === "Wallet") {
      Alert.alert("Please wait till we add a wallet feature");
    }
  }

  return (
    <CustomBottomModal
      onChange={onChange}
      isFocused={isFocused}
      snapPoints={snapPoints}
    >
      <View style={styles.container}>
        <View style={styles.driverInfo}>
          <View style={styles.driverDetails}>
            <Text style={styles.driverName}>{driver?.first_name}</Text>
            <View style={styles.rating}>
              {[...Array(Math.round(driver?.rating ? driver.rating : 5))].map(
                (_, i) => (
                  <Icon
                    key={i}
                    name="star"
                    type="font-awesome"
                    color="#FFD700"
                    size={20}
                    style={{ marginHorizontal: 3 }}
                  />
                )
              )}
            </View>
          </View>
          { driver?.profile_picture ? (<Avatar
              rounded
              size="medium"
              source={{ uri: driver.profile_picture }}
            />
          ) : (
            <View style={styles.avatarAlt}>
              <ProfileInitial name={driver?.first_name ? driver.first_name : '?'} /> 
              
            </View>
          )

            }
        </View>

        <View style={styles.vehicleInfo}>
          <Image
            source={{ uri: driver?.vehicle_image }}
            style={styles.vehicleImage}
          />
          <View style={styles.vehicleDetails}>
            <Text style={styles.arrivalTime}>Your Ride is Finished.</Text>
            <Text style={styles.arrivalTime}>Bike Type</Text>
            <Text style={styles.vehicleType}>{driver?.vehicle_type}</Text>
            <Text style={styles.vehiclePlate}>{driver?.vehicle_plate}</Text>
          </View>
        </View>

        <View style={styles.tripRoute}>
          <Text style={styles.routeTitle}>Trip Route</Text>

          <View style={styles.routeItem}>
            <Icon name={"dot-single"} type="entypo" color={"green"} size={40} />
            <View style={styles.routeDetails}>
              <Text style={styles.routeName}>{shortPickupAddress.primary}</Text>
              <Text style={styles.routeSub}>
                {shortPickupAddress.secondary}
              </Text>
            </View>
          </View>

          <View style={styles.routeItem}>
            <Icon
              name={"dot-single"}
              type="entypo"
              color={colors.primary}
              size={40}
            />
            <View style={styles.routeDetails}>
              <Text style={styles.routeName}>{shortDropAddress.primary}</Text>
              <Text style={styles.routeSub}>{shortDropAddress.secondary}</Text>
            </View>
          </View>
        </View>

        <View style={styles.footer}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
              padding: 15,
            }}
          >
            <Text style={styles.totalAmount}>Total Amount:</Text>
            <Text style={styles.totalAmount}>₹ {totalAmount}</Text>
          </View>
          <View style={styles.paymentContainer}>
            <View style={{ flex: 1 }}>
              <RNPickerSelect
                onValueChange={(value) => setPaymentMethod(value)}
                items={paymentOptions}
                //   placeholder={{
                //     label : "UPI/CARDS",
                //     value : "UPI/CARDS"
                //   }}
                style={pickerSelectStyles}
              />
            </View>

            <View style={{ flex: 2 }}>
              <OrangeButton
                text={"Pay now"}
                onPress={payNowHandler}
                style={{ backgroundColor: "#33a823" }}
              />
            </View>
          </View>
        </View>
      </View>
    </CustomBottomModal>
  );
}

const styles = StyleSheet.create({
  container: {
    // backgroundColor: 'red',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    // padding: 20,
    flex: 1,
    width: "100%",
  },
  driverInfo: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    // paddingTop : 0,
    borderTopLeftRadius: 12,
    overflow: "hidden",
    borderTopRightRadius: 12,
    backgroundColor: colors.primary,
  },
  driverDetails: {
    marginLeft: 10,
  },
  driverName: {
    fontSize: 21,
    fontWeight: "bold",
    color: "white",
  },
  rating: {
    flexDirection: "row",
    marginTop: 10,
  },
  vehicleInfo: {
    // backgroundColor : 'red',
    alignItems: "flex-start",
    marginTop: 10,
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
  vehicleImage: {
    width: 75,
    height: 65,
  },
  vehicleDetails: {
    // marginLeft: 10,
  },
  arrivalTime: {
    fontSize: 14,
    color: "black",
    fontWeight: "bold",
  },
  vehicleType: {
    marginTop: 5,
    fontSize: 14,
    color: "gray",

    // fontWeight: 'bold',
  },
  vehiclePlate: {
    fontSize: 14,
    color: "gray",
  },
  tripRoute: {
    marginTop: 10,
    // backgroundColor: 'red'
  },
  routeTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  routeItem: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  routeDetails: {
    marginLeft: 5,
  },
  routeName: {
    fontSize: 16,
  },
  routeSub: {
    fontSize: 14,
    color: "gray",
  },
  addStopButton: {
    marginTop: 10,
  },
  addStopText: {
    fontSize: 16,
    color: "orange",
  },
  footer: {
    marginTop: 20,
    alignItems: "center",
  },
  totalAmount: {
    fontSize: 18,
    fontWeight: "bold",
  },
  paymentContainer: {
    flexDirection: "row",
    marginTop: 10,
  },
  avatarAlt : {
    borderWidth: 2,
    borderColor: colors.primary,
    height : 75,
    width : 75,
    borderRadius : 50,
    alignItems : 'center',
    justifyContent : 'center',
    marginRight : 10
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 4,
    color: "black",
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 20,
    fontWeight: "bold",
    paddingHorizontal: 10,
    paddingVertical: 8,
    height: 60,
    // borderWidth: 2,
    // borderColor: "purple",
    // borderRadius: 8,
    color: "black",
    paddingRight: 10, // to ensure the text is never behind the icon
    // backgroundColor : colors.primary,
  },
  
});
