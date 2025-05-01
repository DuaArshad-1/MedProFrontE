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
import { useNavigation } from '@react-navigation/native';

const products = [
  {
    id: '1',
    name: 'Paracetamol',
    price: '200',
    dosage: '5mg',
    image: require('../assets/medpro4.png'),
  },
  {
    id: '2',
    name: 'Paracetamol',
    price: '200',
    dosage: '5mg',
    image: require('../assets/medpro4.png'),
  },{
    id: '3',
    name: 'Paracetamol',
    price: '200',
    dosage: '5mg',
    image: require('../assets/medpro4.png'),
  },{
    id: '4',
    name: 'Paracetamol',
    price: '200',
    dosage: '5mg',
    image: require('../assets/medpro4.png'),
  },{
    id: '5',
    name: 'Paracetamol',
    price: '200',
    dosage: '5mg',
    image: require('../assets/medpro4.png'),
  },{
    id: '6',
    name: 'Paracetamol',
    price: '200',
    dosage: '5mg',
    image: require('../assets/medpro4.png'),
  },{
    id: '7',
    name: 'Paracetamol',
    price: '200',
    dosage: '5mg',
    image: require('../assets/medpro4.png'),
  },{
    id: '8',
    name: 'Paracetamol',
    price: '200',
    dosage: '5mg',
    image: require('../assets/medpro4.png'),
  },{
    id: '9',
    name: 'Paracetamol',
    price: '200',
    dosage: '5mg',
    image: require('../assets/medpro4.png'),
  },{
    id: '10',
    name: 'Paracetamol',
    price: '200',
    dosage: '5mg',
    image: require('../assets/medpro4.png'),
  },{
    id: '11',
    name: 'Paracetamol',
    price: '200',
    dosage: '5mg',
    image: require('../assets/medpro4.png'),
  },{
    id: '12',
    name: 'Paracetamol',
    price: '200',
    dosage: '5mg',
    image: require('../assets/medpro4.png'),
  },{
    id: '13',
    name: 'Paracetamol',
    price: '200',
    dosage: '5mg',
    image: require('../assets/medpro4.png'),
  },{
    id: '14',
    name: 'Paracetamol',
    price: '200',
    dosage: '5mg',
    image: require('../assets/medpro4.png'),
  },{
    id: '15',
    name: 'Paracetamol',
    price: '200',
    dosage: '5mg',
    image: require('../assets/medpro4.png'),
  },{
    id: '16',
    name: 'Paracetamol',
    price: '200',
    dosage: '5mg',
    image: require('../assets/medpro4.png'),
  },{
    id: '17',
    name: 'Paracetamol',
    price: '200',
    dosage: '5mg',
    image: require('../assets/medpro4.png'),
  },
];

const SubCategoryMedsScreen = () => {
  const navigation = useNavigation();

  const renderProduct = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('MedCard', { product: item })}
    >
      <Image source={item.image} style={styles.productImage} resizeMode="contain" />
      <Text style={styles.productName}>{item.name}</Text>
      <Text style={styles.productPrice}>Rs. {item.price}</Text>
      <View style={styles.dosageTag}>
        <Text style={styles.dosageText}>{item.dosage}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#5E8370" />
      <View style={styles.topSection}>
        <Text style={styles.title}>MED PRO</Text>
        <Text style={styles.subtitle}>SubCategory Medicines</Text>

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

export default SubCategoryMedsScreen;
