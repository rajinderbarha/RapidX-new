import { StyleSheet, Text, View } from "react-native";
import PickAndDropLocation from "../components/PickAndDropLocation";
import { useContext, useRef, useState } from "react";
import Map from "../components/Map";
import { LocationContext } from "../../store/LocationContext";
import MapView from "react-native-maps";
import ConfirmLocationModal from "../components/ConfirmLocationModal";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";

export default function PickAndDropScreen(){
  const [pickOnMap, setPickOnMap] = useState(false);
  const [locationIsConfirmed, setLocationIsConfirmed] = useState<boolean>(true); 
  const navigation = useNavigation()
  const {location , pickedLocation, dropLocation} = useContext(LocationContext)
  const mapRef = useRef<MapView>(null)
const isFocused = useIsFocused()



  return (
    <BottomSheetModalProvider>
    <View style={styles.root}>
      <PickAndDropLocation  />
      <View style={{flex : 1, margin : 2, borderRadius : 15 , overflow : 'hidden'}}>
        <Map location={location?.coords || null} reff={mapRef} pickOnMap={pickOnMap} />
      </View>
     
    {pickedLocation && dropLocation && <ConfirmLocationModal isFocused={isFocused} onChange={()=>{}}/>}
    </View>
     </BottomSheetModalProvider>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    // backgroundColor: 'grey',
    // justifyContent: 'space-between', // Ensure the button is at the bottom
  },
  buttonContainer: {
    alignItems : 'center', // Add some bottom margin if needed
    justifyContent : 'center',
    // paddingTop : 10
  },
});