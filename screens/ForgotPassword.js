import React, { use, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; // Ensure you have vector icons installed
import { useNavigation } from '@react-navigation/native';
import Constants from 'expo-constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axiosInstance from '../config';
import { useRoute } from '@react-navigation/native';

const ForgotPassword = () => {
  const [mode, setMode] = useState('email'); // 'email' or 'phone'
  const [inputValue, setInputValue] = useState('');
  const handleForgotPassword = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const res = await axiosInstance.post(
        '/users/forgot-password',
        {
          [mode]: inputValue,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert('Password reset link sent to your email/phone');
    } catch (error) {
      console.error('Error sending password reset link:', error.message);
    }
  }
  // useEffect(() => {
  //   handleForgotPassword();
  // }, [inputValue]);
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ADCBB6" />
      <View style={styles.header}>
        <TouchableOpacity>
          <Icon name="arrow-back" size={24} color="#2E4F3D" />
        </TouchableOpacity>
        <View style={{ alignItems: 'center', marginTop: 8, marginLeft: 90 }}>
            <Text style={styles.title}>MED PRO</Text>
        </View>


      </View>

      <Text style={styles.heading}>Forgot Your Password?</Text>
      <Text style={styles.subtext}>
        Enter your email, we will send you a confirmation code
      </Text>

      <View style={styles.toggleContainer}>
        <TouchableOpacity
          style={[
            styles.toggleButton,
            mode === 'email' && styles.toggleButtonActive,
          ]}
          onPress={() => setMode('email')}
        >
          <Text
            style={[
              styles.toggleText,
              mode === 'email' && styles.toggleTextActive,
            ]}
          >
            Email
          </Text>
        </TouchableOpacity>

        {/* <TouchableOpacity
          style={[
            styles.toggleButton,
            mode === 'phone' && styles.toggleButtonActive,
          ]}
          onPress={() => setMode('phone')}
        >
          <Text
            style={[
              styles.toggleText,
              mode === 'phone' && styles.toggleTextActive,
            ]}
          >
            Phone
          </Text>
        </TouchableOpacity> */}
      </View>

      <View style={styles.inputWrapper}>
        <Icon
          name={mode === 'email' ? 'mail-outline' : 'call-outline'}
          size={20}
          color="#2E4F3D"
          style={{ marginRight: 10 }}
        />
        <TextInput
          placeholder={mode === 'email' ? 'you@example.com' : '03001234567'}
          value={inputValue}
          onChangeText={setInputValue}
          style={styles.input}
          keyboardType={mode === 'phone' ? 'phone-pad' : 'email-address'}
        />
        <Icon name="checkmark-circle-outline" size={20} color="gray" />
      </View>

      <TouchableOpacity style={styles.resetButton} onPress={handleForgotPassword}>
        <Text style={styles.resetText}>Reset Password</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#a2b1a8',
      padding: 16,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
      marginBottom: 16,
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center', // <-- center the text
        color: '#2E4F3D',
        marginTop: 20,
      },
    heading: {
      fontSize: 22,
      fontWeight: 'bold',
      color: '#2E4F3D',
      marginBottom: 8,
    },
    subtext: {
      fontSize: 14,
      color: '#2E4F3D',
      marginBottom: 20,
    },
    toggleContainer: {
      flexDirection: 'row',
      backgroundColor: '#E6E6E6',
      borderRadius: 10,
      padding: 4,
      marginBottom: 20,
    },
    toggleButton: {
      flex: 1,
      paddingVertical: 8,
      alignItems: 'center',
      borderRadius: 8,
    },
    toggleButtonActive: {
      backgroundColor: '#FFFFFF',
    },
    toggleText: {
      color: '#2E4F3D',
      fontWeight: 'bold',
    },
    toggleTextActive: {
      color: '#2E4F3D',
    },
    inputWrapper: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#DFE5E0',
      borderRadius: 10,
      paddingHorizontal: 12,
      paddingVertical: 10,
      marginBottom: 20,
    },
    input: {
      flex: 1,
      fontSize: 16,
      color: '#2E4F3D',
    },
    resetButton: {
      backgroundColor: '#345c45',
      paddingVertical: 12,
      borderRadius: 10,
      alignItems: 'center',
    },
    resetText: {
      color: '#fff',
      fontWeight: 'bold',
      fontSize: 16,
    },
  });
  

export default ForgotPassword;
