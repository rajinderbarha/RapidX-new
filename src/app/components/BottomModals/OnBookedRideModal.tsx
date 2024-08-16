import React, { useContext, useMemo } from "react";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet, Text, Pressable, View } from "react-native";
import CustomBottomModal from "./CustomBottomModal";
import { Image } from "react-native";
import { Avatar, Icon } from "@rneui/base";
import { colors } from "../../../../constants/colors";
import OrangeButton from "../../../ui/OrangeButton";
import { RideContext } from "../../../store/RideContext";
import { LocationContext } from "../../../store/LocationContext";
import getShortAddress from "../../../../util/getShortAddress";

interface BottomModalProps {
  onChange: (index: number) => void;
  isFocused: boolean;
}

const OnBookedRideModal: React.FC<BottomModalProps> = ({
  onChange,
  isFocused,
}) => {
  const navigation = useNavigation<any>();
  const { setRideIsCompleted, driver } = useContext(RideContext);
  const { pickupAddress, dropAddress, fare } = useContext(LocationContext);

  const snapPoints = useMemo(() => ["30%", "62%", "80%"], []);

  const { primary, secondary } = getShortAddress(pickupAddress);

  const tripRoute = [
    { name: "Douglas Crescent Road", sub: "Venie" },
    { name: "Logan Avenue", sub: "Aura" },
  ];

  const totalAmount = "$50.00";

  function completedRideHandler() {
    setRideIsCompleted(true);
    // reset()
  }

  return (
    driver && (
      <CustomBottomModal
        onChange={onChange}
        isFocused={isFocused}
        snapPoints={snapPoints}
      >
        <View style={styles.container}>
          <View style={styles.driverInfo}>
            <View style={styles.driverDetails}>
              <Text style={styles.driverName}>{driver.name}</Text>
              <View style={styles.rating}>
                {[...Array(driver.rating)].map((_, i) => (
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
            <Avatar
              rounded
              size="medium"
              source={{ uri: driver.profile_picture }}
            />
          </View>

          <View style={styles.vehicleInfo}>
            <Image
              source={{ uri: driver.vehicle_image }}
              style={styles.vehicleImage}
            />
            <View style={styles.vehicleDetails}>
              <Text style={styles.arrivalTime}>
                Your Ride is Arriving in {driver.phone_number}
              </Text>
              <Text style={styles.arrivalTime}>Bike Type</Text>
              <Text style={styles.vehicleType}>{driver.vehicle_type}</Text>
              <Text style={styles.vehiclePlate}>{driver.vehicle_plate}</Text>
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
                  <Text style={styles.routeName}>{primary}</Text>
                  <Text style={styles.routeSub}>{secondary}</Text>
                </View>
              </View>
            ))}
            {/* <TouchableOpacity style={styles.addStopButton}>
          <Text style={styles.addStopText}>Add Stop</Text>
        </TouchableOpacity> */}
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
              <Text style={styles.totalAmount}>₹ {fare}</Text>
            </View>
            <OrangeButton
              text={"Cancel Ride"}
              onPress={() => {
                navigation.navigate("Ride Cancel");
              }}
              style={{}}
              iconName={""}
            />
            <View style={{ marginTop: 8, width: "100%" }}>
              <OrangeButton
                text="Completed"
                onPress={completedRideHandler}
                iconName={""}
                style={{ backgroundColor: "green" }}
              />
            </View>
          </View>
        </View>
      </CustomBottomModal>
    )
  );
};

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
  cancelButton: {
    backgroundColor: "orange",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginTop: 10,
  },
  cancelButtonText: {
    fontSize: 16,
    color: "white",
  },
});

export default OnBookedRideModal;
