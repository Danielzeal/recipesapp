import dotenv from "dotenv";
dotenv.config();

import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";

import connectDB from "./config/connectDB.js";
import { notFound, errorHandler } from "./middlewares/errorHandler.js";

import root from "./routes/root.js";
import usersRoute from "./routes/api/usersRoute.js";
import recipesRoute from "./routes/api/recipeRoute.js";

const app = express();
const PORT = process.env.PORT;

connectDB();

app.use(cors({ credentials: true, origin: true }));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(express.json({ limit: "50mb" }));

app.use("/", root);
app.use("/api/users", usersRoute);
app.use("/api/recipes", recipesRoute);

app.use(notFound);
app.use(errorHandler);

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
