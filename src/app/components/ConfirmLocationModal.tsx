import { View, StyleSheet, Text, ActivityIndicator } from "react-native";
import CustomBottomModal from "./CustomBottomModal";
import OrangeButton from "../../ui/OrangeButton";
import { useContext, useMemo, useCallback, useState, useEffect } from "react";
import { LocationContext } from "../../store/LocationContext";
import { ProgressBarAndroidComponent } from "react-native";
import { useNavigation } from "@react-navigation/native";

interface BottomModalProps {
  onChange: (index: number) => void;
  isFocused: boolean;
}

export default function ConfirmLocationModal({
  isFocused,
  onChange,
}: BottomModalProps) {
  const { distance, fare } = useContext(LocationContext);

  const [rideIsBooked, setRideIsBooked] = useState(false);

  const snapPoints = useMemo(() => ["25%"], []);

  const navigation = useNavigation<any>();

  function bookRideHandler() {
    setRideIsBooked(true);
  }

  useEffect(() => {
    if (rideIsBooked) {
      const timer = setTimeout(() => {
        navigation.navigate("Main", { rideIsBooked });
      }, 5000);

      return () => clearTimeout(timer);
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
            <OrangeButton text="Book Ride" onPress={bookRideHandler} />
          </View>
        </View>
      )}

      {rideIsBooked && (
        <View style={styles.container}>
          <ActivityIndicator />
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
