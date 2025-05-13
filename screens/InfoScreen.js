import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
const { width, height } = Dimensions.get('window');
import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';
import userImage from '../assets/users.jpg';
import Constants from 'expo-constants';
import { Alert } from 'react-native';

const statusBarHeight = Constants.statusBarHeight;
const InfoScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const user = route.params.user;
  // console.log('User:', user);

  return (
    <View style={{ flex: 1, backgroundColor: '#b1c9bb', paddingTop: statusBarHeight }}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginBottom: 10, marginTop: 20, marginLeft: 5 }}>
        <Ionicons name="arrow-back" size={28} color="#333" />
      </TouchableOpacity>

      <View style={styles.container}>
        <View style={styles.headerCard}>
          <View style={styles.profileImageContainer}>
            <Image source={userImage} style={styles.avatar} />
            <TouchableOpacity style={styles.editIcon}>
              <Ionicons name="create-outline" size={18} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>

        {/* User Info */}
        <View style={styles.infoContainer}>
          
          <Text style={styles.label}>Username:</Text>
          <Text style={styles.value}>{user.name}</Text>

          <Text style={styles.label}>Phone:</Text>
          <Text style={styles.value}>{user.phone}</Text>

          <Text style={styles.label}>Email:</Text>
          <Text style={styles.value}>{user.email}</Text>

          <Text style={styles.label}>Address:</Text>
          {user.address?<Text style={styles.value}>{user.address}</Text>:<Text style={styles.value}>No address provided. Edit Profile to add address</Text>}
        </View>

        <TouchableOpacity style={styles.editProfileButton} onPress={() => navigation.navigate('EditProfile',{user})}>
          <Text style={styles.editProfileButtonText}>Edit Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10, paddingTop: statusBarHeight + 10, backgroundColor: '#b1c9bb' },

  headerCard: {
    backgroundColor: '#1e3d36',
    height: height * 0.24,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: -5,
    position: 'relative',
  },

  profileImageContainer: {
    width: width * 0.3333333333,
    height: width * 0.33333333333,
    borderRadius: width * 0.165,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    position: 'absolute',
    top: '50%',
    transform: [{ translateY: -width * 0.15 }],
    borderWidth: 2,
    borderColor: '#1e4d36',
  },

  avatar: { width: '96%', height: '96%', borderRadius: width * 0.1667 },

  editIcon: {
    position: 'absolute',
    bottom: 4,
    right: 4,
    backgroundColor: '#FFA509',
    padding: 6,
    borderRadius: 20,
  },

  name: {
    fontSize: width * 0.06,
    fontWeight: 'bold',
    color: '#1e3d38',
    marginTop: height * 0.015,
  },

  infoContainer: {
    width: '85%',
    backgroundColor: '#e7f2ed',
    borderRadius: 15,
    alignSelf: 'center',
    padding: width * 0.05,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 3,
    marginTop: 30,
  },

  label: {
    fontSize: width * 0.045,
    fontWeight: '600',
    color: '#2c5c51',
    marginTop: height * 0.015,
  },

  value: {
    fontSize: width * 0.042,
    color: '#333',
    marginTop: height * 0.005,
  },

  editProfileButton: {
    marginTop: height * 0.03,
    backgroundColor: '#1e3d36',
    paddingVertical: height * 0.015,
    paddingHorizontal: width * 0.2,
    borderRadius: 25,
  },

  editProfileButtonText: {
    color: '#fff',
    fontSize: width * 0.045,
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default InfoScreen;