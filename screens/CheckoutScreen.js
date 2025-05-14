import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, SafeAreaView, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axiosInstance from '../config';
import Constants from 'expo-constants';
import { Alert } from 'react-native';

const statusBarHeight = Constants.statusBarHeight;
// import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';
const Checkout = () => {
  const route = useRoute();

  const [user, setUser] = useState(null);
  const navigation = useNavigation();
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        // Simulate a delay like a real request
        token = await AsyncStorage.getItem('token');
        
        const data=await axiosInstance.get('/users/Profile', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });    
        // console.log('User:', data.data.address);  
        setUser(data.data);
        setAddress(data.data.address[0]);
      } catch (err) {
        // console.error('Error fetching profile:', err);
        Alert.alert('Error', 'Failed to fetch profile. Please try again.');
      }
    };
  
    fetchProfile();
  }, []);
  // Get the passed parameters
  const { cartItems, id, name, dosage, price, quantity, total ,singleItem} = route.params || {};

  // State for address and payment method
  const [address, setAddress] = useState(''); // Default to user's address if available
  const [paymentMethod, setPaymentMethod] = useState('Credit Card');

  if (!cartItems && (!name || !dosage || !price || !quantity)) {
    return (
      <View style={styles.center}>
        <Text>Invalid checkout details.</Text>
      </View>
    );
  }

  const handlePlaceOrder = async() => {
    try{
      const token = await AsyncStorage.getItem('token');
      const med={ id, dosage, quantity };
      // console.log('Medicine:', med);
      const res= await axiosInstance.post('/orders/', {
        medicines: cartItems?.medicines || [med],
        deliveryAddress: address,
        paymentMethod,
        shouldEmptyCart: !singleItem,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // console.log('Order response:', res.data);
    

      alert('Order placed successfully!');
      navigation.navigate('Main', {screen:'Home'}); 
    }
    catch(err){
      console.error('Error placing order:', err);
      // alert('Failed to place order. Please try again.');
      Alert.alert('Error', 'Failed to place order. Please try again.');
    }
  };

  const renderItem = ({ item }) => (
    <View>
      <Text style={styles.itemDetail}>Medicine: {item.name}</Text>
      <Text style={styles.itemDetail}>Dosage: {item.dose} mg</Text>
      <Text style={styles.itemDetail}>Price: Rs. {item.price}</Text>
      <Text style={styles.itemDetail}>Quantity: {item.quantity}</Text>
      <Text style={styles.itemDetail}>Total Price: Rs. {item.price * item.quantity}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Checkout</Text>

        {/* Order Summary with background */}
        <View style={styles.orderSummary}>
          <Text style={styles.orderTitle}>Order Summary</Text>

          {/* If cartItems exists, show them as a list */}

          {cartItems ? (
            <FlatList
              data={cartItems}
              renderItem={renderItem}
              keyExtractor={(item) => item.id}
            />
          ) : (
            // If single item (Buy Now) is passed, show its details
            <>
              <Text style={styles.itemDetail}>Medicine: {name}</Text>
              <Text style={styles.itemDetail}>Dosage: {dosage} mg</Text>
              <Text style={styles.itemDetail}>Price: Rs. {price}</Text>
              <Text style={styles.itemDetail}>Quantity: {quantity}</Text>
              <Text style={styles.itemDetail}>Total Price: Rs. {price * quantity}</Text>
            </>
          )}
        </View>
      <ScrollView contentContainerStyle={styles.content}>

        {/* Editable Address Field */}
        <TextInput
          style={styles.input}
          placeholder="Enter your address"
          value={address}
          onChangeText={setAddress}
        />

        {/* Payment Method Selector */}
        <View style={styles.paymentMethodContainer}>
          <Text style={styles.paymentLabel}>Payment Method:</Text>
          {/* <TouchableOpacity
            style={[
              styles.paymentMethodBtn,
              paymentMethod === 'Credit Card' && styles.selectedPayment,
            ]}
            onPress={() => setPaymentMethod('Credit Card')}
          >
            <Text style={styles.paymentText}>Credit Card</Text>
          </TouchableOpacity> */}
          <TouchableOpacity
            style={[
              styles.paymentMethodBtn,
              paymentMethod === 'Cash on Delivery' && styles.selectedPayment,
            ]}
            onPress={() => setPaymentMethod('Cash on Delivery')}
          >
            <Text style={styles.paymentText}>Cash on Delivery</Text>
          </TouchableOpacity>
        </View>

        {/* Place Order Button */}
        <TouchableOpacity style={styles.button} onPress={handlePlaceOrder}>
          <Text style={styles.buttonText}>Place Order</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ADCBB6',
    padding: 20,
    paddingTop: statusBarHeight + 20, // Add padding for the status bar
  },
  content: {
    alignItems: 'center',
    paddingBottom: 20, // To add some space at the bottom when scrolling
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    alignContent: 'center',
    textAlign: 'center',
  },
  orderSummary: {
    backgroundColor: '#f1f1f1', // Light background for order summary
    padding: 20,
    marginBottom: 20,
    borderRadius: 12,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  orderTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  itemDetail: {
    fontSize: 18,
    marginVertical: 5,
    color: '#333',
  },
  input: {
    width: '100%',
    padding: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 20,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  paymentMethodContainer: {
    width: '100%',
    marginBottom: 20,
  },
  paymentLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  paymentMethodBtn: {
    backgroundColor: '#f0f0f0',
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
    width: '100%',
    alignItems: 'center',
  },
  selectedPayment: {
    backgroundColor: '#5E8370',
  },
  paymentText: {
    fontSize: 16,
    color: '#333',
  },
  button: {
    backgroundColor: '#2E4F3D',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 12,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Checkout;