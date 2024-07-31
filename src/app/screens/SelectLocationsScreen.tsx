import { View } from "react-native";
import AutoComplete from "../components/Autocomplete";

export default function SelectLocationScreen(){
  return (
    <View style = {{ flex :1 , alignItems : 'center', justifyContent : 'center'}}>
            <AutoComplete />
    </View>
  );
};
