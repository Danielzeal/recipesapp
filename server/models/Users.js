import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";

const schema = Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    coverPhoto: {
      type: Object,
      required: true,
    },
    favorite_recipes: [
      {
        type: Schema.Types.ObjectId,
        ref: "Recipe",
      },
    ],
  },
  {
    timestamps: true,
  }
);

// compare the saved password with the entered password
schema.methods.comparePwd = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

//  Encrypt password before save
schema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  this.password = await bcrypt.hash(this.password, 10);
});

const User = model("User", schema);

export default User;
