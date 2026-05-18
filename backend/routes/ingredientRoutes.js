const express = require('express');
const router = express.Router();

const Ingredient = require('../models/Ingredient');


// GET all ingredients
router.get('/', async (req, res) => {
  try {
    const ingredients =
      await Ingredient.find();

    res.json(ingredients);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});


// ADD ingredient
router.post('/', async (req, res) => {
  try {
    const ingredient =
      new Ingredient(req.body);

    const savedIngredient =
      await ingredient.save();

    res.status(201).json(savedIngredient);
  } catch (error) {
    res.status(400).json({
      message: error.message
    });
  }
});


// DELETE ingredient
router.delete('/:id', async (req, res) => {
  try {
    await Ingredient.findByIdAndDelete(
      req.params.id
    );

    res.json({
      message:
        'Ingredient deleted'
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});

module.exports = router;