import { db } from "./config/firebase";

import { doc, setDoc, writeBatch } from "firebase/firestore";


const saveRecipesToFirebase = async (recipes) => {
  console.log("BUU");
  try {

    if (!Array.isArray(recipes) || recipes.length === 0) {
      console.error("No valid recipes to save.");
      return;
    }

    const batch = writeBatch(db);



    recipes.forEach((recipe) => {
      if (!recipe.id) {
        console.warn("Skipping recipe with missing ID:", recipe);
        return;
      }
      const recipeRef = doc(db, "recipes", recipe.id.toString());
      const recipeData = {
        title: recipe.title || "No title",
        image: recipe.image || "No image",
        readyInMinutes: recipe.readyInMinutes || 0,
        servings: recipe.servings || 0,
        ingredientsNames: recipe.extendedIngredients?.map((ing) => ing.nameClean) || [],
        ingredientsQuantity: recipe.extendedIngredients?.map((ing) => ing.original) || [],
          dishTypes: recipe.dishTypes?.map((type) => type) || [],
          steps: recipe.analyzedInstructions?.flatMap((steps) => ({
            step: steps.name || '',
            instructions: steps.steps.map((step) => (
              step.step
            ))

          })) || [],
      };
      batch.set(recipeRef, recipeData, { merge: true });
      console.log(recipeData);
    });

    await batch.commit();

  }
  catch (error) {
    console.error("Error saving to Firebase:", error);
  }
};



