
import React, { useEffect, useState } from 'react';
import { ScrollView, View, Text, FlatList, Image, TouchableOpacity, TextInput, StyleSheet, SafeAreaView, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axiosInstance from '../config';

const HomePage = () => {
  const navigation = useNavigation();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axiosInstance.get('/medicines/');
      setProducts(response.data.medicines);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const fetchCategories = async (name) => {
    try {
      const response = await axiosInstance.get(`/category?name=${name}`);
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleSearch = async (text) => {
    setSearchQuery(text);
    if (text) {
      try {
        const response = await axiosInstance.get(`medicines/search?name=${text}`);
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
        setProducts([]);
      }
    } else {
      fetchProducts();
    }
  };

  const renderProduct = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('MedCard', { product: item })}
    >
      <Image source={require('../assets/medpro4.png')} style={styles.productImage} resizeMode="contain" />
      <Text style={styles.productName}>{item.name}</Text>
      <Text style={styles.productPrice}>Rs. {item.variants[0].price}</Text>

      <View style={styles.dosageRow}>
        {item.variants.map((variant, index) => (
          <View key={index} style={styles.dosageTag}>
            <Text style={styles.dosageText}>{variant.mg} mg</Text>
          </View>
        ))}
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#5E8370" />
      <View style={styles.topSection}>
        <Text style={styles.title}>MED PRO</Text>
        <Text style={styles.subtitle}>Recommended</Text>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search"
            value={searchQuery}
            onChangeText={handleSearch}
          />
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
            'General', 'Painkiller', 'Fever', 'Dermatology', 'Orthopedics',
            'AntiSeptics', 'Pain Relief', 'Cardiology', 'Allergy', 'Neurology',
            'Gastroenterology', 'Vitamins', 'ENT', 'Psychotic', 'Diabetes', 'Pediatrics',
          ].map((cat) => (
            <TouchableOpacity
              key={cat}
              style={[
                styles.categoryButton,
                selectedCategory === cat && styles.categoryButtonSelected,
              ]}
              onPress={() => {
                setSelectedCategory(cat);
                if (cat !== 'General') fetchCategories(cat);
              }}
            >
              <Text
                style={[
                  styles.categoryText,
                  selectedCategory === cat && styles.categoryTextSelected,
                ]}
              >
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
        keyExtractor={(item) => item._id}
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
  categoryButton: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    backgroundColor: '#6B8D79',
    borderRadius: 12,
  },
  categoryButtonSelected: {
    backgroundColor: '#B8DBCB',
  },
  categoryText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  categoryTextSelected: {
    color: '#2E4F3D',
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
  dosageRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 6, // Use margin if gap is not supported
    marginTop: 6,
  },
  dosageTag: {
    backgroundColor: 'orange',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    margin: 2, // fallback for gap
  },
  dosageText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 12,
  },
});

export default HomePage;