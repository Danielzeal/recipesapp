import jwt from "jsonwebtoken";
import User from "../models/Users.js";
import asyncHandler from "./asyncHandler.js";

const verifyJwt = asyncHandler(async (req, res, next) => {
  const cookies = req.cookies;

  if (!cookies?.jwt) return res.status(401).json({ message: "Unauthorized" });

  const token = cookies.jwt;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.userId).select("-password");
      next();
    } catch (error) {
      console.log(error);
      res.status(401).json({ message: "Not authorized. token failed" });
    }
  } else {
    res.status(401).json({ message: "Not authorized, no token" });
  }
});

export default verifyJwt;
