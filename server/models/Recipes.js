import { Schema, model } from "mongoose";

const schema = Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    recipe_name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    recipe_image: {
      type: Object,
      required: true,
    },
    minute: {
      type: Number,
      required: true,
    },
    hour: {
      type: Number,
      required: true,
    },
    instructions: [
      {
        type: String,
        required: true,
      },
    ],
    ingredients: [
      {
        type: String,
        required: true,
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Recipe = model("Recipe", schema);

export default Recipe;
