import express from "express";
import {
  createRecipe,
  deleteRecipe,
  getRecipe,
  getRecipes,
  getUserRecipes,
  updateRecipe,
  addFavoriteRecipe,
  removeFavoriteRecipe,
  getAllFavoritesRecipe,
  getFavoriteRecipeIds,
} from "../../controllers/recipesController.js";
import verifyJwt from "../../middlewares/verifyJwt.js";

const router = express.Router();

router
  .route("/")
  .get(getRecipes)
  .post(verifyJwt, createRecipe)
  .delete(verifyJwt, deleteRecipe);
router.route("/:id").get(getRecipe).patch(verifyJwt, updateRecipe);
router.put("/user/add", verifyJwt, addFavoriteRecipe);
router.get("/user/:userId", verifyJwt, getUserRecipes);
router.patch("/user/remove", verifyJwt, removeFavoriteRecipe);
router.get("/favorites/:userId", verifyJwt, getFavoriteRecipeIds);
router.get("/user/favorites/:userId", verifyJwt, getAllFavoritesRecipe);

export default router;
