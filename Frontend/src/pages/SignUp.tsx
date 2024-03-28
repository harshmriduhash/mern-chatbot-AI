import React, { useEffect } from "react";
import { Box, Typography, Button } from "@mui/material";
import CustomizedInput from "../components/shared/CustomizedInput";
import { RiLoginCircleLine } from "react-icons/ri";
import { useAuth } from "../components/context/AuthContext";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const username: string = formData.get("name") as string;
    const email: string = formData.get("email") as string;
    const password: string = formData.get("password") as string;

    try {
      toast.loading("Signing Up In Please wait ", { id: "signUp" });
      await auth?.signUp(username, email, password);
      toast.success("Signed Up Successfully ", { id: "signUp" });
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong try again", { id: "signUp" });
    }
  };

  useEffect(() => {
    if (auth?.user) {
      return navigate("/chat");
    }
  }, [auth]);

  return (
    <Box width={"100%"} height={"100%"} display="flex" flex={1}>
      <Box padding={8} mt={8} display={{ md: "flex", sm: "none", xs: "none" }}>
        <img
          src="\src\public\Gpt.jpg"
          alt="Gpt"
          style={{ width: "600px", borderRadius: "58px" }}
        />
      </Box>
      <Box
        display={"flex"}
        flex={{ xs: 1, md: 0.5 }}
        justifyContent={"center"}
        alignItems={"center"}
        padding={4}
        ml={"auto"}
        mt={3.75}
      >
        <form
          onSubmit={handleSubmit}
          style={{
            margin: "auto",
            padding: "30px",
            boxShadow: "10px 10px 20px #000",
            borderRadius: "10px",
            border: "none",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <Typography
              variant="h4"
              textAlign="center"
              padding={2}
              fontWeight={600}
            >
              Sign Up
            </Typography>
            <CustomizedInput type="name" name="name" label="UserName" />
            <CustomizedInput type="email" name="email" label="Email" />
            <CustomizedInput type="password" name="password" label="Password" />
            <Button
              type="submit"
              sx={{
                px: 2,
                py: 1,
                mt: 4,
                width: "400px",
                borderRadius: 4,
                bgcolor: "#5551FF",
                color: "white",
              }}
              endIcon={<RiLoginCircleLine />}
            >
              Sign Up
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default SignUp;
