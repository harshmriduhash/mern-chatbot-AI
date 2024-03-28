import { Box, Button, Typography } from "@mui/material";
import { RiLoginCircleLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        mt: 30,
      }}
    >
      <Typography variant="h3" textAlign="center" padding={2} fontWeight={600}>
        404 ! - Page Not Found
      </Typography>
      <Typography variant="h6" textAlign="center" padding={2} fontWeight={600}>
        Sorry, the page you are looking for does not exist.
      </Typography>
      <Button
        onClick={() => {
          navigate("/");
        }}
        sx={{
          mt: 4,
          ml: 67.5,
          width: "165px",
          borderRadius: 4,
          bgcolor: "#5551FF",
          color: "white",
        }}
        endIcon={<RiLoginCircleLine />}
      >
        Go To Home
      </Button>
    </Box>
  );
};
export default NotFound;
