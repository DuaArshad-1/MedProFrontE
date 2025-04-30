import React from 'react';
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

const categories = [
  'Anticoagulants (Blood Thinners)',
  'Analgesics (Pain Relievers)',
  'Antibiotics (Bacterial Infections)',
  'Antivirals (Fight Viral Infections)',
  'Antifungals (Fungal Infections)',
  'Antipyretics (Reduce Fever)',
  'Antihistamines (Allergies)',
  'Antidepressants (Treat Anxiety)',
  'Antipsychotics (Psychiatric)',
  'Cardiovascular Medicines',
  'Antidiabetic Drugs',
];

const CategoryScreen = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>MED PRO</Text>
      <Text style={styles.subtitle}>Categories</Text>

      <View style={styles.searchBox}>
        <Icon name="search-outline" size={20} color="#888" style={{ marginRight: 8 }} />
        <TextInput placeholder="Search" placeholderTextColor="#888" style={{ flex: 1 }} />
      </View>

      <FlatList
        data={categories}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.categoryButton}
            onPress={() => navigation.navigate('SubCategories', { category: item })}
          >
            <Text style={styles.categoryText}>{item}</Text>
            <Icon name="chevron-forward" size={16} color="#fff" />
          </TouchableOpacity>
        )}
      />

      {/* <View style={styles.bottomNav}>
        <Icon name="home-outline" size={24} />
        <Icon name="call-outline" size={24} />
        <Icon name="camera-outline" size={24} />
        <Icon name="cart-outline" size={24} />
        <Icon name="person-outline" size={24} />
      </View> */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#8DA397',
    paddingTop: 50,
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
