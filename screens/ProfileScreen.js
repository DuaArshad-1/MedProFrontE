import React, { useEffect, useState } from 'react';
import {
  View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, Dimensions, Modal, TouchableWithoutFeedback, Animated
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import axios from 'axios';
import { Ionicons, Feather, FontAwesome5, MaterialIcons, Entypo } from '@expo/vector-icons';
// import { BASE_URL } from '../config'; // adjust this path if needed

const { width, height } = Dimensions.get('window');

const ProfileScreen = ({ navigation }) => {
  const [user, setUser] = useState(null);
  const [ordersVisible, setOrdersVisible] = useState(false);
  const [settingsVisible, setSettingsVisible] = useState(false);

  const slideAnim = useState(new Animated.Value(height))[0];

  // useEffect(() => {
  //   const fetchProfile = async () => {
  //     try {
  //       const token = await AsyncStorage.getItem('token');
  //       const res = await axios.get(`${BASE_URL}/users/getProfile`, {
  //         headers: {
  //           Authorization: `Bearer ${token}`
  //         }
  //       });
  //       setUser(res.data);
  //     } catch (err) {
  //       console.error('Error fetching profile:', err);
  //     }
  //   };

  //   fetchProfile();
  // }, []);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        // Simulate a delay like a real request
        await new Promise(resolve => setTimeout(resolve, 1000));
  
        // Fake user data
        const fakeUser = {
          name: 'Jane Doe',
          email: 'jane@example.com',
          phone: '9876543210'
        };
  
        setUser(fakeUser);
      } catch (err) {
        console.error('Error fetching profile:', err);
      }
    };
  
    fetchProfile();
  }, []);
  

//   const handleLogout = async () => {
//     await AsyncStorage.clear();
//     navigation.replace('Login');
//   };

//   if (!user) {
//     return (
//       <View style={styles.loadingContainer}>
//         <Text style={styles.loadingText}>Loading profile...</Text>
//       </View>
//     );
//   }

//   return (
//     <ScrollView style={styles.container}>
//       <TouchableOpacity onPress={() => navigation.goBack()}>
//         <Ionicons name="arrow-back" size={28} color="#333" />
//       </TouchableOpacity>

//       <View style={styles.profileHeader}>
//         <Image
//           source={require('../assets/icon.png')} // make sure this file exists
//           style={styles.avatar}
//         />
//         <Text style={styles.name}>{user.name || 'User Name'}</Text>
//         <Text style={styles.email}>{user.email}</Text>
//       </View>

//       <View style={styles.details}>
//         <Text style={styles.detailText}>Phone: {user.phone}</Text>
//         {/* Add any other fields here */}
//       </View>

//       <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
//         <Text style={styles.logoutText}>Log Out</Text>
//       </TouchableOpacity>
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: { flex: 1, padding: 20, backgroundColor: '#f2f2f2' },
//   loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
//   loadingText: { fontSize: 16, color: '#888' },
//   profileHeader: { alignItems: 'center', marginVertical: 20 },
//   avatar: { width: 100, height: 100, borderRadius: 50, marginBottom: 10 },
//   name: { fontSize: 20, fontWeight: 'bold', color: '#333' },
//   email: { fontSize: 16, color: '#666' },
//   details: { marginTop: 20 },
//   detailText: { fontSize: 16, marginBottom: 10 },
//   logoutButton: {
//     marginTop: 30,
//     backgroundColor: '#d9534f',
//     padding: 15,
//     borderRadius: 8,
//     alignItems: 'center',
//   },
//   logoutText: { color: '#fff', fontSize: 16 },
// });

// export default ProfileScreen;

