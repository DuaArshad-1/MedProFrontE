import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';


const subcategories = [
  'Haloperidol (Haldol)',
  'Risperidone (Risperdal)',
  'Aripiprazole (Abilify)',
  'Chlorpromazine (Thorazine)',
  'Olanzapine (Zyprexa)',
  'Brexpiprazole (Rexulti)',
  'Fluphenazine',
];

const SubCategoryScreen = ({ route }) => {
  const { category } = route.params;
  const navigation = useNavigation(); // ✅ Add this line


  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>MED PRO</Text>
      <Text style={styles.subtitle}>{category || 'SubCategory'}</Text>

      <FlatList
        data={subcategories}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.subItem}
            onPress={() => navigation.navigate('subCategoryMeds', {category: item})}>
            <Text style={styles.subText}>{item}</Text>
            <Icon name="chevron-forward" size={16} color="#333" />
          </TouchableOpacity>
        )}
        contentContainerStyle={{ paddingBottom: 100 }}
      />

      <TouchableOpacity style={styles.viewAllBtn}>
        <Text style={styles.viewAllText}>View All</Text>
      </TouchableOpacity>

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
  subItem: {
    backgroundColor: '#F2F5F3',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 15,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  subText: {
    color: '#2B2B2B',
    fontWeight: '500',
  },
  viewAllBtn: {
    backgroundColor: '#2D473A',
    alignSelf: 'center',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginVertical: 10,
  },
  viewAllText: {
    color: '#fff',
    fontWeight: '600',
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

export default SubCategoryScreen;
