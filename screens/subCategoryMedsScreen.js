import React from 'react';
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
import { useNavigation, useRoute } from '@react-navigation/native';
import { useState } from 'react';
import { useEffect } from 'react';
import axiosInstance from '../config';

const SubCategoryMedsScreen = () => {
  const navigation = useNavigation();
  const route= useRoute();
  const { category } = route.params;
  const fetchMedicines = async () => {
    try {
      const response = await axiosInstance.get(`/category/?name=${category}`);
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };
  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetchMedicines();
  }, []);

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
        <Text style={styles.subtitle}>{category} Medicines</Text>

        <View style={styles.searchContainer}>
          <TextInput style={styles.searchInput} placeholder="Search" />
          <TouchableOpacity onPress={() => navigation.navigate('Notifications')}>
            <Text style={styles.bellIcon}>🔔</Text>
          </TouchableOpacity>
        </View>
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

export default SubCategoryMedsScreen;
