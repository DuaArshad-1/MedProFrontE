import React from 'react';
import { View, Text, TextInput, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Ionicons, Feather, FontAwesome5, MaterialIcons, Entypo } from '@expo/vector-icons';
import { useRoute, useNavigation } from '@react-navigation/native';

const ContactUs = () => {
    const navigation = useNavigation();
  

  return (
    <SafeAreaView style={styles.container}>
       <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginBottom: 10 }}>
      <Ionicons name="arrow-back" size={28} color="#333" />
    </TouchableOpacity>
      <Text style={styles.header}>MED PRO</Text>
      <Text style={styles.subheader}>Contact Us</Text>

      <Text style={styles.sectionTitle}>Get In Touch</Text>
      <Text style={styles.description}>
        If you have any inquiries get in touch with us. We'll be happy to help you.
      </Text>

      <View style={styles.inputContainer}>
        <Icon name="call-outline" size={20} color="#000" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="03002001004"
          placeholderTextColor="#666"
        />
      </View>

      <View style={styles.inputContainer}>
        <Icon name="mail-outline" size={20} color="#000" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="taylorswift13@gmail.com"
          placeholderTextColor="#666"
        />
      </View>

      <Text style={styles.sectionTitle}>Social Media</Text>

      <View style={styles.socialRow}>
        <FontAwesome name="facebook" size={22} color="white" style={styles.socialIcon} />
        <Text style={styles.socialText}>
          Stay updated, connect, and engage with us on Facebook.
        </Text>
      </View>

      <View style={styles.socialRow}>
        <FontAwesome name="instagram" size={22} color="white" style={styles.socialIcon} />
        <Text style={styles.socialText}>
          Explore our visual world and discover the beauty of our brand.
        </Text>
      </View>

      <View style={styles.socialRow}>
        <MaterialCommunityIcons name="twitter" size={22} color="white" style={styles.socialIcon} />
        <Text style={styles.socialText}>
          Follow us for real-time updates and lively discussions.
        </Text>
      </View>

      {/* Bottom Nav
      <View style={styles.bottomNav}>
        <TouchableOpacity><Icon name="home-outline" size={24} /></TouchableOpacity>
        <TouchableOpacity><Icon name="call-outline" size={24} /></TouchableOpacity>
        <TouchableOpacity><Icon name="camera-outline" size={24} /></TouchableOpacity>
        <TouchableOpacity><Icon name="cart-outline" size={24} /></TouchableOpacity>
        <TouchableOpacity><Icon name="person-outline" size={24} /></TouchableOpacity>
      </View> */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#8DA397',
    padding: 20,
    paddingTop: 50,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    alignSelf: 'center',
    color: '#1E1E1E',
  },
  subheader: {
    fontSize: 18,
    fontWeight: '600',
    alignSelf: 'center',
    marginBottom: 20,
    color: '#3C5748',
  },
  sectionTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginTop: 20,
    marginBottom: 5,
    color: '#1E1E1E',
  },
  description: {
    marginBottom: 15,
    color: '#1E1E1E',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 10,
    marginVertical: 5,
    paddingHorizontal: 10,
    height: 50,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#000',
  },
  socialRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 10,
  },
  socialIcon: {
    backgroundColor: '#F25D29',
    borderRadius: 50,
    padding: 10,
    marginRight: 10,
    marginTop: 5,
  },
  socialText: {
    flex: 1,
    color: '#1E1E1E',
    fontSize: 14,
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

export default ContactUs;
