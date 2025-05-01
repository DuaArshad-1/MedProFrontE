import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
// import BottomTabs from '../screens/BottomTabs'; // your consistent bottom bar
import axios from 'axios';
import MedImage from '../assets/medpro4.png'; 


const CartScreen = () => {
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);
  const navigation = useNavigation();

  const token = 'your-jwt-token-here'; // replace with your auth context or prop

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    // try {
    //   const res = await axios.get('http://localhost:3000/users/getCart', {
    //     headers: { Authorization: `Bearer ${token}` },
    //   });
    //   setCartItems(res.data.items);
    //   calculateTotal(res.data.items);
    // } catch (error) {
    //   console.error(error);
    // }
    const Item = [
      {
        _id: '1',
        name: 'Paracetamol',
        price: 50,
        quantity: 2,
        image: MedImage, // dummy image
      },
      {
        _id: '2',
        name: 'Ibuprofen',
        price: 80,
        quantity: 1,
        image: MedImage,
      },
    ];
    setCartItems(Item);
    calculateTotal(Item);
  

  };

  const updateQuantity = async (itemId, quantity) => {
    // try {
    //   const res = await axios.put(
    //     `http://your-server/cart/${itemId}`,
    //     { quantity },
    //     { headers: { Authorization: `Bearer ${token}` } }
    //   );
    //   fetchCart();
    // } catch (err) {
    //   console.error(err);
    // }
    if (quantity < 1) return; // Prevent quantity going below 1

    const updatedCart = cartItems.map(item => 
      item._id === itemId ? { ...item, quantity } : item
    );
    setCartItems(updatedCart);
    calculateTotal(updatedCart);
  };

  const calculateTotal = (items) => {
    const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
    setTotal(total);
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image source={item.image} style={styles.image} />
      <View style={styles.details}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.price}>Rs. {item.price}</Text>
        <Text style={styles.dose}>5mg</Text>
        <View style={styles.quantityRow}>
          <TouchableOpacity onPress={() => updateQuantity(item._id, item.quantity - 1)}>
            <Ionicons name="remove-circle-outline" size={24} />
          </TouchableOpacity>
          <Text style={styles.qty}>{item.quantity}</Text>
          <TouchableOpacity onPress={() => updateQuantity(item._id, item.quantity + 1)}>
            <Ionicons name="add-circle-outline" size={24} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>MED PRO</Text>
      <Text style={styles.cartLabel}>Cart</Text>
      <FlatList
        data={cartItems}
        keyExtractor={(item) => item._id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 100 }}
      />
      <View style={styles.checkoutContainer}>
        <Text style={styles.total}>Total: Rs.{total}</Text>
        <TouchableOpacity
  style={styles.checkoutButton}
  onPress={() => navigation.navigate('Checkout')}
>
  <Text style={styles.checkoutText}>Checkout</Text>
</TouchableOpacity>

      </View>
      {/* <BottomTabs /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#a2b1a8', padding: 10 },
  title: { fontSize: 20, fontWeight: 'bold', textAlign: 'center', marginTop: 20 },
  cartLabel: { fontSize: 18, textAlign: 'center', marginBottom: 10 },
  card: {
    flexDirection: 'row',
    backgroundColor: '#e1e5e3',
    borderRadius: 15,
    padding: 10,
    marginVertical: 5,
    alignItems: 'center',
  },
  image: { width: 60, height: 60, borderRadius: 10 },
  details: { marginLeft: 10, flex: 1 },
  name: { fontWeight: 'bold', fontSize: 16 },
  price: { fontSize: 14 },
  dose: { fontSize: 12, color: 'orange', backgroundColor: '#fff7e5', padding: 2, borderRadius: 4, width: 40, textAlign: 'center' },
  quantityRow: { flexDirection: 'row', alignItems: 'center', marginTop: 5 },
  qty: { marginHorizontal: 10, fontSize: 16 },
  checkoutContainer: { position: 'absolute', bottom: 70, width: '100%', padding: 10, backgroundColor: '#a2b1a8' },
  total: { fontSize: 18, fontWeight: 'bold', marginBottom: 10, textAlign: 'right' },
  checkoutButton: {
    backgroundColor: '#345c45',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  checkoutText: { color: 'white', fontSize: 16 },
});

export default CartScreen;
