import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons, Feather } from '@expo/vector-icons'; // 🛠️ Added Feather for Clipboard

// Import all your screen components
import HomePage from '../screens/HomePage';      
import ProfileScreen from '../screens/ProfileScreen';
import CartScreen from '../screens/CartScreen';
import CameraScreen from '../screens/CameraScreen.js';
import InfoScreen from '../screens/InfoScreen';

const Tab = createBottomTabNavigator();

const BottomTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          let IconComponent = Ionicons; // Default icons from Ionicons

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Cart') {
            iconName = focused ? 'cart' : 'cart-outline';
          } else if (route.name === 'Camera') {
            iconName = focused ? 'camera' : 'camera-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          } else if (route.name === 'Clipboard') {
            IconComponent = Feather; // ✨ Use Feather for clipboard
            iconName = focused ? 'clipboard' : 'clipboard';
          }

          return <IconComponent name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#4B7BEC',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={HomePage} />
      <Tab.Screen name="Clipboard" component={InfoScreen} /> 
      <Tab.Screen name="Camera" component={CameraScreen} />
      <Tab.Screen name="Cart" component={CartScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default BottomTabs;
