import express from "express";
import { createUserSchema, updateUserSchema } from "../models/user.js";
import ctrl from "../controllers/authControllers.js";
import { validateBody } from "../middlewares/validateBody.js";
import { authenticate } from "../middlewares/authenticate.js";

const authRouter = express.Router();

authRouter.post(
  "/users/register",
  validateBody(createUserSchema),
  ctrl.register
);
authRouter.post("/users/login", validateBody(createUserSchema), ctrl.login);
authRouter.post("/users/logout", authenticate, ctrl.logout);
authRouter.get("/users/current", authenticate, ctrl.getCurrent);
authRouter.patch(
  "/",
  authenticate,
  validateBody(updateUserSchema),
  ctrl.updateSubscription
);

export default authRouter;
