import { Router } from "express";
import userRouter from "./user-router.js";
import chatRouter from "./chat-router.js";
const appRouter = Router();

appRouter.use("/user", userRouter);
appRouter.use("/chat", chatRouter);

export default appRouter;
