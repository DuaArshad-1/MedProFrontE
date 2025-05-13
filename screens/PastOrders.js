import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Ionicons, Feather, FontAwesome5, MaterialIcons, Entypo } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axiosInstance from '../config';
import { useEffect } from 'react';
import { useRoute } from '@react-navigation/native';
import Constants from 'expo-constants';
import { Alert } from 'react-native';

const statusBarHeight = Constants.statusBarHeight;
const PastOrders = () => {
  const navigation = useNavigation();
  const [POrders, setPOrders] = useState([]);
  const [orders, setOrders] = useState([]);
  const hasFetchedPast = useRef(false);
  const fetchDeliveryStatus = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      
      orders.map(async(order)=>{
        const orderId = order._id;
        const res = await axiosInstance.get('/delivery/status', {
          params: {
            orderId
          },
          headers: {
            Authorization: `Bearer ${token}`,
          }
        });
        if (res.data === "delivered"){
          setPOrders((prev) => [...prev, order]); 
        }
      }
      )
    } catch (error) {
      // console.error('Error fetching delivery status:', error);
      Alert.alert('Error', 'Failed to fetch delivery status. Please try again later.');
    }
  }
  const fetchOrders = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const response = await axiosInstance.get('/orders/orders', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setOrders(response.data);
    } catch (error) {
      // console.error('Error fetching orders:', error);
      Alert.alert('Error', 'Failed to load orders. Please try again later.');
    }
  }
  useEffect(() => {
    fetchOrders();
  }, []);
  useEffect(() => {
    if (orders.length > 0 && !hasFetchedPast.current) {
      fetchDeliveryStatus();
      hasFetchedPast.current = true; // Prevent future runs
    }
  }, [orders]);
  const renderOrder = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('DeliveryDetails',{item})}
    >
      <View style={styles.cardHeader}>
        <Text style={styles.orderNumber}>{item.deliveryAddress}</Text>
        
      </View>
      <Text style={styles.dateText}>Payment Status: {item.paymentStatus}</Text>
      <Text style={styles.dateText}>Ordered: {item.orderDate}</Text>
      <Text style={styles.dateText}>No. of Medicines: {item.medicines.length}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
         <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginBottom: 10 }}>
      <Ionicons name="arrow-back" size={28} color="#333" />
    </TouchableOpacity>
      <Text style={styles.header}>MED PRO</Text>
      <Text style={styles.subheader}>Past Orders</Text>
        {POrders.length === 0 && (
        <Text style={{ textAlign: 'center', marginTop: 20, fontSize: 16 }}>
          No past orders found.
        </Text>
      )}
      <FlatList
        data={POrders}
        renderItem={renderOrder}
        keyExtractor={(item) => item._id}
        contentContainerStyle={{ paddingBottom: 100 }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#8DA397',
    paddingHorizontal: 20,
    paddingTop: statusBarHeight + 10,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    alignSelf: 'center',
    color: '#1E1E1E',
  },
  subheader: {
    fontSize: 18,
    fontWeight: '600',
    alignSelf: 'center',
    marginBottom: 20,
    color: '#3C5748',
  },
  card: {
    backgroundColor: '#A7B9AC',
    padding: 15,
    borderRadius: 15,
    marginBottom: 15,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  orderNumber: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#333',
  },
  paymentMethod: {
    fontStyle: 'italic',
    color: '#444',
  },
  dateText: {
    fontSize: 13,
    color: '#222',
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#D5E1DB',
    paddingVertical: 10,
    borderRadius: 20,
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
  },
});

export default PastOrders;
