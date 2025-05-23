import axiosInstance  from '../config'; // adjust the path
import React, { useEffect, useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet, Image
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import { BackHandler } from 'react-native';
import Constants from 'expo-constants';
import { Alert } from 'react-native';

const statusBarHeight = Constants.statusBarHeight;

const LoginPage = () => {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword]       = useState('');
  const navigation = useNavigation();

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        BackHandler.exitApp(); // Exit the app
        return true;
      };
  
      const subscription = BackHandler.addEventListener(
        'hardwareBackPress',
        onBackPress
      );
  
      return () => subscription.remove();
    }, [])
  );
  

  const handleLogin = async () => {
    try {
      const res = await axiosInstance.post('/users/login', {
        emailOrPhone: identifier,
        password: password,
      });
      // console.log('Login response:', res.data);
      // const { token } = res.data;
      await AsyncStorage.setItem('token', res.data.token);
      await AsyncStorage.setItem('user', JSON.stringify(res.data.user));
      // console.log("hehehe", await AsyncStorage.getItem('token'));
      setIdentifier('');
      setPassword('');
      navigation.navigate('Main', {
        screen: 'Home',
        params: { user: res.data.user }
      });
    } catch (err) {
      // console.error(err);
      Alert.alert('Login Failed', err?.response?.data?.message || 'Please check your credentials.');

    }
    
  };
  
  return (
    <View style={styles.container}>
      {/*
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={28} color="#fff" />
      </TouchableOpacity> */}
      <Image
        source={require('../assets/medpro.png')}
        style={{ width: 200, height: 200, alignSelf: 'center', marginBottom: 20 }}
        resizeMode="contain"
      />
      {/* <Text style={styles.title}>MED PRO</Text> */}
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

      <TouchableOpacity
  style={styles.forgot}
  onPress={() => navigation.navigate('ForgotP')}
>
  <Text style={styles.forgotText}>Forgot Password?</Text>
</TouchableOpacity>


      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginText}>Login</Text>
      </TouchableOpacity>

      <Text style={styles.bottomText}>
        Don't have an account?{' '}
        <Text
          style={{ fontWeight: 'bold' }}
          onPress={() => navigation.navigate('Signup')}
        >
          Sign Up
        </Text>
      </Text>

      {/* <View style={styles.orRow}>
        <View style={styles.line} />
        <Text style={styles.orText}>OR</Text>
        <View style={styles.line} />
      </View>

      <TouchableOpacity style={styles.socialButton}>
        <FontAwesome5 name="google" size={18} />
        <Text style={styles.socialText}>Sign in with Google</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.socialButton}>
        <FontAwesome5 name="apple" size={18} />
        <Text style={styles.socialText}>Sign in with Apple</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.socialButton}>
        <FontAwesome5 name="facebook" size={18} />
        <Text style={styles.socialText}>Sign in with Facebook</Text>
      </TouchableOpacity>

      <View style={{ flex: 1 }} /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#a2b1a8',
    padding: 50,
    paddingTop: statusBarHeight + 10,
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
    fontSize: 36,
    fontWeight: 'bold',

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

export default LoginPage;
