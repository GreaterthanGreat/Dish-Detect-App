import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../../Screens/Home';
import CameraScreen from '../../Screens/CameraScreen';
import ResultsScreen from '../../Screens/ResultsScreen';
import Tools from '../../Screens/Tools';
import Tools2 from '../../Screens/Tools2';
import { MaterialCommunityIcons, FontAwesome, AntDesign } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const ToolsStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Tools" component={Tools} />
      <Stack.Screen name="Tools2" component={Tools2} />
    </Stack.Navigator>
  );
};

const CameraResultsStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Camera" component={CameraScreen} />
      <Stack.Screen
        name="ResultsScreen" 
        component={ResultsScreen}
        initialParams={{ result: { food_name: '', nutritional_info: {} } }}
      />
    </Stack.Navigator>
  );
};

const Tabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: 'black',
        tabBarInactiveTintColor: 'grey',
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ focused }) => (
            <FontAwesome name={'home'} size={25} color={focused ? 'black' : 'grey'} />
          ),
        }}
      />

      <Tab.Screen
        name="Generate"
        component={ToolsStack}
        options={{
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons name={'nutrition'} size={25} color={focused ? 'black' : 'grey'} />
          ),
        }}
      />

      <Tab.Screen
        name="Scan"
        component={CameraResultsStack}
        options={{
          tabBarIcon: ({ focused }) => (
            <AntDesign name={'camera'} size={25} color={focused ? 'black' : 'grey'} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default Tabs;