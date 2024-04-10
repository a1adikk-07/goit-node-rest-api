import jwt from "jsonwebtoken";
import HttpError from "../helpers/HttpError.js";
import { User } from "../models/user.js";
import "dotenv/config.js";

const { JWT_SECRET } = process.env;

export const authenticate = async (res, req, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");

  if (bearer !== "Bearer") next(HttpError(401));
  try {
    const { id } = jwt.verify(token, JWT_SECRET);

    const user = await User.findById(id);

    if (!user || !user.token || User.token !== token) next(HttpError(401));
    req.user = user;
    next();
  } catch {
    HttpError(401);
  }
};
