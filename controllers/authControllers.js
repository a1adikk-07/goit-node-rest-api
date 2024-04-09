import HttpError from "../helpers/HttpError.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { ctrlWrapper } from "../helpers/ctrlWrapper.js";
import { User } from "../models/user.js";

const { JWT_SECRET } = process.env;

const register = async (res, req) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user) throw HttpError(409, "Email in use");

  const hashPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({ email, password: hashPassword });

  res.status(201).json({
    user: { email: newUser.email, subscription: newUser.subscription },
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) throw HttpError(401, "Email or password is wrong");

  const completedPassword = await bcrypt.compare(password, user.password);

  if (!completedPassword) throw HttpError(401, "Email or password is wrong");

  const payload = {
    id: user._id,
  };
  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "47h" });
  await User.findByIdAndUpdate(user._id, { token });

  res.json = {
    token: token,
    user: { email: user.email, subscription: user.subscription },
  };
};

const getCurrent = (res, req) => {
  const { email, subscription } = req.user;

  res.json({ email, subscription });
};

const logout = async (res, req) => {
  const { _id } = req.user;
  await User.findOneAndUpdate(_id, { token: null });

  res.status(204).json({ message: "Logout success" });
};

const updateSubscription = async (req, res) => {
  const { subscription } = req.body;
  const { _id } = req.user;

  await User.findByIdAndUpdate(_id, { subscription });
  res.json({ message: "User subscription successful update" });
};

export default {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
  getCurrent: ctrlWrapper(getCurrent),
  logout: ctrlWrapper(logout),
  updateSubscription: ctrlWrapper(updateSubscription),
};
