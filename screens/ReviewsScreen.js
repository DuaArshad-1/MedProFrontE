import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
} from 'react-native';
import { FontAwesome, Feather, Ionicons, Entypo } from '@expo/vector-icons';
import { useRoute } from '@react-navigation/native';
import axiosInstance from '../config'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from 'expo-constants';
import { Alert } from 'react-native';

const statusBarHeight = Constants.statusBarHeight;

const ReviewScreen = ({ navigation }) => {
  const route = useRoute();
  const { review } = route.params || {};

  const [reviews, setReviews] = useState([]);
  const fetchUserReviews = async () => {
    try{
      const token = await AsyncStorage.getItem('token');
      const res = await axiosInstance.get('/review/user', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setReviews(res.data);
      // console.log(res.data);
    }catch (error) {
      // console.error('Error fetching user reviews:', error);
      Alert.alert('Error', 'Failed to load reviews. Please try again later.');

    }
  }
  useEffect(() => {
      fetchUserReviews();
  }, [review]);


  const deleteReview = async(id) => {
    try{
      const token = await AsyncStorage.getItem('token');
      const res = await axiosInstance.delete(`/review/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
      
      fetchUserReviews();
    }
    catch (error) {
      // console.error('Error deleting review:', error);
      Alert.alert('Error', 'Failed to delete review. Please try again later.');
    }
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

        {/* Reviews List */}
        {reviews.map((item, index) => (
          <View key={index} style={styles.reviewItem}>
            <Image
              source={require('../assets/medpro4.png')}
              style={styles.medImage}
            />
            <View style={styles.medInfo}>
              <Text style={styles.medName}>{item.medicineId.name}</Text>
              {item.comment ? (
                <Text style={styles.commentText}>“{item.comment}”</Text>
              ) : null}
              <View style={styles.stars}>
                {[...Array(5)].map((_, i) => (
                  <FontAwesome
                    key={i}
                    name={i < item.rating ? 'star' : 'star-o'}
                    size={16}
                    color="green"
                    style={{ marginRight: 4 }}
                  />
                ))}
              </View>
            </View>

            <View style={{ alignItems: 'center' }}>
              {/* <TouchableOpacity onPress={() => toggleFavorite(index)}>
                <Feather
                  name="heart"
                  size={22}
                  color={item.isFavorite ? 'red' : '#444'}
                />
              </TouchableOpacity> */}
              {/* {console.log(item.medicineId._id)} */}
              
              <TouchableOpacity onPress={() => deleteReview(item._id)}>
                <Entypo
                  name="trash"
                  size={20}
                  color="black"
                  style={{ marginTop: 8 }}
                />
              </TouchableOpacity>
            </View>
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
    paddingTop: statusBarHeight + 10,
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
  commentText: {
    fontStyle: 'italic',
    color: '#333',
    marginTop: 4,
    marginBottom: 2,
  },
  stars: { flexDirection: 'row', marginTop: 4 },
});

export default ReviewScreen;