const profileOptions = [
  { label: 'Info', icon: <Ionicons name="information-circle-outline" size={20} />, screen: 'Info' },
  { label: 'Settings', icon: <Feather name="settings" size={20} />, screen: null },
  { label: 'My Orders', icon: <Feather name="file-text" size={20} />, screen: null },
  { label: 'Help Center', icon: <Ionicons name="help-circle-outline" size={20} />, screen: 'Help' },
  { label: 'My Reviews', icon: <FontAwesome5 name="star-half-alt" size={18} />, screen: 'Reviews' },
  { label: 'Contact Us', icon: <MaterialIcons name="contact-mail" size={20} />, screen: 'Contact' },
  // { label: 'Edit Profile', icon: <MaterialIcons name="edit-attributes" size={20} />, screen: 'EditProfile' },

];
const orderOptions = [
  { label: '    To Review', icon: <FontAwesome5 name="check" size={20} />, screen: 'Reviews' },
  // { label: 'To Pay', icon: <Feather name="credit-card" size={20} />, screen: 'Info' },
  { label: '   Past Orders', icon: <FontAwesome5 name="history" size={20} />, screen: 'PendingOrders' },
  { label: ' Pending Orders', icon: <FontAwesome5 name="shipping-fast" size={20} />, screen: 'PendingOrders' },
  { label: '   Cart', icon: <Feather name="shopping-cart" size={20} />, screen: 'Cart' }
];
const settingsOptions = [
  { label: 'Edit Profile', icon: <MaterialIcons name="edit-attributes" size={20} />, screen: 'EditProfile' },
];

const openOrders = () => {
  setOrdersVisible(true);
  Animated.timing(slideAnim, {
    toValue: height * 0.25,
    duration: 300,
    useNativeDriver: false
  }).start();
};
  const openSettings = () => {
    setSettingsVisible(true);
    Animated.timing(slideAnim, {
      toValue: height *.5,
      duration: 300,
      useNativeDriver: false
    }).start();
};
const closeSettings = () => {
  Animated.timing(slideAnim, {
    toValue: height,
    duration: 300,
    useNativeDriver: false
  }).start(() => setSettingsVisible(false));
};


const closeOrders = () => {
  Animated.timing(slideAnim, {
    toValue: height,
    duration: 300,
    useNativeDriver: false
  }).start(() => setOrdersVisible(false));
};

return (
  <View style={{ flex: 1, backgroundColor: '#b1c9bb' }}>
  <ScrollView style={styles.container}>
    <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginBottom: 10 }}>
      <Ionicons name="arrow-back" size={28} color="#333" />
    </TouchableOpacity>

    <Text style={styles.title}>MED PRO</Text>
    <Text style={styles.subtitle}>Profile</Text>
    <View style={styles.headerCard}>
      <View style={styles.profileImageContainer}>
        <Image
          source={require('../assets/users.jpg')}
          style={styles.avatar}
        />
        <TouchableOpacity style={styles.editIcon}>
          <Ionicons name="create-outline" size={18} color="#fff" />
        </TouchableOpacity>
      </View>
</View>

<View style={styles.optionsList}>
          {profileOptions.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.optionButton}
              onPress={() => {
                if (item.label === 'My Orders') {
                  openOrders();
                } else if (item.label === 'Settings') {
                  openSettings();
                } else {
                  navigation.navigate(item.screen);
                }
              }}
            >
              <View style={styles.iconContainer}>{item.icon}</View>
              <Text style={styles.optionLabel}>{item.label}</Text>
              <Feather name="chevron-right" size={20} color="#777" />
            </TouchableOpacity>
      ))}
    </View>
  </ScrollView>

  <Modal
    transparent
    animationType="fade"
    visible={ordersVisible}
    onRequestClose={closeOrders}
  >
      <TouchableWithoutFeedback onPress={closeOrders}>
        <View style={styles.modalOverlay} />
      </TouchableWithoutFeedback>
      <Animated.View style={[styles.modalContainer, { top: slideAnim }]}>
        {orderOptions.map((order, idx) => (
          <TouchableOpacity
            key={idx}
            style={styles.modalButton}
            onPress={() => {
              closeOrders();
              navigation.navigate(order.screen);
            }}
          >
            {/* <Entypo name={order.icon} size={20} color="#333" style={{ marginRight: 10 }} /> */}
            {order.icon}

            <Text style={styles.modalText}>{order.label}</Text>
            <Feather name="chevron-right" size={20} color="#777" style={{ marginLeft: 'auto' }} />
          </TouchableOpacity>
        ))}
      </Animated.View>
    </Modal>

<Modal
  transparent
  animationType="fade"
  visible={settingsVisible}
  onRequestClose={closeSettings}
>
  <TouchableWithoutFeedback onPress={closeSettings}>
    <View style={styles.modalOverlay} />
  </TouchableWithoutFeedback>
  <Animated.View style={[styles.modalContainer, { top: slideAnim }]}>
    {settingsOptions.map((setting, idx) => (
      <TouchableOpacity
        key={idx}
        style={styles.modalButton}
        onPress={() => {
          closeSettings();
          navigation.navigate(setting.screen);
        }}
      >
        {setting.icon}
        <Text style={styles.modalText}>{setting.label}</Text>
        <Feather name="chevron-right" size={20} color="#777" style={{ marginLeft: 'auto' }} />
      </TouchableOpacity>
    ))}
  </Animated.View>
