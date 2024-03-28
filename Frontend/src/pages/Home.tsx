import { Box } from "@mui/material";
import { HomeAnimation } from "../components/Animation/HomeAnimation";

export const Home = () => {
  return (
   <Box width={"100%"} height={"100%"}>
      <Box
        sx={{
          display: "flex",
          width: "100%",
          flexDirection: "column",
          alignItems: "center",
          mx: "auto",
          mt: 40,
        }}
      >
        <HomeAnimation></HomeAnimation>
      </Box>
    </Box>
  );
};