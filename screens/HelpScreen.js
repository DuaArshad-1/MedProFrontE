import React from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  SafeAreaView, 
  ScrollView, 
  StatusBar 
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Ionicons, Feather, FontAwesome5, MaterialIcons, Entypo } from '@expo/vector-icons';


const HelpCenter = () => {
          const navigation = useNavigation();
  
  return (
    <SafeAreaView style={styles.container}>
       <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginBottom: 10,marginLeft:10,marginTop:20 }}>
                    <Ionicons name="arrow-back" size={28} color="#333" />
                  </TouchableOpacity>
      <StatusBar barStyle="light-content" backgroundColor="#7A9E8F" />

      <View style={styles.header}>
        <Text style={styles.title}>MED PRO</Text>
        <Text style={styles.subtitle}>Help Center</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.heading}>How can we help you?</Text>

        <TextInput
          style={styles.searchInput}
          placeholder="Search for help..."
        />

        <View style={styles.faqSection}>
          <Text style={styles.question}>• How do I reset my password?</Text>
          <Text style={styles.answer}>Go to the login page and click on "Forgot Password?" to reset it easily.</Text>

          <Text style={styles.question}>• How can I track my order?</Text>
          <Text style={styles.answer}>You can track your orders in the "My Orders" section after logging in.</Text>

          <Text style={styles.question}>• How do I contact customer support?</Text>
          <Text style={styles.answer}>You can email us at support@medpro.com or call 1800-123-456.</Text>

          <Text style={styles.question}>• What if I entered the wrong address?</Text>
          <Text style={styles.answer}>Contact support immediately to update your shipping address.</Text>
        </View>

        <TouchableOpacity style={styles.contactButton}>
          <Text style={styles.contactButtonText}>Contact Support</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HelpCenter;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#a2b1a8',
  },
  header: {
    marginTop: 20,
    alignItems: 'center',
    
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1B1B1B',
  },
  subtitle: {
    fontSize: 20,
    fontWeight: '600',
    color: 'white',
    marginTop: 5,
  },
  content: {
    padding: 20,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
  },
  searchInput: {
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
    paddingHorizontal: 15,
    height: 50,
    marginBottom: 30,
  },
  faqSection: {
    marginBottom: 30,
  },
  question: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 10,
  },
  answer: {
    fontSize: 14,
    color: '#e0e0e0',
    marginTop: 5,
    marginLeft: 10,
  },
  contactButton: {
    backgroundColor: '#345c45',
    paddingVertical: 15,
    borderRadius: 20,
    alignItems: 'center',
  },
  contactButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
