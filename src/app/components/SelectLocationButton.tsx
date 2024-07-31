import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { colors } from "../../../constants/colors";


export default function SelectLocationButton({ style, name, TEXT, onPress }: any) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={[styles.btn, style]}>
        <MaterialIcons name={name} size={26} color="black" />
        <Text style={{ fontSize: 18, fontWeight: 600, color : 'black' }}>{TEXT}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  btn: {
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    width: "64%",
    borderWidth: 1,
    borderColor: colors.primary,
    marginHorizontal: "18%",
    padding: 14,
     
    borderRadius: 50,
    flexDirection: "row",
  },
});
