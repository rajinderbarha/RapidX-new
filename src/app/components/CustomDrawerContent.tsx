import React, { useContext, useState } from 'react';
import { View, StyleSheet, Alert, Pressable } from 'react-native';
import { DrawerContentComponentProps, DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { Avatar, Icon, Text } from '@rneui/base';
import { colors } from '../../../constants/colors';
import LogoutModal from './OnScreenModals/LogoutModal';
import { LocalAuthContext } from '../../store/LocalAuthContext';
import { logout } from '../../../util/localAPIs';
import { useNavigation } from '@react-navigation/native';
import { ProfileContext } from '../../store/ProfileContext';

export default function CustomDrawerContent(props : DrawerContentComponentProps) {

  const [isAlertVisible, setAlertVisible] = useState(false);
  const navigation = useNavigation<any>()
  const { setToken } = useContext(LocalAuthContext);
  const {firstName, lastName, picture,  } = useContext(ProfileContext)

  function toggleAlert() {
    setAlertVisible(!isAlertVisible);
  }

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


  return (<>
    <DrawerContentScrollView {...props}>
      <Pressable onPress={()=>{navigation.navigate('Profile')}}>
      <View style={styles.header}>
        <View>
        <Avatar
          size="large"
          rounded
          source={{ uri: picture ? picture : 'https://randomuser.me/api/portraits/men/41.jpg' }} // Replace with your image
          containerStyle={styles.avatar}
        />
        </View>
        <View>
        <Text h4 style={styles.name}>{firstName} {lastName}</Text>
        <View style={styles.rating}>
          {Array(5).fill(0).map((_, i) => (
            <Icon key={i} name="star" type="font-awesome" color="#FFD700" size={17} style={{marginRight : 5, marginTop : 5}}/>
          ))}
        </View>
        </View>
      </View>
      </Pressable>
      <DrawerItem
        label="Home"
        icon={() => <Icon name="home" type="font-awesome" color={colors.primary00} style = {styles.icons} />}
        onPress={() => props.navigation.navigate('Home')}
      />
      <DrawerItem
        label="My Trips"
        icon={() => <Icon name="suitcase" type="font-awesome"  color={colors.primary00} style = {styles.icons}/>}
        onPress={() => props.navigation.navigate('Trips')}
      />
      <DrawerItem
        label="About Us"
        icon={() => <Icon name="info-circle" type="font-awesome" color={colors.primary00} style = {styles.icons} />}
        onPress={() => props.navigation.navigate('About Us')}
      />
      <DrawerItem
        label="Terms & Conditions"
        icon={() => <Icon name="file-text" type="font-awesome" color={colors.primary00} style = {styles.icons} />}
        onPress={() => props.navigation.navigate('Terms & Conditions')}
      />
      <DrawerItem
        label="Privacy Policy"
        icon={() => <Icon name="shield" type="font-awesome" color={colors.primary00} style = {styles.icons} />}
        onPress={() => props.navigation.navigate('Privacy Policy')}
      />
      <DrawerItem
        label="Contact Us"
        icon={() => <Icon name="phone" type="font-awesome" color={colors.primary00} style = {styles.icons} />}
        onPress={() => props.navigation.navigate('Contact Us')}
      />
    </DrawerContentScrollView>
    <DrawerItem
    style={styles.logoutSection}
        label="Logout"
        icon={() => <Icon name="sign-out" type="font-awesome" color={colors.primary00} />}
        onPress={toggleAlert}
      />
 <LogoutModal
        isVisible={isAlertVisible}
        onClose={toggleAlert}
        onConfirm={handleSignOut}
      />
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    flexDirection : 'row',
    // backgroundColor : 'red'
  },
  avatar: {
    marginBottom: 10,
    marginRight : 20
  },
  name: {
    fontWeight: 'bold',
  },
  rating: {
    flexDirection: 'row',
    marginTop: 5,
  },
  logoutSection: {
        borderTopWidth: 2,
        borderTopColor: "#ccc",
      },
  icons : {
    marginLeft : 10
  }
});

