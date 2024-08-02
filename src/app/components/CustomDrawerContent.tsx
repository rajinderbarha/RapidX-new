import React, { useContext } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { DrawerContentScrollView, DrawerItemList, DrawerItem, DrawerContentComponentProps } from '@react-navigation/drawer';
import { AuthContext } from '../../store/AuthContext';

const CustomDrawerContent = (props: DrawerContentComponentProps) => {
  const { signOut } = useContext(AuthContext);

  const handleSignOut = async () => {
    try {
      await signOut();
      Alert.alert("Signed out successfully");
    } catch (error) {
      console.error("Error signing out", error);
    }
  };

  return (
    <DrawerContentScrollView {...props} contentContainerStyle={styles.container}>
      <View style={styles.userSection}>
        <Text style={styles.userName}>User Name</Text>
      </View>

      <View style={styles.screensSection}>
        <DrawerItemList {...props} />
      </View>

      <View style={styles.logoutSection}>
        <DrawerItem
          label="Logout"
          onPress={handleSignOut}
        />
      </View>
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  userSection: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  screensSection: {
    flex: 1,
  },
  logoutSection: {
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
});

export default CustomDrawerContent;
