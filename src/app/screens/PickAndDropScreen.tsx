import { StyleSheet, Text, View } from "react-native";
import PickAndDropLocation from "../components/PickAndDropLocation";
import SelectLocationButton from "../components/SelectLocationButton";
import { useContext, useRef, useState } from "react";
import Map from "../components/Map";
import { LocationContext } from "../../store/LocationContext";
import MapView from "react-native-maps";

export default function PickAndDropScreen(){
  const [pickOnMap, setPickOnMap] = useState(false);
  const {location} = useContext(LocationContext)
  const mapRef = useRef<MapView>(null)

  return (
    <View style={styles.root}>
      <PickAndDropLocation pickOnMap={pickOnMap} setPickOnMap={setPickOnMap} />
      {pickOnMap && <View style={{flex : 1, margin : 2, borderRadius : 15 , overflow : 'hidden'}}>
        <Map location={location?.coords || null} reff={mapRef} pickOnMap={pickOnMap} />
      </View>}
      <View style={styles.buttonContainer}>
        <SelectLocationButton TEXT={'Select Location'} onPress={()=>setPickOnMap(true)} />
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
    marginBottom: 10, // Add some bottom margin if needed
  },
});