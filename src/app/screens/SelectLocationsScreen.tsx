import React from 'react';
import { View, StyleSheet } from 'react-native';
import AutoComplete from '../components/Autocomplete';

const SelectLocationScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <AutoComplete />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default SelectLocationScreen;
