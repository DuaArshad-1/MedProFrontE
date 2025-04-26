import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LandingPage from "./screens/LandingPage";
import LoginPage from "./screens/LoginPage";
import RegisterPage from "./screens/RegisterPage";
import ProfileScreen from "./screens/ProfileScreen";
import CartScreen from "./screens/CartScreen";
import BottomTabs from "./screens/BottomTabs";
import InfoScreen from './screens/InfoScreen';
import SettingsScreen from './screens/SettingsScreen';
import OrdersScreen from './screens/OrdersScreen';
import HelpScreen from './screens/HelpScreen';
import ReviewsScreen from './screens/ReviewsScreen';
import ContactScreen from './screens/ContactScreen';
import HomePage from './screens/HomePage';
import MedicineCard from './screens/MedicineCard';
import ForgotPassword from './screens/ForgotPassword';
import SignupPage from './screens/SignupPage';


const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Landing"
        screenOptions={{
          headerShown: false, 
        }}
      >
        <Stack.Screen name="Landing" component={LandingPage} />
        <Stack.Screen name="Login" component={LoginPage} />
        <Stack.Screen name="Register" component={RegisterPage} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="Cart"    component={CartScreen} />
        <Stack.Screen name="BottomTab"    component={BottomTabs} />
        <Stack.Screen name="Info" component={InfoScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
        <Stack.Screen name="Orders" component={OrdersScreen} />
        <Stack.Screen name="Help" component={HelpScreen} />
        <Stack.Screen name="Home" component={HomePage} />
        <Stack.Screen name="Reviews" component={ReviewsScreen} />
        <Stack.Screen name="Contact" component={ContactScreen} />
        <Stack.Screen name="MedCard" component={MedicineCard}/>
        <Stack.Screen name="ForgotP" component={ForgotPassword}/>
        <Stack.Screen name="Signup" component={SignupPage}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
