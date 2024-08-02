import React from 'react';
import { Marker } from 'react-native-maps';

interface MapProps {
  location: {
    latitude: number;
    longitude: number;
  };
  color: string; 
}

const AddMarker: React.FC<MapProps> = ({ location, color }) => {
  return (
    <Marker
      pinColor={color}
      coordinate={{
        latitude: location.latitude,
        longitude: location.longitude,
      }}
    />
  );
};

export default AddMarker;
