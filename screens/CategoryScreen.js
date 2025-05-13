import React, { use, useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import axiosInstance from '../config';
import Constants from 'expo-constants';
import { Alert } from 'react-native';

const statusBarHeight = Constants.statusBarHeight;
const CategoryScreen = () => {
  const navigation = useNavigation();
  const [categories,setCategories] = useState([])

  useEffect(() => {
    fetchCategories();
  }, []);
  const fetchCategories = async () => {
    try {
      const response = await axiosInstance.get('/category/findall');
      response.data = response.data.map((category) => category.name);
      // console.log('Categories:', response.data);
      setCategories(response.data);
    } catch (error) {
      // console.error('Error fetching categories:', error);
      Alert.alert('Error', 'Failed to fetch categories. Please try again later.');
    }
  };
  
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>MED PRO</Text>
      <Text style={styles.subtitle}>Categories</Text>

      {/* <View style={styles.searchBox}>
        <Icon name="search-outline" size={20} color="#888" style={{ marginRight: 8 }} />
        <TextInput placeholder="Search" placeholderTextColor="#888" style={{ flex: 1 }}  />
      </View> */}

      <FlatList
        data={categories}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.categoryButton}
            onPress={() => navigation.navigate('subCategoryMeds', { category: item })}
          >
            <Text style={styles.categoryText}>{item}</Text>
            <Icon name="chevron-forward" size={16} color="#fff" />
          </TouchableOpacity>
        )}
      />

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#8DA397',
    paddingTop: statusBarHeight+20,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '600',
    alignSelf: 'center',
    marginBottom: 20,
    color: '#2D473A',
  },
  searchBox: {
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  categoryButton: {
    backgroundColor: '#3A584A',
    borderRadius: 20,
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  categoryText: {
    color: '#fff',
    fontWeight: '500',
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

export default CategoryScreen;
