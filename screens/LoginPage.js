// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
//   KeyboardAvoidingView,
//   Platform,
//   Alert,
// } from "react-native";
// import { useNavigation } from "@react-navigation/native";

// const LoginPage = () => {
//   const navigation = useNavigation();
//   const [identifier, setIdentifier] = useState(""); 
//   const [password, setPassword] = useState("");

//   const handleLogin = () => {
//     if (!identifier.trim() || !password.trim()) {
//       Alert.alert("Error", "Please enter your username, email, or phone and password.");
//       return;
//     }
//     Alert.alert("Success", "Login functionality will be added soon!");
//   };

//   return (
//     <KeyboardAvoidingView
//       behavior={Platform.OS === "ios" ? "padding" : "height"}
//       style={styles.container}
//     >
//       <Text style={styles.title}>Login to MedPro</Text>

//       <TextInput
//         style={styles.input}
//         placeholder="Username, Email or Phone"
//         autoCapitalize="none"
//         value={identifier}
//         onChangeText={setIdentifier}
//       />
//       <TextInput
//         style={styles.input}
//         placeholder="Password"
//         secureTextEntry
//         autoCapitalize="none"
//         value={password}
//         onChangeText={setPassword}
//       />

//       <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
//         <Text style={styles.loginText}>Login</Text>
//       </TouchableOpacity>

//       <TouchableOpacity onPress={() => navigation.navigate("Register")}>
//         <Text style={styles.registerText}>Don’t have an account? Sign Up</Text>
//       </TouchableOpacity>
//     </KeyboardAvoidingView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: "center",
//     justifyContent: "center",
//     backgroundColor: "#fff",
//     paddingHorizontal: 20,
//   },
//   title: {
//     fontSize: 36,
//     fontWeight: "bold",
//     color: "#007bff",
//     marginBottom: 30,
//   },
//   input: {
//     width: "100%",
//     padding: 12,
//     borderWidth: 1,
//     borderColor: "#ccc",
//     borderRadius: 10,
//     marginBottom: 15,
//     fontSize: 16,
//   },
//   loginButton: {
//     backgroundColor: "#007bff",
//     paddingVertical: 12,
//     paddingHorizontal: 40,
//     borderRadius: 25,
//     marginTop: 10,
//   },
//   loginText: {
//     color: "#fff",
//     fontSize: 18,
//     fontWeight: "bold",
//   },
//   registerText: {
//     marginTop: 15,
//     color: "#007bff",
//     fontSize: 16,
//   },
// });

// export default LoginPage;
import { BASE_URL } from '../config'; // adjust the path



import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet, Image
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';

const LoginScreen = () => {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword]       = useState('');
  const navigation = useNavigation();

  const handleLogin = async () => {
    try {
      const res = await axios.post(`${BASE_URL}/users/login`, {
        emailOrPhone: identifier,
        password
      });
      const { token } = res.data;
      await AsyncStorage.setItem('token', res.data.token);
      await AsyncStorage.setItem('user', JSON.stringify(res.data.user));

      navigation.navigate("Profile");
    } catch (err) {
      console.error(err);
      Alert.alert('Login Failed', err?.response?.data?.message || 'Please check your credentials.');

    }
  };

  return (
    <View style={styles.container}>
      {/* Back arrow */}
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={28} color="#fff" />
      </TouchableOpacity>

      <Text style={styles.title}>MED PRO</Text>
      <Text style={styles.subtitle}>Login</Text>

      {/* Email / Phone */}
      <View style={styles.inputWrapper}>
        <Ionicons name="mail-outline" size={20} color="#888" />
        <TextInput
          style={styles.input}
          placeholder="Enter your email / ph. number"
          placeholderTextColor="#aaa"
          value={identifier}
          onChangeText={setIdentifier}
        />
      </View>

      {/* Password */}
      <View style={styles.inputWrapper}>
        <Ionicons name="lock-closed-outline" size={20} color="#888" />
        <TextInput
          style={styles.input}
          placeholder="Enter your password"
          placeholderTextColor="#aaa"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
      </View>

      <TouchableOpacity style={styles.forgot}>
        <Text style={styles.forgotText}>Forgot Password?</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginText}>Login</Text>
      </TouchableOpacity>

      <Text style={styles.bottomText}>
        Don't have an account?{' '}
        <Text
          style={{ fontWeight: 'bold' }}
          onPress={() => navigation.navigate('SignUp')}
        >
          Sign Up
        </Text>
      </Text>

      {/* Social buttons */}
      <View style={styles.orRow}>
        <View style={styles.line} />
        <Text style={styles.orText}>OR</Text>
        <View style={styles.line} />
      </View>

      {/** Google **/}
      <TouchableOpacity style={styles.socialButton}>
        <FontAwesome5 name="google" size={18} />
        <Text style={styles.socialText}>Sign in with Google</Text>
      </TouchableOpacity>

      {/** Apple **/}
      <TouchableOpacity style={styles.socialButton}>
        <FontAwesome5 name="apple" size={18} />
        <Text style={styles.socialText}>Sign in with Apple</Text>
      </TouchableOpacity>

      {/** Facebook **/}
      <TouchableOpacity style={styles.socialButton}>
        <FontAwesome5 name="facebook" size={18} />
        <Text style={styles.socialText}>Sign in with Facebook</Text>
      </TouchableOpacity>

      <View style={{ flex: 1 }} />
      {/* <BottomTabs /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#a2b1a8',
    padding: 20,
  },
  title: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 10,
  },
  subtitle: {
    color: '#fff',
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 30,
  },
  inputWrapper: {
    flexDirection: 'row',
    backgroundColor: '#e1e5e3',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
    marginBottom: 15,
  },
  input: {
    flex: 1,
    marginLeft: 8,
    color: '#333',
  },
  forgot: {
    alignSelf: 'flex-end',
    marginBottom: 20,
  },
  forgotText: {
    color: '#fff',
  },
  loginButton: {
    backgroundColor: '#345c45',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  loginText: {
    color: '#fff',
    fontSize: 16,
  },
  bottomText: {
    color: '#fff',
    textAlign: 'center',
    marginVertical: 15,
  },
  orRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#fff',
  },
  orText: {
    color: '#fff',
    marginHorizontal: 8,
  },
  socialButton: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 6,
  },
  socialText: {
    marginLeft: 10,
    fontSize: 14,
  },
});

export default LoginScreen;
