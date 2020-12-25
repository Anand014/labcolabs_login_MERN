import React, { useEffect, useState } from "react";
import {
  AppBar,
  Button,
  Grid,
  LinearProgress,
  Toolbar,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
// import GoogleButton from "react-google-button";
import { GoogleLogin } from "react-google-login";
import { GoogleLogout } from "react-google-login";

const clientId =
  "983001121765-nmip87sakn170so3djc5iqpnidrjean5.apps.googleusercontent.com";

const Appbar = () => {
  const [toggler, setToggler] = useState(false);
  const [loader, setloader] = useState(false);
  const [googleLogin, setgoogleLogin] = useState(false);

  const history = useHistory();

  useEffect(() => {
    if (localStorage.getItem("userid")) {
      setToggler(true);
    } else if (localStorage.getItem("googleId")) {
      setgoogleLogin(true);
      setToggler(false);
    }
  }, []);

  const login = () => {
    history.push("/");
  };
  const register = () => {
    history.push("/register");
  };
  const logOut = () => {
    setloader(true);
    setTimeout(() => {
      localStorage.clear();
      setToggler(false);
      setloader(false);
      setgoogleLogin(false);
      window.location.assign("https://labcolabs-login-mern.herokuapp.com");
    }, 2000);
  };
  const onSuccess = (res) => {
    setloader(true);
    if (res) {
      localStorage.setItem("googleId", res.profileObj.googleId);
      localStorage.setItem("name", res.profileObj.name);
      localStorage.setItem("email", res.profileObj.email);
      localStorage.setItem("token", res.profileObj.access_token);
      localStorage.setItem("auth", res.tokenObj.idpId);
      localStorage.setItem("image", res.profileObj.imageUrl);
      setloader(false);
      setgoogleLogin(true);
      history.push("/profile");
    }
    setloader(false);
  };
  const onFailure = (res) => {
    console.log("login with google failed", res);
  };
  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <h3 style={{ flexGrow: "1" }}>Labcolabs</h3>
          {googleLogin ? (
            <GoogleLogout
              clientId={clientId}
              buttonText="Logout"
              onLogoutSuccess={logOut}
            ></GoogleLogout>
          ) : (
            ""
          )}
          {toggler ? (
            <ExitToAppIcon onClick={logOut} style={{ cursor: "pointer" }} />
          ) : (
            ""
          )}
          {!googleLogin && !toggler ? (
            <>
              <Button color="inherit" onClick={login}>
                Login
              </Button>
              <Button color="inherit" onClick={register}>
                Register
              </Button>
            </>
          ) : (
            ""
          )}
        </Toolbar>
      </AppBar>
      {loader ? <LinearProgress /> : ""}
      {googleLogin || toggler ? (
        ""
      ) : (
        <>
          <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
            style={{
              position: "absolute",
              marginTop: "1rem",
              marginLeft: "4.2rem",
            }}
          >
            <GoogleLogin
              clientId={clientId}
              buttonText="Login With Google"
              onSuccess={onSuccess}
              onFailure={onFailure}
              cookiePolicy={"single_host_origin"}
              isSignedIn={true}
            />
          </Grid>
        </>
      )}
    </div>
  );
};

export default Appbar;
