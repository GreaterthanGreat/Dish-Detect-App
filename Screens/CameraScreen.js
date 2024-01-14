import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, Image, Text, Alert } from 'react-native';
import { Camera } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import Button from '../src/components/Button';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

export default function CameraScreen() {
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [image, setImage] = useState(null);
  const cameraRef = useRef(null);
  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      await requestPermissions();
    })();
  }, []);

  const requestPermissions = async () => {
    await MediaLibrary.requestPermissionsAsync();
    const cameraStatus = await Camera.requestCameraPermissionsAsync();
    setHasCameraPermission(cameraStatus.status === 'granted');
  };

  const takePicture = async () => {
    try {
      if (cameraRef) {
        const { uri } = await cameraRef.current.takePictureAsync();
        setImage(uri);
        analyzeFood(uri);
      }
    } catch (error) {
      console.error('Error taking picture:', error);
      Alert.alert('Error', 'Failed to capture image. Please try again.');
    }
  };

  const analyzeFood = async (imageUri) => {
    try {
      const formData = new FormData();
      formData.append('image', {
        uri: imageUri,
        type: 'image/jpeg',
        name: 'food_image.jpg',
      });

      const response = await axios.post('http://127.0.0.1:5000/analyze_food', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      navigation.navigate('ResultsScreen', { result: response.data });
    } catch (error) {
      console.error('Error When Analyzing Food:', error.message);
      Alert.alert('Error', 'Failed to analyze food. Please try again.');
    }
  };

  const saveImage = async () => {
    try {
      if (image) {
        await MediaLibrary.createAssetAsync(image);
        Alert.alert('Success', 'Picture has been saved.');
        setImage(null);
      }
    } catch (error) {
      console.error('Error saving image:', error);
      Alert.alert('Error', 'Failed to save image. Please try again.');
    }
  };

  const goBack = () => {
    navigation.goBack();
  };

  if (hasCameraPermission === false) {
    return <Text>Access to Camera has been Denied</Text>;
  }

  return (
    <View style={styles.wrapper}>
      {!image ? (
        <View style={styles.cameraContainer}>
          <Camera style={styles.camera} type={Camera.Constants.Type.back} ref={cameraRef} />
          <View style={styles.captureButtonContainer}>
            <Button title={'Capture'} onPress={takePicture} />
          </View>
        </View>
      ) : (
        <View style={styles.imageWrapper}>
          <Image source={{ uri: image }} style={styles.cameraImage} />
          <View style={styles.buttonContainer}>
            <Button title={'Save'} onPress={saveImage} />
            <Button title={'Re-capture'} onPress={() => setImage(null)} />
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
  },
  cameraContainer: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  imageWrapper: {
    flex: 1,
  },
  cameraImage: {
    flex: 1,
  },
  captureButtonContainer: {
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
    borderColor: 'white',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    padding: 25,
    position: 'absolute',
    bottom: 20,
    width: '100%',
  },
});