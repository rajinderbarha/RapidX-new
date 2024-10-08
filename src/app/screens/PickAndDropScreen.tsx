import React, { useContext, useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import MapView from 'react-native-maps';
import PickAndDropLocation from '../components/OnScreenModals/PickAndDropLocation';
import Map from '../components/Map/Map';
import ConfirmLocationModal from '../components/BottomModals/ConfirmLocationModal';
import { LocationContext } from '../../store/LocationContext';

export default function PickAndDropScreen() {
  const [pickOnMap, setPickOnMap] = useState<boolean>(false);
  const navigation = useNavigation<any>();
  const { location, pickedLocation, dropLocation } = useContext(LocationContext);
  const mapRef = useRef<MapView>(null);
  const isFocused = useIsFocused();

  return (
    <BottomSheetModalProvider>
      <View style={styles.root}>
        <PickAndDropLocation />
        <View style={styles.mapContainer}>
          <Map location={location?.coords || null} reff={mapRef} markerType={"drop"} />
        </View>
        {pickedLocation && dropLocation && (
          <ConfirmLocationModal isFocused={isFocused} onChange={() => {}} />
        )}
      </View>
    </BottomSheetModalProvider>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  mapContainer: {
    flex: 1,
    margin: 2,
    borderRadius: 15,
    overflow: 'hidden',
  },
});
