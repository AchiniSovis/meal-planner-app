import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';

import HomeScreen from '../screens/HomeScreen';
import PantryScreen from '../screens/PantryScreen';
import RecipesScreen from '../screens/RecipesScreen';
import PlannerScreen from '../screens/PlannerScreen';
import ShoppingScreen from '../screens/ShoppingScreen';

const Tab = createBottomTabNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Pantry" component={PantryScreen} />
        <Tab.Screen name="Recipes" component={RecipesScreen} />
        <Tab.Screen name="Planner" component={PlannerScreen} />
        <Tab.Screen name="Shopping" component={ShoppingScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}