</Modal>

  </View>

  );
};

// const styles = StyleSheet.create({
// container: { flex: 1, backgroundColor: '#b1c9bb', padding: 20 },
// loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
// loadingText: { fontSize: 16, color: '#888' },
// title: { fontSize: 34, fontWeight: 'bold', textAlign: 'center', color: '#2e4d3d' },
// subtitle: { fontSize: 20, textAlign: 'center', marginBottom: 20, color: '#2e4d3d' },

// headerCard: {
//   backgroundColor: '#1e3d36',
//   height: 140,
//   borderRadius: 20,
//   justifyContent: 'center',
//   alignItems: 'center',
//   marginTop: 20,
//   marginBottom: 50,
//   position: 'relative',
// },

// profileImageContainer: {
//   width: 110,
//   height: 110,
//   borderRadius: 55,
//   backgroundColor: '#fff',
//   justifyContent: 'center',
//   alignItems: 'center',
//   overflow: 'hidden',
//   position: 'absolute',
//   top: '50%',
//   transform: [{ translateY: -55 }],
//   borderWidth: 2,
//   borderColor: '#1e3d36',
// },

// avatar: {
//   width: 100,
//   height: 100,
//   borderRadius: 50,
// },

// editIcon: {
//   position: 'absolute',
//   bottom: 4,
//   right: 4,
//   backgroundColor: '#1e3d36',
//   padding: 4,
//   borderRadius: 12,
// },



// optionsList: {
//   marginTop: 60,
// },
// optionButton: {
//   backgroundColor: '#e6e9e8',
//   flexDirection: 'row',
//   alignItems: 'center',
//   paddingVertical: 14,
//   paddingHorizontal: 20,
//   borderRadius: 12,
//   marginBottom: 12
// },
// iconContainer: {
//   width: 30,
//   alignItems: 'center'
// },
// optionLabel: {
//   flex: 1,
//   marginLeft: 10,
//   fontSize: 16,
//   color: '#333'
// }
// });

const styles = StyleSheet.create({
  container: { flex: 1, padding: width * 0.05 },
  title: { fontSize: width * 0.08, fontWeight: 'bold', textAlign: 'center', color: '#2e4d3d' },
  subtitle: { fontSize: width * 0.05, textAlign: 'center', marginBottom: 20, color: '#2e4d3d' },
  headerCard: {
    backgroundColor: '#1e3d36', height: height * 0.19, borderRadius: 20,
    justifyContent: 'center', alignItems: 'center', marginTop: 20, marginBottom: -5, position: 'relative'
  },
  profileImageContainer: {
    width: width * 0.3, height: width * 0.3, borderRadius: width * 0.15,
    backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center', overflow: 'hidden',
    position: 'absolute', top: '50%', transform: [{ translateY: -width * 0.15 }],
    borderWidth: 2, borderColor: '#1e3d36'
  },
  avatar: { width: '90%', height: '90%', borderRadius: 999 },
  editIcon: {
    position: 'absolute', bottom: 4, right: 4,
    backgroundColor: '#FFA509', padding: 6, borderRadius: 20,
  },
  optionsList: { marginTop: 60 },
  optionButton: {
    backgroundColor: '#e6e9e8', flexDirection: 'row', alignItems: 'center',
    paddingVertical: height * 0.018, paddingHorizontal: width * 0.05,
    borderRadius: 12, marginBottom: 12
  },
  iconContainer: { width: 30, alignItems: 'center' },
  optionLabel: { flex: 1, marginLeft: 10, fontSize: 16, color: '#333' },
  modalOverlay: {
    position: 'absolute', top: 0, bottom: 0, left: 0, right: 0,
    backgroundColor: 'rgba(33, 23, 41, 0.5)'
  },

  modalContainer: {
    position: 'absolute',
    width: '100%',
    backgroundColor: '#b1c9bb', // same as option buttons
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 10,
  },
  
  modalButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  
  modalText: {
    fontSize: 16,
    color: '#333',
  }
  
});
export default ProfileScreen;
