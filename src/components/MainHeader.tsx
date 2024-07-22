import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import IconButton from "../ui/IconButton";
import { useContext, useEffect, useState } from "react";
import getAddress from "../../util/location";
import { LocationContext } from "../store/LocationContext";


export default function MainHeader() {
  const { pickedLocation, location } = useContext(LocationContext);
  const [TEXT, setTEXT] = useState<string>("Your Current Location");

  useEffect(() => {
    async function fetchAddress() {
      if (pickedLocation) {
        const address = await getAddress(
          pickedLocation.latitude,
          pickedLocation.longitude
         
        );
        setTEXT(address);
      } else if(location) {
        const address = await getAddress(
          location?.coords.latitude,
          location?.coords.longitude
        );
        setTEXT(address);
      }
    }

    fetchAddress();
  }, [pickedLocation, location]);

  return (
    <View style={styles.root}>
      <View style={styles.btn}>
        <IconButton name="menu" size={28} color={"grey"} />
      </View>
      <Pressable
        style={({ pressed }) => [
          styles.input,
          pressed && { backgroundColor: "#c9c3c3" },
        ]}
      >
        <View style={styles.locationContainer}>
          <Ionicons name="location" size={22} color={"green"} />
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            style={{
              color: "grey",
              fontWeight: "600",
              fontSize: 16,
              maxWidth: "85%",
            }}
          >
            {TEXT}
          </Text>
        </View>

        <View style={{ width: 28, borderRadius: 15 }}>
          <IconButton name="heart-outline" color="grey" size={24} />
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    // backgroundColor : '#e4e1395b',
    flexDirection: "row",
    paddingHorizontal: 15,
    justifyContent: "center",
    // height : 48,
    alignItems: "center",

    // elevation : 1,
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
});
