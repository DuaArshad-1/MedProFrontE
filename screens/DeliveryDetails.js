import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Ionicons, Feather, FontAwesome5, MaterialIcons, Entypo } from '@expo/vector-icons';
import Constants from 'expo-constants';
import { Alert } from 'react-native';

const statusBarHeight = Constants.statusBarHeight;

const DeliveryDetail = () => {
  const navigation = useNavigation();
    
  const route = useRoute();
  const order  = route.params;
  // console.log('Order details:', route.params);
  let colorPresentState='#F25D29';
  let colorOtherState='#BFC1BF';
  const trackingSteps = [
    {
      status: 'Delivered!',
      // color:''
    },
    {
      
      status: 'Out for Delivery',
      // color:''
    },
    {
      status: 'Processed and Ready to Ship',
      // color:''

    },
  ];
  if (order.deliveryStatus === 'delivered') {
    trackingSteps[0].color = colorPresentState;
    trackingSteps[1].color = colorOtherState;
    trackingSteps[2].color = colorOtherState;
  }
  else if (order.deliveryStatus === 'dispatched') {
    trackingSteps[0].color = colorOtherState;
    trackingSteps[1].color = colorPresentState;
    trackingSteps[2].color = colorOtherState;
  } else if (order.deliveryStatus === 'assigned') {
    trackingSteps[0].color = colorOtherState;
    trackingSteps[1].color = colorOtherState;
    trackingSteps[2].color = colorPresentState;
  }
  
  return (
    <SafeAreaView style={styles.container}>
         <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginBottom: 10 }}>
              <Ionicons name="arrow-back" size={28} color="#333" />
            </TouchableOpacity>
      <ScrollView showsVerticalScrollIndicator={false}>

        <Text style={styles.header}>MED PRO</Text>
        <Text style={styles.subheader}>Delivery Detail</Text>

        <View style={styles.statusCard}>
          <View style={styles.statusHeader}>
            <View style={styles.statusDot} />
            <Text style={styles.statusText}>{order.deliveryStatus}!</Text>
          </View>
          {/* <Text style={styles.statusDate}>Package was delivered on</Text>
          <Text style={styles.statusDateBold}>Thu 4 Jul</Text> */}
        </View>
         <View style={styles.cardHeader}>
          <Text style={styles.orderNumber}>Address: {order.item.deliveryAddress}</Text>

        </View>
        <View style={styles.cardHeader}>
          <Text style={styles.orderNumber}>Ordered: {order.item.orderDate}</Text>
        </View>
        <View style={styles.cardHeader}>
          <Text style={styles.orderNumber}>No. of Medicines: {order.item.medicines.length}</Text>
        </View>
        <Text style={styles.trackingText}>
          Tracking Order 
          {/* <Text style={styles.trackingNumber}>Pk3894923#</Text> */}
        </Text>

        <View style={styles.timelineCard}>
          {trackingSteps.map((step, index) => (
            <View key={index} style={styles.timelineItem}>
              {/* <View style={styles.timelineDate}>
                <Text style={styles.dateText}>{step.date}</Text>
                <Text style={styles.timeText}>{step.time}</Text>
              </View> */}
              <View style={styles.timelineContent}>
                <View
                  style={[
                    styles.circle,
                    { backgroundColor: step.color },
                  ]}
                />
                {index !== trackingSteps.length - 1 && (
                  <View style={styles.verticalLine} />
                )}
                <View style={styles.timelineDetails}>
                  <Text style={[styles.statusTitle]}>
                    {step.status}
                  </Text>
                  {/* <Text style={styles.statusDesc}>{step.description}</Text> */}
                </View>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Bottom Nav */}
      {/* <View style={styles.bottomNav}>
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
    paddingHorizontal: 20,
    paddingTop: statusBarHeight + 10,
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
  statusCard: {
    backgroundColor: '#415D48',
    borderRadius: 15,
    padding: 15,
    marginBottom: 20,
  },
  statusHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#CCC',
    marginRight: 10,
  },
  statusText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  statusDate: {
    color: '#EEE',
    marginTop: 10,
  },
  statusDateBold: {
    color: 'white',
    fontWeight: 'bold',
  },
  trackingText: {
    marginTop: 5,
    marginBottom: 10,
    color: '#1E1E1E',
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 30,

  },
  trackingNumber: {
    color: '#F25D29',
    fontWeight: 'bold',
  },
  timelineCard: {
    backgroundColor: '#A7B9AC',
    borderRadius: 15,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  timelineItem: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  timelineDate: {
    width: 40,
    alignItems: 'center',
  },
  dateText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 13,
    textAlign: 'center',
  },
  timeText: {
    fontSize: 11,
    color: '#fff',
    marginTop: 3,
    textAlign: 'center',
  },
  timelineContent: {
    flexDirection: 'row',
    flex: 1,
  },
  circle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    marginHorizontal: 10,
    marginTop: 2,
  },
  verticalLine: {
    position: 'absolute',
    left: 19,
    top: 20,
    bottom: -20,
    width: 2,
    backgroundColor: '#C4C4C4',
  },
  timelineDetails: {
    flex: 1,
    paddingLeft: 10,
  },
  statusTitle: {
    fontWeight: 'bold',
    color: '#1E1E1E',
    fontSize: 15,
  },
  statusDesc: {
    fontSize: 13,
    color: '#333',
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
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  orderNumber: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#333',
  },
  // dateText: {
  //   fontSize: 13,
  //   color: '#222',
  // },
});

export default DeliveryDetail;
