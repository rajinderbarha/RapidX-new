import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet, Text, Pressable, View, Alert } from "react-native";
import CustomBottomModal from "./CustomBottomModal";
import { Image } from "react-native";
import { Avatar, Icon } from "@rneui/base";
import { colors } from "../../../constants/colors";
import OrangeButton from "../../ui/OrangeButton";
import RNPickerSelect from "react-native-picker-select";
import { RideContext } from "../../store/RideContext";

interface BottomModalProps {
  onChange: (index: number) => void;
  isFocused: boolean;
}

export default function OnFinishRideModal({
  onChange,
  isFocused,
}: BottomModalProps) {
  const navigation = useNavigation<any>();
  const {driver, setPaymentIsDone} = useContext(RideContext)
  const [paymentMethod, setPaymentMethod] = useState("");
  const snapPoints = useMemo(() => [ "69%", '90%'], []);
  const driverr = {
    name: "Sidhu Moose Wala",
    image: require("../../../assets/sidhu.jpg"), // You can replace this with a real image URL
    rating: 5,
    arrivalTime: "2.95 min",
    vehicle: {
      image: require("../../../assets/data/pulsor.png"), // You can replace this with a real image URL
      type: "5911",
      plate: "G5-567-JH",
    },
  };

  const tripRoute = [
    { name: "Douglas Crescent Road", sub: "Venie" },
    { name: "Logan Avenue", sub: "Aura" },
  ];

  const paymentOptions = [
    { label: "UPI/CARDS", value: "UPI/CARDS" },
    { label: "Cash", value: "Cash" },
    { label: "Wallet", value: "Wallet" },
  ];

  const totalAmount = "$50.00";

  function payNowHandler() {
    if (!paymentMethod) {
      Alert.alert("Please select a payment method first");
      return;
    }

    if (paymentMethod === "Cash") {
      setPaymentIsDone(true)
      Alert.alert("Paisa Paisa");
    } else if (paymentMethod === "UPI/CARDS") {
      navigation.navigate("Payment");
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
            <Text style={styles.driverName}>{driver?.name}</Text>
            <View style={styles.rating}>
              {[...Array(driverr.rating)].map((_, i) => (
                <Icon
                  key={i}
                  name="star"
                  type="font-awesome"
                  color="#FFD700"
                  size={20}
                  style={{ marginHorizontal: 3 }}
                />
              ))}
            </View>
          </View>
          <Avatar rounded size="medium" source={driverr.image} />
        </View>

        <View style={styles.vehicleInfo}>
          <Image source={driverr.vehicle.image} style={styles.vehicleImage} />
          <View style={styles.vehicleDetails}>
            <Text style={styles.arrivalTime}>Your Ride is Finished.</Text>
            <Text style={styles.arrivalTime}>Bike Type</Text>
            <Text style={styles.vehicleType}>{driverr.vehicle.type}</Text>
            <Text style={styles.vehiclePlate}>{driverr.vehicle.plate}</Text>
          </View>
        </View>

        <View style={styles.tripRoute}>
          <Text style={styles.routeTitle}>Trip Route</Text>
          {tripRoute.map((route, index) => (
            <View key={index} style={styles.routeItem}>
              <Icon
                name={"dot-single"}
                type="entypo"
                color={index === 0 ? "green" : colors.primary400}
                size={40}
              />
              <View style={styles.routeDetails}>
                <Text style={styles.routeName}>{route.name}</Text>
                <Text style={styles.routeSub}>{route.sub}</Text>
              </View>
            </View>
          ))}
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
            <Text style={styles.totalAmount}>{totalAmount}</Text>
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
                iconName={""}
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
