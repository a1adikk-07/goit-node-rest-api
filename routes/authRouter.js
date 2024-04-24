import express from "express";
import {
  createUserSchema,
  updateUserSchema,
  verifyUserSchema,
} from "../models/user.js";
import { ctrl } from "../controllers/authControllers.js";
import validateBody from "../middlewares/validateBody.js";
import { authenticate } from "../middlewares/authenticate.js";
import upload from "../middlewares/upload.js";

const authRouter = express.Router();

authRouter.post("/register", validateBody(createUserSchema), ctrl.register);
authRouter.get("/verify/:verificationPass", ctrl.verify);
authRouter.post("/verify", validateBody(verifyUserSchema), ctrl.resendVerify);
authRouter.post("/login", validateBody(createUserSchema), ctrl.login);
authRouter.get("/current", authenticate, ctrl.getCurrent);
authRouter.post("/logout", authenticate, ctrl.logout);
authRouter.patch(
  "/",
  authenticate,
  validateBody(updateUserSchema),
  ctrl.updateSubscription
);
authRouter.patch(
  "/avatars",
  upload.single("avatar"),
  authenticate,
  ctrl.updateAvatar
);

export default authRouter;
