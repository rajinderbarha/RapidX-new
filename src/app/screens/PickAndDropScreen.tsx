import { StyleSheet, Text, View } from "react-native";
import PickAndDropLocation from "../components/PickAndDropLocation";
import SelectLocationButton from "../components/SelectLocationButton";

export default function PickAndDropScreen(){
  return (
    <View style={styles.root}>
      <PickAndDropLocation />
      <View style={styles.buttonContainer}>
        <SelectLocationButton TEXT={'Select Location'}/>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    // backgroundColor: 'grey',
    justifyContent: 'space-between', // Ensure the button is at the bottom
  },
  buttonContainer: {
    marginBottom: 40, // Add some bottom margin if needed
  },
});