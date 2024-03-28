import User from "../models/User.js";
import { configureOpenAI } from "../config/openai-config.js";
import { OpenAIApi } from "openai";
export const generateChatCompletion = async (req, res, next) => {
    const { message } = req.body;
    try {
        const user = await User.findById(res.locals.jwtData.id);
        if (!user)
            return res
                .status(401)
                .json({ message: "User not registered OR Token malfunctioned" });
        const chats = user.chat.map(({ role, content }) => ({
            role,
            content,
        }));
        chats.push({ content: message, role: "user" });
        user.chat.push({ content: message, role: "user" });
        // send all chats with new one to openAI API
        const config = configureOpenAI();
        const openai = new OpenAIApi(config);
        // get latest response
        const chatResponse = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: chats,
        });
        user.chat.push(chatResponse.data.choices[0].message);
        await user.save();
        return res.status(200).json({ chats: user.chat });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Something went wrong" });
    }
};
export const sendUserChat = async (req, res, next) => {
    try {
        const user = await User.findById(res.locals.jwtData.id);
        if (!user) {
            return res.status(400).send("Permission did not match");
        }
        return res.status(200).json({ message: "OK", chat: user.chat });
    }
    catch (error) {
        console.log(error);
        return res.status(400).json({ message: "ERROR", cause: error.message });
    }
};
export const deleteUserChat = async (req, res, next) => {
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
        //@ts-ignore
        user.chat = [];
        await user.save();
        return res.status(200).json({ message: "OK" });
    }
    catch (error) {
        console.log(error);
        return res.status(400).json({ message: "ERROR", cause: error.message });
    }
};
//# sourceMappingURL=chat-controller.js.map