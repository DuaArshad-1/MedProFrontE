import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Ionicons, Feather, FontAwesome5, MaterialIcons, Entypo } from '@expo/vector-icons';

const orders = [
  {
    id: '1',
    orderNumber: 'ORD12345',
    paymentMethod: 'Cash on Delivery',
    orderDate: 'Apr 28, 2025',
    expectedDelivery: 'May 3, 2025',
  },
  {
    id: '2',
    orderNumber: 'ORD67890',
    paymentMethod: 'Credit Card',
    orderDate: 'Apr 26, 2025',
    expectedDelivery: 'May 1, 2025',
  },
  {
    id: '3',
    orderNumber: 'ORD11223',
    paymentMethod: 'Online Payment',
    orderDate: 'Apr 25, 2025',
    expectedDelivery: 'Apr 30, 2025',
  },
];

const PendingOrders = () => {
  const navigation = useNavigation();

  const renderOrder = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('DeliveryDetails')}
    >
      <View style={styles.cardHeader}>
        <Text style={styles.orderNumber}>{item.orderNumber}</Text>
        <Text style={styles.paymentMethod}>{item.paymentMethod}</Text>
      </View>
      <Text style={styles.dateText}>Ordered: {item.orderDate}</Text>
      <Text style={styles.dateText}>Expected: {item.expectedDelivery}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
         <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginBottom: 10 }}>
      <Ionicons name="arrow-back" size={28} color="#333" />
    </TouchableOpacity>
      <Text style={styles.header}>MED PRO</Text>
      <Text style={styles.subheader}>Pending Orders</Text>

      <FlatList
        data={orders}
        renderItem={renderOrder}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 100 }}
      />

      {/* Bottom Nav */}
      {/* <View style={styles.bottomNav}>
        <TouchableOpacity><Icon name="home-outline" size={24} /></TouchableOpacity>
        <TouchableOpacity><Icon name="call-outline" size={24} /></TouchableOpacity>
        <TouchableOpacity><Icon name="camera-outline" size={24} /></TouchableOpacity>
        <TouchableOpacity><Icon name="cart-outline" size={24} /></TouchableOpacity>
        <TouchableOpacity><Icon name="person-outline" size={24} /></TouchableOpacity>
      </View> */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#8DA397',
    paddingHorizontal: 20,
    paddingTop: 50,
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

export default PendingOrders;
