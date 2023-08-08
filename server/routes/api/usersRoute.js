import express from "express";
import {
  loginUser,
  logoutUser,
  registerUser,
} from "../../controllers/usersController.js";

const router = express.Router();

router.post("/", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);

export default router;
