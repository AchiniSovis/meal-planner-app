import React, { useState } from 'react';
import { View, Text, FlatList, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';

export default function ShoppingScreen() {
  const [item, setItem] = useState('');
  const [list, setList] = useState([]);

  const addItem = () => {
    if (!item) return;

    const newItem = {
      id: Date.now().toString(),
      name: item,
      bought: false
    };

    setList([...list, newItem]);
    setItem('');
  };

  const toggleBought = (id) => {
    setList(
      list.map(i =>
        i.id === id ? { ...i, bought: !i.bought } : i
      )
    );
  };

  const deleteItem = (id) => {
    setList(list.filter(i => i.id !== id));
  };

  return (
    <View style={styles.container}>

      <Text style={styles.title}>🛒 Shopping List</Text>

      <TextInput
        placeholder="Add item (e.g. Tomato)"
        value={item}
        onChangeText={setItem}
        style={styles.input}
      />

      <Button title="Add Item" onPress={addItem} />

      <FlatList
        data={list}
        keyExtractor={(item) => item.id}
        style={{ marginTop: 20 }}
        renderItem={({ item }) => (
          <View style={styles.row}>

            <TouchableOpacity onPress={() => toggleBought(item.id)}>
              <Text style={[
                styles.item,
                item.bought && styles.bought
              ]}>
                {item.name}
              </Text>
            </TouchableOpacity>

            <Text style={styles.delete} onPress={() => deleteItem(item.id)}>
              X
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
    borderRadius: 8,
    marginBottom: 10
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 12,
    borderBottomWidth: 1
  },
  item: {
    fontSize: 16
  },
  bought: {
    textDecorationLine: 'line-through',
    color: 'green'
  },
  delete: {
    color: 'red',
    fontWeight: 'bold'
  }
});