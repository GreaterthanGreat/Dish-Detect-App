import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, ActivityIndicator, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { API_KEY } from '@env';

const Tools2 = ({ navigation }) => {
  const route = useRoute();
  const [loading, setLoading] = useState(true);
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const ingredientsArray = route.params.ingredients.split(',').map((ingredient) => ingredient.trim());

        const response = await fetch(`https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredientsArray.join(',')}&number=10&limitLicense=true&ranking=1&ignorePantry=true&apiKey=${API_KEY}` );
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setRecipes(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching recipes:', error);
        setLoading(false);
      }
    };

    fetchRecipes();
  }, [route.params.ingredients]);

  const handleNavigateBack = () => {
    navigation.navigate('Tools');
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="green" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../assets/Image3.jpeg')} 
        style={styles.imageBackground}
        resizeMode="cover"
      > 
        <Text style={styles.title}>GENERATED RECIPES! ENJOY!</Text>
        <FlatList
          data={recipes}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.recipeContainer}>
              <Image source={{ uri: item.image }} style={styles.recipeImage} />
              <Text style={styles.recipeTitle}>{item.title}</Text>
            </View>
          )}
        />
        <TouchableOpacity onPress={handleNavigateBack} style={styles.button}>
          <Text style={styles.buttonText}>Back to Search</Text>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageBackground: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 30,
    marginTop: 40,
    textDecorationLine: 'underline',
    fontFamily: 'Impact'
   
  },
  recipeContainer: {
    marginBottom: 10,
    alignItems: 'center',
  },
  recipeImage: {
    width: 200,
    height: 120,
    borderRadius: 5,
  },
  recipeTitle: {
    marginTop: 10,
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
  },
  button: {
    backgroundColor: 'black',
    padding: 10,
    borderRadius: 10,
    marginTop: 20,
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 20,
    color: 'white',
    textAlign: 'center',
  },
});

export default Tools2;