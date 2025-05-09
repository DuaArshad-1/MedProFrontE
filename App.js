import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LandingPage from "./screens/LandingPage";
import LoginPage from "./screens/LoginPage";
// import RegisterPage from "./screens/RegisterPage";
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
// import Camera from './screens/CameraScreen';
import EditProfile from './screens/EditProfileScreen';
import DeliveryDetail from "./screens/DeliveryDetails";
import PendingO from "./screens/PendingOrders";
import CategoryScreen from "./screens/CategoryScreen";
import SubCategoryScreen from "./screens/SubCategory";
import NotifictationsScreen from "./screens/NotificationsScreen"
import CheckoutScreen from "./screens/CheckoutScreen"
import subCategoryMedsScreen from "./screens/subCategoryMedsScreen"

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
        {/* <Stack.Screen name="Camera" component={Camera} /> */}

        <Stack.Screen name="Landing" component={LandingPage} />
        <Stack.Screen name="Login" component={LoginPage} />
        {/* <Stack.Screen name="Register" component={RegisterPage} /> */}
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="EditProfile" component={EditProfile} />
        <Stack.Screen name="Cart"    component={CartScreen} />
        {/* <Stack.Screen name="BottomTab"    component={BottomTabs} /> */}
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
        <Stack.Screen name="PendingOrders" component={PendingO}/>
        <Stack.Screen name="Categories" component={CategoryScreen}/>
        <Stack.Screen name="SubCategories" component={SubCategoryScreen}/>
        <Stack.Screen name="DeliveryDetails" component={DeliveryDetail}/>
        <Stack.Screen name="Notifications" component={NotifictationsScreen}/>
        <Stack.Screen name="Main" component={BottomTabs} />
        <Stack.Screen name="subCategoryMeds" component={subCategoryMedsScreen} />
        <Stack.Screen name="Checkout" component={CheckoutScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
