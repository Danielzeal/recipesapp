import cloudinary from "../config/cloudinary.js";
import asyncHandler from "../middlewares/asyncHandler.js";
import User from "../models/Users.js";
import Recipe from "../models/Recipes.js";
import generateToken from "../utils/generateToken.js";

//  @desc   Login
//  @route  POST /api/user/login
//  public
const loginUser = asyncHandler(async (req, res) => {
  const { password, email } = req.body;

  if (!password || !email) {
    res.status(400);
    throw new Error("Please ensure all field are filled");
  }

  const user = await User.findOne({ email });

  if (!user) {
    res.status(401);
    throw new Error("Unauthorized access, please enter valid credentials");
  }

  if (user && (await user.comparePwd(password))) {
    generateToken(res, user._id);

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      coverPhoto: user.coverPhoto,
    });
  }
});

//  @desc   Register user
//  @route  POST /api/user
//  public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, imageFile } = req.body;

  if (!name || !email || !password || !imageFile) {
    res.status(404);
    throw new Error("All field are required");
  }

  const user = await User.findOne({ email });

  if (user) {
    res.status(409);
    throw new Error("User already exist");
  }

  const coverPhoto = await cloudinary.uploader.upload(imageFile, {
    upload_preset: "recipes",
  });

  if (coverPhoto) {
    const createdUser = await User.create({
      name,
      email,
      password,
      coverPhoto,
    });

    if (createdUser) {
      generateToken(res, createdUser._id);

      res.status(201).json({
        _id: createdUser._id,
        name: createdUser.name,
        email: createdUser.email,
        coverPhoto: createdUser.coverPhoto,
      });
    } else {
      res.status(400);
      throw new Error("Invalid user data");
    }
  }
});

// @desc    Logout user / clear cookie
// @route   POST /api/users/logout
// @public
const logoutUser = (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "Logged out successfully" });
};

//  @desc   update user
//  @route  PATCH /api/users
const updateUser = asyncHandler(async (req, res) => {
  const { id, name, email } = req.body;

  if (!id || !email || !name) {
    res.status(400);
    throw new Errror("All fields are required");
  }

  const user = await User.findById(id);

  if (!user) {
    res.status(400);
    throw new Error("User not found");
  }

  const userExist = await User.findOne({ email });

  if (userExist) {
    res.status(409);
    throw new Error("Duplicate username");
  }

  user.name = name;
  user.email = email;

  const updatedUser = await user.save();

  res.json({
    _id: updatedUser._id,
    name: updatedUser.name,
    email: updatedUser.email,
    coverPhoto: updatedUser.coverPhoto,
  });
});

// @desc    delete user account
// @route   DELETE /api/user
// @public
const deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.body;

  if (!id) {
    res.status(400);
    throw new Error("Enter a valid user ID");
  }

  const recipe = await Recipe.findOne({ user: id });

  if (recipe) {
    res.status(400);
    throw new Error("User still has created recipes");
  }

  const user = await User.findById(id);

  if (!user) {
    res.status(400);
    throw new Error("User not found");
  }

  await user.deleteOne();

  res.json({
    message: "User account deleted",
  });
});

export { loginUser, logoutUser, registerUser, deleteUser, updateUser };
