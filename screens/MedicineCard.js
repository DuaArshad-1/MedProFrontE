import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Ionicons, Feather, FontAwesome5, MaterialIcons, Entypo } from '@expo/vector-icons';
import axiosInstance from '../config';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MedCard = () => {
  
  const route = useRoute();
  const navigation = useNavigation();
  const { product } = route.params || {};
  // console.log('Product:', product.description);
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <View style={styles.center}>
        <Text>Medicine details not available.</Text>
      </View>
    );
  }
  const addToCart = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const variantIndex = 0; // change this later if user can select different variants
  
      const res = await axiosInstance.post(
        '/cart/',
        {
          medicineId: product._id,
          quantity,
          variantIndex,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      alert('Item added to cart');
      navigation.navigate("Main",{screen:'Cart'}); // optional
    } catch (error) {
      console.error('Add to cart error:', error?.response?.data || error.message);
      alert('Failed to add to cart');
    }
  };
  
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#5E8370" />
      <View style={styles.topSection}>
        {/* <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity> */}
    <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginBottom: 115,marginLeft:-300 }}>
      <Ionicons name="arrow-back" size={28} color="#333" />
    </TouchableOpacity>
        <Text style={styles.title}>MED PRO</Text>
        <Text style={styles.subtitle}>Med Description</Text>
      </View>

      <View style={styles.content}>
        <Image source={product.image} style={styles.image} resizeMode="contain" />

        <Text style={styles.price}>Rs. {product.variants[0].price}</Text>
        <Text style={styles.name}>{product.name}</Text>
        <Text style={styles.description}>
          {product.description}
        </Text>

        {product.variants.map((variant, index) => (
                <View key={index}>
                  
                  <View style={styles.dosageTag}>
                    <Text style={styles.dosageText}>{variant.mg} mg</Text>
                  </View>
                </View>
        ))}

        <View style={styles.quantitySelector}>
          <TouchableOpacity onPress={() => setQuantity(Math.max(1, quantity - 1))}>
            <Text style={styles.adjustBtn}>-</Text>
          </TouchableOpacity>
          <Text style={styles.quantityText}>{quantity}</Text>
          <TouchableOpacity onPress={() => setQuantity(quantity + 1)}>
            <Text style={styles.adjustBtn}>+</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.buttonRow}>
        <TouchableOpacity
  style={styles.button}
  onPress={() => navigation.navigate('Checkout')}
>
  <Text style={styles.buttonText}>Buy Now</Text>
</TouchableOpacity>

<TouchableOpacity
  style={styles.button}
  onPress={addToCart}
>
  <Text style={styles.buttonText}>Add to Cart</Text>
</TouchableOpacity>

        </View>
      </View>
    </SafeAreaView>
  );
};

export default MedCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ADCBB6',
  },
  topSection: {
    backgroundColor: '#5E8370',
    padding: 20,
    alignItems: 'center',
  },
  backArrow: {
    position: 'left',
    left: -150,
    top: 20,
    fontSize: 22,
    color: '#fff',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1B1B1B',
  },
  subtitle: {
    fontSize: 18,
    color: '#DFE5E0',
    marginTop: 4,
  },
  content: {
    padding: 20,
    alignItems: 'center',
  },
  image: {
    width: 180,
    height: 150,
    marginBottom: 20,
    borderRadius: 12,
    backgroundColor: '#fff',
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    marginVertical: 6,
  },
  description: {
    textAlign: 'center',
    color: '#444',
    marginBottom: 20,
  },
  dosageContainer: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 20,
  },
  dosageTag: {
    backgroundColor: 'orange',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  dosageText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  quantitySelector: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 20,
  },
  adjustBtn: {
    fontSize: 22,
    backgroundColor: '#5E8370',
    color: '#fff',
    width: 30,
    textAlign: 'center',
    borderRadius: 6,
  },
  quantityText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 16,
    marginTop: 10,
  },
  button: {
    backgroundColor: '#2E4F3D',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 12,
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
