const mongoose = require('mongoose');

const IngredientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  quantity: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model(
  'Ingredient',
  IngredientSchema
);