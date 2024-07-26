import { Image, StyleSheet, Text, TextInput, View } from "react-native";
import { colors } from "../../../constants/colors";

export default function PickAndDropLocation() {
  return (
    <View style={styles.RootContainer}>
      <View style={styles.imageContainer}>
        <Image
          source={require("../../../assets/data/greenCircle.png")}
          style={styles.circleImage}
        />
        <View style={styles.verticleLine}></View>
        <Image
          source={require("../../../assets/data/redCircle.png")}
          style={styles.circleImage}
        />
      </View>
      <View style={styles.locationContainer}>
        <View style={styles.locations}>
          <Text style={{ fontSize: 16 }}> From </Text>
          <TextInput
            placeholder="Current Loaction"
            placeholderTextColor="#00C92C"
            style={styles.inputs}
            cursorColor={"black"}
          />
        </View>
        <View style={styles.locations}>
          <Text style={{ fontSize: 16 }}> Where To </Text>
          <TextInput
            placeholder="Drop Loaction"
            placeholderTextColor={colors.primary}
            style={styles.inputs}
            cursorColor={"black"}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    // borderWidth :1,
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: 33,
  },
  locationContainer: {
    // borderWidth :1,
    flex: 5,
    padding: 10,
    // justifyContent: 'space-between',
  },
  RootContainer: {
    borderTopWidth: 1,
    borderTopColor: "#cccccc80",
    backgroundColor: "white",
    flexDirection: "row",
    height: 219,
    marginHorizontal: 18,
    borderRadius: 22,
    overflow: "hidden",
    elevation: 7,
    marginTop : 2
  },
  verticleLine: {
    height: "40%",
    borderLeftWidth: 1,
    width: 4,
    marginLeft: 3,
    borderStyle: "dotted",
  },
  locations: {
    // borderWidth : 1,
    flex: 1,
    gap: 10,
    paddingTop: 15,
  },
  circleImage: {
    width: 20,
    height: 20,
  },
  inputs: {
    flex: 1,
    borderBottomWidth: 1,
    marginLeft: 4,
    borderColor: "#cccccc",
    marginBottom: 30,
  },
});
