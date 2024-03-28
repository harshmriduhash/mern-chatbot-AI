import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Avatar, Box, Typography, Button, IconButton } from "@mui/material";
import { useAuth } from "../components/context/AuthContext";
import ChatItem from "../components/chat/ChatItem";
import { IoMdSend } from "react-icons/io";
import {
  deleteUserChat,
  getAllUserChat,
  sendChatMessage,
} from "../helpers/api-communicator";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

type Message = {
  role: string;
  content: string;
};

const Chat = () => {
  const naviagte = useNavigate();
  const auth = useAuth();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [chatMessages, setChatMessages] = useState<Message[]>([]);

  const handleInput = async () => {
    const content = inputRef.current?.value as string;
    if (inputRef && inputRef.current) {
      inputRef.current.value = "";
    }
    const newMessage: Message = { role: "user", content };
    setChatMessages((prev) => [...prev, newMessage]);
    const chatData = await sendChatMessage(content);
    setChatMessages([...chatData.chats]);
  };

  useLayoutEffect(() => {
    if (auth?.isLoggedIn && auth.user) {
      toast.loading("loading chat", { id: "chatloading" });
      getAllUserChat()
        .then((data) => {
          setChatMessages([...data.chat]);
          toast.success("Succesfull", { id: "chatloading" });
        })
        .catch((err) => {
          console.log(err);
          toast.error("loading failed", { id: "chatloading" });
        });
    }
  }, [auth]);

  useEffect(() => {
    if (!auth?.user) {
      return naviagte("/login");
    }
  }, [auth]);

  const deleteChat = () => {
    deleteUserChat()
      .then(() => {
        setChatMessages([]);
        toast.success("Deleted Successfully", { id: "deletechat" });
      })
      .catch((err) => {
        toast.error("Falied to delete", { id: "deletechat" });
        console.log(err);
      });
  };

  return (
    <Box
      sx={{
        display: "flex",
        flex: 1,
        width: "100%",
        height: "100%",
        mt: 3,
        gap: 3,
      }}
    >
      <Box
        sx={{
          display: { md: "flex", xs: "none", sm: "none" },
          flex: 0.2,
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            display: "flex",
            width: "100%",
            height: "60vh",
            bgcolor: "rgb(17,29,29)",
            borderRadius: 5,
            flexDirection: "column",
            mx: 6,
            mt: "60px",
          }}
        >
          <Avatar
            sx={{
              mx: "auto",
              my: 2,
              bgcolor: "black",
              color: "white",
              fontWeight: 700,
            }}
          >
            {auth?.user?.name[0].toUpperCase()}
            {auth?.user?.name.split("")[1][0].toUpperCase()}
          </Avatar>
          <Typography
            sx={{
              mx: "auto",
            }}
          >
            You are talking to chat bot
          </Typography>
          <Typography
            sx={{
              mx: "auto",
              my: 4,
              p: 3,
            }}
          >
            You can ask some questions related to knowledge, business,
            Advices,Eduction, etc. But avoid sharing personal information
          </Typography>
          <Button
            onClick={deleteChat}
            sx={{
              width: "200px",
              my: "auto",
              color: "white",
              fontWeight: "700",
              borderRadius: 3,
              mx: "auto",
              bgcolor: "rgb(20,180,117)",
              ":hover": { bgcolor: "rgb(20,149,117)" },
            }}
          >
            Clear Chat
          </Button>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          flex: { md: 0.8, xs: 1, sm: 1 },
          flexDirection: "column",
          px: 4,
        }}
      >
        <Typography
          sx={{
            textAlign: "center",
            fontSize: "40px",
            color: "white",
            mb: 2,
            mx: "auto",
            fontWeight: "600",
          }}
        >
          GPT-3.5-Turbo
        </Typography>
        <Box
          sx={{
            width: "100%",
            height: "60vh",
            borderRadius: 3,
            mx: "auto",
            display: "flex",
            flexDirection: "column",
            overflow: "scroll",
            overflowX: "hidden",
            overflowY: "auto",
            scrollBehavior: "smooth",
          }}
        >
          {chatMessages.map((chat, index) => (
            <ChatItem content={chat.content} role={chat.role} key={index} />
          ))}
        </Box>
        <div
          style={{
            width: "100%",
            padding: "20px",
            borderRadius: 8,
            backgroundColor: "rgb(17,27,39)",
            display: "flex",
            margin: "auto",
          }}
        >
          {" "}
          <input
            type="text"
            ref={inputRef}
            style={{
              width: "100%",
              backgroundColor: "transparent",
              padding: "10px",
              border: "none",
              outline: "none",
              color: "white",
              fontSize: "20px",
            }}
          />
          <IconButton onClick={handleInput} sx={{ ml: "auto", color: "white" }}>
            <IoMdSend />
          </IconButton>
        </div>
      </Box>
    </Box>
  );
};

export default Chat;
