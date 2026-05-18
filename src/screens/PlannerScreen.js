import React, { useState } from 'react';
import { View, Text, FlatList, TextInput, Button, StyleSheet } from 'react-native';

export default function PlannerScreen() {
  const [day, setDay] = useState('');
  const [meal, setMeal] = useState('');
  const [plan, setPlan] = useState([]);

  const addPlan = () => {
    if (!day || !meal) return;

    const newPlan = {
      id: Date.now().toString(),
      day,
      meal
    };

    setPlan([...plan, newPlan]);
    setDay('');
    setMeal('');
  };

  const deletePlan = (id) => {
    setPlan(plan.filter(item => item.id !== id));
  };

  return (
    <View style={styles.container}>

      <Text style={styles.title}>📅 Meal Planner</Text>

      <TextInput
        placeholder="Day (e.g. Monday)"
        value={day}
        onChangeText={setDay}
        style={styles.input}
      />

      <TextInput
        placeholder="Meal (e.g. Chicken Rice)"
        value={meal}
        onChangeText={setMeal}
        style={styles.input}
      />

      <Button title="Add Plan" onPress={addPlan} />

      <FlatList
        data={plan}
        keyExtractor={(item) => item.id}
        style={{ marginTop: 20 }}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>{item.day} → {item.meal}</Text>
            <Text style={styles.delete} onPress={() => deletePlan(item.id)}>
              Delete
            </Text>
          </View>
        )}
      />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20
  },
  input: {
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
    borderRadius: 8
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 12,
    borderBottomWidth: 1
  },
  delete: {
    color: 'red',
    fontWeight: 'bold'
  }
});