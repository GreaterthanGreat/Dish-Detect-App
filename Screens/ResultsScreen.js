import React from 'react';
import { View, Text, Button, StyleSheet, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';

const ResultsScreen = ({ route }) => {
  const { result } = route.params;
  const navigation = useNavigation();

  if (!result || !result.food_name) {
    return (
      <View style={styles.container}>
        <Text style={styles.noResultText}>No result available</Text>
        <Button title="Go Back" onPress={() => navigation.goBack()} />
      </View>
    );
  }

  return (
    <ScrollView>
      <ImageBackground
        source={require('../assets/Image15.webp')} 
        style={styles.imageBackground}
        resizeMode="cover"
      > 
    <View style={styles.container}>
      <Text style={styles.title}>Food Name:</Text>
      <Text style={styles.foodName}>{result.food_name}</Text>

      <Text style={styles.title}>Nutritional Info:</Text>
      <Text style={styles.nutritionalInfo}>{formatNutritionalInfo(result.nutritional_info)}</Text>

      <Button title="Go Back to Camera" color='white' fontWeight='bold' onPress={() => navigation.goBack()} />
    </View>
    </ImageBackground>
    </ScrollView>
  );
};

const formatNutritionalInfo = (nutritionalInfo) => {

  return JSON.stringify(nutritionalInfo, null, 2);
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noResultText: {
    fontSize: 18,
    marginBottom: 16,
    color: 'white'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 16,
    color: 'white'
  },
  foodName: {
    fontSize: 24,
    marginBottom: 16,
    color: 'white'
  },
  nutritionalInfo: {
    fontSize: 21,
    marginTop: 5,
    lineHeight: 25,
    color: 'white'
  },
});

export default ResultsScreen;