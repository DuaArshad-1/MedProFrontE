import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TextInput,
  ScrollView,
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { AntDesign, FontAwesome5, Ionicons } from '@expo/vector-icons';
import axiosInstance from '../config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from 'expo-constants';
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';
// import { ScrollView } from 'react-native-gesture-handler';
import { Alert } from 'react-native';

const statusBarHeight = Constants.statusBarHeight;
const MedCard = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { product } = route.params || {};
  const [quantity, setQuantity] = useState(1);
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState(0);
  const [Reviews, setReviews] = useState([]);
  if (!product) {
    return (
      <View style={styles.center}>
        <Text>Medicine details not available.</Text>
      </View>
    );
  }
  const getReviews = async () => {
    try {
      // const reviews = await Review.find({ medicineId: req.params.id }).populate('userId', 'name');
      // res.json(reviews);
      const res = await axiosInstance.get(`/review/medicine/${product._id}`);
      if (res.status !== 200) {
        throw new Error('Failed to fetch reviews');
      }
      // console.log('Reviews:', res.data);
      setReviews(res.data);
    } catch (error) {
      // console.error('Error fetching reviews:', error?.response?.data || error.message);
      // alert('Failed to fetch reviews');
      Alert.alert('Error', 'Failed to fetch reviews. Please try again.');
    }
  };
  useEffect(() => {
    getReviews();
  }
  , []);
  const addReview = async () => { 
    try {
      const token = await AsyncStorage.getItem('token');
      const res = await axiosInstance.post(
        '/review/',
        {
          medicineId: product._id,
          rating,
          comment: reviewText,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert('Review submitted successfully');
      setReviewText(''); setRating(0);
      getReviews();
    } catch (error) {
      // console.error('Review submission error:', error?.response?.data || error.message);
      // alert('Failed to submit review');
      Alert.alert('Error', 'Failed to submit review. Please try again.');
    }
  };
  const addToCart = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const res = await axiosInstance.post(
        '/cart/',
        {
          medicineId: product._id,
          quantity,
          variantIndex: selectedVariantIndex,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert('Item added to cart');
      // Pass parameters to Cart screen
      navigation.navigate("Main", {
        screen: 'Cart',
        params: {
          name: product.name,
          dosage: product.variants[selectedVariantIndex].mg,
          price: product.variants[selectedVariantIndex].price,
          quantity,
        },
      });
    } catch (error) {
      // console.error('Add to cart error:', error?.response?.data || error.message);
      // alert('Failed to add to cart');
      Alert.alert('Error', 'Failed to add to cart. Please try again.');
    }
  };
  const renderStars = () => {
    return (
      <View style={styles.starsContainer}>
        {[1, 2, 3, 4, 5].map((star) => (
          <TouchableOpacity key={star} onPress={() => setRating(star)}>
            <AntDesign
              name={rating >= star ? 'star' : 'staro'}
              size={28}
              color="#FFD700"
              style={styles.star}
            />
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      
        <StatusBar barStyle="light-content" backgroundColor="#5E8370" />
        <View style={styles.topSection}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginBottom: 20, marginLeft: -300 }}>
            <Ionicons name="arrow-back" size={28} color="#333" />
          </TouchableOpacity>
          <Text style={styles.title}>MED PRO</Text>
          <Text style={styles.subtitle}>Med Description</Text>
        </View>
        <ScrollView>
        <View style={styles.content}>
          <Image source={product.image} style={styles.image} resizeMode="contain" />

          <Text style={styles.price}>Rs. {product.variants[selectedVariantIndex].price}</Text>
          <Text style={styles.name}>{product.name}</Text>
          <Text style={styles.description}>{product.description}</Text>

          {/* Dosage Buttons */}
          
          <View style={styles.dosageContainer}>
            {product.variants.map((variant, index) => (
              <TouchableOpacity
                key={index}
                style={[styles.dosageTag, selectedVariantIndex === index && styles.dosageSelected]}
                onPress={() => setSelectedVariantIndex(index)}
              >
                <Text style={[styles.dosageText, selectedVariantIndex === index && styles.dosageTextSelected]}>
                  {variant.mg} mg
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Quantity Selector */}
          <View style={styles.quantitySelector}>
            <TouchableOpacity onPress={() => setQuantity(Math.max(1, quantity - 1))}>
              <Text style={styles.adjustBtn}>-</Text>
            </TouchableOpacity>
            <Text style={styles.quantityText}>{quantity}</Text>
            <TouchableOpacity onPress={() => setQuantity(quantity + 1)}>
              <Text style={styles.adjustBtn}>+</Text>
            </TouchableOpacity>
          </View>

          {/* Buttons */}
          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={styles.button}
              onPress={() =>
                navigation.navigate('Checkout', {
                  id: product._id,
                  name: product.name,
                  dosage: product.variants[selectedVariantIndex].mg,
                  price: product.variants[selectedVariantIndex].price,
                  quantity,
                  singleItem: true,
                })
              }
            >
              <Text style={styles.buttonText}>Buy Now</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.button} onPress={addToCart}>
              <Text style={styles.buttonText}>Add to Cart</Text>
            </TouchableOpacity>
          </View>
          {/* Reviews Section */}
          <View style={{ marginTop: 30, width: '100%' }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>Reviews</Text>
            {Reviews && Reviews.length > 0 ? (
              Reviews.map((review, index) => (
                <View
                  key={index}
                  style={{
                    backgroundColor: '#E0E0E0',
                    padding: 10,
                    marginBottom: 10,
                    borderRadius: 10,
                  }}
                >
                  <Text style={{ fontWeight: 'bold', marginBottom: 4 }}>{review.userId.name}</Text>
                  <View style={{ flexDirection: 'row', marginBottom: 4 }}>
                    {[...Array(5)].map((_, i) => (
                      <FontAwesome5
                        key={i}
                        name="star"
                        solid={i < review.rating} // solid if i < rating, otherwise regular
                        size={14}
                        color="green"
                        style={{ marginRight: 2 }}
                      />
                    ))}
                  </View>
                  <Text style={{ fontStyle: 'italic', color: '#333' }}>{review.comment}</Text>
                </View>
              ))
            ) : (
              <Text>No reviews yet for this medicine.</Text>
            )}
          </View>
          <Text style={{ fontSize: 18, marginTop: 20, alignSelf: 'flex-start' }}>Add a Review:</Text>
          <TextInput
            style={styles.reviewInput}
            placeholder="Write your review here..."
            multiline
            value={reviewText}
            onChangeText={setReviewText}
          />
          {renderStars()}
          <TouchableOpacity
            style={styles.submitButton}
            onPress={addReview}
          >
            <Text style={styles.buttonText}>Submit Review</Text>
          </TouchableOpacity>

        </View>
      </ScrollView>
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
    padding: statusBarHeight+10,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
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
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 20,
  },
  dosageTag: {
    backgroundColor: '#FFD9B3', // Light orange (unselected)
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
    margin: 4,
  },
  dosageSelected: {
    backgroundColor: '#FF8C00', // Bright orange (selected)
  },
  dosageText: {
    color: '#333',
    fontWeight: 'bold',
  },
  dosageTextSelected: {
    color: '#fff',
  },
  quantitySelector: {
    flexDirection: 'row',
    alignItems: 'center',
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
    marginHorizontal: 10,
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
  reviewInput: {
    height: 100,
    width: '100%',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    marginTop: 10,
    padding: 10,
    backgroundColor: '#fff',
    textAlignVertical: 'top',
  },
  submitButton: {
    backgroundColor: '#3C6E5F',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 12,
    marginTop: 10,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  starsContainer: {
    flexDirection: 'row',
    marginVertical: 10,
  },
  star: {
    marginHorizontal: 4,
  },

});