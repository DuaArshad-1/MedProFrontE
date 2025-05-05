import React, { use } from 'react';
import { ScrollView } from 'react-native';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import axiosInstance from '../config';
const products = [
  {
    id: '1',
    name: 'Paracetamol',
    price: '200',
    dosage: '5mg',
    image: require('../assets/medpro4.png'),
  },
  // Add more items if needed
];

const HomePage = () => {
  const navigation = useNavigation();
  const [selectedCategory, setSelectedCategory] = React.useState(null);
  const [products, setProducts] = useState([]);
  // const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  // const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  useEffect(() => {
    fetchProducts();
  }
  , []);
  const fetchProducts = async () => {
    try {
      const response = await axiosInstance.get('/medicines/'); // Adjust the endpoint as needed
      setProducts(response.data.medicines); // Adjust based on your API response structure
      // console.log('Products:', response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching products:', error);
      setLoading(false);
    }
  }
  const fetchCategories = async (name) => {
    try {
      const response = await axiosInstance.get(`/category/${name}`); // Adjust the endpoint as needed
      setCategories(response.data.categories); // Adjust based on your API response structure
      console.log('Categories:', response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  }

  const renderProduct = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('MedCard', { product: item })}
    >
      <Image source={require('../assets/medpro4.png')}style={styles.productImage}resizeMode="contain"/>
      
      <Text style={styles.productName}>{item.name}</Text>
      <Text style={styles.productPrice}>Rs. {item.variants[0].price}</Text>
      
      {item.variants.map((variant, index) => (
        <View key={index}>
          
          <View style={styles.dosageTag}>
            <Text style={styles.dosageText}>{variant.mg} mg</Text>
          </View>
        </View>
  ))}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#5E8370" />
      <View style={styles.topSection}>
        <Text style={styles.title}>MED PRO</Text>
        <Text style={styles.subtitle}>Recommended</Text>
        <View style={styles.searchContainer}>
          <TextInput style={styles.searchInput} placeholder="Search" />
          <TouchableOpacity onPress={() => navigation.navigate('Notifications')}>
            <Text style={styles.bellIcon}>🔔</Text>
          </TouchableOpacity>

        </View>
        <ScrollView
  horizontal
  showsHorizontalScrollIndicator={false}
  contentContainerStyle={styles.categories}
>
{[
  'General',
  'Fever',
  'General',
  'Dermatology',
  'Orthopedics',
  'AntiSeptics',
  'Pain Relief',
  'Cardiology',
  'Allergy',
  'Neurology',
  'Gastroenterology',
  'Vitamins',
  'ENT',
  'Psychotic',
  'Diabetes',
  'Pediatrics', 
].map((cat) => (
    <TouchableOpacity
      key={cat}
      style={[
        styles.categoryButton,
        selectedCategory === cat && styles.categoryButtonSelected,
      ]}
      onPress={() => fetchCategories(cat)}
    >
      <Text style={[
        styles.categoryText,
        selectedCategory === cat && styles.categoryTextSelected
      ]}>
        {cat}
      </Text>
    </TouchableOpacity>
  ))}
</ScrollView>

      </View>

      

      <FlatList
        data={products}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.productGrid}
        renderItem={renderProduct}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ADCBB6',
  },
  topSection: {
    backgroundColor: '#5E8370',
    padding: 16,
    paddingTop: 30,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1B1B1B',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: '#DFE5E0',
    textAlign: 'center',
    marginBottom: 10,
  },
  searchContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 12,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  searchInput: {
    flex: 1,
    paddingVertical: 8,
    fontSize: 16,
  },
  bellIcon: {
    fontSize: 18,
    marginLeft: 10,
  },
  categories: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
    gap: 6,
  },
  categoryText: {
    marginRight: 10,
    color: '#fff',
    fontWeight: 'bold',
  },

  categoryTextSelected: {
    color: '#2E4F3D', // selected text color
  },
  
  productGrid: {
    padding: 16,
  },
  card: {
    backgroundColor: '#E0E0E0',
    borderRadius: 16,
    padding: 10,
    width: '48%',
    marginBottom: 16,
    alignItems: 'center',
  },
  productImage: {
    width: 90,
    height: 90,
    resizeMode: 'contain',
    marginBottom: 8,
  },
  productName: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  productPrice: {
    fontSize: 14,
    marginBottom: 6,
  },
  dosageTag: {
    backgroundColor: 'orange',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  dosageText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 12,
  },
});

export default HomePage;
