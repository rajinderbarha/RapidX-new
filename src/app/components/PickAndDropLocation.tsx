import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useContext, useEffect, useRef, useCallback } from "react";
import { useNavigation } from "@react-navigation/native";
import {  GooglePlacesAutocompleteRef} from "react-native-google-places-autocomplete";
import { LocationContext } from "../../store/LocationContext";

interface DropProps {
  pickOnMap: boolean;
  setPickOnMap: (prevState: boolean) => void;
}

export default function PickAndDropLocation() {
  const ref = useRef<GooglePlacesAutocompleteRef>(null);
  const navigation = useNavigation<any>();
  const { pickupAddress, dropAddress, pickedLocation } = useContext(LocationContext);

  useEffect(() => {
    ref.current?.setAddressText(dropAddress);
  }, [dropAddress]);

  const inputPressHandler = useCallback(
    (field: "pickup" | "drop") => {
      navigation.navigate("Locations", { field });
    },
    [navigation]
  );

  const truncateAddress = (address : string, maxLength = 48) => {
    if (address.length > maxLength) {
      return address.slice(0, maxLength) + '...'; // Append ellipsis if truncated
    }
    return address;
  };

  const truncatedPickupAddress = truncateAddress(pickupAddress)
  const truncatedDropAddress = truncateAddress(dropAddress)

  return (
    <View style={styles.rootContainer}>
      <View style={styles.imageContainer}>
        <Image
          source={require("../../../assets/data/greenCircle.png")}
          style={styles.circleImage}
        />
        <View style={styles.verticalLine}></View>
        <Image
          source={require("../../../assets/data/redCircle.png")}
          style={styles.circleImage}
        />
      </View>
      <View style={styles.locationContainer}>
        <View style={styles.locations}>
          <Text style={styles.label}>From</Text>
          <Pressable
            onPress={() => inputPressHandler("pickup")}
            style={({ pressed }) => pressed && styles.pressed}
          >
            <TextInput
              placeholder="Pickup Location"
              placeholderTextColor="#00C92C"
              style={[styles.inputs, styles.inputBackground]}
              cursorColor="black"
              value={truncatedPickupAddress}
              editable={false}
            />
          </Pressable>
        </View>
        <View style={styles.locations}>
          <Text style={styles.label}>Where To</Text>
          <Pressable
            onPress={() => inputPressHandler("drop")}
            style={({ pressed }) => pressed && styles.pressed}
          >
            <TextInput
              placeholder="Drop Location"
              style={styles.inputs}
              cursorColor="black"
              value={truncatedDropAddress}
              editable={false}
            />
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    borderTopWidth: 1,
    borderTopColor: "#cccccc80",
    backgroundColor: "white",
    flexDirection: "row",
    height: 230,
    alignSelf : 'center',
    // marginHorizontal: 18,
    borderRadius: 22,
    overflow: "hidden",
    elevation: 7,
    marginTop: 2,
    position : 'absolute',
    top : 0,
    width : '95%',
    zIndex : 100,

  },
  imageContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: 33,
  },
  locationContainer: {
    flex: 5,
    padding: 10,
  },
  verticalLine: {
    height: "40%",
    borderLeftWidth: 1,
    width: 4,
    marginLeft: 3,
    borderStyle: "dotted",
  },
  locations: {
    flex: 1,
    gap: 10,
    paddingTop: 15,
  },
  circleImage: {
    width: 20,
    height: 20,
  },
  inputs: {
    borderBottomWidth: 2,
    marginLeft: 4,
    borderColor: "#cccccc",
    color: "black",
  },
  inputBackground: {
    backgroundColor: "white",
  },
  label: {
    fontSize: 16,
  },
  pressed: {
    opacity: 0.5,
  },
});
