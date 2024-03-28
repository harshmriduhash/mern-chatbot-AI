import { Router } from "express";
import { deleteUserChat, generateChatCompletion, sendUserChat, } from "../controllers/chat-controller.js";
import { verifyToken } from "../utils/token-manager.js";
import { chatComplitionValidator, validate } from "../utils/validators.js";
const chatRouter = Router();
chatRouter.post("/new", validate(chatComplitionValidator), verifyToken, generateChatCompletion);
chatRouter.get("/all-chat", verifyToken, sendUserChat);
chatRouter.delete("/delete", verifyToken, deleteUserChat);
export default chatRouter;
//# sourceMappingURL=chat-router.js.map