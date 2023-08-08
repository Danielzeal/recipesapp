import mongoose from "mongoose";
import asyncHandler from "../middlewares/asyncHandler.js";
import Recipe from "../models/Recipes.js";
import cloudinary from "../config/cloudinary.js";
import User from "../models/Users.js";

//  @desc   create recipe
//  @route  POST
//  private
const createRecipe = asyncHandler(async (req, res) => {
  const {
    recipe_name,
    description,
    instructions,
    ingredients,
    imgFile,
    user,
    minute,
    hour,
  } = req.body;

  if (
    !recipe_name ||
    !description ||
    !minute ||
    !Array.isArray(ingredients) ||
    !ingredients.length ||
    !Array.isArray(instructions) ||
    !instructions.length ||
    !imgFile ||
    !hour
  ) {
    res.status(400);
    throw new Error("Enter all field");
  }

  const existingRecipe = await Recipe.findOne({ recipe_name });

  if (existingRecipe) {
    res.status(409);
    throw new Error("Recipe with this name already exist");
  }

  const recipe_image = await cloudinary.uploader.upload(imgFile, {
    upload_preset: "profile",
  });

  if (recipe_image) {
    const recipe = await Recipe.create({
      ingredients,
      recipe_name,
      description,
      instructions,
      minute: Number(minute),
      hour: Number(hour),
      recipe_image,
      user,
    });

    if (recipe) {
      res.status(201).json(recipe);
    } else {
      res.status(400);
      throw new Error("Recipe was not create");
    }
  } else {
    throw new Error("Recipe was not created");
  }
});

//  @desc   create recipe
//  @route  POST
//  public
const getRecipes = asyncHandler(async (req, res) => {
  const pageSize = 12;
  const page = Number(req.query.pageNumber) || 1;

  const search_term = req.query.search_word
    ? { recipe_name: { $regex: req.query.search_term, $options: "i" } }
    : {};

  const recipeCount = await Recipe.countDocuments({ ...search_term });

  const recipes = await Recipe.find({ ...search_term })
    .sort({ createdAt: -1 })
    .populate("user", "name coverPhoto")
    .limit(pageSize)
    .skip(pageSize * (page - 1));

  if (recipes) {
    res.json({
      recipes,
      page,
      totalpages: Math.ceil(recipeCount / pageSize),
    });
  } else {
    res.status(400);
    throw new Error("No recipe collections data availabe");
  }
});

//  @desc   get recipe by ID
//  @route  GET
//  public
const getRecipe = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const recipe = await Recipe.findById({ _id: id }).populate(
    "user",
    "name coverPhoto"
  );

  if (recipe) {
    res.json(recipe);
  } else {
    res.status(400);
    throw new Error("Recipe detail not found");
  }
});

//  @desc   delete recipe by id
//  route   DELETE
//  private
const deleteRecipe = asyncHandler(async (req, res) => {
  const { id } = req.body;

  if (!id) {
    res.status(400);
    throw new Error("Enter a vaid id");
  }
  const recipe = await Recipe.findById(id);

  if (recipe) {
    await recipe.deleteOne();
    res.json({ message: "Recipe deleted successfully" });
  } else {
    res.status(400);
    throw new Error("Recipe not found");
  }
});

//  @desc   update recipe by id
//  route   PATCH
//  private
const updateRecipe = asyncHandler(async (req, res) => {
  const {
    recipe_name,
    description,
    instructions,
    ingredients,
    imgFile,
    minute,
    hour,
  } = req.body;
  const { id } = req.params;

  if (
    !id ||
    !hour ||
    !recipe_name ||
    !description ||
    !minute ||
    !Array.isArray(ingredients) ||
    !ingredients.length ||
    !Array.isArray(instructions) ||
    !instructions.length
  ) {
    res.status(400);
    throw new Error("Enter all field");
  }

  const recipe = await Recipe.findById(id);

  if (recipe) {
    // checking for existing recipe by title
    const existingRecipe = await Recipe.findOne({ recipe_name });

    if (!existingRecipe) {
      recipe.recipe_name = recipe_name;
      recipe.ingredients = ingredients;
      recipe.instructions = instructions;
      recipe.description = description;
      recipe.minute = minute;
      recipe.hour = hour;

      if (imgFile) {
        const recipe_image = await cloudinary.uploader.upload(imgFile, {
          upload_preset: "profile",
        });

        if (recipe_image) {
          recipe.recipe_image = recipe_image;
        }
      }

      await recipe.save();

      res.json({ message: "recipe updated" });
    } else {
      res.status(409);
      throw new Error("Recipe already existing");
    }
  } else {
    res.status(400);
    throw new Error("Recipe not found!");
  }
});

//  @desc   get user entire recipe collection
//  @route  GET
//  private
const getUserRecipes = asyncHandler(async (req, res) => {
  const { userId } = req.params;

  const recipes = await Recipe.find({ user: userId }).sort({ createAt: 1 });

  if (recipes) {
    res.json(recipes);
  } else {
    res.status(400);
    throw new Error("Recipe detail not found");
  }
});

//  @desc     Add to user favorite collection
//  @route    PUT
//  private
const addFavoriteRecipe = asyncHandler(async (req, res) => {
  const { userId, recipeId } = req.body;
  // const userIdCompare = new mongoose.Types.ObjectId(userId);
  const user = await User.findById(userId);

  if (!user) {
    res.status(404);
    throw new Error("User does not exist");
  }

  if (user.favorite_recipes.includes(recipeId)) {
    res.status(409);
    throw new Error("User already added this recipe");
  }

  user.favorite_recipes.push(recipeId);
  await user.save();

  res.json(user);
});

//  @desc     Add to user favorite collection
//  @route    PATCH
//  private
const removeFavoriteRecipe = asyncHandler(async (req, res) => {
  const { userId, recipeId } = req.body;

  const user = await User.findById(userId);

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  if (!user.favorite_recipes.includes(recipeId)) {
    res.status(400);
    throw new Error("Recipe ID not found");
  }

  user.favorite_recipes = user.favorite_recipes.filter(
    (fav) => fav.toString() !== recipeId
  );

  await user.save();

  res.json({ message: "Recipe removed from favorites" });
});

//  @desc     Add to user favorite collection
//  @route    Get
//  private
const getFavoriteRecipeIds = asyncHandler(async (req, res) => {
  const { userId } = req.params;

  const user = await User.findById(userId);

  if (!user) {
    res.status(404);
    throw new Error("User not registered");
  }

  const favorites = user.favorite_recipes;

  res.json(favorites);
});

//  @desc     Add to user favorite collection
//  @route    Get
//  private
const getAllFavoritesRecipe = asyncHandler(async (req, res) => {
  const { userId } = req.params;

  const user = await User.findById(userId)
    .select("name")
    .populate({
      path: "favorite_recipes",
      model: Recipe,
      select: "recipe_name recipe_image hour minute user",
      populate: {
        path: "user",
        model: User,
        select: "name coverPhoto",
      },
    });

  if (!user) {
    res.status(404);
    throw new Error("User not registered");
  }

  res.json(user);
});

export {
  createRecipe,
  getRecipes,
  getRecipe,
  deleteRecipe,
  updateRecipe,
  getUserRecipes,
  addFavoriteRecipe,
  removeFavoriteRecipe,
  getFavoriteRecipeIds,
  getAllFavoritesRecipe,
};
