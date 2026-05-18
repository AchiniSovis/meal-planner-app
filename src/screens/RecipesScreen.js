import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { RECIPES } from '../data/recipes';

export default function RecipesScreen() {
  const [pantry] = useState([
    { name: 'rice' },
    { name: 'chicken' },
    { name: 'onion' },
    { name: 'garlic' }
  ]);

  const getScore = (recipe) => {
    const pantryNames = pantry.map(i => i.name);

    const matches = recipe.ingredients.filter(item =>
      pantryNames.includes(item)
    );

    return Math.round((matches.length / recipe.ingredients.length) * 100);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🍽 Smart Recipes</Text>

      <FlatList
        data={RECIPES}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          const score = getScore(item);

          return (
            <View style={styles.card}>
              <Text style={styles.name}>{item.name}</Text>

              <Text>Match: {score}%</Text>

              {score === 100 && (
                <Text style={styles.cookable}>✅ Can Cook Now</Text>
              )}

              {score < 100 && (
                <Text style={styles.missing}>
                  ⚠ Missing ingredients
                </Text>
              )}
            </View>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  card: { padding: 15, borderWidth: 1, marginBottom: 10, borderRadius: 10 },
  name: { fontSize: 18, fontWeight: 'bold' },
  cookable: { color: 'green', marginTop: 5 },
  missing: { color: 'orange', marginTop: 5 }
});