import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import axiosInstance from '../config';
import AsyncStorage from '@react-native-async-storage/async-storage';

 
const NotificationsScreen = ({ navigation }) => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchNotifications = async () => {
    try {
      const token = await AsyncStorage.getItem('token');

      const res = await axiosInstance.get('/notification/', {
          headers: { Authorization: `Bearer ${token}` },
      });
      setNotifications(res.data);
    } catch (error) {
      console.error('Failed to load notifications:', error.message);
    } finally {
      setLoading(false);
    }
  };
  const markAsRead = async (id) => {
    try {
      const token = await AsyncStorage.getItem('token');

      await axiosInstance.put(`/notification/${id}/read`, null, {
        headers: {
          Authorization: `Bearer ${token}`        },
      });
      fetchNotifications();
    } catch (error) {
      console.error('Error marking notification as read:', error.message);
    }
  };

  const deleteNotification = async (id) => {
    Alert.alert('Delete Notification', 'Are you sure you want to delete this notification?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Delete',
        onPress: async () => {
          try {
            const token = await AsyncStorage.getItem('token');

            await axiosInstance.delete(`notification/${id}`, {
              headers: {
                 Authorization: `Bearer ${token}`,
              },
            });
            fetchNotifications();
          } catch (error) {
            console.error('Error deleting notification:', error.message);
          }
        },
        style: 'destructive',
      },
    ]);
  };
  useEffect(() => {
    fetchNotifications();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={28} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.title}>MED PRO</Text>
        <Text style={styles.subtitle}>Notifications</Text>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#fff" style={{ marginTop: 20 }} />
      ) : (
        <ScrollView contentContainerStyle={{ paddingVertical: 16 }}>
          {notifications.map((item) => (
            <TouchableOpacity
              key={item._id}
              onPress={() => markAsRead(item._id)}
              onLongPress={() => deleteNotification(item._id)}
            >
              <View style={[styles.notificationBox, item.read && { opacity: 0.5 }]}>
                <View style={styles.dot} />
                <View style={styles.textContainer}>
                  <Text style={styles.orderText}>{item.title}</Text>
                  <Text style={styles.dateText}>{new Date(item.createdAt).toLocaleString()}</Text>
                  <Text style={styles.statusText}>{item.message}</Text>
                </View>
                <TouchableOpacity
                  style={styles.statusButton}
                  onPress={() => navigation.navigate('DeliveryDetails')}
                >
                  <Text style={styles.buttonText}>View Status</Text>
                </TouchableOpacity>
                {/* <TouchableOpacity  //UNCOMMENT AFTER API CALLS IN DELIVERY DETAIL
  onPress={() => {
    if (notification.type === 'order' && notification.orderId) {
      navigation.navigate('DeliveryDetailsScreen', { orderId: notification.orderId });
    }
  }}
>
  <Text>{notification.title}</Text>
  <Text>{notification.message}</Text>
</TouchableOpacity> */}

              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
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
