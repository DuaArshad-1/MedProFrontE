import React, { useEffect } from "react";
import { View, Image, StyleSheet, StatusBar } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axiosInstance from "../config";
// import { useNavigation } from "@react-navigation/native";
import { Alert } from "react-native";
const LandingPage = ({ navigation }) => {
  const onMount = async () => {
    try {
      const token = await AsyncStorage.getItem("token");

      if (token) {
        const res = await axiosInstance.get("/users/verifySession/", {
          headers: { Authorization: `Bearer ${token}` },
        });
        
        if (res.data.message === "Session is valid") {
          const timer = setTimeout(() => {
            navigation.navigate("Main", {
              screen: "Home",
              params: { user: res.data.user },
            });
          }, 2000);
          return;
        } 
      }
      else {
        console.log("Ichi bichi");
        const timer = setTimeout(() => {
          navigation.replace("Login");
        }, 3000);
        return () => clearTimeout(timer);
      } 

    } catch (err) {
      console.error(err);
      const timer = setTimeout(() => {
        navigation.replace("Login");
      }, 3000);
    }
  };

  useEffect(() => {
    onMount();
  }, [navigation]);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#b1c9bb" />
      <Image
        source={require("../assets/medpro.png")}
        style={styles.logo}
        resizeMode="contain"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#b1c9bb",
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 250,
    height: 250,
  },
});

export default LandingPage;
