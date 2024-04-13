import { Schema, model } from "mongoose";
import Joi from "joi";
import { handleErrorMongoose } from "../helpers/handleMongooseError.js";

// const emailRegexp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const subscriptionList = ["starter", "pro", "business"];

export const createUserSchema = Joi.object({
  email: Joi.string().required(),
  // .pattern(emailRegexp),
  password: Joi.string().min(6).required(),
});

export const updateUserSchema = Joi.object({
  subscription: Joi.string()
    .required()
    .valid(...subscriptionList),
});

const userSchema = new Schema(
  {
    password: {
      type: String,
      minlength: 6,
      required: [true, "Password is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      //   match: emailRegexp,
    },
    subscription: {
      type: String,
      enum: subscriptionList,
      default: "starter",
    },
    token: {
      type: String,
      default: null,
    },
  },
  { versionKey: false, timestamps: true }
);

userSchema.post("save", handleErrorMongoose);

export const User = model("user", userSchema);