const data = [
  {
    "id": 640104,
    "image": "https://img.spoonacular.com/recipes/640104-312x231.jpg",
    "imageType": "jpg",
    "title": "Corn Salsa",
    "readyInMinutes": 20,
    "servings": 4,
    "sourceUrl": "https://www.foodista.com/recipe/FNQQSQXB/corn-salsa",
    "vegetarian": true,
    "vegan": true,
    "glutenFree": true,
    "dairyFree": true,
    "veryHealthy": false,
    "cheap": false,
    "veryPopular": false,
    "sustainable": false,
    "lowFodmap": false,
    "weightWatcherSmartPoints": 7,
    "gaps": "no",
    "preparationMinutes": null,
    "cookingMinutes": null,
    "aggregateLikes": 5,
    "healthScore": 6,
    "creditsText": "Foodista.com – The Cooking Encyclopedia Everyone Can Edit",
    "license": "CC BY 3.0",
    "sourceName": "Foodista",
    "pricePerServing": 150.92,
    "extendedIngredients": [
      {
        "id": 10211821,
        "aisle": "Produce",
        "image": "bell-pepper-orange.png",
        "consistency": "SOLID",
        "name": "bell pepper",
        "nameClean": "bell pepper",
        "original": "½ bell pepper – chopped",
        "originalName": "bell pepper – chopped",
        "amount": 0.5,
        "unit": "",
        "meta": [
          "chopped"
        ],
        "measures": {
          "us": {
            "amount": 0.5,
            "unitShort": "",
            "unitLong": ""
          },
          "metric": {
            "amount": 0.5,
            "unitShort": "",
            "unitLong": ""
          }
        }
      },
      {
        "id": 11143,
        "aisle": "Produce",
        "image": "celery.jpg",
        "consistency": "SOLID",
        "name": "celery",
        "nameClean": "celery",
        "original": "1/4 cup chopped celery",
        "originalName": "chopped celery",
        "amount": 0.25,
        "unit": "cup",
        "meta": [
          "chopped"
        ],
        "measures": {
          "us": {
            "amount": 0.25,
            "unitShort": "cups",
            "unitLong": "cups"
          },
          "metric": {
            "amount": 25.25,
            "unitShort": "g",
            "unitLong": "grams"
          }
        }
      },
      {
        "id": 11167,
        "aisle": "Produce",
        "image": "corn-on-the-cob.jpg",
        "consistency": "SOLID",
        "name": "ears of corn - boil and from the cob",
        "nameClean": "corn on the cob",
        "original": "5 ears of fresh corn – quick boil and sliced from the cob",
        "originalName": "ears of fresh corn – quick boil and sliced from the cob",
        "amount": 5,
        "unit": "",
        "meta": [
          "fresh",
          "sliced",
          "quick"
        ],
        "measures": {
          "us": {
            "amount": 5,
            "unitShort": "",
            "unitLong": ""
          },
          "metric": {
            "amount": 5,
            "unitShort": "",
            "unitLong": ""
          }
        }
      },
      {
        "id": 2044,
        "aisle": "Produce",
        "image": "fresh-basil.jpg",
        "consistency": "SOLID",
        "name": "basil",
        "nameClean": "fresh basil",
        "original": "½ cup of fresh basil – chopped",
        "originalName": "fresh basil – chopped",
        "amount": 0.5,
        "unit": "cup",
        "meta": [
          "fresh",
          "chopped"
        ],
        "measures": {
          "us": {
            "amount": 0.5,
            "unitShort": "cups",
            "unitLong": "cups"
          },
          "metric": {
            "amount": 12,
            "unitShort": "g",
            "unitLong": "grams"
          }
        }
      },
      {
        "id": 11215,
        "aisle": "Produce",
        "image": "garlic.png",
        "consistency": "SOLID",
        "name": "garlic",
        "nameClean": "garlic",
        "original": "1 clove of garlic – chopped",
        "originalName": "garlic – chopped",
        "amount": 1,
        "unit": "clove",
        "meta": [
          "chopped"
        ],
        "measures": {
          "us": {
            "amount": 1,
            "unitShort": "clove",
            "unitLong": "clove"
          },
          "metric": {
            "amount": 1,
            "unitShort": "clove",
            "unitLong": "clove"
          }
        }
      },
      {
        "id": 11979,
        "aisle": "Ethnic Foods",
        "image": "jalapeno-pepper.png",
        "consistency": "SOLID",
        "name": "jalapeño",
        "nameClean": "jalapeno pepper",
        "original": "½ jalapeño – chopped with seeds",
        "originalName": "jalapeño – chopped with seeds",
        "amount": 0.5,
        "unit": "",
        "meta": [
          "with seeds",
          "chopped"
        ],
        "measures": {
          "us": {
            "amount": 0.5,
            "unitShort": "",
            "unitLong": ""
          },
          "metric": {
            "amount": 0.5,
            "unitShort": "",
            "unitLong": ""
          }
        }
      },
      {
        "id": 10011282,
        "aisle": "Produce",
        "image": "red-onion.png",
        "consistency": "SOLID",
        "name": "onion",
        "nameClean": "red onion",
        "original": "¼ red onion - chopped",
        "originalName": "red onion - chopped",
        "amount": 0.25,
        "unit": "",
        "meta": [
          "red",
          "chopped"
        ],
        "measures": {
          "us": {
            "amount": 0.25,
            "unitShort": "",
            "unitLong": ""
          },
          "metric": {
            "amount": 0.25,
            "unitShort": "",
            "unitLong": ""
          }
        }
      },
      {
        "id": 1002030,
        "aisle": "Spices and Seasonings",
        "image": "pepper.jpg",
        "consistency": "SOLID",
        "name": "salt",
        "nameClean": "black pepper",
        "original": "salt, black pepper - to taste",
        "originalName": "salt, black pepper - to taste",
        "amount": 4,
        "unit": "servings",
        "meta": [
          "black",
          "to taste"
        ],
        "measures": {
          "us": {
            "amount": 4,
            "unitShort": "servings",
            "unitLong": "servings"
          },
          "metric": {
            "amount": 4,
            "unitShort": "servings",
            "unitLong": "servings"
          }
        }
      },
      {
        "id": 19335,
        "aisle": "Baking",
        "image": "sugar-in-bowl.png",
        "consistency": "SOLID",
        "name": "sugar",
        "nameClean": "sugar",
        "original": "1/4 cup sugar",
        "originalName": "sugar",
        "amount": 0.25,
        "unit": "cup",
        "meta": [],
        "measures": {
          "us": {
            "amount": 0.25,
            "unitShort": "cups",
            "unitLong": "cups"
          },
          "metric": {
            "amount": 50,
            "unitShort": "g",
            "unitLong": "grams"
          }
        }
      },
      {
        "id": 11940,
        "aisle": "Canned and Jarred",
        "image": "sweet-pickle-juice-from-the-jar.jpg",
        "consistency": "SOLID",
        "name": "pickle",
        "nameClean": "sweet pickles",
        "original": "1 sweet pickle",
        "originalName": "sweet pickle",
        "amount": 1,
        "unit": "",
        "meta": [
          "sweet"
        ],
        "measures": {
          "us": {
            "amount": 1,
            "unitShort": "",
            "unitLong": ""
          },
          "metric": {
            "amount": 1,
            "unitShort": "",
            "unitLong": ""
          }
        }
      },
      {
        "id": 11529,
        "aisle": "Produce",
        "image": "tomato.png",
        "consistency": "SOLID",
        "name": "vine tomato",
        "nameClean": "tomato",
        "original": "1 vine ripe tomato - diced",
        "originalName": "vine ripe tomato - diced",
        "amount": 1,
        "unit": "",
        "meta": [
          "diced",
          "ripe"
        ],
        "measures": {
          "us": {
            "amount": 1,
            "unitShort": "",
            "unitLong": ""
          },
          "metric": {
            "amount": 1,
            "unitShort": "",
            "unitLong": ""
          }
        }
      },
      {
        "id": 2053,
        "aisle": "Oil, Vinegar, Salad Dressing",
        "image": "vinegar-(white).jpg",
        "consistency": "LIQUID",
        "name": "vinegar",
        "nameClean": "distilled white vinegar",
        "original": "¼ cup vinegar",
        "originalName": "vinegar",
        "amount": 0.25,
        "unit": "cup",
        "meta": [],
        "measures": {
          "us": {
            "amount": 0.25,
            "unitShort": "cups",
            "unitLong": "cups"
          },
          "metric": {
            "amount": 63.75,
            "unitShort": "ml",
            "unitLong": "milliliters"
          }
        }
      }
    ],
    "summary": "The recipe Corn Salsa can be made <b>in roughly 20 minutes</b>. This gluten free, dairy free, lacto ovo vegetarian, and vegan recipe serves 4 and costs <b>$1.51 per serving</b>. One serving contains <b>169 calories</b>, <b>4g of protein</b>, and <b>2g of fat</b>. A mixture of sugar, celery, salt, and a handful of other ingredients are all it takes to make this recipe so tasty. 5 people found this recipe to be scrumptious and satisfying. It works well as an affordable hor d'oeuvre. This recipe is typical of Mexican cuisine. It is brought to you by Foodista. Overall, this recipe earns a <b>pretty good spoonacular score of 43%</b>. <a href=\"https://spoonacular.com/recipes/corn-husk-wrapped-grilled-halibut-with-charred-corn-salsa-159619\">Corn-Husk-Wrapped Grilled Halibut with Charred Corn Salsa</a>, <a href=\"https://spoonacular.com/recipes/grilled-corn-and-bean-salsa-with-baked-corn-chips-403652\">Grilled Corn and Bean Salsa with Baked Corn Chips</a>, and <a href=\"https://spoonacular.com/recipes/corn-salsa-1029956\">Corn Salsa</a> are very similar to this recipe.",
    "cuisines": [
      "Mexican"
    ],
    "dishTypes": [
      "antipasti",
      "condiment",
      "starter",
      "snack",
      "appetizer",
      "dip",
      "antipasto",
      "hor d'oeuvre",
      "spread"
    ],
    "diets": [
      "gluten free",
      "dairy free",
      "lacto ovo vegetarian",
      "vegan"
    ],
    "occasions": [],
    "analyzedInstructions": [
      {
        "name": "",
        "steps": [
          {
            "number": 1,
            "step": "Combine all of the above ingredients in a bowl.",
            "ingredients": [],
            "equipment": [
              {
                "id": 404783,
                "name": "bowl",
                "localizedName": "bowl",
                "image": "https://spoonacular.com/cdn/equipment_100x100/bowl.jpg"
              }
            ]
          },
          {
            "number": 2,
            "step": "Combine the ingredients for the dressing and add to the salsa.",
            "ingredients": [
              {
                "id": 6164,
                "name": "salsa",
                "localizedName": "salsa",
                "image": "salsa.png"
              }
            ],
            "equipment": []
          },
          {
            "number": 3,
            "step": "Serve chilled.",
            "ingredients": [],
            "equipment": []
          }
        ]
      }
    ],
    "spoonacularScore": 48.52824783325195,
    "spoonacularSourceUrl": "https://spoonacular.com/corn-salsa-640104",
    "usedIngredientCount": 0,
    "missedIngredientCount": 10,
    "missedIngredients": [
      {
        "id": 10211821,
        "amount": 0.5,
        "unit": "",
        "unitLong": "",
        "unitShort": "",
        "aisle": "Produce",
        "name": "bell pepper",
        "original": "½ bell pepper – chopped",
        "originalName": "bell pepper – chopped",
        "meta": [
          "chopped"
        ],
        "image": "https://img.spoonacular.com/ingredients_100x100/bell-pepper-orange.png"
      },
      {
        "id": 11143,
        "amount": 0.25,
        "unit": "cup",
        "unitLong": "cups",
        "unitShort": "cup",
        "aisle": "Produce",
        "name": "celery",
        "original": "1/4 cup chopped celery",
        "originalName": "chopped celery",
        "meta": [
          "chopped"
        ],
        "image": "https://img.spoonacular.com/ingredients_100x100/celery.jpg"
      },
      {
        "id": 11167,
        "amount": 5,
        "unit": "",
        "unitLong": "",
        "unitShort": "",
        "aisle": "Produce",
        "name": "ears of corn - boil and from the cob",
        "original": "5 ears of fresh corn – quick boil and sliced from the cob",
        "originalName": "ears of fresh corn – quick boil and sliced from the cob",
        "meta": [
          "fresh",
          "sliced",
          "quick"
        ],
        "extendedName": "fresh ears of corn - boil and from the cob",
        "image": "https://img.spoonacular.com/ingredients_100x100/corn-on-the-cob.jpg"
      },
      {
        "id": 2044,
        "amount": 0.5,
        "unit": "cup",
        "unitLong": "cups",
        "unitShort": "cup",
        "aisle": "Produce",
        "name": "basil",
        "original": "½ cup of fresh basil – chopped",
        "originalName": "fresh basil – chopped",
        "meta": [
          "fresh",
          "chopped"
        ],
        "extendedName": "fresh basil",
        "image": "https://img.spoonacular.com/ingredients_100x100/fresh-basil.jpg"
      },
      {
        "id": 11215,
        "amount": 1,
        "unit": "clove",
        "unitLong": "clove",
        "unitShort": "clove",
        "aisle": "Produce",
        "name": "garlic",
        "original": "1 clove of garlic – chopped",
        "originalName": "garlic – chopped",
        "meta": [
          "chopped"
        ],
        "image": "https://img.spoonacular.com/ingredients_100x100/garlic.png"
      },
      {
        "id": 11979,
        "amount": 0.5,
        "unit": "",
        "unitLong": "",
        "unitShort": "",
        "aisle": "Ethnic Foods",
        "name": "jalapeño",
        "original": "½ jalapeño – chopped with seeds",
        "originalName": "jalapeño – chopped with seeds",
        "meta": [
          "with seeds",
          "chopped"
        ],
        "image": "https://img.spoonacular.com/ingredients_100x100/jalapeno-pepper.png"
      },
      {
        "id": 10011282,
        "amount": 0.25,
        "unit": "",
        "unitLong": "",
        "unitShort": "",
        "aisle": "Produce",
        "name": "onion",
        "original": "¼ red onion - chopped",
        "originalName": "red onion - chopped",
        "meta": [
          "red",
          "chopped"
        ],
        "extendedName": "red onion",
        "image": "https://img.spoonacular.com/ingredients_100x100/red-onion.png"
      },
      {
        "id": 11940,
        "amount": 1,
        "unit": "",
        "unitLong": "",
        "unitShort": "",
        "aisle": "Canned and Jarred",
        "name": "pickle",
        "original": "1 sweet pickle",
        "originalName": "sweet pickle",
        "meta": [
          "sweet"
        ],
        "extendedName": "sweet pickle",
        "image": "https://img.spoonacular.com/ingredients_100x100/sweet-pickle-juice-from-the-jar.jpg"
      },
      {
        "id": 11529,
        "amount": 1,
        "unit": "",
        "unitLong": "",
        "unitShort": "",
        "aisle": "Produce",
        "name": "vine tomato",
        "original": "1 vine ripe tomato - diced",
        "originalName": "vine ripe tomato - diced",
        "meta": [
          "diced",
          "ripe"
        ],
        "extendedName": "diced vine tomato",
        "image": "https://img.spoonacular.com/ingredients_100x100/tomato.png"
      },
      {
        "id": 2053,
        "amount": 0.25,
        "unit": "cup",
        "unitLong": "cups",
        "unitShort": "cup",
        "aisle": "Oil, Vinegar, Salad Dressing",
        "name": "vinegar",
        "original": "¼ cup vinegar",
        "originalName": "vinegar",
        "meta": [],
        "image": "https://img.spoonacular.com/ingredients_100x100/vinegar-(white).jpg"
      }
    ],
    "likes": 0,
    "usedIngredients": [],
    "unusedIngredients": []
  },
  {
    "id": 1095799,
    "image": "https://img.spoonacular.com/recipes/1095799-312x231.jpg",
    "imageType": "jpg",
    "title": "Juicy pear and apple cake",
    "readyInMinutes": 60,
    "servings": 16,
    "sourceUrl": "https://www.foodista.com/recipe/B26S5KH4/juicy-pear-and-apple-cake",
    "vegetarian": true,
    "vegan": false,
    "glutenFree": false,
    "dairyFree": false,
    "veryHealthy": false,
    "cheap": false,
    "veryPopular": false,
    "sustainable": false,
    "lowFodmap": false,
    "weightWatcherSmartPoints": 11,
    "gaps": "no",
    "preparationMinutes": null,
    "cookingMinutes": null,
    "aggregateLikes": 1,
    "healthScore": 1,
    "creditsText": "Foodista.com – The Cooking Encyclopedia Everyone Can Edit",
    "license": "CC BY 3.0",
    "sourceName": "Foodista",
    "pricePerServing": 55.31,
    "extendedIngredients": [
      {
        "id": 9252,
        "aisle": "Produce",
        "image": "pears-bosc.jpg",
        "consistency": "SOLID",
        "name": "pears",
        "nameClean": "pear",
        "original": "250 g pears, peeled and cored",
        "originalName": "pears, peeled and cored",
        "amount": 250,
        "unit": "g",
        "meta": [
          "cored",
          "peeled"
        ],
        "measures": {
          "us": {
            "amount": 8.818,
            "unitShort": "oz",
            "unitLong": "ounces"
          },
          "metric": {
            "amount": 250,
            "unitShort": "g",
            "unitLong": "grams"
          }
        }
      },
      {
        "id": 9003,
        "aisle": "Produce",
        "image": "apple.jpg",
        "consistency": "SOLID",
        "name": "apples",
        "nameClean": "apple",
        "original": "250 g apples, peeled and cored",
        "originalName": "apples, peeled and cored",
        "amount": 250,
        "unit": "g",
        "meta": [
          "cored",
          "peeled"
        ],
        "measures": {
          "us": {
            "amount": 8.818,
            "unitShort": "oz",
            "unitLong": "ounces"
          },
          "metric": {
            "amount": 250,
            "unitShort": "g",
            "unitLong": "grams"
          }
        }
      },
      {
        "id": 9152,
        "aisle": "Produce",
        "image": "lemon-juice.jpg",
        "consistency": "LIQUID",
        "name": "juice of lemon",
        "nameClean": "lemon juice",
        "original": "Juice of 2 lemons",
        "originalName": "Juice of lemons",
        "amount": 2,
        "unit": "",
        "meta": [],
        "measures": {
          "us": {
            "amount": 2,
            "unitShort": "",
            "unitLong": ""
          },
          "metric": {
            "amount": 2,
            "unitShort": "",
            "unitLong": ""
          }
        }
      },
      {
        "id": 1001,
        "aisle": "Milk, Eggs, Other Dairy",
        "image": "butter-sliced.jpg",
        "consistency": "SOLID",
        "name": "butter",
        "nameClean": "butter",
        "original": "180 g butter at room temperature",
        "originalName": "butter at room temperature",
        "amount": 180,
        "unit": "g",
        "meta": [
          "at room temperature"
        ],
        "measures": {
          "us": {
            "amount": 6.349,
            "unitShort": "oz",
            "unitLong": "ounces"
          },
          "metric": {
            "amount": 180,
            "unitShort": "g",
            "unitLong": "grams"
          }
        }
      },
      {
        "id": 1123,
        "aisle": "Milk, Eggs, Other Dairy",
        "image": "egg.png",
        "consistency": "SOLID",
        "name": "eggs",
        "nameClean": "egg",
        "original": "4 eggs",
        "originalName": "eggs",
        "amount": 4,
        "unit": "",
        "meta": [],
        "measures": {
          "us": {
            "amount": 4,
            "unitShort": "",
            "unitLong": ""
          },
          "metric": {
            "amount": 4,
            "unitShort": "",
            "unitLong": ""
          }
        }
      },
      {
        "id": 10019908,
        "aisle": "Health Foods",
        "image": "raw-brown-sugar.png",
        "consistency": "SOLID",
        "name": "demerara sugar",
        "nameClean": "demerara sugar",
        "original": "100 g Demerara sugar",
        "originalName": "Demerara sugar",
        "amount": 100,
        "unit": "g",
        "meta": [],
        "measures": {
          "us": {
            "amount": 3.527,
            "unitShort": "oz",
            "unitLong": "ounces"
          },
          "metric": {
            "amount": 100,
            "unitShort": "g",
            "unitLong": "grams"
          }
        }
      },
      {
        "id": 10319335,
        "aisle": "Baking",
        "image": "vanilla-sugar.jpg",
        "consistency": "SOLID",
        "name": "vanilla sugar",
        "nameClean": "vanilla sugar",
        "original": "1 packet vanilla sugar",
        "originalName": "vanilla sugar",
        "amount": 1,
        "unit": "packet",
        "meta": [],
        "measures": {
          "us": {
            "amount": 1,
            "unitShort": "pkt",
            "unitLong": "packet"
          },
          "metric": {
            "amount": 1,
            "unitShort": "pkt",
            "unitLong": "packet"
          }
        }
      },
      {
        "id": 20081,
        "aisle": "Baking",
        "image": "flour.png",
        "consistency": "SOLID",
        "name": "flour",
        "nameClean": "wheat flour",
        "original": "250 g all-purpose flour",
        "originalName": "all-purpose flour",
        "amount": 250,
        "unit": "g",
        "meta": [
          "all-purpose"
        ],
        "measures": {
          "us": {
            "amount": 8.818,
            "unitShort": "oz",
            "unitLong": "ounces"
          },
          "metric": {
            "amount": 250,
            "unitShort": "g",
            "unitLong": "grams"
          }
        }
      },
      {
        "id": 20081,
        "aisle": "Baking",
        "image": "flour.png",
        "consistency": "SOLID",
        "name": "flour",
        "nameClean": "wheat flour",
        "original": "150g dark flour",
        "originalName": "dark flour",
        "amount": 150,
        "unit": "g",
        "meta": [
          "dark"
        ],
        "measures": {
          "us": {
            "amount": 5.291,
            "unitShort": "oz",
            "unitLong": "ounces"
          },
          "metric": {
            "amount": 150,
            "unitShort": "g",
            "unitLong": "grams"
          }
        }
      },
      {
        "id": 2047,
        "aisle": "Spices and Seasonings",
        "image": "salt.jpg",
        "consistency": "SOLID",
        "name": "salt",
        "nameClean": "table salt",
        "original": "1 pinch of salt",
        "originalName": "salt",
        "amount": 1,
        "unit": "pinch",
        "meta": [],
        "measures": {
          "us": {
            "amount": 1,
            "unitShort": "pinch",
            "unitLong": "pinch"
          },
          "metric": {
            "amount": 1,
            "unitShort": "pinch",
            "unitLong": "pinch"
          }
        }
      },
      {
        "id": 18369,
        "aisle": "Baking",
        "image": "white-powder.jpg",
        "consistency": "SOLID",
        "name": "baking powder",
        "nameClean": "baking powder",
        "original": "1 packet baking powder",
        "originalName": "baking powder",
        "amount": 1,
        "unit": "packet",
        "meta": [],
        "measures": {
          "us": {
            "amount": 1,
            "unitShort": "pkt",
            "unitLong": "packet"
          },
          "metric": {
            "amount": 1,
            "unitShort": "pkt",
            "unitLong": "packet"
          }
        }
      },
      {
        "id": 9156,
        "aisle": "Produce",
        "image": "zest-lemon.jpg",
        "consistency": "SOLID",
        "name": "lemon zest",
        "nameClean": "lemon peel",
        "original": "Grated zest of 1 lemon",
        "originalName": "Grated zest of lemon",
        "amount": 1,
        "unit": "",
        "meta": [
          "grated"
        ],
        "measures": {
          "us": {
            "amount": 1,
            "unitShort": "",
            "unitLong": ""
          },
          "metric": {
            "amount": 1,
            "unitShort": "",
            "unitLong": ""
          }
        }
      },
      {
        "id": 1077,
        "aisle": "Milk, Eggs, Other Dairy",
        "image": "milk.png",
        "consistency": "LIQUID",
        "name": "milk",
        "nameClean": "milk",
        "original": "100 ml milk",
        "originalName": "milk",
        "amount": 100,
        "unit": "ml",
        "meta": [],
        "measures": {
          "us": {
            "amount": 3.488,
            "unitShort": "fl. oz",
            "unitLong": "fl. ozs"
          },
          "metric": {
            "amount": 100,
            "unitShort": "ml",
            "unitLong": "milliliters"
          }
        }
      },
      {
        "id": 19296,
        "aisle": "Nut butters, Jams, and Honey",
        "image": "honey.png",
        "consistency": "LIQUID",
        "name": "honey",
        "nameClean": "honey",
        "original": "3 Tbs warmed honey",
        "originalName": "warmed honey",
        "amount": 3,
        "unit": "Tbs",
        "meta": [
          "warmed"
        ],
        "measures": {
          "us": {
            "amount": 3,
            "unitShort": "Tbs",
            "unitLong": "Tbs"
          },
          "metric": {
            "amount": 3,
            "unitShort": "Tbs",
            "unitLong": "Tbs"
          }
        }
      },
      {
        "id": 19336,
        "aisle": "Baking",
        "image": "powdered-sugar.jpg",
        "consistency": "SOLID",
        "name": "powdered sugar",
        "nameClean": "powdered sugar",
        "original": "Powdered sugar, for sprinkling",
        "originalName": "Powdered sugar, for sprinkling",
        "amount": 16,
        "unit": "servings",
        "meta": [
          "for sprinkling"
        ],
        "measures": {
          "us": {
            "amount": 16,
            "unitShort": "servings",
            "unitLong": "servings"
          },
          "metric": {
            "amount": 16,
            "unitShort": "servings",
            "unitLong": "servings"
          }
        }
      },
      {
        "id": 1012010,
        "aisle": "Spices and Seasonings",
        "image": "cinnamon.jpg",
        "consistency": "SOLID",
        "name": "ground cinnamon",
        "nameClean": "ground cinnamon",
        "original": "Ground cinnamon, for sprinkling",
        "originalName": "Ground cinnamon, for sprinkling",
        "amount": 16,
        "unit": "servings",
        "meta": [
          "for sprinkling"
        ],
        "measures": {
          "us": {
            "amount": 16,
            "unitShort": "servings",
            "unitLong": "servings"
          },
          "metric": {
            "amount": 16,
            "unitShort": "servings",
            "unitLong": "servings"
          }
        }
      }
    ],
    "summary": "Juicy pear and apple cake takes around <b>1 hour</b> from beginning to end. This recipe serves 16. For <b>55 cents per serving</b>, this recipe <b>covers 7%</b> of your daily requirements of vitamins and minerals. One portion of this dish contains approximately <b>4g of protein</b>, <b>11g of fat</b>, and a total of <b>283 calories</b>. 1 person were impressed by this recipe. It is a good option if you're following a <b>lacto ovo vegetarian</b> diet. If you have pears, ground cinnamon, milk, and a few other ingredients on hand, you can make it. It works well as a very reasonably priced dessert. It is brought to you by Foodista. Overall, this recipe earns a <b>not so super spoonacular score of 22%</b>. Try <a href=\"https://spoonacular.com/recipes/juicy-pear-and-blue-cheese-salad-272256\">Juicy Pear and Blue Cheese Salad</a>, <a href=\"https://spoonacular.com/recipes/apple-pear-cake-395433\">Apple Pear Cake</a>, and <a href=\"https://spoonacular.com/recipes/apple-and-pear-cake-1094558\">Apple and Pear Cake</a> for similar recipes.",
    "cuisines": [],
    "dishTypes": [
      "dessert"
    ],
    "diets": [
      "lacto ovo vegetarian"
    ],
    "occasions": [],
    "analyzedInstructions": [
      {
        "name": "",
        "steps": [
          {
            "number": 1,
            "step": "Cut an apple and a pear into quarters, then into medium thick slices (not quite thin), and soak in lemon juice (from 2 lemons). Set aside.With a hand-held mixer beat the butter for 3-4 minutes until foamy.Alternately add Demerara sugar mixed with vanilla sugar and eggs to the butter, mix to combine after each addition.Alternately add to the butter and eggs mixture all-purpose and dark flour mixed with salt, baking powder and grated lemon zest (of 1 lemon) with milk. After each addition mix to combine.",
            "ingredients": [
              {
                "id": 10019908,
                "name": "demerara sugar",
                "localizedName": "demerara sugar",
                "image": "raw-brown-sugar.png"
              },
              {
                "id": 18369,
                "name": "baking powder",
                "localizedName": "baking powder",
                "image": "white-powder.jpg"
              },
              {
                "id": 10319335,
                "name": "vanilla sugar",
                "localizedName": "vanilla sugar",
                "image": "vanilla-sugar.jpg"
              },
              {
                "id": 9152,
                "name": "lemon juice",
                "localizedName": "lemon juice",
                "image": "lemon-juice.jpg"
              },
              {
                "id": 9156,
                "name": "lemon zest",
                "localizedName": "lemon zest",
                "image": "zest-lemon.jpg"
              },
              {
                "id": 1001,
                "name": "butter",
                "localizedName": "butter",
                "image": "butter-sliced.jpg"
              },
              {
                "id": 9150,
                "name": "lemon",
                "localizedName": "lemon",
                "image": "lemon.png"
              },
              {
                "id": 9003,
                "name": "apple",
                "localizedName": "apple",
                "image": "https://spoonacular.com/cdn/ingredients_100x100/apple.jpg"
              },
              {
                "id": 20081,
                "name": "all purpose flour",
                "localizedName": "all purpose flour",
                "image": "flour.png"
              },
              {
                "id": 1123,
                "name": "egg",
                "localizedName": "egg",
                "image": "egg.png"
              },
              {
                "id": 1077,
                "name": "milk",
                "localizedName": "milk",
                "image": "milk.png"
              },
              {
                "id": 9252,
                "name": "pear",
                "localizedName": "pear",
                "image": "https://spoonacular.com/cdn/ingredients_100x100/pears-bosc.jpg"
              },
              {
                "id": 2047,
                "name": "salt",
                "localizedName": "salt",
                "image": "salt.jpg"
              }
            ],
            "equipment": [
              {
                "id": 404726,
                "name": "blender",
                "localizedName": "blender",
                "image": "https://spoonacular.com/cdn/equipment_100x100/blender.png"
              }
            ],
            "length": {
              "number": 4,
              "unit": "minutes"
            }
          },
          {
            "number": 2,
            "step": "Spread the dough into the buttered and floured baking form. Press pear and apple slices vertically into the dough, forming very thick rows.",
            "ingredients": [
              {
                "id": 0,
                "name": "spread",
                "localizedName": "spread",
                "image": ""
              },
              {
                "id": 9003,
                "name": "apple",
                "localizedName": "apple",
                "image": "https://spoonacular.com/cdn/ingredients_100x100/apple.jpg"
              },
              {
                "id": 0,
                "name": "dough",
                "localizedName": "dough",
                "image": "pizza-dough"
              },
              {
                "id": 9252,
                "name": "pear",
                "localizedName": "pear",
                "image": "https://spoonacular.com/cdn/ingredients_100x100/pears-bosc.jpg"
              }
            ],
            "equipment": []
          },
          {
            "number": 3,
            "step": "Brush the top with warmed honey and bake in the oven at 180C for about 40 minutes or until done.Cool the cake and sprinkle with a mixture of powdered sugar and cinnamon.",
            "ingredients": [
              {
                "id": 19336,
                "name": "powdered sugar",
                "localizedName": "powdered sugar",
                "image": "https://spoonacular.com/cdn/ingredients_100x100/powdered-sugar.jpg"
              },
              {
                "id": 2010,
                "name": "cinnamon",
                "localizedName": "cinnamon",
                "image": "https://spoonacular.com/cdn/ingredients_100x100/cinnamon.jpg"
              },
              {
                "id": 19296,
                "name": "honey",
                "localizedName": "honey",
                "image": "honey.png"
              }
            ],
            "equipment": [
              {
                "id": 404784,
                "name": "oven",
                "localizedName": "oven",
                "image": "https://spoonacular.com/cdn/equipment_100x100/oven.jpg",
                "temperature": {
                  "number": 180,
                  "unit": "Celsius"
                }
              }
            ],
            "length": {
              "number": 40,
              "unit": "minutes"
            }
          },
          {
            "number": 4,
            "step": "Cut into slices and serve.",
            "ingredients": [],
            "equipment": []
          }
        ]
      }
    ],
    "spoonacularScore": 27.0085391998291,
    "spoonacularSourceUrl": "https://spoonacular.com/juicy-pear-and-apple-cake-1095799",
    "usedIngredientCount": 0,
    "missedIngredientCount": 10,
    "missedIngredients": [
      {
        "id": 9252,
        "amount": 250,
        "unit": "g",
        "unitLong": "grams",
        "unitShort": "g",
        "aisle": "Produce",
        "name": "pears",
        "original": "250 g pears, peeled and cored",
        "originalName": "pears, peeled and cored",
        "meta": [
          "cored",
          "peeled"
        ],
        "image": "https://img.spoonacular.com/ingredients_100x100/pears-bosc.jpg"
      },
      {
        "id": 9003,
        "amount": 250,
        "unit": "g",
        "unitLong": "grams",
        "unitShort": "g",
        "aisle": "Produce",
        "name": "apples",
        "original": "250 g apples, peeled and cored",
        "originalName": "apples, peeled and cored",
        "meta": [
          "cored",
          "peeled"
        ],
        "image": "https://img.spoonacular.com/ingredients_100x100/apple.jpg"
      },
      {
        "id": 9152,
        "amount": 2,
        "unit": "",
        "unitLong": "",
        "unitShort": "",
        "aisle": "Produce",
        "name": "juice of lemon",
        "original": "Juice of 2 lemons",
        "originalName": "Juice of lemons",
        "meta": [],
        "extendedName": "lemon (juice)",
        "image": "https://img.spoonacular.com/ingredients_100x100/lemon-juice.jpg"
      },
      {
        "id": 1001,
        "amount": 180,
        "unit": "g",
        "unitLong": "grams",
        "unitShort": "g",
        "aisle": "Milk, Eggs, Other Dairy",
        "name": "butter",
        "original": "180 g butter at room temperature",
        "originalName": "butter at room temperature",
        "meta": [
          "at room temperature"
        ],
        "image": "https://img.spoonacular.com/ingredients_100x100/butter-sliced.jpg"
      },
      {
        "id": 1123,
        "amount": 4,
        "unit": "",
        "unitLong": "",
        "unitShort": "",
        "aisle": "Milk, Eggs, Other Dairy",
        "name": "eggs",
        "original": "4 eggs",
        "originalName": "eggs",
        "meta": [],
        "image": "https://img.spoonacular.com/ingredients_100x100/egg.png"
      },
      {
        "id": 18369,
        "amount": 1,
        "unit": "packet",
        "unitLong": "packet",
        "unitShort": "pkt",
        "aisle": "Baking",
        "name": "baking powder",
        "original": "1 packet baking powder",
        "originalName": "baking powder",
        "meta": [],
        "image": "https://img.spoonacular.com/ingredients_100x100/white-powder.jpg"
      },
      {
        "id": 9156,
        "amount": 1,
        "unit": "",
        "unitLong": "",
        "unitShort": "",
        "aisle": "Produce",
        "name": "lemon zest",
        "original": "Grated zest of 1 lemon",
        "originalName": "Grated zest of lemon",
        "meta": [
          "grated"
        ],
        "image": "https://img.spoonacular.com/ingredients_100x100/zest-lemon.jpg"
      },
      {
        "id": 1077,
        "amount": 100,
        "unit": "ml",
        "unitLong": "milliliters",
        "unitShort": "ml",
        "aisle": "Milk, Eggs, Other Dairy",
        "name": "milk",
        "original": "100 ml milk",
        "originalName": "milk",
        "meta": [],
        "image": "https://img.spoonacular.com/ingredients_100x100/milk.png"
      },
      {
        "id": 19296,
        "amount": 3,
        "unit": "Tbs",
        "unitLong": "Tbs",
        "unitShort": "Tbs",
        "aisle": "Nut butters, Jams, and Honey",
        "name": "honey",
        "original": "3 Tbs warmed honey",
        "originalName": "warmed honey",
        "meta": [
          "warmed"
        ],
        "image": "https://img.spoonacular.com/ingredients_100x100/honey.png"
      },
      {
        "id": 1012010,
        "amount": 16,
        "unit": "servings",
        "unitLong": "servings",
        "unitShort": "servings",
        "aisle": "Spices and Seasonings",
        "name": "ground cinnamon",
        "original": "Ground cinnamon, for sprinkling",
        "originalName": "Ground cinnamon, for sprinkling",
        "meta": [
          "for sprinkling"
        ],
        "image": "https://img.spoonacular.com/ingredients_100x100/cinnamon.jpg"
      }
    ],
    "likes": 0,
    "usedIngredients": [],
    "unusedIngredients": []
  },
  {
    "id": 657698,
    "image": "https://img.spoonacular.com/recipes/657698-312x231.jpg",
    "imageType": "jpg",
    "title": "Quinoa, Tomato, Green Onion Side Salad",
    "readyInMinutes": 45,
    "servings": 2,
    "sourceUrl": "https://www.foodista.com/recipe/ZHJ4PP8P/quinoa-tomato-green-onion-salad",
    "vegetarian": true,
    "vegan": true,
    "glutenFree": true,
    "dairyFree": true,
    "veryHealthy": true,
    "cheap": false,
    "veryPopular": false,
    "sustainable": false,
    "lowFodmap": false,
    "weightWatcherSmartPoints": 10,
    "gaps": "no",
    "preparationMinutes": null,
    "cookingMinutes": null,
    "aggregateLikes": 2,
    "healthScore": 90,
    "creditsText": "Foodista.com – The Cooking Encyclopedia Everyone Can Edit",
    "license": "CC BY 3.0",
    "sourceName": "Foodista",
    "pricePerServing": 138.73,
    "extendedIngredients": [
      {
        "id": 11291,
        "aisle": "Produce",
        "image": "spring-onions.jpg",
        "consistency": "SOLID",
        "name": "green onions",
        "nameClean": "spring onions",
        "original": "1/2 cup minced green onions",
        "originalName": "minced green onions",
        "amount": 0.5,
        "unit": "cup",
        "meta": [
          "minced"
        ],
        "measures": {
          "us": {
            "amount": 0.5,
            "unitShort": "cups",
            "unitLong": "cups"
          },
          "metric": {
            "amount": 50,
            "unitShort": "g",
            "unitLong": "grams"
          }
        }
      },
      {
        "id": 9150,
        "aisle": "Produce",
        "image": "lemon.png",
        "consistency": "SOLID",
        "name": "lemon",
        "nameClean": "lemon",
        "original": "1/2 lemon",
        "originalName": "lemon",
        "amount": 0.5,
        "unit": "",
        "meta": [],
        "measures": {
          "us": {
            "amount": 0.5,
            "unitShort": "",
            "unitLong": ""
          },
          "metric": {
            "amount": 0.5,
            "unitShort": "",
            "unitLong": ""
          }
        }
      },
      {
        "id": 4053,
        "aisle": "Oil, Vinegar, Salad Dressing",
        "image": "olive-oil.jpg",
        "consistency": "LIQUID",
        "name": "olive oil",
        "nameClean": "olive oil",
        "original": "2 Tbs. olive oil",
        "originalName": "olive oil",
        "amount": 2,
        "unit": "Tbs",
        "meta": [],
        "measures": {
          "us": {
            "amount": 2,
            "unitShort": "Tbs",
            "unitLong": "Tbs"
          },
          "metric": {
            "amount": 2,
            "unitShort": "Tbs",
            "unitLong": "Tbs"
          }
        }
      },
      {
        "id": 20035,
        "aisle": "Health Foods",
        "image": "uncooked-quinoa.png",
        "consistency": "SOLID",
        "name": "quinoa",
        "nameClean": "quinoa",
        "original": "3/4 cup uncooked quinoa",
        "originalName": "uncooked quinoa",
        "amount": 0.75,
        "unit": "cup",
        "meta": [
          "uncooked"
        ],
        "measures": {
          "us": {
            "amount": 0.75,
            "unitShort": "cups",
            "unitLong": "cups"
          },
          "metric": {
            "amount": 127.5,
            "unitShort": "g",
            "unitLong": "grams"
          }
        }
      },
      {
        "id": 1102047,
        "aisle": "Spices and Seasonings",
        "image": "salt-and-pepper.jpg",
        "consistency": "SOLID",
        "name": "salt and pepper",
        "nameClean": "salt and pepper",
        "original": "salt and pepper",
        "originalName": "salt and pepper",
        "amount": 2,
        "unit": "servings",
        "meta": [],
        "measures": {
          "us": {
            "amount": 2,
            "unitShort": "servings",
            "unitLong": "servings"
          },
          "metric": {
            "amount": 2,
            "unitShort": "servings",
            "unitLong": "servings"
          }
        }
      },
      {
        "id": 11529,
        "aisle": "Produce",
        "image": "tomato.png",
        "consistency": "SOLID",
        "name": "tomatoes",
        "nameClean": "tomato",
        "original": "2 medium size tomatoes",
        "originalName": "tomatoes",
        "amount": 2,
        "unit": "medium size",
        "meta": [],
        "measures": {
          "us": {
            "amount": 2,
            "unitShort": "medium size",
            "unitLong": "medium sizes"
          },
          "metric": {
            "amount": 2,
            "unitShort": "medium size",
            "unitLong": "medium sizes"
          }
        }
      },
      {
        "id": 14412,
        "aisle": "Beverages",
        "image": "water.png",
        "consistency": "LIQUID",
        "name": "water",
        "nameClean": "water",
        "original": "1-1/2 cups water",
        "originalName": "water",
        "amount": 1.5,
        "unit": "cups",
        "meta": [],
        "measures": {
          "us": {
            "amount": 1.5,
            "unitShort": "cups",
            "unitLong": "cups"
          },
          "metric": {
            "amount": 354.882,
            "unitShort": "ml",
            "unitLong": "milliliters"
          }
        }
      }
    ],
    "summary": "Quinoa, Tomato, Green Onion Side Salad might be a good recipe to expand your hor d'oeuvre recipe box. For <b>$1.39 per serving</b>, this recipe <b>covers 23%</b> of your daily requirements of vitamins and minerals. One portion of this dish contains about <b>11g of protein</b>, <b>18g of fat</b>, and a total of <b>396 calories</b>. This recipe serves 2. This recipe from Foodista has 2 fans. Head to the store and pick up green onions, water, salt and pepper, and a few other things to make it today. It is a good option if you're following a <b>gluten free, dairy free, lacto ovo vegetarian, and vegan</b> diet. From preparation to the plate, this recipe takes approximately <b>45 minutes</b>. All things considered, we decided this recipe <b>deserves a spoonacular score of 93%</b>. This score is amazing. Users who liked this recipe also liked <a href=\"https://spoonacular.com/recipes/cucumber-tomato-and-green-onion-salad-376668\">Cucumber Tomato and Green Onion Salad</a>, <a href=\"https://spoonacular.com/recipes/feta-and-green-onion-couscous-cakes-over-tomato-olive-salad-133311\">Fetan and Green Onion Couscous Cakes over Tomato-Olive Salad</a>, and <a href=\"https://spoonacular.com/recipes/onion-tomato-gotsu-or-thakkali-kosthu-side-dish-for-idli-dosa-564811\">Onion Tomato Gotsu or Thakkali Kosthu | Side Dish For Idli Dosa</a>.",
    "cuisines": [],
    "dishTypes": [
      "side dish",
      "antipasti",
      "salad",
      "starter",
      "snack",
      "appetizer",
      "antipasto",
      "hor d'oeuvre"
    ],
    "diets": [
      "gluten free",
      "dairy free",
      "lacto ovo vegetarian",
      "vegan"
    ],
    "occasions": [],
    "analyzedInstructions": [
      {
        "name": "",
        "steps": [
          {
            "number": 1,
            "step": "Put your quinoa and your water in a pan.",
            "ingredients": [
              {
                "id": 20035,
                "name": "quinoa",
                "localizedName": "quinoa",
                "image": "uncooked-quinoa.png"
              },
              {
                "id": 14412,
                "name": "water",
                "localizedName": "water",
                "image": "water.png"
              }
            ],
            "equipment": [
              {
                "id": 404645,
                "name": "frying pan",
                "localizedName": "frying pan",
                "image": "https://spoonacular.com/cdn/equipment_100x100/pan.png"
              }
            ]
          },
          {
            "number": 2,
            "step": "Heat over medium heat until bubbling, then cover and reduce heat to low. Cook for about 15 minutes or until all the water is absorbed.While your quinoa is cooking, get out and wash your green onions and tomatoes. Chop them roughly.Chop a lemon in half and squeeze one half's juice into a bowl, picking out the seeds.",
            "ingredients": [
              {
                "id": 11291,
                "name": "green onions",
                "localizedName": "green onions",
                "image": "spring-onions.jpg"
              },
              {
                "id": 11529,
                "name": "tomato",
                "localizedName": "tomato",
                "image": "tomato.png"
              },
              {
                "id": 20035,
                "name": "quinoa",
                "localizedName": "quinoa",
                "image": "uncooked-quinoa.png"
              },
              {
                "id": 1019016,
                "name": "juice",
                "localizedName": "juice",
                "image": "apple-juice.jpg"
              },
              {
                "id": 9150,
                "name": "lemon",
                "localizedName": "lemon",
                "image": "lemon.png"
              },
              {
                "id": 93818,
                "name": "seeds",
                "localizedName": "seeds",
                "image": "sunflower-seeds.jpg"
              },
              {
                "id": 14412,
                "name": "water",
                "localizedName": "water",
                "image": "water.png"
              }
            ],
            "equipment": [
              {
                "id": 404783,
                "name": "bowl",
                "localizedName": "bowl",
                "image": "https://spoonacular.com/cdn/equipment_100x100/bowl.jpg"
              }
            ],
            "length": {
              "number": 15,
              "unit": "minutes"
            }
          },
          {
            "number": 3,
            "step": "Let your quinoa cool. A little warm is fine.",
            "ingredients": [
              {
                "id": 20035,
                "name": "quinoa",
                "localizedName": "quinoa",
                "image": "uncooked-quinoa.png"
              }
            ],
            "equipment": []
          },
          {
            "number": 4,
            "step": "Add olive oil, lemon juice, and tomatoes and green onions to the pan. Stir.",
            "ingredients": [
              {
                "id": 11291,
                "name": "green onions",
                "localizedName": "green onions",
                "image": "spring-onions.jpg"
              },
              {
                "id": 9152,
                "name": "lemon juice",
                "localizedName": "lemon juice",
                "image": "lemon-juice.jpg"
              },
              {
                "id": 4053,
                "name": "olive oil",
                "localizedName": "olive oil",
                "image": "olive-oil.jpg"
              },
              {
                "id": 11529,
                "name": "tomato",
                "localizedName": "tomato",
                "image": "tomato.png"
              }
            ],
            "equipment": [
              {
                "id": 404645,
                "name": "frying pan",
                "localizedName": "frying pan",
                "image": "https://spoonacular.com/cdn/equipment_100x100/pan.png"
              }
            ]
          },
          {
            "number": 5,
            "step": "Add salt and pepper to your liking.",
            "ingredients": [
              {
                "id": 1102047,
                "name": "salt and pepper",
                "localizedName": "salt and pepper",
                "image": "salt-and-pepper.jpg"
              }
            ],
            "equipment": []
          },
          {
            "number": 6,
            "step": "Serve chilled",
            "ingredients": [],
            "equipment": []
          }
        ]
      }
    ],
    "spoonacularScore": 94.31739807128906,
    "spoonacularSourceUrl": "https://spoonacular.com/quinoa-tomato-green-onion-side-salad-657698",
    "usedIngredientCount": 0,
    "missedIngredientCount": 4,
    "missedIngredients": [
      {
        "id": 11291,
        "amount": 0.5,
        "unit": "cup",
        "unitLong": "cups",
        "unitShort": "cup",
        "aisle": "Produce",
        "name": "green onions",
        "original": "1/2 cup minced green onions",
        "originalName": "minced green onions",
        "meta": [
          "minced"
        ],
        "image": "https://img.spoonacular.com/ingredients_100x100/spring-onions.jpg"
      },
      {
        "id": 9150,
        "amount": 0.5,
        "unit": "",
        "unitLong": "",
        "unitShort": "",
        "aisle": "Produce",
        "name": "lemon",
        "original": "1/2 lemon",
        "originalName": "lemon",
        "meta": [],
        "image": "https://img.spoonacular.com/ingredients_100x100/lemon.png"
      },
      {
        "id": 20035,
        "amount": 0.75,
        "unit": "cup",
        "unitLong": "cups",
        "unitShort": "cup",
        "aisle": "Health Foods",
        "name": "quinoa",
        "original": "3/4 cup uncooked quinoa",
        "originalName": "uncooked quinoa",
        "meta": [
          "uncooked"
        ],
        "image": "https://img.spoonacular.com/ingredients_100x100/uncooked-quinoa.png"
      },
      {
        "id": 11529,
        "amount": 2,
        "unit": "medium size",
        "unitLong": "medium sizes",
        "unitShort": "medium size",
        "aisle": "Produce",
        "name": "tomatoes",
        "original": "2 medium size tomatoes",
        "originalName": "tomatoes",
        "meta": [],
        "image": "https://img.spoonacular.com/ingredients_100x100/tomato.png"
      }
    ],
    "likes": 0,
    "usedIngredients": [],
    "unusedIngredients": []
  },
  {
    "id": 635507,
    "image": "https://img.spoonacular.com/recipes/635507-312x231.jpg",
    "imageType": "jpg",
    "title": "Blueberry Overload Muffins",
    "readyInMinutes": 45,
    "servings": 8,
    "sourceUrl": "https://www.foodista.com/recipe/B6J372K8/blueberry-overload-muffins",
    "vegetarian": true,
    "vegan": false,
    "glutenFree": false,
    "dairyFree": false,
    "veryHealthy": false,
    "cheap": false,
    "veryPopular": false,
    "sustainable": false,
    "lowFodmap": false,
    "weightWatcherSmartPoints": 16,
    "gaps": "no",
    "preparationMinutes": null,
    "cookingMinutes": null,
    "aggregateLikes": 1,
    "healthScore": 2,
    "creditsText": "Foodista.com – The Cooking Encyclopedia Everyone Can Edit",
    "license": "CC BY 3.0",
    "sourceName": "Foodista",
    "pricePerServing": 47.14,
    "extendedIngredients": [
      {
        "id": 20081,
        "aisle": "Baking",
        "image": "flour.png",
        "consistency": "SOLID",
        "name": "flour",
        "nameClean": "wheat flour",
        "original": "1 1/2 cups all-purpose flour",
        "originalName": "all-purpose flour",
        "amount": 1.5,
        "unit": "cups",
        "meta": [
          "all-purpose"
        ],
        "measures": {
          "us": {
            "amount": 1.5,
            "unitShort": "cups",
            "unitLong": "cups"
          },
          "metric": {
            "amount": 187.5,
            "unitShort": "g",
            "unitLong": "grams"
          }
        }
      },
      {
        "id": 19335,
        "aisle": "Baking",
        "image": "sugar-in-bowl.png",
        "consistency": "SOLID",
        "name": "sugar",
        "nameClean": "sugar",
        "original": "3/4 cup sugar",
        "originalName": "sugar",
        "amount": 0.75,
        "unit": "cup",
        "meta": [],
        "measures": {
          "us": {
            "amount": 0.75,
            "unitShort": "cups",
            "unitLong": "cups"
          },
          "metric": {
            "amount": 150,
            "unitShort": "g",
            "unitLong": "grams"
          }
        }
      },
      {
        "id": 2047,
        "aisle": "Spices and Seasonings",
        "image": "salt.jpg",
        "consistency": "SOLID",
        "name": "salt",
        "nameClean": "table salt",
        "original": "1/2 teaspoon salt",
        "originalName": "salt",
        "amount": 0.5,
        "unit": "teaspoon",
        "meta": [],
        "measures": {
          "us": {
            "amount": 0.5,
            "unitShort": "tsps",
            "unitLong": "teaspoons"
          },
          "metric": {
            "amount": 0.5,
            "unitShort": "tsps",
            "unitLong": "teaspoons"
          }
        }
      },
      {
        "id": 18369,
        "aisle": "Baking",
        "image": "white-powder.jpg",
        "consistency": "SOLID",
        "name": "baking powder",
        "nameClean": "baking powder",
        "original": "2 teaspoons baking powder",
        "originalName": "baking powder",
        "amount": 2,
        "unit": "teaspoons",
        "meta": [],
        "measures": {
          "us": {
            "amount": 2,
            "unitShort": "tsps",
            "unitLong": "teaspoons"
          },
          "metric": {
            "amount": 2,
            "unitShort": "tsps",
            "unitLong": "teaspoons"
          }
        }
      },
      {
        "id": 1014582,
        "aisle": "Oil, Vinegar, Salad Dressing",
        "image": "vegetable-oil.jpg",
        "consistency": "LIQUID",
        "name": "canola oil",
        "nameClean": "canola oil",
        "original": "cup canola oil",
        "originalName": "canola oil",
        "amount": 1,
        "unit": "cup",
        "meta": [],
        "measures": {
          "us": {
            "amount": 1,
            "unitShort": "cup",
            "unitLong": "cup"
          },
          "metric": {
            "amount": 224,
            "unitShort": "ml",
            "unitLong": "milliliters"
          }
        }
      },
      {
        "id": 1123,
        "aisle": "Milk, Eggs, Other Dairy",
        "image": "egg.png",
        "consistency": "SOLID",
        "name": "egg",
        "nameClean": "egg",
        "original": "1 egg",
        "originalName": "egg",
        "amount": 1,
        "unit": "",
        "meta": [],
        "measures": {
          "us": {
            "amount": 1,
            "unitShort": "",
            "unitLong": ""
          },
          "metric": {
            "amount": 1,
            "unitShort": "",
            "unitLong": ""
          }
        }
      },
      {
        "id": 1077,
        "aisle": "Milk, Eggs, Other Dairy",
        "image": "milk.png",
        "consistency": "LIQUID",
        "name": "milk",
        "nameClean": "milk",
        "original": "cup milk",
        "originalName": "milk",
        "amount": 1,
        "unit": "cup",
        "meta": [],
        "measures": {
          "us": {
            "amount": 1,
            "unitShort": "cup",
            "unitLong": "cup"
          },
          "metric": {
            "amount": 244,
            "unitShort": "ml",
            "unitLong": "milliliters"
          }
        }
      },
      {
        "id": 9050,
        "aisle": "Produce",
        "image": "blueberries.jpg",
        "consistency": "SOLID",
        "name": "blueberries",
        "nameClean": "blueberries",
        "original": "1 cup fresh blueberries",
        "originalName": "fresh blueberries",
        "amount": 1,
        "unit": "cup",
        "meta": [
          "fresh"
        ],
        "measures": {
          "us": {
            "amount": 1,
            "unitShort": "cup",
            "unitLong": "cup"
          },
          "metric": {
            "amount": 148,
            "unitShort": "g",
            "unitLong": "grams"
          }
        }
      },
      {
        "id": 19335,
        "aisle": "Baking",
        "image": "sugar-in-bowl.png",
        "consistency": "SOLID",
        "name": "sugar",
        "nameClean": "sugar",
        "original": "1/2 cup sugar",
        "originalName": "sugar",
        "amount": 0.5,
        "unit": "cup",
        "meta": [],
        "measures": {
          "us": {
            "amount": 0.5,
            "unitShort": "cups",
            "unitLong": "cups"
          },
          "metric": {
            "amount": 100,
            "unitShort": "g",
            "unitLong": "grams"
          }
        }
      },
      {
        "id": 20081,
        "aisle": "Baking",
        "image": "flour.png",
        "consistency": "SOLID",
        "name": "flour",
        "nameClean": "wheat flour",
        "original": "cup all-purpose flour",
        "originalName": "all-purpose flour",
        "amount": 1,
        "unit": "cup",
        "meta": [
          "all-purpose"
        ],
        "measures": {
          "us": {
            "amount": 1,
            "unitShort": "cup",
            "unitLong": "cup"
          },
          "metric": {
            "amount": 125,
            "unitShort": "g",
            "unitLong": "grams"
          }
        }
      },
      {
        "id": 1145,
        "aisle": "Milk, Eggs, Other Dairy",
        "image": "butter-sliced.jpg",
        "consistency": "SOLID",
        "name": "butter",
        "nameClean": "unsalted butter",
        "original": "1/4 cup unsalted butter, cubed",
        "originalName": "unsalted butter, cubed",
        "amount": 0.25,
        "unit": "cup",
        "meta": [
          "unsalted",
          "cubed"
        ],
        "measures": {
          "us": {
            "amount": 0.25,
            "unitShort": "cups",
            "unitLong": "cups"
          },
          "metric": {
            "amount": 56.75,
            "unitShort": "g",
            "unitLong": "grams"
          }
        }
      },
      {
        "id": 2010,
        "aisle": "Spices and Seasonings",
        "image": "cinnamon.jpg",
        "consistency": "SOLID",
        "name": "cinnamon",
        "nameClean": "cinnamon",
        "original": "1 1/2 teaspoons cinnamon",
        "originalName": "cinnamon",
        "amount": 1.5,
        "unit": "teaspoons",
        "meta": [],
        "measures": {
          "us": {
            "amount": 1.5,
            "unitShort": "tsps",
            "unitLong": "teaspoons"
          },
          "metric": {
            "amount": 1.5,
            "unitShort": "tsps",
            "unitLong": "teaspoons"
          }
        }
      }
    ],
    "summary": "Blueberry Overload Muffins is a breakfast that serves 8. For <b>47 cents per serving</b>, this recipe <b>covers 9%</b> of your daily requirements of vitamins and minerals. One serving contains <b>401 calories</b>, <b>6g of protein</b>, and <b>13g of fat</b>. If you have baking powder, sugar, salt, and a few other ingredients on hand, you can make it. 1 person has tried and liked this recipe. From preparation to the plate, this recipe takes roughly <b>45 minutes</b>. It is brought to you by Foodista. It is a good option if you're following a <b>lacto ovo vegetarian</b> diet. With a spoonacular <b>score of 27%</b>, this dish is rather bad. <a href=\"https://spoonacular.com/recipes/blueberry-overload-coffee-cake-200038\">Blueberry Overload Coffee Cake</a>, <a href=\"https://spoonacular.com/recipes/overload-146677\">Overload</a>, and <a href=\"https://spoonacular.com/recipes/cheese-overload-pizza-175651\">Cheese Overload Pizza</a> are very similar to this recipe.",
    "cuisines": [],
    "dishTypes": [
      "morning meal",
      "brunch",
      "breakfast"
    ],
    "diets": [
      "lacto ovo vegetarian"
    ],
    "occasions": [],
    "analyzedInstructions": [
      {
        "name": "",
        "steps": [
          {
            "number": 1,
            "step": "Preheat oven to 400 degrees F.  Grease muffin cups or line with muffin liners.",
            "ingredients": [],
            "equipment": [
              {
                "id": 404676,
                "name": "muffin liners",
                "localizedName": "muffin liners",
                "image": "https://spoonacular.com/cdn/equipment_100x100/muffin-or-cupcake-forms.png"
              },
              {
                "id": 404784,
                "name": "oven",
                "localizedName": "oven",
                "image": "https://spoonacular.com/cdn/equipment_100x100/oven.jpg",
                "temperature": {
                  "number": 400,
                  "unit": "Fahrenheit"
                }
              }
            ]
          },
          {
            "number": 2,
            "step": "Combine flour, 3/4 cup sugar, salt and baking powder.",
            "ingredients": [
              {
                "id": 18369,
                "name": "baking powder",
                "localizedName": "baking powder",
                "image": "white-powder.jpg"
              },
              {
                "id": 20081,
                "name": "all purpose flour",
                "localizedName": "all purpose flour",
                "image": "flour.png"
              },
              {
                "id": 19335,
                "name": "sugar",
                "localizedName": "sugar",
                "image": "sugar-in-bowl.png"
              },
              {
                "id": 2047,
                "name": "salt",
                "localizedName": "salt",
                "image": "salt.jpg"
              }
            ],
            "equipment": []
          },
          {
            "number": 3,
            "step": "Place canola oil into 1 cup measuring cup or small bowl.",
            "ingredients": [
              {
                "id": 1014582,
                "name": "canola oil",
                "localizedName": "canola oil",
                "image": "vegetable-oil.jpg"
              }
            ],
            "equipment": [
              {
                "id": 404766,
                "name": "measuring cup",
                "localizedName": "measuring cup",
                "image": "https://spoonacular.com/cdn/equipment_100x100/measuring-cup.jpg"
              },
              {
                "id": 404783,
                "name": "bowl",
                "localizedName": "bowl",
                "image": "https://spoonacular.com/cdn/equipment_100x100/bowl.jpg"
              }
            ]
          },
          {
            "number": 4,
            "step": "Add egg and milk and mix well.",
            "ingredients": [
              {
                "id": 1077,
                "name": "milk",
                "localizedName": "milk",
                "image": "milk.png"
              },
              {
                "id": 1123,
                "name": "egg",
                "localizedName": "egg",
                "image": "egg.png"
              }
            ],
            "equipment": []
          },
          {
            "number": 5,
            "step": "Mix this into the flour mixture.",
            "ingredients": [
              {
                "id": 20081,
                "name": "all purpose flour",
                "localizedName": "all purpose flour",
                "image": "flour.png"
              }
            ],
            "equipment": []
          },
          {
            "number": 6,
            "step": "Fold in blueberries.",
            "ingredients": [
              {
                "id": 9050,
                "name": "blueberries",
                "localizedName": "blueberries",
                "image": "https://spoonacular.com/cdn/ingredients_100x100/blueberries.jpg"
              }
            ],
            "equipment": []
          },
          {
            "number": 7,
            "step": "Fill muffin cups right to the top, and sprinkle with crumb topping.",
            "ingredients": [],
            "equipment": [
              {
                "id": 404676,
                "name": "muffin liners",
                "localizedName": "muffin liners",
                "image": "https://spoonacular.com/cdn/equipment_100x100/muffin-or-cupcake-forms.png"
              }
            ]
          }
        ]
      },
      {
        "name": "Crumb Topping",
        "steps": [
          {
            "number": 1,
            "step": "Mix together 1/2 cup sugar, 1/3 cup flour, 1/4 cup butter and 1-1/2 tsp. cinnamon.",
            "ingredients": [
              {
                "id": 2010,
                "name": "cinnamon",
                "localizedName": "cinnamon",
                "image": "https://spoonacular.com/cdn/ingredients_100x100/cinnamon.jpg"
              },
              {
                "id": 1001,
                "name": "butter",
                "localizedName": "butter",
                "image": "butter-sliced.jpg"
              },
              {
                "id": 20081,
                "name": "all purpose flour",
                "localizedName": "all purpose flour",
                "image": "flour.png"
              },
              {
                "id": 19335,
                "name": "sugar",
                "localizedName": "sugar",
                "image": "sugar-in-bowl.png"
              }
            ],
            "equipment": []
          },
          {
            "number": 2,
            "step": "Mix with fork and sprinkle over muffins before baking.",
            "ingredients": [],
            "equipment": []
          },
          {
            "number": 3,
            "step": "Bake for 20-25 minutes.",
            "ingredients": [],
            "equipment": [
              {
                "id": 404784,
                "name": "oven",
                "localizedName": "oven",
                "image": "https://spoonacular.com/cdn/equipment_100x100/oven.jpg"
              }
            ],
            "length": {
              "number": 25,
              "unit": "minutes"
            }
          }
        ]
      }
    ],
    "spoonacularScore": 33.54442596435547,
    "spoonacularSourceUrl": "https://spoonacular.com/blueberry-overload-muffins-635507",
    "usedIngredientCount": 0,
    "missedIngredientCount": 6,
    "missedIngredients": [
      {
        "id": 18369,
        "amount": 2,
        "unit": "teaspoons",
        "unitLong": "teaspoons",
        "unitShort": "tsp",
        "aisle": "Baking",
        "name": "baking powder",
        "original": "2 teaspoons baking powder",
        "originalName": "baking powder",
        "meta": [],
        "image": "https://img.spoonacular.com/ingredients_100x100/white-powder.jpg"
      },
      {
        "id": 1123,
        "amount": 1,
        "unit": "",
        "unitLong": "",
        "unitShort": "",
        "aisle": "Milk, Eggs, Other Dairy",
        "name": "egg",
        "original": "1 egg",
        "originalName": "egg",
        "meta": [],
        "image": "https://img.spoonacular.com/ingredients_100x100/egg.png"
      },
      {
        "id": 1077,
        "amount": 1,
        "unit": "cup",
        "unitLong": "cup",
        "unitShort": "cup",
        "aisle": "Milk, Eggs, Other Dairy",
        "name": "milk",
        "original": "cup milk",
        "originalName": "milk",
        "meta": [],
        "image": "https://img.spoonacular.com/ingredients_100x100/milk.png"
      },
      {
        "id": 9050,
        "amount": 1,
        "unit": "cup",
        "unitLong": "cup",
        "unitShort": "cup",
        "aisle": "Produce",
        "name": "blueberries",
        "original": "1 cup fresh blueberries",
        "originalName": "fresh blueberries",
        "meta": [
          "fresh"
        ],
        "extendedName": "fresh blueberries",
        "image": "https://img.spoonacular.com/ingredients_100x100/blueberries.jpg"
      },
      {
        "id": 1145,
        "amount": 0.25,
        "unit": "cup",
        "unitLong": "cups",
        "unitShort": "cup",
        "aisle": "Milk, Eggs, Other Dairy",
        "name": "butter",
        "original": "1/4 cup unsalted butter, cubed",
        "originalName": "unsalted butter, cubed",
        "meta": [
          "unsalted",
          "cubed"
        ],
        "extendedName": "unsalted butter",
        "image": "https://img.spoonacular.com/ingredients_100x100/butter-sliced.jpg"
      },
      {
        "id": 2010,
        "amount": 1.5,
        "unit": "teaspoons",
        "unitLong": "teaspoons",
        "unitShort": "tsp",
        "aisle": "Spices and Seasonings",
        "name": "cinnamon",
        "original": "1 1/2 teaspoons cinnamon",
        "originalName": "cinnamon",
        "meta": [],
        "image": "https://img.spoonacular.com/ingredients_100x100/cinnamon.jpg"
      }
    ],
    "likes": 0,
    "usedIngredients": [],
    "unusedIngredients": []
  },
  {
    "id": 1096070,
    "image": "https://img.spoonacular.com/recipes/1096070-312x231.jpg",
    "imageType": "jpg",
    "title": "Healthy Morning Glory Muffins",
    "readyInMinutes": 45,
    "servings": 12,
    "sourceUrl": "https://www.foodista.com/recipe/T8BWWWGR/healthy-morning-glory-muffins",
    "vegetarian": true,
    "vegan": false,
    "glutenFree": false,
    "dairyFree": true,
    "veryHealthy": false,
    "cheap": false,
    "veryPopular": false,
    "sustainable": false,
    "lowFodmap": false,
    "weightWatcherSmartPoints": 6,
    "gaps": "no",
    "preparationMinutes": null,
    "cookingMinutes": null,
    "aggregateLikes": 1,
    "healthScore": 5,
    "creditsText": "Foodista.com – The Cooking Encyclopedia Everyone Can Edit",
    "license": "CC BY 3.0",
    "sourceName": "Foodista",
    "pricePerServing": 65.41,
    "extendedIngredients": [
      {
        "id": 20081,
        "aisle": "Baking",
        "image": "flour.png",
        "consistency": "SOLID",
        "name": "flour",
        "nameClean": "wheat flour",
        "original": "1 cup all-purpose flour",
        "originalName": "all-purpose flour",
        "amount": 1,
        "unit": "cup",
        "meta": [
          "all-purpose"
        ],
        "measures": {
          "us": {
            "amount": 1,
            "unitShort": "cup",
            "unitLong": "cup"
          },
          "metric": {
            "amount": 125,
            "unitShort": "g",
            "unitLong": "grams"
          }
        }
      },
      {
        "id": 20080,
        "aisle": "Baking",
        "image": "flour.png",
        "consistency": "SOLID",
        "name": "flour",
        "nameClean": "whole wheat flour",
        "original": "½ cup whole wheat flour",
        "originalName": "whole wheat flour",
        "amount": 0.5,
        "unit": "cup",
        "meta": [
          "whole wheat"
        ],
        "measures": {
          "us": {
            "amount": 0.5,
            "unitShort": "cups",
            "unitLong": "cups"
          },
          "metric": {
            "amount": 60,
            "unitShort": "g",
            "unitLong": "grams"
          }
        }
      },
      {
        "id": 93831,
        "aisle": "Baking",
        "image": "brown-sugar-pile.jpg",
        "consistency": "SOLID",
        "name": "date sugar",
        "nameClean": "palm sugar",
        "original": "1 cup date sugar",
        "originalName": "date sugar",
        "amount": 1,
        "unit": "cup",
        "meta": [],
        "measures": {
          "us": {
            "amount": 1,
            "unitShort": "cup",
            "unitLong": "cup"
          },
          "metric": {
            "amount": 160,
            "unitShort": "g",
            "unitLong": "grams"
          }
        }
      },
      {
        "id": 2010,
        "aisle": "Spices and Seasonings",
        "image": "cinnamon.jpg",
        "consistency": "SOLID",
        "name": "cinnamon",
        "nameClean": "cinnamon",
        "original": "2 tsp cinnamon",
        "originalName": "cinnamon",
        "amount": 2,
        "unit": "tsp",
        "meta": [],
        "measures": {
          "us": {
            "amount": 2,
            "unitShort": "tsps",
            "unitLong": "teaspoons"
          },
          "metric": {
            "amount": 2,
            "unitShort": "tsps",
            "unitLong": "teaspoons"
          }
        }
      },
      {
        "id": 18372,
        "aisle": "Baking",
        "image": "white-powder.jpg",
        "consistency": "SOLID",
        "name": "baking soda",
        "nameClean": "baking soda",
        "original": "1 teaspoon baking soda",
        "originalName": "baking soda",
        "amount": 1,
        "unit": "teaspoon",
        "meta": [],
        "measures": {
          "us": {
            "amount": 1,
            "unitShort": "tsp",
            "unitLong": "teaspoon"
          },
          "metric": {
            "amount": 1,
            "unitShort": "tsp",
            "unitLong": "teaspoon"
          }
        }
      },
      {
        "id": 1082047,
        "aisle": "Spices and Seasonings",
        "image": "salt.jpg",
        "consistency": "SOLID",
        "name": "kosher salt",
        "nameClean": "kosher salt",
        "original": "½ tsp kosher salt",
        "originalName": "kosher salt",
        "amount": 0.5,
        "unit": "tsp",
        "meta": [],
        "measures": {
          "us": {
            "amount": 0.5,
            "unitShort": "tsps",
            "unitLong": "teaspoons"
          },
          "metric": {
            "amount": 0.5,
            "unitShort": "tsps",
            "unitLong": "teaspoons"
          }
        }
      },
      {
        "id": 12108,
        "aisle": "Baking",
        "image": "shredded-coconut.jpg",
        "consistency": "SOLID",
        "name": "coconut",
        "nameClean": "unsweetened coconut",
        "original": "1/3 cup unsweetened, flaked coconut",
        "originalName": "unsweetened, flaked coconut",
        "amount": 0.33333334,
        "unit": "cup",
        "meta": [
          "unsweetened",
          "flaked"
        ],
        "measures": {
          "us": {
            "amount": 0.33333334,
            "unitShort": "cups",
            "unitLong": "cups"
          },
          "metric": {
            "amount": 28.333,
            "unitShort": "g",
            "unitLong": "grams"
          }
        }
      },
      {
        "id": 9297,
        "aisle": "Dried Fruits",
        "image": "golden-raisins.jpg",
        "consistency": "SOLID",
        "name": "golden raisins",
        "nameClean": "golden raisins",
        "original": "½ cup golden raisins",
        "originalName": "golden raisins",
        "amount": 0.5,
        "unit": "cup",
        "meta": [],
        "measures": {
          "us": {
            "amount": 0.5,
            "unitShort": "cups",
            "unitLong": "cups"
          },
          "metric": {
            "amount": 72.5,
            "unitShort": "g",
            "unitLong": "grams"
          }
        }
      },
      {
        "id": 9216,
        "aisle": "Produce",
        "image": "orange-zest.png",
        "consistency": "SOLID",
        "name": "orange zest",
        "nameClean": "orange zest",
        "original": "zest of 1 orange",
        "originalName": "zest of orange",
        "amount": 1,
        "unit": "",
        "meta": [],
        "measures": {
          "us": {
            "amount": 1,
            "unitShort": "",
            "unitLong": ""
          },
          "metric": {
            "amount": 1,
            "unitShort": "",
            "unitLong": ""
          }
        }
      },
      {
        "id": 9003,
        "aisle": "Produce",
        "image": "apple.jpg",
        "consistency": "SOLID",
        "name": "apple",
        "nameClean": "apple",
        "original": "1 small apple peeled and grated (about 1 cup)",
        "originalName": "small apple peeled and grated (about",
        "amount": 1,
        "unit": "cup",
        "meta": [
          "grated",
          "peeled"
        ],
        "measures": {
          "us": {
            "amount": 1,
            "unitShort": "cup",
            "unitLong": "cup"
          },
          "metric": {
            "amount": 125,
            "unitShort": "g",
            "unitLong": "grams"
          }
        }
      },
      {
        "id": 1019354,
        "aisle": "Canned and Jarred",
        "image": "pineapple-with-can.png",
        "consistency": "SOLID",
        "name": "pineapple",
        "nameClean": "crushed pineapple",
        "original": "1 can (8 ounces) crushed pineapple, drained",
        "originalName": "can crushed pineapple, drained",
        "amount": 8,
        "unit": "ounces",
        "meta": [
          "crushed",
          "drained",
          "canned"
        ],
        "measures": {
          "us": {
            "amount": 8,
            "unitShort": "oz",
            "unitLong": "ounces"
          },
          "metric": {
            "amount": 226.796,
            "unitShort": "g",
            "unitLong": "grams"
          }
        }
      },
      {
        "id": 11124,
        "aisle": "Produce",
        "image": "sliced-carrot.png",
        "consistency": "SOLID",
        "name": "carrot",
        "nameClean": "carrot",
        "original": "1 cup grated carrot",
        "originalName": "grated carrot",
        "amount": 1,
        "unit": "cup",
        "meta": [
          "grated"
        ],
        "measures": {
          "us": {
            "amount": 1,
            "unitShort": "cup",
            "unitLong": "cup"
          },
          "metric": {
            "amount": 128,
            "unitShort": "g",
            "unitLong": "grams"
          }
        }
      },
      {
        "id": 10112155,
        "aisle": "Baking",
        "image": "walnuts.jpg",
        "consistency": "SOLID",
        "name": "walnuts",
        "nameClean": "walnut pieces",
        "original": "1/3 cup coarsely chopped walnuts or pecans, plus more to top",
        "originalName": "coarsely chopped walnuts or pecans, plus more to top",
        "amount": 0.33333334,
        "unit": "cup",
        "meta": [
          "plus more to top",
          "coarsely chopped"
        ],
        "measures": {
          "us": {
            "amount": 0.33333334,
            "unitShort": "cups",
            "unitLong": "cups"
          },
          "metric": {
            "amount": 39,
            "unitShort": "g",
            "unitLong": "grams"
          }
        }
      },
      {
        "id": 1123,
        "aisle": "Milk, Eggs, Other Dairy",
        "image": "egg.png",
        "consistency": "SOLID",
        "name": "eggs",
        "nameClean": "egg",
        "original": "2 large eggs",
        "originalName": "eggs",
        "amount": 2,
        "unit": "large",
        "meta": [],
        "measures": {
          "us": {
            "amount": 2,
            "unitShort": "large",
            "unitLong": "larges"
          },
          "metric": {
            "amount": 2,
            "unitShort": "large",
            "unitLong": "larges"
          }
        }
      },
      {
        "id": 9019,
        "aisle": "Canned and Jarred",
        "image": "applesauce.png",
        "consistency": "SOLID",
        "name": "apple sauce",
        "nameClean": "applesauce",
        "original": "1 cup unsweetened apple sauce",
        "originalName": "unsweetened apple sauce",
        "amount": 1,
        "unit": "cup",
        "meta": [
          "unsweetened"
        ],
        "measures": {
          "us": {
            "amount": 1,
            "unitShort": "cup",
            "unitLong": "cup"
          },
          "metric": {
            "amount": 244,
            "unitShort": "ml",
            "unitLong": "milliliters"
          }
        }
      },
      {
        "id": 2050,
        "aisle": "Baking",
        "image": "vanilla-extract.jpg",
        "consistency": "LIQUID",
        "name": "vanilla extract",
        "nameClean": "vanilla extract",
        "original": "1½ tsp pure vanilla extract",
        "originalName": "pure vanilla extract",
        "amount": 1.5,
        "unit": "tsp",
        "meta": [
          "pure"
        ],
        "measures": {
          "us": {
            "amount": 1.5,
            "unitShort": "tsps",
            "unitLong": "teaspoons"
          },
          "metric": {
            "amount": 1.5,
            "unitShort": "tsps",
            "unitLong": "teaspoons"
          }
        }
      }
    ],
    "summary": "Healthy Morning Glory Muffins is a breakfast that serves 12. One serving contains <b>199 calories</b>, <b>4g of protein</b>, and <b>5g of fat</b>. For <b>65 cents per serving</b>, this recipe <b>covers 8%</b> of your daily requirements of vitamins and minerals. 1 person has made this recipe and would make it again. A mixture of flour, flour, carrot, and a handful of other ingredients are all it takes to make this recipe so delicious. It is brought to you by Foodista. It is a good option if you're following a <b>dairy free and lacto ovo vegetarian</b> diet. From preparation to the plate, this recipe takes approximately <b>45 minutes</b>. All things considered, we decided this recipe <b>deserves a spoonacular score of 36%</b>. This score is rather bad. If you like this recipe, take a look at these similar recipes: <a href=\"https://spoonacular.com/recipes/healthy-morning-glory-muffins-1589539\">Healthy Morning Glory Muffins</a>, <a href=\"https://spoonacular.com/recipes/healthy-morning-glory-muffins-1798231\">Healthy Morning Glory Muffins</a>, and <a href=\"https://spoonacular.com/recipes/healthy-morning-glory-muffins-1720207\">Healthy Morning Glory Muffins</a>.",
    "cuisines": [],
    "dishTypes": [
      "morning meal",
      "brunch",
      "breakfast"
    ],
    "diets": [
      "dairy free",
      "lacto ovo vegetarian"
    ],
    "occasions": [],
    "analyzedInstructions": [
      {
        "name": "",
        "steps": [
          {
            "number": 1,
            "step": "Place oven rack in lower third of oven and preheat to 350F.In a large bowl, whisk flour, sugar, cinnamon, baking soda and salt.",
            "ingredients": [
              {
                "id": 18372,
                "name": "baking soda",
                "localizedName": "baking soda",
                "image": "white-powder.jpg"
              },
              {
                "id": 2010,
                "name": "cinnamon",
                "localizedName": "cinnamon",
                "image": "https://spoonacular.com/cdn/ingredients_100x100/cinnamon.jpg"
              },
              {
                "id": 20081,
                "name": "all purpose flour",
                "localizedName": "all purpose flour",
                "image": "flour.png"
              },
              {
                "id": 19335,
                "name": "sugar",
                "localizedName": "sugar",
                "image": "sugar-in-bowl.png"
              },
              {
                "id": 2047,
                "name": "salt",
                "localizedName": "salt",
                "image": "salt.jpg"
              }
            ],
            "equipment": [
              {
                "id": 404661,
                "name": "whisk",
                "localizedName": "whisk",
                "image": "https://spoonacular.com/cdn/equipment_100x100/whisk.png"
              },
              {
                "id": 404783,
                "name": "bowl",
                "localizedName": "bowl",
                "image": "https://spoonacular.com/cdn/equipment_100x100/bowl.jpg"
              },
              {
                "id": 404784,
                "name": "oven",
                "localizedName": "oven",
                "image": "https://spoonacular.com/cdn/equipment_100x100/oven.jpg",
                "temperature": {
                  "number": 350,
                  "unit": "Fahrenheit"
                }
              }
            ]
          },
          {
            "number": 2,
            "step": "Add the coconut, raisins, orange zest, apple, pineapple, carrots and stir to combine.In a separate bowl, whisk eggs with the applesauce and vanilla.",
            "ingredients": [
              {
                "id": 9216,
                "name": "orange zest",
                "localizedName": "orange zest",
                "image": "orange-zest.png"
              },
              {
                "id": 9019,
                "name": "applesauce",
                "localizedName": "applesauce",
                "image": "applesauce.png"
              },
              {
                "id": 9266,
                "name": "pineapple",
                "localizedName": "pineapple",
                "image": "pineapple.jpg"
              },
              {
                "id": 11124,
                "name": "carrot",
                "localizedName": "carrot",
                "image": "sliced-carrot.png"
              },
              {
                "id": 12104,
                "name": "coconut",
                "localizedName": "coconut",
                "image": "https://spoonacular.com/cdn/ingredients_100x100/coconut.jpg"
              },
              {
                "id": 9299,
                "name": "raisins",
                "localizedName": "raisins",
                "image": "https://spoonacular.com/cdn/ingredients_100x100/raisins.jpg"
              },
              {
                "id": 1052050,
                "name": "vanilla",
                "localizedName": "vanilla",
                "image": "vanilla.jpg"
              },
              {
                "id": 9003,
                "name": "apple",
                "localizedName": "apple",
                "image": "https://spoonacular.com/cdn/ingredients_100x100/apple.jpg"
              },
              {
                "id": 1123,
                "name": "egg",
                "localizedName": "egg",
                "image": "egg.png"
              }
            ],
            "equipment": [
              {
                "id": 404661,
                "name": "whisk",
                "localizedName": "whisk",
                "image": "https://spoonacular.com/cdn/equipment_100x100/whisk.png"
              },
              {
                "id": 404783,
                "name": "bowl",
                "localizedName": "bowl",
                "image": "https://spoonacular.com/cdn/equipment_100x100/bowl.jpg"
              }
            ]
          },
          {
            "number": 3,
            "step": "Add to the dry ingredients, and blend well.Spoon batter into muffin tins lined with muffin cups. Spritz the muffin cups with cooking spray. Fill almost all the way, they don't rise much.Press extra nuts and coconut flakes onto the tops, if desired.",
            "ingredients": [
              {
                "id": 12108,
                "name": "coconut flakes",
                "localizedName": "coconut flakes",
                "image": "coconut-flakes.png"
              },
              {
                "id": 4679,
                "name": "cooking spray",
                "localizedName": "cooking spray",
                "image": "cooking-spray.png"
              },
              {
                "id": 12135,
                "name": "nuts",
                "localizedName": "nuts",
                "image": "nuts-mixed.jpg"
              }
            ],
            "equipment": [
              {
                "id": 404676,
                "name": "muffin liners",
                "localizedName": "muffin liners",
                "image": "https://spoonacular.com/cdn/equipment_100x100/muffin-or-cupcake-forms.png"
              },
              {
                "id": 404671,
                "name": "muffin tray",
                "localizedName": "muffin tray",
                "image": "https://spoonacular.com/cdn/equipment_100x100/muffin-tray.jpg"
              }
            ]
          },
          {
            "number": 4,
            "step": "Bake for 30 - 35 minutes or until toothpick inserted in the middle comes out clean.Cool muffins in the pan for 10 minutes, then turn out onto a rack to finish cooling.",
            "ingredients": [],
            "equipment": [
              {
                "id": 404644,
                "name": "toothpicks",
                "localizedName": "toothpicks",
                "image": "https://spoonacular.com/cdn/equipment_100x100/toothpicks.jpg"
              },
              {
                "id": 404784,
                "name": "oven",
                "localizedName": "oven",
                "image": "https://spoonacular.com/cdn/equipment_100x100/oven.jpg"
              },
              {
                "id": 404645,
                "name": "frying pan",
                "localizedName": "frying pan",
                "image": "https://spoonacular.com/cdn/equipment_100x100/pan.png"
              }
            ],
            "length": {
              "number": 45,
              "unit": "minutes"
            }
          }
        ]
      }
    ],
    "spoonacularScore": 43.449462890625,
    "spoonacularSourceUrl": "https://spoonacular.com/healthy-morning-glory-muffins-1096070",
    "usedIngredientCount": 0,
    "missedIngredientCount": 12,
    "missedIngredients": [
      {
        "id": 2010,
        "amount": 2,
        "unit": "tsp",
        "unitLong": "teaspoons",
        "unitShort": "tsp",
        "aisle": "Spices and Seasonings",
        "name": "cinnamon",
        "original": "2 tsp cinnamon",
        "originalName": "cinnamon",
        "meta": [],
        "image": "https://img.spoonacular.com/ingredients_100x100/cinnamon.jpg"
      },
      {
        "id": 18372,
        "amount": 1,
        "unit": "teaspoon",
        "unitLong": "teaspoon",
        "unitShort": "tsp",
        "aisle": "Baking",
        "name": "baking soda",
        "original": "1 teaspoon baking soda",
        "originalName": "baking soda",
        "meta": [],
        "image": "https://img.spoonacular.com/ingredients_100x100/white-powder.jpg"
      },
      {
        "id": 12108,
        "amount": 0.33333334,
        "unit": "cup",
        "unitLong": "cups",
        "unitShort": "cup",
        "aisle": "Baking",
        "name": "coconut",
        "original": "1/3 cup unsweetened, flaked coconut",
        "originalName": "unsweetened, flaked coconut",
        "meta": [
          "unsweetened",
          "flaked"
        ],
        "extendedName": "unsweetened coconut",
        "image": "https://img.spoonacular.com/ingredients_100x100/shredded-coconut.jpg"
      },
      {
        "id": 9297,
        "amount": 0.5,
        "unit": "cup",
        "unitLong": "cups",
        "unitShort": "cup",
        "aisle": "Dried Fruits",
        "name": "golden raisins",
        "original": "½ cup golden raisins",
        "originalName": "golden raisins",
        "meta": [],
        "image": "https://img.spoonacular.com/ingredients_100x100/golden-raisins.jpg"
      },
      {
        "id": 9216,
        "amount": 1,
        "unit": "",
        "unitLong": "",
        "unitShort": "",
        "aisle": "Produce",
        "name": "orange zest",
        "original": "zest of 1 orange",
        "originalName": "zest of orange",
        "meta": [],
        "image": "https://img.spoonacular.com/ingredients_100x100/orange-zest.png"
      },
      {
        "id": 9003,
        "amount": 1,
        "unit": "cup",
        "unitLong": "cup",
        "unitShort": "cup",
        "aisle": "Produce",
        "name": "apple",
        "original": "1 small apple peeled and grated (about 1 cup)",
        "originalName": "small apple peeled and grated (about",
        "meta": [
          "grated",
          "peeled"
        ],
        "image": "https://img.spoonacular.com/ingredients_100x100/apple.jpg"
      },
      {
        "id": 1019354,
        "amount": 8,
        "unit": "ounces",
        "unitLong": "ounces",
        "unitShort": "oz",
        "aisle": "Canned and Jarred",
        "name": "pineapple",
        "original": "1 can (8 ounces) crushed pineapple, drained",
        "originalName": "can crushed pineapple, drained",
        "meta": [
          "crushed",
          "drained",
          "canned"
        ],
        "extendedName": "canned pineapple",
        "image": "https://img.spoonacular.com/ingredients_100x100/pineapple-with-can.png"
      },
      {
        "id": 11124,
        "amount": 1,
        "unit": "cup",
        "unitLong": "cup",
        "unitShort": "cup",
        "aisle": "Produce",
        "name": "carrot",
        "original": "1 cup grated carrot",
        "originalName": "grated carrot",
        "meta": [
          "grated"
        ],
        "image": "https://img.spoonacular.com/ingredients_100x100/sliced-carrot.png"
      },
      {
        "id": 10112155,
        "amount": 0.33333334,
        "unit": "cup",
        "unitLong": "cups",
        "unitShort": "cup",
        "aisle": "Baking",
        "name": "walnuts",
        "original": "1/3 cup coarsely chopped walnuts or pecans, plus more to top",
        "originalName": "coarsely chopped walnuts or pecans, plus more to top",
        "meta": [
          "plus more to top",
          "coarsely chopped"
        ],
        "image": "https://img.spoonacular.com/ingredients_100x100/walnuts.jpg"
      },
      {
        "id": 1123,
        "amount": 2,
        "unit": "large",
        "unitLong": "larges",
        "unitShort": "large",
        "aisle": "Milk, Eggs, Other Dairy",
        "name": "eggs",
        "original": "2 large eggs",
        "originalName": "eggs",
        "meta": [],
        "image": "https://img.spoonacular.com/ingredients_100x100/egg.png"
      },
      {
        "id": 9019,
        "amount": 1,
        "unit": "cup",
        "unitLong": "cup",
        "unitShort": "cup",
        "aisle": "Canned and Jarred",
        "name": "apple sauce",
        "original": "1 cup unsweetened apple sauce",
        "originalName": "unsweetened apple sauce",
        "meta": [
          "unsweetened"
        ],
        "extendedName": "unsweetened apple sauce",
        "image": "https://img.spoonacular.com/ingredients_100x100/applesauce.png"
      },
      {
        "id": 2050,
        "amount": 1.5,
        "unit": "tsp",
        "unitLong": "teaspoons",
        "unitShort": "tsp",
        "aisle": "Baking",
        "name": "vanilla extract",
        "original": "1½ tsp pure vanilla extract",
        "originalName": "pure vanilla extract",
        "meta": [
          "pure"
        ],
        "image": "https://img.spoonacular.com/ingredients_100x100/vanilla-extract.jpg"
      }
    ],
    "likes": 0,
    "usedIngredients": [],
    "unusedIngredients": []
  },
  {
    "id": 662276,
    "image": "https://img.spoonacular.com/recipes/662276-312x231.jpg",
    "imageType": "jpg",
    "title": "Sun Dried Tomato and Herb Baked Eggs",
    "readyInMinutes": 25,
    "servings": 1,
    "sourceUrl": "https://www.foodista.com/recipe/V4LG5KBB/sundried-tomato-and-herb-baked-eggs",
    "vegetarian": true,
    "vegan": false,
    "glutenFree": true,
    "dairyFree": true,
    "veryHealthy": false,
    "cheap": false,
    "veryPopular": false,
    "sustainable": false,
    "lowFodmap": true,
    "weightWatcherSmartPoints": 4,
    "gaps": "no",
    "preparationMinutes": null,
    "cookingMinutes": null,
    "aggregateLikes": 13,
    "healthScore": 3,
    "creditsText": "foodista.com",
    "license": null,
    "sourceName": "foodista.com",
    "pricePerServing": 90.05,
    "extendedIngredients": [
      {
        "id": 1123,
        "aisle": "Milk, Eggs, Other Dairy",
        "image": "egg.png",
        "consistency": "SOLID",
        "name": "eggs",
        "nameClean": "egg",
        "original": "2 eggs",
        "originalName": "eggs",
        "amount": 2,
        "unit": "",
        "meta": [],
        "measures": {
          "us": {
            "amount": 2,
            "unitShort": "",
            "unitLong": ""
          },
          "metric": {
            "amount": 2,
            "unitShort": "",
            "unitLong": ""
          }
        }
      },
      {
        "id": 2044,
        "aisle": "Produce",
        "image": "fresh-basil.jpg",
        "consistency": "SOLID",
        "name": "basil",
        "nameClean": "fresh basil",
        "original": "½ Tsp. fresh basil",
        "originalName": "fresh basil",
        "amount": 0.5,
        "unit": "Tsp",
        "meta": [
          "fresh"
        ],
        "measures": {
          "us": {
            "amount": 0.5,
            "unitShort": "tsps",
            "unitLong": "teaspoons"
          },
          "metric": {
            "amount": 0.5,
            "unitShort": "tsps",
            "unitLong": "teaspoons"
          }
        }
      },
      {
        "id": 10511297,
        "aisle": "Produce",
        "image": "parsley.jpg",
        "consistency": "SOLID",
        "name": "parsley",
        "nameClean": "fresh parsley",
        "original": "½ Tsp. fresh parsley",
        "originalName": "fresh parsley",
        "amount": 0.5,
        "unit": "Tsp",
        "meta": [
          "fresh"
        ],
        "measures": {
          "us": {
            "amount": 0.5,
            "unitShort": "tsps",
            "unitLong": "teaspoons"
          },
          "metric": {
            "amount": 0.5,
            "unitShort": "tsps",
            "unitLong": "teaspoons"
          }
        }
      },
      {
        "id": 4053,
        "aisle": "Oil, Vinegar, Salad Dressing",
        "image": "olive-oil.jpg",
        "consistency": "LIQUID",
        "name": "olive oil",
        "nameClean": "olive oil",
        "original": "1 Tsp. olive oil",
        "originalName": "olive oil",
        "amount": 1,
        "unit": "Tsp",
        "meta": [],
        "measures": {
          "us": {
            "amount": 1,
            "unitShort": "tsp",
            "unitLong": "teaspoon"
          },
          "metric": {
            "amount": 1,
            "unitShort": "tsp",
            "unitLong": "teaspoon"
          }
        }
      },
      {
        "id": 11955,
        "aisle": "Produce",
        "image": "sundried-tomatoes.jpg",
        "consistency": "SOLID",
        "name": "sundried tomatoes",
        "nameClean": "sun dried tomatoes",
        "original": "1 Tbsp. sundried tomatoes",
        "originalName": "sundried tomatoes",
        "amount": 1,
        "unit": "Tbsp",
        "meta": [],
        "measures": {
          "us": {
            "amount": 1,
            "unitShort": "Tbsp",
            "unitLong": "Tbsp"
          },
          "metric": {
            "amount": 1,
            "unitShort": "Tbsp",
            "unitLong": "Tbsp"
          }
        }
      }
    ],
    "summary": "If you want to add more <b>gluten free, dairy free, paleolithic, and lacto ovo vegetarian</b> recipes to your recipe box, Sun Dried Tomato and Herb Baked Eggs might be a recipe you should try. One serving contains <b>179 calories</b>, <b>12g of protein</b>, and <b>13g of fat</b>. This recipe serves 1. For <b>90 cents per serving</b>, this recipe <b>covers 10%</b> of your daily requirements of vitamins and minerals. This recipe from Foodista requires eggs, basil, sundried tomatoes, and olive oil. 13 people found this recipe to be flavorful and satisfying. It works best as a hor d'oeuvre, and is done in around <b>25 minutes</b>. Taking all factors into account, this recipe <b>earns a spoonacular score of 37%</b>, which is not so super. Similar recipes include <a href=\"https://spoonacular.com/recipes/sun-dried-tomato-and-herb-baked-eggs-1365689\">Sun Dried Tomato and Herb Baked Eggs</a>, <a href=\"https://spoonacular.com/recipes/baked-eggs-with-spinach-mushrooms-and-sun-dried-tomato-530601\">Baked Eggs with Spinach, Mushrooms and Sun Dried Tomato</a>, and <a href=\"https://spoonacular.com/recipes/herb-sun-dried-tomato-muffins-462519\">Herb & Sun-Dried Tomato Muffins</a>.",
    "cuisines": [],
    "dishTypes": [
      "antipasti",
      "starter",
      "morning meal",
      "snack",
      "brunch",
      "appetizer",
      "antipasto",
      "breakfast",
      "hor d'oeuvre"
    ],
    "diets": [
      "gluten free",
      "dairy free",
      "paleolithic",
      "lacto ovo vegetarian",
      "primal",
      "fodmap friendly",
      "whole 30",
      "ketogenic"
    ],
    "occasions": [],
    "analyzedInstructions": [
      {
        "name": "",
        "steps": [
          {
            "number": 1,
            "step": "Preheat oven to 350 F.Cover the inside of one ramekin or oven safe dish with olive oil.Line the bottom of the dish with sundried tomatoes and break two eggs on top.",
            "ingredients": [
              {
                "id": 11955,
                "name": "sun dried tomatoes",
                "localizedName": "sun dried tomatoes",
                "image": "sundried-tomatoes.jpg"
              },
              {
                "id": 4053,
                "name": "olive oil",
                "localizedName": "olive oil",
                "image": "olive-oil.jpg"
              },
              {
                "id": 1123,
                "name": "egg",
                "localizedName": "egg",
                "image": "egg.png"
              }
            ],
            "equipment": [
              {
                "id": 404781,
                "name": "ramekin",
                "localizedName": "ramekin",
                "image": "https://spoonacular.com/cdn/equipment_100x100/ramekin.jpg"
              },
              {
                "id": 404784,
                "name": "oven",
                "localizedName": "oven",
                "image": "https://spoonacular.com/cdn/equipment_100x100/oven.jpg",
                "temperature": {
                  "number": 350,
                  "unit": "Fahrenheit"
                }
              }
            ]
          },
          {
            "number": 2,
            "step": "Sprinkle with fresh herbs.",
            "ingredients": [
              {
                "id": 10111297,
                "name": "fresh herbs",
                "localizedName": "fresh herbs",
                "image": "mixed-fresh-herbs.jpg"
              }
            ],
            "equipment": []
          },
          {
            "number": 3,
            "step": "Bake uncovered for 15-20 minutes until egg whites are firm.",
            "ingredients": [
              {
                "id": 1124,
                "name": "egg whites",
                "localizedName": "egg whites",
                "image": "egg-white.jpg"
              }
            ],
            "equipment": [
              {
                "id": 404784,
                "name": "oven",
                "localizedName": "oven",
                "image": "https://spoonacular.com/cdn/equipment_100x100/oven.jpg"
              }
            ],
            "length": {
              "number": 20,
              "unit": "minutes"
            }
          },
          {
            "number": 4,
            "step": "Serve immediately.",
            "ingredients": [],
            "equipment": []
          }
        ]
      }
    ],
    "spoonacularScore": 41.99631881713867,
    "spoonacularSourceUrl": "https://spoonacular.com/sun-dried-tomato-and-herb-baked-eggs-662276",
    "usedIngredientCount": 0,
    "missedIngredientCount": 4,
    "missedIngredients": [
      {
        "id": 1123,
        "amount": 2,
        "unit": "",
        "unitLong": "",
        "unitShort": "",
        "aisle": "Milk, Eggs, Other Dairy",
        "name": "eggs",
        "original": "2 eggs",
        "originalName": "eggs",
        "meta": [],
        "image": "https://img.spoonacular.com/ingredients_100x100/egg.png"
      },
      {
        "id": 2044,
        "amount": 0.5,
        "unit": "Tsp",
        "unitLong": "Tsps",
        "unitShort": "tsp",
        "aisle": "Produce",
        "name": "basil",
        "original": "½ Tsp. fresh basil",
        "originalName": "fresh basil",
        "meta": [
          "fresh"
        ],
        "extendedName": "fresh basil",
        "image": "https://img.spoonacular.com/ingredients_100x100/fresh-basil.jpg"
      },
      {
        "id": 10511297,
        "amount": 0.5,
        "unit": "Tsp",
        "unitLong": "Tsps",
        "unitShort": "tsp",
        "aisle": "Produce",
        "name": "parsley",
        "original": "½ Tsp. fresh parsley",
        "originalName": "fresh parsley",
        "meta": [
          "fresh"
        ],
        "extendedName": "fresh parsley",
        "image": "https://img.spoonacular.com/ingredients_100x100/parsley.jpg"
      },
      {
        "id": 11955,
        "amount": 1,
        "unit": "Tbsp",
        "unitLong": "Tbsp",
        "unitShort": "Tbsp",
        "aisle": "Produce",
        "name": "sundried tomatoes",
        "original": "1 Tbsp. sundried tomatoes",
        "originalName": "sundried tomatoes",
        "meta": [],
        "image": "https://img.spoonacular.com/ingredients_100x100/sundried-tomatoes.jpg"
      }
    ],
    "likes": 0,
    "usedIngredients": [],
    "unusedIngredients": []
  },
  {
    "id": 634098,
    "image": "https://img.spoonacular.com/recipes/634098-312x231.jpg",
    "imageType": "jpg",
    "title": "Banana Graham Dessert",
    "readyInMinutes": 45,
    "servings": 6,
    "sourceUrl": "https://www.foodista.com/recipe/LH7BZVY4/banana-graham-dessert",
    "vegetarian": true,
    "vegan": false,
    "glutenFree": false,
    "dairyFree": false,
    "veryHealthy": false,
    "cheap": false,
    "veryPopular": false,
    "sustainable": false,
    "lowFodmap": false,
    "weightWatcherSmartPoints": 6,
    "gaps": "no",
    "preparationMinutes": null,
    "cookingMinutes": null,
    "aggregateLikes": 1,
    "healthScore": 7,
    "creditsText": "Foodista.com – The Cooking Encyclopedia Everyone Can Edit",
    "license": "CC BY 3.0",
    "sourceName": "Foodista",
    "pricePerServing": 80.61,
    "extendedIngredients": [
      {
        "id": 9040,
        "aisle": "Produce",
        "image": "bananas.jpg",
        "consistency": "SOLID",
        "name": "bananas",
        "nameClean": "banana",
        "original": "2 large Firm bananas, sliced",
        "originalName": "Firm bananas, sliced",
        "amount": 2,
        "unit": "large",
        "meta": [
          "firm",
          "sliced"
        ],
        "measures": {
          "us": {
            "amount": 2,
            "unitShort": "large",
            "unitLong": "larges"
          },
          "metric": {
            "amount": 2,
            "unitShort": "large",
            "unitLong": "larges"
          }
        }
      },
      {
        "id": 99022,
        "aisle": "Baking",
        "image": "vanilla-pudding.png",
        "consistency": "SOLID",
        "name": "vanilla pudding mix",
        "nameClean": "sugar free vanilla pudding mix",
        "original": "1 small Instant sugar-free vanilla pudding mix",
        "originalName": "Instant sugar-free vanilla pudding mix",
        "amount": 1,
        "unit": "small",
        "meta": [
          "sugar-free",
          "instant"
        ],
        "measures": {
          "us": {
            "amount": 1,
            "unitShort": "small",
            "unitLong": "small"
          },
          "metric": {
            "amount": 1,
            "unitShort": "small",
            "unitLong": "small"
          }
        }
      },
      {
        "id": 10118617,
        "aisle": "Sweet Snacks",
        "image": "graham-crackers.jpg",
        "consistency": "SOLID",
        "name": "graham crackers",
        "nameClean": "low fat graham crackers",
        "original": "12 Reduced-fat graham crackers",
        "originalName": "Reduced-fat graham crackers",
        "amount": 12,
        "unit": "",
        "meta": [
          "reduced-fat"
        ],
        "measures": {
          "us": {
            "amount": 12,
            "unitShort": "",
            "unitLong": ""
          },
          "metric": {
            "amount": 12,
            "unitShort": "",
            "unitLong": ""
          }
        }
      },
      {
        "id": 1180,
        "aisle": "Milk, Eggs, Other Dairy",
        "image": "img.spoonacular.",
        "consistency": "SOLID",
        "name": "nonfat cream",
        "nameClean": "nonfat sour cream",
        "original": "8 ounces Nonfat sour cream",
        "originalName": "Nonfat sour cream",
        "amount": 8,
        "unit": "ounces",
        "meta": [
          "sour"
        ],
        "measures": {
          "us": {
            "amount": 8,
            "unitShort": "oz",
            "unitLong": "ounces"
          },
          "metric": {
            "amount": 226.796,
            "unitShort": "g",
            "unitLong": "grams"
          }
        }
      },
      {
        "id": 1085,
        "aisle": "Milk, Eggs, Other Dairy",
        "image": "img.spoonacular.",
        "consistency": "LIQUID",
        "name": "skim milk",
        "nameClean": "fat free milk",
        "original": "2 3/4 cups Cold skim milk",
        "originalName": "Cold skim milk",
        "amount": 2.75,
        "unit": "cups",
        "meta": [
          "cold"
        ],
        "measures": {
          "us": {
            "amount": 2.75,
            "unitShort": "cups",
            "unitLong": "cups"
          },
          "metric": {
            "amount": 673.75,
            "unitShort": "ml",
            "unitLong": "milliliters"
          }
        }
      }
    ],
    "summary": "If you want to add more <b>Southern</b> recipes to your repertoire, Banana Graham Dessert might be a recipe you should try. One serving contains <b>215 calories</b>, <b>7g of protein</b>, and <b>2g of fat</b>. This recipe serves 6 and costs 81 cents per serving. It is brought to you by Foodista. A mixture of skim milk, vanilla pudding mix, nonfat cream, and a handful of other ingredients are all it takes to make this recipe so delicious. It is a good option if you're following a <b>lacto ovo vegetarian</b> diet. From preparation to the plate, this recipe takes approximately <b>45 minutes</b>. 1 person has made this recipe and would make it again. All things considered, we decided this recipe <b>deserves a spoonacular score of 43%</b>. This score is solid. Similar recipes are <a href=\"https://spoonacular.com/recipes/strawberry-graham-dessert-427928\">Strawberry Graham Dessert</a>, <a href=\"https://spoonacular.com/recipes/apple-graham-dessert-367077\">Apple Graham Dessert</a>, and <a href=\"https://spoonacular.com/recipes/marshmallow-graham-dessert-389060\">Marshmallow Graham Dessert</a>.",
    "cuisines": [
      "Southern"
    ],
    "dishTypes": [],
    "diets": [
      "lacto ovo vegetarian"
    ],
    "occasions": [],
    "analyzedInstructions": [
      {
        "name": "",
        "steps": [
          {
            "number": 1,
            "step": "In a mixing bowl, beat pudding mix and milk on low speed for 2 minutes.Fold in sour cream.",
            "ingredients": [
              {
                "id": 10119206,
                "name": "pudding mix",
                "localizedName": "pudding mix",
                "image": ""
              },
              {
                "id": 1056,
                "name": "sour cream",
                "localizedName": "sour cream",
                "image": "sour-cream.jpg"
              },
              {
                "id": 1077,
                "name": "milk",
                "localizedName": "milk",
                "image": "milk.png"
              }
            ],
            "equipment": [
              {
                "id": 405907,
                "name": "mixing bowl",
                "localizedName": "mixing bowl",
                "image": "https://spoonacular.com/cdn/equipment_100x100/mixing-bowl.jpg"
              }
            ],
            "length": {
              "number": 2,
              "unit": "minutes"
            }
          },
          {
            "number": 2,
            "step": "Let stand for 5 minutes. In a 3-qt. bowl, layer a third of the gra ham crackers, bananas and pudding mix ture. Repeat layers twice.Refrigerate.",
            "ingredients": [
              {
                "id": 10119206,
                "name": "pudding mix",
                "localizedName": "pudding mix",
                "image": ""
              },
              {
                "id": 18621,
                "name": "crackers",
                "localizedName": "crackers",
                "image": "crackers.jpg"
              },
              {
                "id": 9040,
                "name": "banana",
                "localizedName": "banana",
                "image": "bananas.jpg"
              },
              {
                "id": 10151,
                "name": "ham",
                "localizedName": "ham",
                "image": "ham-whole.jpg"
              }
            ],
            "equipment": [
              {
                "id": 404783,
                "name": "bowl",
                "localizedName": "bowl",
                "image": "https://spoonacular.com/cdn/equipment_100x100/bowl.jpg"
              }
            ],
            "length": {
              "number": 5,
              "unit": "minutes"
            }
          }
        ]
      }
    ],
    "spoonacularScore": 48.05263137817383,
    "spoonacularSourceUrl": "https://spoonacular.com/banana-graham-dessert-634098",
    "usedIngredientCount": 0,
    "missedIngredientCount": 5,
    "missedIngredients": [
      {
        "id": 9040,
        "amount": 2,
        "unit": "large",
        "unitLong": "larges",
        "unitShort": "large",
        "aisle": "Produce",
        "name": "bananas",
        "original": "2 large Firm bananas, sliced",
        "originalName": "Firm bananas, sliced",
        "meta": [
          "firm",
          "sliced"
        ],
        "image": "https://img.spoonacular.com/ingredients_100x100/bananas.jpg"
      },
      {
        "id": 99022,
        "amount": 1,
        "unit": "small",
        "unitLong": "small",
        "unitShort": "small",
        "aisle": "Baking",
        "name": "vanilla pudding mix",
        "original": "1 small Instant sugar-free vanilla pudding mix",
        "originalName": "Instant sugar-free vanilla pudding mix",
        "meta": [
          "sugar-free",
          "instant"
        ],
        "image": "https://img.spoonacular.com/ingredients_100x100/vanilla-pudding.png"
      },
      {
        "id": 10118617,
        "amount": 12,
        "unit": "",
        "unitLong": "",
        "unitShort": "",
        "aisle": "Sweet Snacks",
        "name": "graham crackers",
        "original": "12 Reduced-fat graham crackers",
        "originalName": "Reduced-fat graham crackers",
        "meta": [
          "reduced-fat"
        ],
        "extendedName": "low fat graham crackers",
        "image": "https://img.spoonacular.com/ingredients_100x100/graham-crackers.jpg"
      },
      {
        "id": 1180,
        "amount": 8,
        "unit": "ounces",
        "unitLong": "ounces",
        "unitShort": "oz",
        "aisle": "Milk, Eggs, Other Dairy",
        "name": "nonfat cream",
        "original": "8 ounces Nonfat sour cream",
        "originalName": "Nonfat sour cream",
        "meta": [
          "sour"
        ],
        "extendedName": "sour nonfat cream",
        "image": "https://img.spoonacular.com/ingredients_100x100/img.spoonacular."
      },
      {
        "id": 1085,
        "amount": 2.75,
        "unit": "cups",
        "unitLong": "cups",
        "unitShort": "cup",
        "aisle": "Milk, Eggs, Other Dairy",
        "name": "skim milk",
        "original": "2 3/4 cups Cold skim milk",
        "originalName": "Cold skim milk",
        "meta": [
          "cold"
        ],
        "image": "https://img.spoonacular.com/ingredients_100x100/img.spoonacular."
      }
    ],
    "likes": 0,
    "usedIngredients": [],
    "unusedIngredients": []
  },
  {
    "id": 1095892,
    "image": "https://img.spoonacular.com/recipes/1095892-312x231.jpg",
    "imageType": "jpg",
    "title": "Vegan Green Bean Casserole",
    "readyInMinutes": 60,
    "servings": 6,
    "sourceUrl": "https://www.foodista.com/recipe/2M3K34BV/green-bean-casserole-vegan",
    "vegetarian": true,
    "vegan": true,
    "glutenFree": true,
    "dairyFree": true,
    "veryHealthy": false,
    "cheap": false,
    "veryPopular": false,
    "sustainable": false,
    "lowFodmap": false,
    "weightWatcherSmartPoints": 1,
    "gaps": "no",
    "preparationMinutes": null,
    "cookingMinutes": null,
    "aggregateLikes": 1,
    "healthScore": 25,
    "creditsText": "Foodista.com – The Cooking Encyclopedia Everyone Can Edit",
    "license": "CC BY 3.0",
    "sourceName": "Foodista",
    "pricePerServing": 87.32,
    "extendedIngredients": [
      {
        "id": 93690,
        "aisle": "Spices and Seasonings",
        "image": "nutritional-yeast.png",
        "consistency": "SOLID",
        "name": "nutritional yeast",
        "nameClean": "nutritional yeast flakes",
        "original": "¼ cup nutritional yeast",
        "originalName": "nutritional yeast",
        "amount": 0.25,
        "unit": "cup",
        "meta": [],
        "measures": {
          "us": {
            "amount": 0.25,
            "unitShort": "cups",
            "unitLong": "cups"
          },
          "metric": {
            "amount": 11,
            "unitShort": "ml",
            "unitLong": "milliliters"
          }
        }
      },
      {
        "id": 1032009,
        "aisle": "Spices and Seasonings",
        "image": "red-pepper-flakes.jpg",
        "consistency": "SOLID",
        "name": "pepper",
        "nameClean": "red pepper flakes",
        "original": "½ tsp. red pepper crushed",
        "originalName": "red pepper crushed",
        "amount": 0.5,
        "unit": "tsp",
        "meta": [
          "red",
          "crushed"
        ],
        "measures": {
          "us": {
            "amount": 0.5,
            "unitShort": "tsps",
            "unitLong": "teaspoons"
          },
          "metric": {
            "amount": 0.5,
            "unitShort": "tsps",
            "unitLong": "teaspoons"
          }
        }
      },
      {
        "id": 10011282,
        "aisle": "Produce",
        "image": "red-onion.png",
        "consistency": "SOLID",
        "name": "onion",
        "nameClean": "red onion",
        "original": "1 red onion sliced",
        "originalName": "red onion sliced",
        "amount": 1,
        "unit": "",
        "meta": [
          "red",
          "sliced"
        ],
        "measures": {
          "us": {
            "amount": 1,
            "unitShort": "",
            "unitLong": ""
          },
          "metric": {
            "amount": 1,
            "unitShort": "",
            "unitLong": ""
          }
        }
      },
      {
        "id": 4047,
        "aisle": "Health Foods",
        "image": "oil-coconut.jpg",
        "consistency": "LIQUID",
        "name": "coconut oil",
        "nameClean": "coconut oil",
        "original": "1 tbsp Coconut Oil",
        "originalName": "Coconut Oil",
        "amount": 1,
        "unit": "tbsp",
        "meta": [],
        "measures": {
          "us": {
            "amount": 1,
            "unitShort": "Tbsp",
            "unitLong": "Tbsp"
          },
          "metric": {
            "amount": 1,
            "unitShort": "Tbsp",
            "unitLong": "Tbsp"
          }
        }
      },
      {
        "id": 2047,
        "aisle": "Spices and Seasonings",
        "image": "salt.jpg",
        "consistency": "SOLID",
        "name": "salt",
        "nameClean": "table salt",
        "original": "1 ½ tsps. salt",
        "originalName": "salt",
        "amount": 1.5,
        "unit": "tsps",
        "meta": [],
        "measures": {
          "us": {
            "amount": 1.5,
            "unitShort": "tsps",
            "unitLong": "teaspoons"
          },
          "metric": {
            "amount": 1.5,
            "unitShort": "tsps",
            "unitLong": "teaspoons"
          }
        }
      },
      {
        "id": 14412,
        "aisle": "Beverages",
        "image": "water.png",
        "consistency": "LIQUID",
        "name": "water",
        "nameClean": "water",
        "original": "1 ½ cups water",
        "originalName": "water",
        "amount": 1.5,
        "unit": "cups",
        "meta": [],
        "measures": {
          "us": {
            "amount": 1.5,
            "unitShort": "cups",
            "unitLong": "cups"
          },
          "metric": {
            "amount": 354.882,
            "unitShort": "ml",
            "unitLong": "milliliters"
          }
        }
      },
      {
        "id": 11260,
        "aisle": "Produce",
        "image": "mushrooms.png",
        "consistency": "SOLID",
        "name": "mushroom",
        "nameClean": "fresh mushrooms",
        "original": "1 ½ cups mushroom chopped",
        "originalName": "mushroom chopped",
        "amount": 1.5,
        "unit": "cups",
        "meta": [
          "chopped"
        ],
        "measures": {
          "us": {
            "amount": 1.5,
            "unitShort": "cups",
            "unitLong": "cups"
          },
          "metric": {
            "amount": 144,
            "unitShort": "ml",
            "unitLong": "milliliters"
          }
        }
      },
      {
        "id": 11052,
        "aisle": "Produce",
        "image": "green-beans-or-string-beans.jpg",
        "consistency": "SOLID",
        "name": "green beans",
        "nameClean": "green beans",
        "original": "1 ½ lbs. green beans",
        "originalName": "green beans",
        "amount": 1.5,
        "unit": "lbs",
        "meta": [],
        "measures": {
          "us": {
            "amount": 1.5,
            "unitShort": "lb",
            "unitLong": "pounds"
          },
          "metric": {
            "amount": 680.389,
            "unitShort": "g",
            "unitLong": "grams"
          }
        }
      },
      {
        "id": 11298,
        "aisle": "Produce",
        "image": "parsnip.jpg",
        "consistency": "SOLID",
        "name": "parsnips",
        "nameClean": "parsnip",
        "original": "2 cups parsnips chopped",
        "originalName": "parsnips chopped",
        "amount": 2,
        "unit": "cups",
        "meta": [
          "chopped"
        ],
        "measures": {
          "us": {
            "amount": 2,
            "unitShort": "cups",
            "unitLong": "cups"
          },
          "metric": {
            "amount": 266,
            "unitShort": "g",
            "unitLong": "grams"
          }
        }
      },
      {
        "id": 11215,
        "aisle": "Produce",
        "image": "garlic.png",
        "consistency": "SOLID",
        "name": "garlic",
        "nameClean": "garlic",
        "original": "3 cloves garlic minced",
        "originalName": "garlic minced",
        "amount": 3,
        "unit": "cloves",
        "meta": [
          "minced"
        ],
        "measures": {
          "us": {
            "amount": 3,
            "unitShort": "cloves",
            "unitLong": "cloves"
          },
          "metric": {
            "amount": 3,
            "unitShort": "cloves",
            "unitLong": "cloves"
          }
        }
      },
      {
        "id": 1002030,
        "aisle": "Spices and Seasonings",
        "image": "pepper.jpg",
        "consistency": "SOLID",
        "name": "bell pepper",
        "nameClean": "black pepper",
        "original": "Black Pepper to taste",
        "originalName": "Black Pepper to taste",
        "amount": 6,
        "unit": "servings",
        "meta": [
          "black",
          "to taste"
        ],
        "measures": {
          "us": {
            "amount": 6,
            "unitShort": "servings",
            "unitLong": "servings"
          },
          "metric": {
            "amount": 6,
            "unitShort": "servings",
            "unitLong": "servings"
          }
        }
      }
    ],
    "summary": "You can never have too many American recipes, so give Vegan Green Bean Casserole a try. For <b>87 cents per serving</b>, you get a hor d'oeuvre that serves 6. One serving contains <b>110 calories</b>, <b>5g of protein</b>, and <b>3g of fat</b>. From preparation to the plate, this recipe takes around <b>1 hour</b>. It is a good option if you're following a <b>gluten free, dairy free, paleolithic, and lacto ovo vegetarian</b> diet. <b>Thanksgiving</b> will be even more special with this recipe. It is brought to you by Foodista. Only a few people made this recipe, and 1 would say it hit the spot. A mixture of green beans, bell pepper, garlic, and a handful of other ingredients are all it takes to make this recipe so flavorful. Taking all factors into account, this recipe <b>earns a spoonacular score of 62%</b>, which is good. Similar recipes are <a href=\"https://spoonacular.com/recipes/the-best-vegan-green-bean-casserole-1777861\">The Best Vegan Green Bean Casserole</a>, <a href=\"https://spoonacular.com/recipes/the-best-vegan-green-bean-casserole-1676525\">The Best Vegan Green Bean Casserole</a>, and <a href=\"https://spoonacular.com/recipes/vegan-green-bean-casserole-1555801\">Vegan Green Bean Casserole</a>.",
    "cuisines": [
      "American"
    ],
    "dishTypes": [
      "side dish",
      "antipasti",
      "starter",
      "snack",
      "appetizer",
      "antipasto",
      "hor d'oeuvre"
    ],
    "diets": [
      "gluten free",
      "dairy free",
      "paleolithic",
      "lacto ovo vegetarian",
      "primal",
      "whole 30",
      "vegan"
    ],
    "occasions": [
      "fall",
      "thanksgiving",
      "winter"
    ],
    "analyzedInstructions": [
      {
        "name": "",
        "steps": [
          {
            "number": 1,
            "step": "In a wide-bottomed saucepan, add 1 tablespoon extra virgin coconut oil and set to low heat.",
            "ingredients": [
              {
                "id": 0,
                "name": "extra virgin coconut oil",
                "localizedName": "extra virgin coconut oil",
                "image": "oil-coconut.jpg"
              }
            ],
            "equipment": [
              {
                "id": 404669,
                "name": "sauce pan",
                "localizedName": "sauce pan",
                "image": "https://spoonacular.com/cdn/equipment_100x100/sauce-pan.jpg"
              }
            ]
          },
          {
            "number": 2,
            "step": "Add the onions and cook for 30 minutes. Stir occasionally to caramelize. If the onions look dry, splash a bit of water into the pan.While waiting for the onions to cook, steam the parsnip. Set aside and let them cool.After that, prepare the green beans.",
            "ingredients": [
              {
                "id": 11052,
                "name": "green beans",
                "localizedName": "green beans",
                "image": "green-beans-or-string-beans.jpg"
              },
              {
                "id": 11298,
                "name": "parsnip",
                "localizedName": "parsnip",
                "image": "parsnip.jpg"
              },
              {
                "id": 11282,
                "name": "onion",
                "localizedName": "onion",
                "image": "brown-onion.png"
              },
              {
                "id": 14412,
                "name": "water",
                "localizedName": "water",
                "image": "water.png"
              }
            ],
            "equipment": [
              {
                "id": 404645,
                "name": "frying pan",
                "localizedName": "frying pan",
                "image": "https://spoonacular.com/cdn/equipment_100x100/pan.png"
              }
            ],
            "length": {
              "number": 30,
              "unit": "minutes"
            }
          },
          {
            "number": 3,
            "step": "Remove the ends of the beans and cut them into 2 inch pieces. Steam them for 8 minutes. Set them aside in an 8x8 baking dish.Once the onions have caramelized, set them aside. Cook the mushrooms in the same pan and saute for one minute.",
            "ingredients": [
              {
                "id": 11260,
                "name": "mushrooms",
                "localizedName": "mushrooms",
                "image": "https://spoonacular.com/cdn/ingredients_100x100/mushrooms.png"
              },
              {
                "id": 11282,
                "name": "onion",
                "localizedName": "onion",
                "image": "brown-onion.png"
              },
              {
                "id": 0,
                "name": "beans",
                "localizedName": "beans",
                "image": "kidney-beans.jpg"
              }
            ],
            "equipment": [
              {
                "id": 404646,
                "name": "baking pan",
                "localizedName": "baking pan",
                "image": "https://spoonacular.com/cdn/equipment_100x100/roasting-pan.jpg"
              }
            ],
            "length": {
              "number": 9,
              "unit": "minutes"
            }
          },
          {
            "number": 4,
            "step": "Add garlic. Stir for 5 minutes.",
            "ingredients": [
              {
                "id": 11215,
                "name": "garlic",
                "localizedName": "garlic",
                "image": "garlic.png"
              }
            ],
            "equipment": [],
            "length": {
              "number": 5,
              "unit": "minutes"
            }
          },
          {
            "number": 5,
            "step": "Add half of the garlic and mushroom mixture to the green beans.Preheat the oven to 350 degrees Fahrenheit.",
            "ingredients": [
              {
                "id": 11052,
                "name": "green beans",
                "localizedName": "green beans",
                "image": "green-beans-or-string-beans.jpg"
              },
              {
                "id": 11260,
                "name": "mushrooms",
                "localizedName": "mushrooms",
                "image": "https://spoonacular.com/cdn/ingredients_100x100/mushrooms.png"
              },
              {
                "id": 11215,
                "name": "garlic",
                "localizedName": "garlic",
                "image": "garlic.png"
              }
            ],
            "equipment": [
              {
                "id": 404784,
                "name": "oven",
                "localizedName": "oven",
                "image": "https://spoonacular.com/cdn/equipment_100x100/oven.jpg",
                "temperature": {
                  "number": 350,
                  "unit": "Fahrenheit"
                }
              }
            ]
          },
          {
            "number": 6,
            "step": "Put the other half of the garlic and mushroom mixture, as well as the steamed parsnips in a blender.",
            "ingredients": [
              {
                "id": 11260,
                "name": "mushrooms",
                "localizedName": "mushrooms",
                "image": "https://spoonacular.com/cdn/ingredients_100x100/mushrooms.png"
              },
              {
                "id": 11298,
                "name": "parsnip",
                "localizedName": "parsnip",
                "image": "parsnip.jpg"
              },
              {
                "id": 11215,
                "name": "garlic",
                "localizedName": "garlic",
                "image": "garlic.png"
              }
            ],
            "equipment": [
              {
                "id": 404726,
                "name": "blender",
                "localizedName": "blender",
                "image": "https://spoonacular.com/cdn/equipment_100x100/blender.png"
              }
            ]
          },
          {
            "number": 7,
            "step": "Add the nutritional yeast, salt, pepper, and crushed red pepper.",
            "ingredients": [
              {
                "id": 1032009,
                "name": "red pepper flakes",
                "localizedName": "red pepper flakes",
                "image": "red-pepper-flakes.jpg"
              },
              {
                "id": 93690,
                "name": "nutritional yeast",
                "localizedName": "nutritional yeast",
                "image": "nutritional-yeast.png"
              },
              {
                "id": 1002030,
                "name": "pepper",
                "localizedName": "pepper",
                "image": "pepper.jpg"
              },
              {
                "id": 2047,
                "name": "salt",
                "localizedName": "salt",
                "image": "salt.jpg"
              }
            ],
            "equipment": []
          },
          {
            "number": 8,
            "step": "Pour the blended mixture over the mushrooms and green beans. Stir to coat. Use the caramelized onions as toppings.",
            "ingredients": [
              {
                "id": 10211282,
                "name": "caramelized onions",
                "localizedName": "caramelized onions",
                "image": "brown-onion.png"
              },
              {
                "id": 11052,
                "name": "green beans",
                "localizedName": "green beans",
                "image": "green-beans-or-string-beans.jpg"
              },
              {
                "id": 11260,
                "name": "mushrooms",
                "localizedName": "mushrooms",
                "image": "https://spoonacular.com/cdn/ingredients_100x100/mushrooms.png"
              }
            ],
            "equipment": []
          },
          {
            "number": 9,
            "step": "Bake for another 30 minutes.",
            "ingredients": [],
            "equipment": [
              {
                "id": 404784,
                "name": "oven",
                "localizedName": "oven",
                "image": "https://spoonacular.com/cdn/equipment_100x100/oven.jpg"
              }
            ],
            "length": {
              "number": 30,
              "unit": "minutes"
            }
          },
          {
            "number": 10,
            "step": "Serve.",
            "ingredients": [],
            "equipment": []
          }
        ]
      }
    ],
    "spoonacularScore": 70.12466430664062,
    "spoonacularSourceUrl": "https://spoonacular.com/vegan-green-bean-casserole-1095892",
    "usedIngredientCount": 0,
    "missedIngredientCount": 7,
    "missedIngredients": [
      {
        "id": 93690,
        "amount": 0.25,
        "unit": "cup",
        "unitLong": "cups",
        "unitShort": "cup",
        "aisle": "Spices and Seasonings",
        "name": "nutritional yeast",
        "original": "¼ cup nutritional yeast",
        "originalName": "nutritional yeast",
        "meta": [],
        "image": "https://img.spoonacular.com/ingredients_100x100/nutritional-yeast.png"
      },
      {
        "id": 1032009,
        "amount": 0.5,
        "unit": "tsp",
        "unitLong": "teaspoons",
        "unitShort": "tsp",
        "aisle": "Spices and Seasonings",
        "name": "pepper",
        "original": "½ tsp. red pepper crushed",
        "originalName": "red pepper crushed",
        "meta": [
          "red",
          "crushed"
        ],
        "extendedName": "crushed red pepper",
        "image": "https://img.spoonacular.com/ingredients_100x100/red-pepper-flakes.jpg"
      },
      {
        "id": 10011282,
        "amount": 1,
        "unit": "",
        "unitLong": "",
        "unitShort": "",
        "aisle": "Produce",
        "name": "onion",
        "original": "1 red onion sliced",
        "originalName": "red onion sliced",
        "meta": [
          "red",
          "sliced"
        ],
        "extendedName": "red onion",
        "image": "https://img.spoonacular.com/ingredients_100x100/red-onion.png"
      },
      {
        "id": 11260,
        "amount": 1.5,
        "unit": "cups",
        "unitLong": "cups",
        "unitShort": "cup",
        "aisle": "Produce",
        "name": "mushroom",
        "original": "1 ½ cups mushroom chopped",
        "originalName": "mushroom chopped",
        "meta": [
          "chopped"
        ],
        "image": "https://img.spoonacular.com/ingredients_100x100/mushrooms.png"
      },
      {
        "id": 11052,
        "amount": 1.5,
        "unit": "lbs",
        "unitLong": "pounds",
        "unitShort": "lb",
        "aisle": "Produce",
        "name": "green beans",
        "original": "1 ½ lbs. green beans",
        "originalName": "green beans",
        "meta": [],
        "image": "https://img.spoonacular.com/ingredients_100x100/green-beans-or-string-beans.jpg"
      },
      {
        "id": 11298,
        "amount": 2,
        "unit": "cups",
        "unitLong": "cups",
        "unitShort": "cup",
        "aisle": "Produce",
        "name": "parsnips",
        "original": "2 cups parsnips chopped",
        "originalName": "parsnips chopped",
        "meta": [
          "chopped"
        ],
        "image": "https://img.spoonacular.com/ingredients_100x100/parsnip.jpg"
      },
      {
        "id": 11215,
        "amount": 3,
        "unit": "cloves",
        "unitLong": "cloves",
        "unitShort": "cloves",
        "aisle": "Produce",
        "name": "garlic",
        "original": "3 cloves garlic minced",
        "originalName": "garlic minced",
        "meta": [
          "minced"
        ],
        "image": "https://img.spoonacular.com/ingredients_100x100/garlic.png"
      }
    ],
    "likes": 0,
    "usedIngredients": [],
    "unusedIngredients": []
  },
  {
    "id": 641447,
    "image": "https://img.spoonacular.com/recipes/641447-312x231.jpg",
    "imageType": "jpg",
    "title": "Detox slaw",
    "readyInMinutes": 45,
    "servings": 2,
    "sourceUrl": "https://www.foodista.com/recipe/YDJN82ZL/detox-slaw",
    "vegetarian": true,
    "vegan": true,
    "glutenFree": true,
    "dairyFree": true,
    "veryHealthy": false,
    "cheap": false,
    "veryPopular": false,
    "sustainable": false,
    "lowFodmap": false,
    "weightWatcherSmartPoints": 7,
    "gaps": "no",
    "preparationMinutes": null,
    "cookingMinutes": null,
    "aggregateLikes": 2,
    "healthScore": 56,
    "creditsText": "Foodista.com – The Cooking Encyclopedia Everyone Can Edit",
    "license": "CC BY 3.0",
    "sourceName": "Foodista",
    "pricePerServing": 86.46,
    "extendedIngredients": [
      {
        "id": 11109,
        "aisle": "Produce",
        "image": "cabbage.jpg",
        "consistency": "SOLID",
        "name": "cabbage",
        "nameClean": "cabbage",
        "original": "1¼ cup Green Cabbage Shredded",
        "originalName": "Green Cabbage Shredded",
        "amount": 1.25,
        "unit": "cup",
        "meta": [
          "shredded",
          "green"
        ],
        "measures": {
          "us": {
            "amount": 1.25,
            "unitShort": "cups",
            "unitLong": "cups"
          },
          "metric": {
            "amount": 87.5,
            "unitShort": "g",
            "unitLong": "grams"
          }
        }
      },
      {
        "id": 11112,
        "aisle": "Produce",
        "image": "red-cabbage.png",
        "consistency": "SOLID",
        "name": "purple cabbage",
        "nameClean": "red cabbage",
        "original": "1½ cup Purple Cabbage,shredded",
        "originalName": "Purple Cabbage,shredded",
        "amount": 1.5,
        "unit": "cup",
        "meta": [
          "shredded"
        ],
        "measures": {
          "us": {
            "amount": 1.5,
            "unitShort": "cups",
            "unitLong": "cups"
          },
          "metric": {
            "amount": 133.5,
            "unitShort": "g",
            "unitLong": "grams"
          }
        }
      },
      {
        "id": 11124,
        "aisle": "Produce",
        "image": "sliced-carrot.png",
        "consistency": "SOLID",
        "name": "carrot",
        "nameClean": "carrot",
        "original": "1 whole Medium Carrot, Shredded",
        "originalName": "whole Medium Carrot, Shredded",
        "amount": 1,
        "unit": "",
        "meta": [
          "shredded",
          "whole"
        ],
        "measures": {
          "us": {
            "amount": 1,
            "unitShort": "",
            "unitLong": ""
          },
          "metric": {
            "amount": 1,
            "unitShort": "",
            "unitLong": ""
          }
        }
      },
      {
        "id": 10012023,
        "aisle": "Spices and Seasonings",
        "image": "black-sesame-seeds-or-chia-seeds.png",
        "consistency": "SOLID",
        "name": "sesame seeds",
        "nameClean": "black sesame seeds",
        "original": "2 Tablespoons Black Sesame Seeds, Toasted",
        "originalName": "Black Sesame Seeds, Toasted",
        "amount": 2,
        "unit": "Tablespoons",
        "meta": [
          "black",
          "toasted"
        ],
        "measures": {
          "us": {
            "amount": 2,
            "unitShort": "Tbsps",
            "unitLong": "Tbsps"
          },
          "metric": {
            "amount": 2,
            "unitShort": "Tbsps",
            "unitLong": "Tbsps"
          }
        }
      },
      {
        "id": 10511282,
        "aisle": "Produce",
        "image": "brown-onion.png",
        "consistency": "SOLID",
        "name": "onion",
        "nameClean": "yellow onion",
        "original": "⅛ cups Yellow Onion, Chopped",
        "originalName": "Yellow Onion, Chopped",
        "amount": 0.125,
        "unit": "cups",
        "meta": [
          "yellow",
          "chopped"
        ],
        "measures": {
          "us": {
            "amount": 0.125,
            "unitShort": "cups",
            "unitLong": "cups"
          },
          "metric": {
            "amount": 20,
            "unitShort": "g",
            "unitLong": "grams"
          }
        }
      },
      {
        "id": 4053,
        "aisle": "Oil, Vinegar, Salad Dressing",
        "image": "olive-oil.jpg",
        "consistency": "LIQUID",
        "name": "olive oil",
        "nameClean": "olive oil",
        "original": "1 Tablespoon Olive Oil",
        "originalName": "Olive Oil",
        "amount": 1,
        "unit": "Tablespoon",
        "meta": [],
        "measures": {
          "us": {
            "amount": 1,
            "unitShort": "Tbsp",
            "unitLong": "Tbsp"
          },
          "metric": {
            "amount": 1,
            "unitShort": "Tbsp",
            "unitLong": "Tbsp"
          }
        }
      },
      {
        "id": 9152,
        "aisle": "Produce",
        "image": "lemon-juice.jpg",
        "consistency": "LIQUID",
        "name": "lemon juice",
        "nameClean": "lemon juice",
        "original": "2 Tablespoons Lemon Juice",
        "originalName": "Lemon Juice",
        "amount": 2,
        "unit": "Tablespoons",
        "meta": [],
        "measures": {
          "us": {
            "amount": 2,
            "unitShort": "Tbsps",
            "unitLong": "Tbsps"
          },
          "metric": {
            "amount": 2,
            "unitShort": "Tbsps",
            "unitLong": "Tbsps"
          }
        }
      },
      {
        "id": 19912,
        "aisle": "Health Foods",
        "image": "agave.png",
        "consistency": "LIQUID",
        "name": "agave nectar",
        "nameClean": "agave",
        "original": "½ Tablespoons Maple Syrup Or Honey Or Agave Nectar",
        "originalName": "Maple Syrup Or Honey Or Agave Nectar",
        "amount": 0.5,
        "unit": "Tablespoons",
        "meta": [],
        "measures": {
          "us": {
            "amount": 0.5,
            "unitShort": "Tbsps",
            "unitLong": "Tbsps"
          },
          "metric": {
            "amount": 0.5,
            "unitShort": "Tbsps",
            "unitLong": "Tbsps"
          }
        }
      },
      {
        "id": 12698,
        "aisle": "Ethnic Foods",
        "image": "tahini-paste.png",
        "consistency": "SOLID",
        "name": "tahini paste",
        "nameClean": "tahini",
        "original": "2 Tablespoons Tahini Paste",
        "originalName": "Tahini Paste",
        "amount": 2,
        "unit": "Tablespoons",
        "meta": [],
        "measures": {
          "us": {
            "amount": 2,
            "unitShort": "Tbsps",
            "unitLong": "Tbsps"
          },
          "metric": {
            "amount": 2,
            "unitShort": "Tbsps",
            "unitLong": "Tbsps"
          }
        }
      },
      {
        "id": 14412,
        "aisle": "Beverages",
        "image": "water.png",
        "consistency": "LIQUID",
        "name": "water",
        "nameClean": "water",
        "original": "¼ cups Water",
        "originalName": "Water",
        "amount": 0.25,
        "unit": "cups",
        "meta": [],
        "measures": {
          "us": {
            "amount": 0.25,
            "unitShort": "cups",
            "unitLong": "cups"
          },
          "metric": {
            "amount": 59.147,
            "unitShort": "ml",
            "unitLong": "milliliters"
          }
        }
      },
      {
        "id": 2047,
        "aisle": "Spices and Seasonings",
        "image": "salt.jpg",
        "consistency": "SOLID",
        "name": "salt",
        "nameClean": "table salt",
        "original": "½ teaspoons Salt, Or To Taste",
        "originalName": "Salt, Or To Taste",
        "amount": 0.5,
        "unit": "teaspoons",
        "meta": [
          "to taste"
        ],
        "measures": {
          "us": {
            "amount": 0.5,
            "unitShort": "tsps",
            "unitLong": "teaspoons"
          },
          "metric": {
            "amount": 0.5,
            "unitShort": "tsps",
            "unitLong": "teaspoons"
          }
        }
      }
    ],
    "summary": "Detox slaw is a side dish that serves 2. One portion of this dish contains approximately <b>6g of protein</b>, <b>19g of fat</b>, and a total of <b>264 calories</b>. For <b>86 cents per serving</b>, this recipe <b>covers 21%</b> of your daily requirements of vitamins and minerals. A mixture of tahini paste, purple cabbage, olive oil, and a handful of other ingredients are all it takes to make this recipe so tasty. This recipe from Foodista has 2 fans. It can be enjoyed any time, but it is especially good for <b>The Fourth Of July</b>. From preparation to the plate, this recipe takes roughly <b>45 minutes</b>. It is a good option if you're following a <b>gluten free, dairy free, lacto ovo vegetarian, and vegan</b> diet. Overall, this recipe earns an <b>amazing spoonacular score of 83%</b>. If you like this recipe, take a look at these similar recipes: <a href=\"https://spoonacular.com/recipes/detox-slaw-1409209\">Detox slaw</a>, <a href=\"https://spoonacular.com/recipes/detox-red-cabbage-slaw-902496\">Detox Red Cabbage Slaw</a>, and <a href=\"https://spoonacular.com/recipes/mango-slaw-the-perfect-slaw-for-fish-tacos-1129511\">Mango Slaw - the perfect slaw for fish tacos</a>.",
    "cuisines": [],
    "dishTypes": [
      "side dish"
    ],
    "diets": [
      "gluten free",
      "dairy free",
      "lacto ovo vegetarian",
      "vegan"
    ],
    "occasions": [
      "father's day",
      "4th of july",
      "summer"
    ],
    "analyzedInstructions": [
      {
        "name": "",
        "steps": [
          {
            "number": 1,
            "step": "In a big bowl, mix all the vegetables together.",
            "ingredients": [
              {
                "id": 11583,
                "name": "vegetable",
                "localizedName": "vegetable",
                "image": "mixed-vegetables.png"
              }
            ],
            "equipment": [
              {
                "id": 404783,
                "name": "bowl",
                "localizedName": "bowl",
                "image": "https://spoonacular.com/cdn/equipment_100x100/bowl.jpg"
              }
            ]
          },
          {
            "number": 2,
            "step": "Mix the dressing ingredients together in another small bowl and stir till you get a uniform paste.",
            "ingredients": [],
            "equipment": [
              {
                "id": 404783,
                "name": "bowl",
                "localizedName": "bowl",
                "image": "https://spoonacular.com/cdn/equipment_100x100/bowl.jpg"
              }
            ]
          },
          {
            "number": 3,
            "step": "Add more water if needed to achieve the desired consistency.",
            "ingredients": [
              {
                "id": 14412,
                "name": "water",
                "localizedName": "water",
                "image": "water.png"
              }
            ],
            "equipment": []
          },
          {
            "number": 4,
            "step": "In a hot skillet, add sesame seeds and toast them till they start jumping out of the skillet.",
            "ingredients": [
              {
                "id": 12023,
                "name": "sesame seeds",
                "localizedName": "sesame seeds",
                "image": "sesame-seeds.png"
              },
              {
                "id": 0,
                "name": "sandwich bread",
                "localizedName": "sandwich bread",
                "image": "white-bread.jpg"
              }
            ],
            "equipment": [
              {
                "id": 404645,
                "name": "frying pan",
                "localizedName": "frying pan",
                "image": "https://spoonacular.com/cdn/equipment_100x100/pan.png"
              }
            ]
          },
          {
            "number": 5,
            "step": "Pour dressing over the vegetables.",
            "ingredients": [
              {
                "id": 11583,
                "name": "vegetable",
                "localizedName": "vegetable",
                "image": "mixed-vegetables.png"
              }
            ],
            "equipment": []
          },
          {
            "number": 6,
            "step": "Garnish with toasted sesame seeds and serve.",
            "ingredients": [
              {
                "id": 12023,
                "name": "sesame seeds",
                "localizedName": "sesame seeds",
                "image": "sesame-seeds.png"
              }
            ],
            "equipment": []
          },
          {
            "number": 7,
            "step": "P.S what is your go to detox food? Will love to know!",
            "ingredients": [],
            "equipment": []
          }
        ]
      }
    ],
    "spoonacularScore": 89.51736450195312,
    "spoonacularSourceUrl": "https://spoonacular.com/detox-slaw-641447",
    "usedIngredientCount": 0,
    "missedIngredientCount": 8,
    "missedIngredients": [
      {
        "id": 11109,
        "amount": 1.25,
        "unit": "cup",
        "unitLong": "cups",
        "unitShort": "cup",
        "aisle": "Produce",
        "name": "cabbage",
        "original": "1¼ cup Green Cabbage Shredded",
        "originalName": "Green Cabbage Shredded",
        "meta": [
          "shredded",
          "green"
        ],
        "extendedName": "green shredded cabbage",
        "image": "https://img.spoonacular.com/ingredients_100x100/cabbage.jpg"
      },
      {
        "id": 11112,
        "amount": 1.5,
        "unit": "cup",
        "unitLong": "cups",
        "unitShort": "cup",
        "aisle": "Produce",
        "name": "purple cabbage",
        "original": "1½ cup Purple Cabbage,shredded",
        "originalName": "Purple Cabbage,shredded",
        "meta": [
          "shredded"
        ],
        "extendedName": "shredded purple cabbage",
        "image": "https://img.spoonacular.com/ingredients_100x100/red-cabbage.png"
      },
      {
        "id": 11124,
        "amount": 1,
        "unit": "",
        "unitLong": "",
        "unitShort": "",
        "aisle": "Produce",
        "name": "carrot",
        "original": "1 whole Medium Carrot, Shredded",
        "originalName": "whole Medium Carrot, Shredded",
        "meta": [
          "shredded",
          "whole"
        ],
        "extendedName": "whole shredded carrot",
        "image": "https://img.spoonacular.com/ingredients_100x100/sliced-carrot.png"
      },
      {
        "id": 10012023,
        "amount": 2,
        "unit": "Tablespoons",
        "unitLong": "Tablespoons",
        "unitShort": "Tbsp",
        "aisle": "Spices and Seasonings",
        "name": "sesame seeds",
        "original": "2 Tablespoons Black Sesame Seeds, Toasted",
        "originalName": "Black Sesame Seeds, Toasted",
        "meta": [
          "black",
          "toasted"
        ],
        "extendedName": "black sesame seeds",
        "image": "https://img.spoonacular.com/ingredients_100x100/black-sesame-seeds-or-chia-seeds.png"
      },
      {
        "id": 10511282,
        "amount": 0.125,
        "unit": "cups",
        "unitLong": "cups",
        "unitShort": "cup",
        "aisle": "Produce",
        "name": "onion",
        "original": "⅛ cups Yellow Onion, Chopped",
        "originalName": "Yellow Onion, Chopped",
        "meta": [
          "yellow",
          "chopped"
        ],
        "extendedName": "yellow onion",
        "image": "https://img.spoonacular.com/ingredients_100x100/brown-onion.png"
      },
      {
        "id": 9152,
        "amount": 2,
        "unit": "Tablespoons",
        "unitLong": "Tablespoons",
        "unitShort": "Tbsp",
        "aisle": "Produce",
        "name": "lemon juice",
        "original": "2 Tablespoons Lemon Juice",
        "originalName": "Lemon Juice",
        "meta": [],
        "image": "https://img.spoonacular.com/ingredients_100x100/lemon-juice.jpg"
      },
      {
        "id": 19912,
        "amount": 0.5,
        "unit": "Tablespoons",
        "unitLong": "Tablespoons",
        "unitShort": "Tbsp",
        "aisle": "Health Foods",
        "name": "agave nectar",
        "original": "½ Tablespoons Maple Syrup Or Honey Or Agave Nectar",
        "originalName": "Maple Syrup Or Honey Or Agave Nectar",
        "meta": [],
        "image": "https://img.spoonacular.com/ingredients_100x100/agave.png"
      },
      {
        "id": 12698,
        "amount": 2,
        "unit": "Tablespoons",
        "unitLong": "Tablespoons",
        "unitShort": "Tbsp",
        "aisle": "Ethnic Foods",
        "name": "tahini paste",
        "original": "2 Tablespoons Tahini Paste",
        "originalName": "Tahini Paste",
        "meta": [],
        "image": "https://img.spoonacular.com/ingredients_100x100/tahini-paste.png"
      }
    ],
    "likes": 0,
    "usedIngredients": [],
    "unusedIngredients": []
  },
  {
    "id": 1956554,
    "image": "https://img.spoonacular.com/recipes/1956554-312x231.jpg",
    "imageType": "jpg",
    "title": "Kamikaze",
    "readyInMinutes": 45,
    "servings": 1,
    "sourceUrl": "https://www.thecocktaildb.com/drink/11600",
    "vegetarian": true,
    "vegan": true,
    "glutenFree": true,
    "dairyFree": true,
    "veryHealthy": false,
    "cheap": false,
    "veryPopular": false,
    "sustainable": false,
    "lowFodmap": true,
    "weightWatcherSmartPoints": 6,
    "gaps": "no",
    "preparationMinutes": null,
    "cookingMinutes": null,
    "aggregateLikes": 0,
    "healthScore": 0,
    "creditsText": "drinkhero",
    "license": null,
    "sourceName": "thecocktaildb.com",
    "pricePerServing": 146.21,
    "extendedIngredients": [
      {
        "id": 14051,
        "aisle": "Alcoholic Beverages",
        "image": "vodka.jpg",
        "consistency": "LIQUID",
        "name": "vodka",
        "nameClean": "vodka",
        "original": "1 oz Vodka",
        "originalName": "Vodka",
        "amount": 1,
        "unit": "oz",
        "meta": [],
        "measures": {
          "us": {
            "amount": 1,
            "unitShort": "oz",
            "unitLong": "ounce"
          },
          "metric": {
            "amount": 28.35,
            "unitShort": "g",
            "unitLong": "grams"
          }
        }
      },
      {
        "id": 14534,
        "aisle": "Alcoholic Beverages",
        "image": "white-rum.jpg",
        "consistency": "SOLID",
        "name": "triple sec",
        "nameClean": "triple sec",
        "original": "1 oz Triple sec",
        "originalName": "Triple sec",
        "amount": 1,
        "unit": "oz",
        "meta": [],
        "measures": {
          "us": {
            "amount": 1,
            "unitShort": "oz",
            "unitLong": "ounce"
          },
          "metric": {
            "amount": 28.35,
            "unitShort": "g",
            "unitLong": "grams"
          }
        }
      },
      {
        "id": 9160,
        "aisle": "Produce",
        "image": "lime-juice.png",
        "consistency": "LIQUID",
        "name": "lime juice",
        "nameClean": "lime juice",
        "original": "1 oz Lime juice",
        "originalName": "Lime juice",
        "amount": 1,
        "unit": "oz",
        "meta": [],
        "measures": {
          "us": {
            "amount": 1,
            "unitShort": "oz",
            "unitLong": "ounce"
          },
          "metric": {
            "amount": 28.35,
            "unitShort": "g",
            "unitLong": "grams"
          }
        }
      }
    ],
    "description": "The Kamikaze cocktail has a balanced yet bold taste. The vodka provides a clean, strong alcoholic base. The triple sec adds a hint of sweetness and a light, citrusy flavor. The lime juice contributes a tart and refreshing sourness. Overall, the drink is tangy and zesty with a slight sweetness. It's ideal for those who enjoy citrus flavors and a sharp, invigorating taste. If you appreciate cocktails like margaritas or gimlets, you might enjoy a Kamikaze.",
    "summary": "You can never have too many beverage recipes, so give Kamikaze a try. For <b>$1.46 per serving</b>, this recipe <b>covers 1%</b> of your daily requirements of vitamins and minerals. One serving contains <b>160 calories</b>, <b>0g of protein</b>, and <b>0g of fat</b>. This recipe serves 1. A mixture of vodka, triple sec, lime juice, and a handful of other ingredients are all it takes to make this recipe so scrumptious. It is brought to you by spoonacular user <a href=\"/profile/drinkhero\">drinkhero</a>. It is a good option if you're following a <b>gluten free, dairy free, lacto ovo vegetarian, and fodmap friendly</b> diet. From preparation to the plate, this recipe takes about <b>about 45 minutes</b>. Try for similar recipes.",
    "cuisines": [],
    "dishTypes": [
      "beverage",
      "drink"
    ],
    "diets": [
      "gluten free",
      "dairy free",
      "lacto ovo vegetarian",
      "fodmap friendly",
      "vegan"
    ],
    "occasions": [],
    "analyzedInstructions": [
      {
        "name": "",
        "steps": [
          {
            "number": 1,
            "step": "Shake all ingredients together with ice. Strain into glass, garnish and serve.",
            "ingredients": [
              {
                "id": 0,
                "name": "shake",
                "localizedName": "shake",
                "image": ""
              },
              {
                "id": 10014412,
                "name": "ice",
                "localizedName": "ice",
                "image": "ice-cubes.png"
              }
            ],
            "equipment": []
          }
        ]
      }
    ],
    "spoonacularScore": 19.617618560791016,
    "spoonacularSourceUrl": "https://spoonacular.com/kamikaze-1956554",
    "usedIngredientCount": 0,
    "missedIngredientCount": 3,
    "missedIngredients": [
      {
        "id": 14051,
        "amount": 1,
        "unit": "oz",
        "unitLong": "ounce",
        "unitShort": "oz",
        "aisle": "Alcoholic Beverages",
        "name": "vodka",
        "original": "1 oz Vodka",
        "originalName": "Vodka",
        "meta": [],
        "image": "https://img.spoonacular.com/ingredients_100x100/vodka.jpg"
      },
      {
        "id": 14534,
        "amount": 1,
        "unit": "oz",
        "unitLong": "ounce",
        "unitShort": "oz",
        "aisle": "Alcoholic Beverages",
        "name": "triple sec",
        "original": "1 oz Triple sec",
        "originalName": "Triple sec",
        "meta": [],
        "image": "https://img.spoonacular.com/ingredients_100x100/white-rum.jpg"
      },
      {
        "id": 9160,
        "amount": 1,
        "unit": "oz",
        "unitLong": "ounce",
        "unitShort": "oz",
        "aisle": "Produce",
        "name": "lime juice",
        "original": "1 oz Lime juice",
        "originalName": "Lime juice",
        "meta": [],
        "image": "https://img.spoonacular.com/ingredients_100x100/lime-juice.png"
      }
    ],
    "likes": 0,
    "usedIngredients": [],
    "unusedIngredients": []
  }
]

export { saveRecipesToFirebase, data };