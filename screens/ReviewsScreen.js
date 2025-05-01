import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
} from 'react-native';
import { FontAwesome, Feather, Ionicons } from '@expo/vector-icons';
import BottomTabs from './BottomTabs';

const initialReviews = [
  { name: 'Paracetamol', rating: 4, isFavorite: true },
  { name: 'Ibuprofen', rating: 3, isFavorite: false },
];

const ReviewScreen = ({ navigation }) => {
  const [reviews, setReviews] = useState(initialReviews);

  const updateRating = (index, newRating) => {
    const updated = [...reviews];
    updated[index].rating = newRating;
    setReviews(updated);
  };

  const toggleFavorite = (index) => {
    const updated = [...reviews];
    updated[index].isFavorite = !updated[index].isFavorite;
    setReviews(updated);
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={28} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.title}>MED PRO</Text>
          <Text style={styles.subtitle}>My Reviews</Text>
        </View>

        {/* Filters */}
        <View style={styles.monthContainer}>
          <Text style={styles.monthText}>Month</Text>
          <View style={styles.filterButtons}>
            <TouchableOpacity style={styles.filterBtn}>
              <Text style={styles.filterText}>Recent</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.filterBtn}>
              <Text style={styles.filterText}>View All</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Reviews */}
        {reviews.map((item, index) => (
          <View key={index} style={styles.reviewItem}>
            <Image
              source={require('../assets/medpro4.png')}
              style={styles.medImage}
            />
            <View style={styles.medInfo}>
              <Text style={styles.medName}>{item.name}</Text>
              <Text style={styles.category}>Category • $$ • Supporting line text</Text>
              <View style={styles.stars}>
                {[...Array(5)].map((_, i) => (
                  <TouchableOpacity
                    key={i}
                    onPress={() => updateRating(index, i + 1)}
                  >
                    <FontAwesome
                      name={i < item.rating ? 'star' : 'star-o'}
                      size={16}
                      color="green"
                      style={{ marginRight: 4 }}
                    />
                  </TouchableOpacity>
                ))}
              </View>
            </View>
            <TouchableOpacity onPress={() => toggleFavorite(index)}>
              <Feather
                name={item.isFavorite ? 'heart' : 'heart'}
                size={22}
                color={item.isFavorite ? 'red' : '#444'}
              />
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
      
    </View>
    
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#ADCBB6' },
  header: {
    backgroundColor: '#5E8370',
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#DFE5E0',
    textAlign: 'center',
    marginTop: 4,
  },
  monthContainer: {
    padding: 16,
    backgroundColor: '#D9E5DB',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  monthText: { fontWeight: 'bold', color: '#2e4d3d' },
  detailText: { color: '#2e4d3d' },
  filterButtons: { flexDirection: 'row', gap: 10 },
  filterBtn: {
    backgroundColor: '#5E8370',
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  filterText: { color: '#fff', fontWeight: 'bold' },
  reviewItem: {
    flexDirection: 'row',
    backgroundColor: '#E0E0E0',
    padding: 12,
    marginHorizontal: 16,
    marginVertical: 10,
    borderRadius: 12,
    alignItems: 'center',
  },
  medImage: { width: 50, height: 50, resizeMode: 'contain', marginRight: 10 },
  medInfo: { flex: 1 },
  medName: { fontSize: 16, fontWeight: 'bold', color: '#1B1B1B' },
  category: { fontSize: 12, color: '#666' },
  stars: { flexDirection: 'row', marginTop: 4 },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 12,
    backgroundColor: '#D9E5DB',
    position: 'absolute',
    bottom: 0,
    width: '100%',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
});

export default ReviewScreen;
