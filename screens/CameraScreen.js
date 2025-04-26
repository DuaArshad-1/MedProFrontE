import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Camera } from 'expo-camera';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const CameraScreen = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraReady, setCameraReady] = useState(false);
  const [photoUri, setPhotoUri] = useState(null);
  const cameraRef = useRef(null);
  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const takePicture = async () => {
    if (cameraRef.current && cameraReady) {
      const photo = await cameraRef.current.takePictureAsync();
      setPhotoUri(photo.uri);
    }
  };

  if (hasPermission === null) {
    return <View><Text>Requesting for camera permission...</Text></View>;
  }
  if (hasPermission === false) {
    return <View><Text>No access to camera</Text></View>;
  }

  return (
    <View style={styles.container}>
      {!photoUri ? (
        <>
          <Camera
            style={styles.camera}
            type={Camera.Constants.Type.back}
            ref={cameraRef}
            onCameraReady={() => setCameraReady(true)}
          />
          <TouchableOpacity style={styles.captureButton} onPress={takePicture}>
            <Ionicons name="camera" size={36} color="white" />
          </TouchableOpacity>
        </>
      ) : (
        <View style={styles.previewContainer}>
          <Image source={{ uri: photoUri }} style={styles.preview} />
          <TouchableOpacity style={styles.retakeButton} onPress={() => setPhotoUri(null)}>
            <Text style={styles.retakeText}>Retake</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'black' },
  camera: { flex: 1 },
  captureButton: {
    position: 'absolute',
    bottom: 30,
    alignSelf: 'center',
    backgroundColor: '#555',
    padding: 20,
    borderRadius: 50,
  },
  previewContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  preview: { width: '90%', height: '70%', borderRadius: 20 },
  retakeButton: {
    marginTop: 20,
    backgroundColor: '#345c45',
    padding: 10,
    borderRadius: 10,
  },
  retakeText: { color: 'white', fontSize: 16 },
});

export default CameraScreen;
