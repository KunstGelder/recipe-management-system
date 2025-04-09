'use strict';

const prompt = require("prompt-sync")();
const cakeRecipes = require("./cake-recipes.json");

let savedRecipes = [];

// === Functions (All declared outside the switch) ===

// Logs all recipe names in a list
function logRecipeNames(recipes) {
  if (recipes.length === 0) {
    console.log("No recipes found.");
    return;
  }
  recipes.forEach(function (recipe) {
    console.log("- " + recipe.Name);
  });
}

// Returns recipes by a specific author (case-insensitive)
function getRecipesByAuthor(recipes, author) {
  return recipes.filter(function (recipe) {
    return recipe.Author.toLowerCase() === author.toLowerCase();
  });
}

// Returns recipes that contain a specific ingredient (partial match, case-insensitive)
function getRecipesByIngredient(recipes, ingredient) {
  return recipes.filter(function (recipe) {
    return recipe.Ingredients.some(function (ing) {
      return ing.toLowerCase().includes(ingredient.toLowerCase());
    });
  });
}

// Finds a recipe by name (case-insensitive, partial match)
function getRecipeByName(recipes, name) {
  return recipes.find(function (recipe) {
    return recipe.Name.toLowerCase().includes(name.toLowerCase());
  });
}

// Combines all ingredients from saved recipes
function getAllIngredients(recipes) {
  return recipes.reduce(function (allIngredients, recipe) {
    return allIngredients.concat(recipe.Ingredients);
  }, []);
}

// Returns a list of unique authors from the recipes
function getUniqueAuthors(recipes) {
  const authors = [];
  recipes.forEach(function (recipe) {
    if (!authors.includes(recipe.Author)) {
      authors.push(recipe.Author);
    }
  });
  return authors;
}

// Saves a recipe to the savedRecipes array
function saveRecipe(recipe) {
  savedRecipes.push(recipe);
  console.log(`Recipe "${recipe.Name}" has been saved.`);
}

// Displays the main menu and returns the user's choice
function displayMenu() {
  console.log("\nRecipe Management System Menu:");
  console.log("1. Show All Authors");
  console.log("2. Show Recipe names by Author");
  console.log("3. Show Recipe names by Ingredient");
  console.log("4. Get Recipe by Name");
  console.log("5. Get All Ingredients of Saved Recipes");
  console.log("0. Exit");
  const choice = prompt("Enter a number (1-5) or 0 to exit: ");
  return parseInt(choice);
}

// === Program Execution ===

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
        authors.forEach(function (author) {
          console.log("- " + author);
        });
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
      const recipesByIngredient = getRecipesByIngredient(cakeRecipes, ingredient);
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
        allIngredients.forEach(function (ingredient) {
          console.log("- " + ingredient);
        });
      }
      break;
    }

    case 0: {
      console.log("Exiting...");
      break;
    }

    default: {
      console.log("Invalid input. Please enter a number between 0 and 5.");
    }
  }
} while (choice !== 0);
