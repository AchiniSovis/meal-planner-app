import React, { useState, useMemo } from 'react';
import { View, Text, FlatList, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { getMissingIngredients } from '../utils/smartEngine';
import { RECIPES } from '../data/recipes';

export default function ShoppingScreen() {
  const [item, setItem] = useState('');
  const [manualList, setManualList] = useState([]);

  // 🥫 mock pantry (later connect real pantry state)
  const pantry = [
    { name: 'rice' },
    { name: 'chicken' },
    { name: 'onion' }
  ];

  // 🧠 AUTO GENERATED LIST (SMART ENGINE)
  const autoList = useMemo(() => {
    const missing = getMissingIngredients(RECIPES, pantry);

    return missing.map((name, index) => ({
      id: `auto-${index}`,
      name,
      bought: false,
      type: 'auto'
    }));
  }, []);

  // ➕ ADD MANUAL ITEM
  const addItem = () => {
    if (!item) return;

    const newItem = {
      id: Date.now().toString(),
      name: item,
      bought: false,
      type: 'manual'
    };

    setManualList([...manualList, newItem]);
    setItem('');
  };

  // 🔁 TOGGLE BOUGHT
  const toggleBought = (id) => {
    const updateList = (list) =>
      list.map(i =>
        i.id === id ? { ...i, bought: !i.bought } : i
      );

    setManualList(updateList(manualList));
  };

  // ❌ DELETE ITEM
  const deleteItem = (id) => {
    setManualList(manualList.filter(i => i.id !== id));
  };

  // 🔀 MERGED LIST (AUTO + MANUAL)
  const fullList = [...autoList, ...manualList];

  return (
    <View style={styles.container}>

      <Text style={styles.title}>🛒 Shopping List</Text>

      {/* INPUT */}
      <TextInput
        placeholder="Add item (e.g. Tomato)"
        value={item}
        onChangeText={setItem}
        style={styles.input}
      />

      <Button title="Add Item" onPress={addItem} />

      {/* LIST */}
      <FlatList
        data={fullList}
        keyExtractor={(item) => item.id}
        style={{ marginTop: 20 }}
        renderItem={({ item }) => (
          <View style={styles.row}>

            <TouchableOpacity onPress={() => toggleBought(item.id)}>
              <Text style={[
                styles.item,
                item.bought && styles.bought
              ]}>
                {item.name} {item.type === 'auto' ? '🤖' : ''}
              </Text>
            </TouchableOpacity>

            {item.type === 'manual' && (
              <Text
                style={styles.delete}
                onPress={() => deleteItem(item.id)}
              >
                X
              </Text>
            )}

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