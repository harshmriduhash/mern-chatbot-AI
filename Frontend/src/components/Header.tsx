import { AppBar, Toolbar } from "@mui/material";
import Logo from "./shared/Logo";
import { useAuth } from "./context/AuthContext";
import Navigationlinks from "./shared/Navigationlinks";

const Header = () => {
  const auth = useAuth();
  return (
    <AppBar
      sx={{ bgcolor: "transparent", position: "flex", boxShadow: "none" }}
    >
      <Toolbar sx={{ display: "flex" }}>
        <Logo />
        <div>
          {auth?.isLoggedIn ? (
            <>
              <Navigationlinks
                bg="#5551FF"
                to="/chat"
                text="Go To Chat"
                textColor="black"
              />
              <Navigationlinks
                bg="#5551FF"
                to="/"
                text="Logout"
                textColor="white"
                onClick={auth.logout}
              />
            </>
          ) : (
            <>
              <Navigationlinks
                bg="#5551FF"
                to="/login"
                text="Login"
                textColor="black"
              />
              <Navigationlinks
                bg="#5551FF"
                to="/signup"
                text="SignUp"
                textColor="white"
              />
            </>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
