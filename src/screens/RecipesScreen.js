import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { RECIPES } from '../data/recipes';

export default function RecipesScreen() {
  // pretend pantry data (later we connect real pantry)
  const pantryItems = ['rice', 'chicken', 'onion', 'garlic'];

  const getMatchScore = (recipe) => {
    const matches = recipe.ingredients.filter(item =>
      pantryItems.includes(item)
    );

    return Math.round((matches.length / recipe.ingredients.length) * 100);
  };

  const renderRecipe = ({ item }) => {
    const score = getMatchScore(item);

    return (
      <View style={styles.card}>
        <Text style={styles.title}>{item.name}</Text>
        <Text>⏱ {item.time} mins</Text>

        <Text style={styles.score}>
          Match: {score}%
        </Text>

        {score === 100 && (
          <Text style={styles.cookable}>✅ You can cook this</Text>
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>🍽 Recipes</Text>

      <FlatList
        data={RECIPES}
        keyExtractor={(item) => item.id}
        renderItem={renderRecipe}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10
  },
  card: {
    padding: 15,
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 10
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  score: {
    marginTop: 5,
    color: 'blue'
  },
  cookable: {
    marginTop: 5,
    color: 'green',
    fontWeight: 'bold'
  }
});