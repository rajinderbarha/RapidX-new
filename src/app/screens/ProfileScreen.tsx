import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { Avatar, Button } from '@rneui/base';
import Icon from 'react-native-vector-icons/FontAwesome';
import OrangeButton from '../../ui/OrangeButton';
import { colors } from '../../../constants/colors';
// import ImagePicker from 'react-native-image-picker';

const profile = {
  picture: require('../../../assets/sidhu.jpg'),
  firstName: 'Moose',
  lastName: 'Wala',
  email: 'info@rapidx.com',
  phone: '+1-9654-963-258',
};



const ProfileScreen = () => {
  const [firstName, setFirstName] = useState(profile.firstName);
  const [lastName, setLastName] = useState(profile.lastName);
  const [email, setEmail] = useState(profile.email);
  const [phone, setPhone] = useState(profile.phone);
  const [picture, setPicture] = useState(profile.picture);

  const onUpdate = (updatedProfile) => {
    console.log('Updated Profile:', updatedProfile);
  };


  const selectProfilePicture = () => {
    // const options = {
    //   title: 'Select Profile Picture',
    //   storageOptions: {
    //     skipBackup: true,
    //     path: 'images',
    //   },
    // };

    // ImagePicker.showImagePicker(options, (response) => {
    //   if (response.didCancel) {
    //     console.log('User cancelled image picker');
    //   } else if (response.error) {
    //     console.log('ImagePicker Error: ', response.error);
    //   } else {
    //     const source = { uri: response.uri };
    //     setPicture(source.uri);
    //   }
    // });
  };

  const handleUpdate = () => {
    const updatedProfile = {
      picture,
      firstName,
      lastName,
      email,
      phone,
    };
    onUpdate(updatedProfile);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Avatar
          rounded
          size="xlarge"
          source={profile.picture}
          containerStyle={styles.avatar}
        >
          <Avatar.Accessory
            size={30}
            onPress={selectProfilePicture}
            style={styles.editIcon}
          />
        </Avatar>
      </View>

      <View style={styles.details}>
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>First Name</Text>
          <TextInput
            style={styles.input}
            value={firstName}
            onChangeText={setFirstName}
          />
        </View>
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Last Name</Text>
          <TextInput
            style={styles.input}
            value={lastName}
            onChangeText={setLastName}
          />
        </View>
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Email Address</Text>
          <View style={styles.emailContainer}>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
            />
            <Text style={styles.unverifiedText}>Unverified</Text>
          </View>
        </View>
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Phone No</Text>
          <View style={styles.phoneContainer}>
            <TextInput
              style={styles.input}
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
            />
            <Text style={styles.verifiedText}>Verified</Text>
          </View>
        </View>
      </View>
<View style={{marginTop : '40%'}}>
      <OrangeButton text='Save Changes' iconName={''} onPress={handleUpdate} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    alignItems: 'center',
    paddingBottom: 20,
  },
  avatar: {
    borderWidth: 2,
    borderColor: colors.primary,
  },
  editIcon: {
    backgroundColor: colors.primary,
  },
  details: {
    marginVertical: 20,
  },
  fieldContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 5,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    fontSize: 18,
    paddingVertical: 5,
  },
  emailContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  unverifiedText: {
    color: 'red',
    fontWeight: '600',
  },
  phoneContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  verifiedText: {
    color: 'green',
    fontWeight: '600',
  },
  updateButton: {
    backgroundColor: '#f44336',
    borderRadius: 25,
    paddingVertical: 15,
  },
});

export default ProfileScreen;
