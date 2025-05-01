import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

const CheckoutScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.backArrow}>←</Text>
          </TouchableOpacity>
          <Text style={styles.title}>MED PRO</Text>
          <Text style={styles.subtitle}>Checkout</Text>
        </View>

        {/* Order Summary */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Order Summary</Text>
          <View style={styles.card}>
            <Text style={styles.itemText}>Paracetamol (x2)</Text>
            <Text style={styles.itemText}>Ibuprofen (x1)</Text>
          </View>
        </View>

        {/* Shipping Info */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Shipping Address</Text>
          <View style={styles.card}>
            <Text style={styles.itemText}>123 Green Street</Text>
            <Text style={styles.itemText}>City, Country</Text>
            <Text style={styles.itemText}>+123 456 789</Text>
          </View>
        </View>

        {/* Payment Method */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Payment Method</Text>
          <View style={styles.card}>
            <Text style={styles.itemText}>Visa **** 1234</Text>
          </View>
        </View>

        {/* Total */}
        <View style={styles.totalSection}>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.totalValue}>$25.99</Text>
        </View>

        {/* Checkout Button */}
        <TouchableOpacity
          style={styles.checkoutButton}
          onPress={() => navigation.navigate('Profile')}
        >
          <Text style={styles.checkoutText}>Place Order</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default CheckoutScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ADCBB6',
  },
  header: {
    backgroundColor: '#5E8370',
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 16,
  },
  backArrow: {
    fontSize: 24,
    color: '#fff',
    marginBottom: 10,
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
  section: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2e4d3d',
    marginBottom: 8,
  },
  card: {
    backgroundColor: '#D9E5DB',
    padding: 12,
    borderRadius: 10,
  },
  itemText: {
    fontSize: 14,
    color: '#333',
    marginBottom: 4,
  },
  totalSection: {
    marginTop: 20,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2e4d3d',
  },
  totalValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2e4d3d',
  },
  checkoutButton: {
    backgroundColor: '#F3502B',
    marginTop: 30,
    marginHorizontal: 40,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  checkoutText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
