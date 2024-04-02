import { isValidObjectId } from "mongoose";
import HttpError from "../helpers/HttpError.js";

export const isValidId = (req, res, next) => {
  const { id } = req.params;

  console.log(isValidObjectId(id));
  if (!isValidObjectId(id)) {
    next(
      HttpError(
        404,
        `id ${id} is not valid or contact with this id has been deleted`
      )
    );
  }

  next();
};
