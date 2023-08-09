import express from "express";
import {
  deleteUser,
  loginUser,
  logoutUser,
  registerUser,
  updateUser,
} from "../../controllers/usersController.js";
import verifyJwt from "../../middlewares/verifyJwt.js";

const router = express.Router();

router.post("/login", loginUser);
router.post("/logout", logoutUser);
router
  .route("/")
  .post(registerUser)
  .delete(verifyJwt, deleteUser)
  .patch(verifyJwt, updateUser);

export default router;
