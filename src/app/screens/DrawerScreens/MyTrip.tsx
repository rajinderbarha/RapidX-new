import { Text, View } from "react-native";
import RideItemComponent from "../../components/RideItemComponent";

export default function MyTripScreen(){
  return (
    <View style={{flex : 1}}>
      <RideItemComponent dropAddress="Canada" pickupAddress="India"/>

    </View>
  );
};
