import React from "react";
import { Box, Avatar, Typography } from "@mui/material";
import { useAuth } from "../context/AuthContext";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dark } from "react-syntax-highlighter/dist/esm/styles/prism";

function extractCodeFromString(message: string) {
  if (message.includes("```")) {
    const block = message.split("```");
    return block;
  }
}

function isCodeBlock(str: string) {
  if (
    str.includes("=") ||
    str.includes(";") ||
    str.includes("[") ||
    str.includes("]") ||
    str.includes("{") ||
    str.includes("}") ||
    str.includes("#") ||
    str.includes("//")
  ) {
    return true;
  }
  return false;
}

const ChatItem = ({ content, role }: { content: string; role: string }) => {
  const auth = useAuth();

  const messageBlock = extractCodeFromString(content);

  return role === "Assistant" ? (
    <Box sx={{ display: "flex", p: 2, bgcolor: "#004d5612", my: 2, gap: 2 }}>
      <Avatar sx={{ ml: "0" }}>
        <img src="\src\public\openai.png" alt="openai" width={"30px"} />
      </Avatar>
      <Box>
        {!messageBlock && (
          <Typography lineHeight={2.5} fontSize={"15px"}>
            {content}
          </Typography>
        )}
        {messageBlock &&
          messageBlock.length &&
          messageBlock.map((block) =>
            isCodeBlock(block) ? (
              <SyntaxHighlighter style={dark} language="javascript">
                {block}
              </SyntaxHighlighter>
            ) : (
              <Typography lineHeight={2.5} fontSize={"15px"}>
                {block}
              </Typography>
            )
          )}
      </Box>
    </Box>
  ) : (
    <Box sx={{ display: "flex", p: 2, bgcolor: "rgb(20,149,117)", gap: 2 }}>
      <Avatar sx={{ ml: "0", bgcolor: "black", color: "white" }}>
        {auth?.user?.name[0].toUpperCase()}
        {auth?.user?.name.split("")[1][0].toUpperCase()}
      </Avatar>
      <Box>
        <Typography lineHeight={2.5} fontSize={"15px"}>
          {content}
        </Typography>
      </Box>
    </Box>
  );
};

export default ChatItem;
