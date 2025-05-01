import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const notifications = [
  {
    id: 1,
    orderNumber: '12345#',
    date: '12-12-25 11:45 pm',
    status: 'Ordered',
  },
  {
    id: 2,
    orderNumber: '12345#',
    date: '12-12-25 11:45 pm',
    status: 'Ordered',
  },
  {
    id: 3,
    orderNumber: '12345#',
    date: '12-12-25 11:45 pm',
    status: 'Ordered',
  },
];

const NotificationsScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={28} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.title}>MED PRO</Text>
        <Text style={styles.subtitle}>Notifications</Text>
      </View>

      <ScrollView contentContainerStyle={{ paddingVertical: 16 }}>
        {notifications.map((item) => (
          <View key={item.id} style={styles.notificationBox}>
            <View style={styles.dot} />
            <View style={styles.textContainer}>
              <Text style={styles.orderText}>Order number {item.orderNumber}</Text>
              <Text style={styles.dateText}>Date: {item.date}</Text>
              <Text style={styles.statusText}>Status: {item.status}</Text>
            </View>
            <TouchableOpacity
  style={styles.statusButton}
  onPress={() => navigation.navigate('DeliveryDetails')}
>
  <Text style={styles.buttonText}>View Status</Text>
</TouchableOpacity>

          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default NotificationsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#89A59E',
  },
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
  notificationBox: {
    backgroundColor: '#2F4E41',
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
  },
  dot: {
    width: 14,
    height: 14,
    backgroundColor: '#ccc',
    borderRadius: 7,
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  orderText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  dateText: {
    color: '#eee',
    fontSize: 12,
    marginTop: 2,
  },
  statusText: {
    color: '#fff',
    marginTop: 4,
    fontSize: 14,
  },
  statusButton: {
    backgroundColor: '#F25C05',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginLeft: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 12,
  },
});
