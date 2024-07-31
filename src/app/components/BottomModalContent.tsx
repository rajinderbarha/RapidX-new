import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet, Text, Pressable, View } from "react-native";

const TEXT = 'Where are you going?';

export default function BottomModalContent() {
  const navigation = useNavigation<any>();

  function handlePress() {
    navigation.navigate('Drop');
  }

  return (
    <View style={styles.root}>
      <Pressable
        style={({ pressed }) => [
          styles.input,
          pressed && styles.pressed,
        ]}
        onPress={handlePress}
      >
        <View style={styles.locationContainer}>
          <Ionicons name="search" size={22} color="black" />
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            style={styles.text}
          >
            {TEXT}
          </Text>
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
  pressed: {
    backgroundColor: "#c9c3c3",
  },
  locationContainer: {
    flexDirection: "row",
    gap: 10,
    flex: 1,
    alignItems: "center",
  },
  text: {
    color: "grey",
    fontWeight: "600",
    fontSize: 16,
    maxWidth: "85%",
  },
});
