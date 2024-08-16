import React, { useMemo } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, Pressable, View } from 'react-native';
import CustomBottomModal from './CustomBottomModal';
import { colors } from '../../../../constants/colors';

const TEXT = "Where are you going?";

interface BottomModalProps {
  onChange: (index: number) => void;
  isFocused: boolean;
}

const MainScreenModal: React.FC<BottomModalProps> = ({ onChange, isFocused }) => {
  const navigation = useNavigation<any>();

  const snapPoints = useMemo(() => ['15%', '60%', '99%'], []);

  const handlePress = () => {
    navigation.navigate('Drop');
  };

  return (
    <CustomBottomModal onChange={onChange} isFocused={isFocused} snapPoints={snapPoints}>
      <View style={styles.root}>
        <Pressable
          style={({ pressed }) => [styles.input, pressed && styles.pressed]}
          onPress={handlePress}
        >
          <View style={styles.locationContainer}>
            <Ionicons name="search" size={22} color="black" />
            <Text numberOfLines={1} ellipsizeMode="tail" style={styles.text}>
              {TEXT}
            </Text>
          </View>
        </Pressable>
      </View>
    </CustomBottomModal>
  );
};

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    paddingHorizontal: 15,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  
  },
  input: {
    height: 43,
    backgroundColor: '#ffffff',
    width: '87%',
    borderRadius: 25,
    justifyContent: 'space-between',
    alignItems: 'center',
    // elevation: 9,
    flexDirection: 'row',
    marginLeft: 10,
    paddingHorizontal: 10,
    overflow: 'hidden',
    borderColor : colors.primary,
    borderWidth : 1
  },
  pressed: {
    backgroundColor: '#c9c3c3',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
   
  },
  text: {
    color: 'grey',
    fontWeight: '600',
    fontSize: 16,
    maxWidth: '85%',
  },
});

export default MainScreenModal;
