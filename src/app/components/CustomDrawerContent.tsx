import React, { useContext } from "react";
import { View, Text, StyleSheet, Alert, Pressable, TouchableOpacity } from "react-native";
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
  DrawerContentComponentProps,
} from "@react-navigation/drawer";
import { AuthContext } from "../../store/AuthContext";
import { logout } from "../../../util/localAPIs";
import { LocalAuthContext } from "../../store/LocalAuthContext";
import { useNavigation } from "@react-navigation/native";
import { ProfileContext } from "../../store/ProfileContext";

const CustomDrawerContent = (props: DrawerContentComponentProps) => {
  // const { signOut } = useContext(AuthContext);
  const { setToken } = useContext(LocalAuthContext);
  const { name } = useContext(ProfileContext);
const navigation = useNavigation<any>()

  const handleSignOut = async () => {
    try {
      // await signOut();
      await logout();
      setToken("");

      Alert.alert("Signed out successfully");
    } catch (error) {
      console.error("Error signing out", error);
    }
  };

  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={styles.container}
    >
      <View style={styles.userSection}>
        <TouchableOpacity onPress={()=>navigation.navigate('Profile')}>
        <Text style={styles.userName}>{name}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.screensSection}>
        <DrawerItemList {...props} />
      </View>

      <View style={styles.logoutSection}>
        <DrawerItem label="Logout" onPress={handleSignOut} />
      </View>
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
  },
  userSection: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  userName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  screensSection: {
    flex: 1,
  },
  logoutSection: {
    borderTopWidth: 1,
    borderTopColor: "#ccc",
  },
});

export default CustomDrawerContent;
