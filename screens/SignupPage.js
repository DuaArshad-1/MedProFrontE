
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // For icons
import axiosInstance from '../config'; // Adjust the import based on your project structure
import { useNavigation } from '@react-navigation/native';
import Constants from 'expo-constants';
import { Alert } from 'react-native';

const statusBarHeight = Constants.statusBarHeight;
const SignupPage = () => {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [errors, setErrors] = useState({});
  
  // State for success message
  const [successMessageVisible, setSuccessMessageVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleRegister = async () => {
    setErrors({}); // clear previous errors
    setErrorMessage('');

    try {
      const response = await axiosInstance.post("/users/register", {
        name,
        email,
        phone: phoneNumber,
        password,
      });
      setEmail('');
      setName('');
      setPassword('');
      setPhoneNumber('');
      setIsChecked(false);
      
      if (response.status === 201 || response.status === 200) {
        // Show success message
        setSuccessMessageVisible(true);
        // Hide success message after 3 seconds
        setTimeout(() => {
          setSuccessMessageVisible(false);
          // Navigate to Home page
          navigation.navigate("Main",{
            screen:'Home'
          });
        }, 3000);
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        const fieldErrors = error.response.data.errors || {};
        setErrors(fieldErrors);
        setErrorMessage("Invalid credentials.\n Name:test(no numbers should be there)\n Email:test123@gmail.com\n Phone: 03XXXXXXXXX\n Password:(should be greater than 6 characters) Please check your input and try again.");

      } else {
        // console.error("Registration error:", error.message);
        setErrorMessage("An error occurred while processing your request.");

      }
      setTimeout(() => {
        setErrorMessage('');
      }, 3000);

    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#7A9E8F" />
      
      <View style={styles.header}>
        <Text style={styles.title}>MED PRO</Text>
        <Text style={styles.subtitle}>Sign Up</Text>
      </View>

      <View style={styles.inputContainer}>
        <View style={styles.inputWrapper}>
          <Ionicons name="person-outline" size={20} color="gray" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Enter your name"
            value={name}
            onChangeText={setName}
          />
        </View>

        <View style={styles.inputWrapper}>
          <Ionicons name="mail-outline" size={20} color="gray" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Enter your email"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />
        </View>

        <View style={styles.inputWrapper}>
          <Ionicons name="call-outline" size={20} color="gray" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Enter your phone number"
            keyboardType="phone-pad"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
          />
        </View>

        <View style={styles.inputWrapper}>
          <Ionicons name="lock-closed-outline" size={20} color="gray" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Enter your password"
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Ionicons
              name={showPassword ? "eye-off-outline" : "eye-outline"}
              size={20}
              color="gray"
            />
          </TouchableOpacity>
        </View>

        <View style={styles.checkboxContainer}>
          <TouchableOpacity onPress={() => setIsChecked(!isChecked)} style={styles.checkbox}>
            {isChecked && <Ionicons name="checkmark" size={18} color="white" />}
          </TouchableOpacity>
          <Text style={styles.checkboxText}>
            I agree to the MedPro <Text style={styles.boldText}>Terms of Service</Text> and <Text style={styles.boldText}>Privacy Policy</Text>
          </Text>
        </View>

        <TouchableOpacity style={styles.signupButton} onPress={handleRegister}>
          <Text style={styles.signupButtonText}>Signup</Text>
        </TouchableOpacity>

        {/* Show success message */}
        {successMessageVisible && (
          <View style={styles.successMessageContainer}>
            <Text style={styles.successMessage}>Signed up successfully ✔</Text>
          </View>
        )}

        {errorMessage !== '' && (
          <View style={styles.errorMessageContainer}>
            <Text style={styles.errorMessage}>{errorMessage}</Text>
          </View>
        )}

      </View>
    </SafeAreaView>
  );
};

export default SignupPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#a2b1a8',
  },
  header: {
    paddingTop: statusBarHeight + 30,
    alignItems: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#1B1B1B',
  },
  error: {
    color: "red",
    alignSelf: "flex-start",
    marginBottom: 10,
    fontSize: 14,
    paddingLeft: 5,
  },
  subtitle: {
    fontSize: 22,
    marginTop: 5,
    color: '#F3F5F3',
  },
  inputContainer: {
    marginTop: 30,
    paddingHorizontal: 20,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F5F3',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 12,
    marginBottom: 20,
  },
  icon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    flexWrap: 'wrap',
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 4,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#aaa',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  checkboxText: {
    fontSize: 13,
    color: '#1B1B1B',
    flexShrink: 1,
  },
  boldText: {
    fontWeight: 'bold',
  },
  signupButton: {
    backgroundColor: '#345c45',
    paddingVertical: 15,
    borderRadius: 20,
    marginTop: 20,
    alignItems: 'center',
  },
  signupButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  successMessageContainer: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -150 }, { translateY: -25 }],
    backgroundColor: '#4CAF50',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    zIndex: 1,
    alignSelf: 'center',
  },
  successMessage: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  errorMessageContainer: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -150 }, { translateY: -25 }],
    backgroundColor: '#f44336',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    zIndex: 1,
  },
  errorMessage: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },

});