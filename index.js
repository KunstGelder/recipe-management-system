'use strict';

const prompt = require("prompt-sync")();
const cakeRecipes = require("./cake-recipes.json");

let savedRecipes = [];

// Functions

const logRecipeNames = (recipes) => {
  if (recipes.length === 0) {
    console.log("No recipes found.");
    return;
  }
  recipes.forEach(({ Name }) => console.log("- " + Name));
};

const getRecipesByAuthor = (recipes, author) => {
  return recipes.filter(
    (recipe) => recipe.Author.toLowerCase() === author.toLowerCase()
  );
};

const getRecipesByIngredient = (recipes, ingredient) => {
  return recipes.filter((recipe) =>
    recipe.Ingredients.some((ing) =>
      ing.toLowerCase().includes(ingredient.toLowerCase())
    )
  );
};

const getRecipeByName = (recipes, name) => {
  return recipes.find((recipe) =>
    recipe.Name.toLowerCase().includes(name.toLowerCase())
  );
};

const getAllIngredients = (recipes) => {
  return recipes.reduce((allIngredients, recipe) => {
    return allIngredients.concat(recipe.Ingredients);
  }, []);
};

const getUniqueAuthors = (recipes) => {
  const authors = [];
  recipes.forEach((recipe) => {
    if (!authors.includes(recipe.Author)) {
      authors.push(recipe.Author);
    }
  });
  return authors;
};

const saveRecipe = (recipe) => {
  savedRecipes.push(recipe);
  console.log(`Recipe "${recipe.Name}" has been saved.`);
};

// Part 2

const displayMenu = () => {
  console.log("\nRecipe Management System Menu:");
  console.log("1. Show All Authors");
  console.log("2. Show Recipe names by Author");
  console.log("3. Show Recipe names by Ingredient");
  console.log("4. Get Recipe by Name");
  console.log("5. Get All Ingredients of Saved Recipes");
  console.log("0. Exit");
  const choice = prompt("Enter a number (1-5) or 0 to exit: ");
  return parseInt(choice);
};

let choice;

do {
  choice = displayMenu();

  switch (choice) {
    case 1: {
      const authors = getUniqueAuthors(cakeRecipes);
      if (authors.length === 0) {
        console.log("No authors found.");
      } else {
        console.log("Authors:");
        authors.forEach((author) => console.log("- " + author));
      }
      break;
    }

    case 2: {
      const author = prompt("Enter the author's name: ");
      const recipesByAuthor = getRecipesByAuthor(cakeRecipes, author);
      logRecipeNames(recipesByAuthor);
      break;
    }

    case 3: {
      const ingredient = prompt("Enter the ingredient: ");
      const recipesByIngredient = getRecipesByIngredient(
        cakeRecipes,
        ingredient
      );
      logRecipeNames(recipesByIngredient);
      break;
    }

    case 4: {
      const name = prompt("Enter the recipe name: ");
      const recipe = getRecipeByName(cakeRecipes, name);
      if (recipe) {
        console.log("\nRecipe found:");
        console.log(recipe);

        const save = prompt("Would you like to save this recipe? (yes/no): ");
        if (save.toLowerCase() === "yes") {
          saveRecipe(recipe);
        }
      } else {
        console.log("Recipe not found.");
      }
      break;
    }

    case 5: {
      const allIngredients = getAllIngredients(savedRecipes);
      if (allIngredients.length === 0) {
        console.log("No ingredients found from saved recipes.");
      } else {
        console.log("Ingredients from saved recipes:");
        allIngredients.forEach((ingredient) => console.log("- " + ingredient));
      }
      break;
    }

    case 0:
      console.log("Exiting...");
      break;

    default:
      console.log("Invalid input. Please enter a number between 0 and 5.");
  }
} while (choice !== 0);
