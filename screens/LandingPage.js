import React, { useEffect } from 'react';
import {
  View,
  Image,
  StyleSheet,
  StatusBar
} from 'react-native';

const LandingPage = ({ navigation }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Help');
    }, 3000); // 3 seconds delay

    return () => clearTimeout(timer); // cleanup on unmount
  }, [navigation]);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#b1c9bb" />
      <Image
        source={require('../assets/medpro.png')}
        style={styles.logo}
        resizeMode="contain"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#b1c9bb',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 250,
    height: 250,
  }
});

export default LandingPage;
