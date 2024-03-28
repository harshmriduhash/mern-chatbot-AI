import { Router } from "express";
import {
  getAllUsers,
  createUser,
  signIn,
  verifyUser,
  logout,
} from "../controllers/user-controller.js";
import {
  validate,
  signupValidator,
  signinValidator,
} from "../utils/validators.js";
import { verifyToken } from "../utils/token-manager.js";

const userRouter = Router();

userRouter.get("/", getAllUsers);
userRouter.post("/signin", validate(signinValidator), signIn);
userRouter.post("/signup", validate(signupValidator), createUser);
userRouter.get("/auth-status", verifyToken, verifyUser);
userRouter.get("/logout", verifyToken, logout);

export default userRouter;
