import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, Dimensions } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { launchImageLibraryAsync } from 'expo-image-picker';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { useRoute, useNavigation } from '@react-navigation/native';
import axiosInstance from '../config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from 'expo-constants';
import { Alert } from 'react-native';

const statusBarHeight = Constants.statusBarHeight;
const { width, height } = Dimensions.get('window');

export default function EditProfileScreen() {
  const [image, setImage] = useState(null);
  const navigation = useNavigation();
  const route = useRoute();
  const user = route.params.user; // Assuming you pass user data from the previous screen
  const [name, setName] = useState(user.name || '');
  const [email, setEmail] = useState(user.email || '');
  const [phone, setPhone] = useState(user.phone || '');
  const [address, setAddress] = useState([user.address[0] || '']);
  
  const pickImage = async () => {
    let result = await launchImageLibraryAsync({
      mediaTypes: 'Images',
      allowsEditing: true,
      quality: 1,
    });
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };
  const editProfile = async () => {

    try {
      const token = await AsyncStorage.getItem('token');
      const response = await axiosInstance.put('/users/profile',{
        name,
        email,
        phone,
        address,
        image
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // console.log(response.data);
      navigation.navigate('Profile');
    } catch (error) {
      // console.error(error);
      Alert.alert('Error', 'Failed to update profile. Please try again.');
    }
  }

  return (
    <View style={styles.container}>
   <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginBottom: 10, marginLeft:-300 }}>
      <Ionicons name="arrow-back" size={28} color="#333" />
    </TouchableOpacity>

      <Text style={styles.title}>MED PRO</Text>
      <Text style={styles.subtitle}>Profile</Text>

      <View style={styles.avatarContainer}>
        <Image
          source={
            image
              ? { uri: image }
              : require('../assets/users.jpg') // Add a fallback image
          }
          style={styles.avatar}
        />
        <TouchableOpacity style={styles.uploadButton} onPress={pickImage}>
          <MaterialIcons name="upload" size={RFPercentage(2.3)} color="white" />
          <Text style={styles.uploadText}>Upload Photo</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.inputContainer}>
        <Ionicons name="person-outline" size={RFPercentage(2.5)} color="#666" />
        <TextInput
          placeholder="Enter your name"
          style={styles.input}
          value={name}
          onChangeText={setName}
        />
      </View>

      <View style={styles.inputContainer}>
        <Ionicons name="mail-outline" size={RFPercentage(2.5)} color="#666" />
        <TextInput
          placeholder="Enter your email"
          style={styles.input}
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />
      </View>

      <View style={styles.inputContainer}>
        <Ionicons name="call-outline" size={RFPercentage(2.5)} color="#666" />
        <TextInput
          placeholder="Enter your phone no."
          style={styles.input}
          keyboardType="phone-pad"
          value={phone}
          onChangeText={setPhone}
        />
      </View>

      <View style={styles.inputContainer}>
        <Ionicons name="home-outline" size={RFPercentage(2.5)} color="#666" />
        <TextInput
          placeholder="Enter your address"
          style={styles.input}
          value={address}
          onChangeText={setAddress}
        />
      </View>

      <TouchableOpacity
  style={styles.saveButton}
  onPress={editProfile}
>
  <Text style={styles.saveText}>Save Settings</Text>
</TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#A2B4A9',
    padding: RFPercentage(3),
    alignItems: 'center',
    paddingTop: statusBarHeight + 10,
  },
  backButton: {
    position: 'absolute',
    top: RFPercentage(5),
    left: RFPercentage(3),
  },
  title: {
    fontSize: RFPercentage(4),
    fontWeight: 'bold',
    color: '#1D1D1D',
    marginTop: RFPercentage(8),
  },
  subtitle: {
    fontSize: RFPercentage(3),
    color: '#1D1D1D',
    marginBottom: RFPercentage(3),
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: RFPercentage(2),
  },
  avatar: {
    width: RFPercentage(18),
    height: RFPercentage(18),
    borderRadius: RFPercentage(9),
    backgroundColor: '#eee',
  },
  uploadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F68026',
    paddingVertical: RFPercentage(1),
    paddingHorizontal: RFPercentage(2),
    borderRadius: RFPercentage(1),
    marginTop: RFPercentage(1.5),
  },
  uploadText: {
    color: 'white',
    marginLeft: RFPercentage(1),
    fontSize: RFPercentage(1.8),
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E7E6E6',
    borderRadius: RFPercentage(1),
    paddingHorizontal: RFPercentage(2),
    marginVertical: RFPercentage(1),
    width: '100%',
  },
  input: {
    marginLeft: RFPercentage(1),
    fontSize: RFPercentage(2),
    paddingVertical: RFPercentage(1.5),
    flex: 1,
    color: '#333',
  },
  saveButton: {
    backgroundColor: '#294C3F',
    paddingVertical: RFPercentage(1.8),
    borderRadius: RFPercentage(1),
    width: '100%',
    alignItems: 'center',
    marginTop: RFPercentage(3),
  },
  saveText: {
    color: 'white',
    fontSize: RFPercentage(2),
    fontWeight: '600',
  },
});
