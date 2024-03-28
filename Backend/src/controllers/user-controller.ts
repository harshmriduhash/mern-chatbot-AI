import { NextFunction, Request, Response } from "express";
import User from "../models/User.js";
import { hash, compare } from "bcrypt";
import { createToken } from "../utils/token-manager.js";
import { COOKIE_NAME } from "../utils/constants.js";

export const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await User.find();
    return res.status(200).json({ message: "OK", users });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "ERROR", cause: error.message });
  }
};

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(401).send("User already exist");
    }
    const hashPassword = await hash(password, 10);
    const user = new User({ name, email, password: hashPassword });
    await user.save();

    res.clearCookie(COOKIE_NAME, {
      path: "/",
      domain: "localhost",
      signed: true,
      httpOnly: true,
    });

    const token = createToken(user._id.toString(), user.email, "7d");

    const expires = new Date();
    expires.setDate(expires.getDate() + 7);
    res.cookie(COOKIE_NAME, token, {
      path: "/",
      domain: "localhost",
      signed: true,
      expires,
      httpOnly: true,
    });

    return res
      .status(201)
      .json({ message: "OK", name: user.name, email: user.email });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "ERROR", cause: error.message });
  }
};

export const signIn = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).send("User not registered");
    }
    const isPasswordCorrect = await compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(403).send("Incorrect Password");
    }
    res.clearCookie(COOKIE_NAME, {
      path: "/",
      domain: "localhost",
      signed: true,
      httpOnly: true,
    });

    const token = createToken(user._id.toString(), user.email, "7d");

    const expires = new Date();
    expires.setDate(expires.getDate() + 7);
    res.cookie(COOKIE_NAME, token, {
      path: "/",
      domain: "localhost",
      signed: true,
      expires,
      httpOnly: true,
    });

    res
      .status(200)
      .json({ message: "Sign in", name: user.name, email: user.email });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "ERROR", cause: error.message });
  }
};

export const verifyUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await User.findById(res.locals.jwtData.id);
    if (!user) {
      return res.status(400).send("Permission did not match");
    }
    return res
      .status(200)
      .json({ message: "OK", name: user.name, email: user.email });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "ERROR", cause: error.message });
  }
};

export const logout = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await User.findById(res.locals.jwtData.id);
    if (!user) {
      return res.status(400).send("Permission did not match");
    }
    if (user._id.toString() !== res.locals.jwtData.id) {
      return res
        .status(401)
        .send("User is not registered or token malfunctioned");
    }

    res.clearCookie(COOKIE_NAME, {
      path: "/",
      domain: "localhost",
      signed: true,
      httpOnly: true,
    });

    return res.status(200).json({ message: "OK" });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "ERROR", cause: error.message });
  }
};
