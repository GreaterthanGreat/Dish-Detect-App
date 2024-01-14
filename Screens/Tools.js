import React, { useState } from 'react';
import { TextInput, View, Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Tools = ({ navigation }) => {
  const [ingredients, setIngredients] = useState('');

  const handleSearchRecipes = () => {
    navigation.navigate('Tools2', { ingredients });
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../assets/Image4.jpeg')}
        style={styles.imageBackground}
        resizeMode="cover"
      >
        <View style={styles.contentContainer}>
          <Text style={styles.text}>Enter Below The Ingredients That You Want Your Recipe To Contain!</Text>
          <TextInput
            style={styles.input}
            value={ingredients}
            placeholder="Enter Ingredients (Use Comma)"
            onChangeText={(text) => setIngredients(text)}
          />
          <TouchableOpacity onPress={handleSearchRecipes} style={styles.buttonContainer}>
            <Text style={styles.buttonText}>Generate Recipes</Text>
          </TouchableOpacity>
          <MaterialCommunityIcons name="food-apple" color="black" style={styles.icon} />
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontWeight: 'bold',
    fontSize: 25,
    marginBottom: 70,
    textAlign: 'center',
    fontFamily: 'Arial',
    color: 'black',
  },
  input: {
    fontWeight: 'bold',
    fontSize: 22,
    marginBottom: 30,
    textAlign: 'center',
    padding: 10,
    backgroundColor: 'grey',
    borderRadius: 22,
    color: 'white',
  },
  buttonContainer: {
    borderRadius: 50,
    width: '80%',
    marginTop: 30,
    backgroundColor: 'black',
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 30,
    color: 'black',
    textAlign: 'center',
    padding: 10,
    color: "white"
  },
  icon: {
    marginTop: 80,
    fontSize: 180,
    alignItems: 'center',
  },
});

export default Tools;