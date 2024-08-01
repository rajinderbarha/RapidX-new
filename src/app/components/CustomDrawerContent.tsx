import React, { useContext } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { AuthContext } from '../../store/AuthContext';
import { Alert } from 'react-native';

const CustomDrawerContent = (props : any) => {

  const {signOut} = useContext(AuthContext)
  
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
      {/* User Section */}
      <View style={styles.userSection}>
        <Text style={styles.userName}>User Name</Text>
        {/* Add more user details here */}
      </View>

      {/* Screens Section */}
      <View style={styles.screensSection}>
        <DrawerItemList {...props} />
      </View>

      {/* Logout Button */}
      <View style={styles.logoutSection}>
        <DrawerItem
          label="Logout"
          onPress={() => {
            handleSignOut();
          }}
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
