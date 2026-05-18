import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

export default function PantryScreen() {
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [items, setItems] = useState([]);

  const addItem = () => {
    if (!name || !quantity) return;

    const newItem = {
      id: Date.now().toString(),
      name,
      quantity
    };

    setItems([...items, newItem]);
    setName('');
    setQuantity('');
  };

  const deleteItem = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  return (
    <View style={styles.container}>

      <Text style={styles.title}>🥫 Pantry</Text>

      <TextInput
        placeholder="Ingredient name (e.g. Rice)"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />

      <TextInput
        placeholder="Quantity (e.g. 2 kg)"
        value={quantity}
        onChangeText={setQuantity}
        style={styles.input}
      />

      <Button title="Add Item" onPress={addItem} />

      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        style={{ marginTop: 20 }}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>{item.name} - {item.quantity}</Text>

            <TouchableOpacity onPress={() => deleteItem(item.id)}>
              <Text style={styles.delete}>Delete</Text>
            </TouchableOpacity>
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