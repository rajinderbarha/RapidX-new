import React, { useContext, useMemo, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import BottomSheet from "@gorhom/bottom-sheet";
import { AirbnbRating } from "@rneui/base";
import CustomBottomModal from "./CustomBottomModal";
import { colors } from "../../../../constants/colors";
import OrangeButton from "../../../ui/OrangeButton";
import { RideContext } from "../../../store/RideContext";

export default function TripReviewModal({ onChange, isFocused }: any) {
  const { driver, resetRideData } = useContext(RideContext);
  const snapPoints = useMemo(() => ["65%"], []);

  return (
    <CustomBottomModal
      onChange={onChange}
      isFocused={isFocused}
      snapPoints={snapPoints}
    >
      <View style={styles.container}>
        <View style={styles.driverInfo}>
          <Image
            source={{uri : driver?.profile_picture}} // Replace with your driver image URL
            style={styles.driverImage}
          />
          <Text style={styles.driverName}>{driver?.name}</Text>
          <AirbnbRating
            count={5}
            defaultRating={driver?.rating}
            size={20}
            showRating={false}
            isDisabled={true}
            selectedColor="#FFD700"
            starContainerStyle={styles.rating}
          />
        </View>
        <Text
          style={{
            textAlign: "center",
            fontSize: 20,
            fontWeight: "bold",
            margin: 10,
          }}
        >
          How was your Trip ?
        </Text>
        <View style={styles.ratingContainer}>
          <Text style={styles.questionText}>How was your Trip?</Text>
          <AirbnbRating
            count={5}
            defaultRating={0}
            size={30}
            showRating={false}
            selectedColor="white"
            starContainerStyle={styles.ratingInput}
          />
        </View>
        <TextInput
          style={styles.commentInput}
          placeholder="Comment"
          multiline
        />

        <OrangeButton
          text="Send"
          iconName={""}
          onPress={() => resetRideData()}
        />
      </View>
    </CustomBottomModal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingHorizontal: 20,
    // backgroundColor : 'red',
    width: "100%",
  },
  driverInfo: {
    alignItems: "center",
    marginBottom: 20,
    backgroundColor: colors.primary,
    width: "100%",
    paddingBottom: 20,
  },
  driverImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 5,
  },
  ratingContainer: {
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    marginHorizontal: 20,
    borderRadius: 15,
  },
  driverName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  rating: {
    marginTop: 5,
  },
  questionText: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#fff",
  },
  ratingInput: {
    marginBottom: 20,
  },
  commentInput: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 8,
    marginBottom: 20,
    fontSize: 16,
    marginHorizontal: 20,
    color: "black",
    height: 80,
  },
  sendButton: {
    backgroundColor: "#FF4500",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  sendButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
});
