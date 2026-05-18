export function getMissingIngredients(recipes, pantryItems) {
  const pantryNames = pantryItems.map(i => i.name.toLowerCase());

  let missing = [];

  recipes.forEach(recipe => {
    recipe.ingredients.forEach(ingredient => {
      if (!pantryNames.includes(ingredient.toLowerCase())) {
        missing.push(ingredient);
      }
    });
  });

  // remove duplicates
  return [...new Set(missing)];
}