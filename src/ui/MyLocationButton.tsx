import { GestureResponderEvent, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

interface MyLocationButtonProps {
    onPress : (event : GestureResponderEvent) => void
}


export default function MyLocationButton({onPress} : MyLocationButtonProps) {
  return (
    <TouchableOpacity style = {styles.btn} onPress={onPress}>
      <MaterialIcons name="my-location" size={30} color="blue" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
    btn : {
        height : 40,
        width : 40,
        borderRadius : 25,
        backgroundColor : 'white',
        position: 'absolute',
        bottom : 100,
        right : 20,
        elevation : 9,
        alignItems : 'center',
        justifyContent : 'center',
    }
});