import React from 'react';
import { View, Text, SafeAreaView, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 

const Home = ({ navigation }) => {
  const handleCameraPress = () => {
    navigation.navigate('Scan');
    console.log('Scan button is pressed');
  };

  return (
    <SafeAreaView style={styles.wrapper}>
      <ImageBackground
        source={require('../assets/Image16.jpeg')}
        style={styles.imageBackground}
        resizeMode="cover"
      >
        <View style={styles.container}>
          <Text style={styles.title}>
            Dish Detect 
          </Text>
          <Text style={styles.header}>
            Eat Healthy With The Help Of AI
          </Text>
          <Text style={styles.caption}> 
          Discover tailored recipes with our Generate Screen and find nutritional values effortlessly on Scan Screen.
          </Text>
          <Ionicons name="fast-food-sharp" color="black" style={styles.icon} />
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={handleCameraPress}
          >
            <Text style={styles.cameraButtonText}>Scan</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  imageBackground: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 55,
    fontFamily: 'Impact',
    marginTop: 35,
    marginBottom: 15,
    color: 'black',
  },
  header: {
    marginTop: 5,
    fontSize: 25,
    marginBottom: 20,
    color: 'black',
  },
  buttonContainer: {
    backgroundColor: 'black',
    borderRadius: 100,
    paddingVertical: 10,
    paddingHorizontal: 35,
    marginTop: 90,
  },
  cameraButtonText: {
    color: 'white',
    fontSize: 40,
    textAlign: 'center',
  },
  caption: {
    fontSize: 15,
    textAlign: 'center',
    padding: 30,
    marginTop: -25,
    color: 'black'
  },
  icon: {
    marginTop: 40,
    fontSize: 190,
    color: "black" 
  }

});

export default Home;