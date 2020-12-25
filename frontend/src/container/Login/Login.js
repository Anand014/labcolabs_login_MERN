import React, { useEffect, useState } from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import {
  CircularProgress,
  FormControl,
  FormGroup,
  Grid,
  Input,
  InputLabel,
} from "@material-ui/core";
import { Link, useHistory } from "react-router-dom";
import Axios from "axios";
import Swal from "sweetalert2";

const SERVER = "https://labcolabs-login-mern.herokuapp.com";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [toggle, setToggle] = useState(false);
  const history = useHistory();

  useEffect(() => {
    if (localStorage.getItem("userid")) {
      history.push("/profile");
    }
  });

  const loginHandler = () => {
    setToggle(true);
    setTimeout(() => {
      let data = { email, password };
      try {
        Axios.post(`${SERVER}/api/users`, data)
          .then((res) => {
            if (res.status === 200) {
              localStorage.setItem("userid", res.data._id);
              localStorage.setItem("name", res.data.name);
              localStorage.setItem("email", res.data.email);
              localStorage.setItem("address", res.data.address);
              localStorage.setItem("dateofbirth", res.data.date);
              localStorage.setItem("phonenumber", res.data.phoneNumber);
              localStorage.setItem("token", res.data.token);
            } else {
              console.log(res.status, "in else part");
              setToggle(false);
            }
            setToggle(false);
            window.location.assign(`${SERVER}/profile`);
          })
          .catch((err) => {
            console.log(err.response.status, "err in catch");
            if (err.response.status === 403) {
              Swal.fire({
                icon: "error",
                title: "Incorrect Password",
                showConfirmButton: false,
                timer: 1500,
              }).then(() => {
                setToggle(false);
              });
            }
            if (err.response.status === 404) {
              Swal.fire({
                icon: "error",
                title: "Email Not Found",
                showConfirmButton: false,
                timer: 1500,
              }).then(() => {
                setToggle(false);
              });
            }
            if (err.response.status === 401) {
              Swal.fire({
                icon: "error",
                title: "Invalid email or password",
                showConfirmButton: false,
                timer: 1500,
              }).then(() => {
                setToggle(false);
              });
            }
          });
      } catch (error) {
        console.log(error, "in trycatch");
        Swal.fire({
          icon: "error",
          title: "Server Down! Please Try Again Later!!",
          showConfirmButton: false,
          timer: 1500,
        }).then(() => {
          setToggle(false);
        });
      }
      setToggle(false);
    }, 2000);
  };

  return (
    <div>
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        style={{ marginTop: "5rem" }}
      >
        <Card>
          <CardContent>
            <Typography variant="h5" component="h2">
              Login
            </Typography>
            <FormGroup>
              <FormControl>
                <InputLabel>Email Address</InputLabel>
                <Input
                  type="email"
                  placeholder="Enter Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FormControl>
            </FormGroup>
            <FormGroup>
              <FormControl>
                <InputLabel>Password</InputLabel>
                <Input
                  type="password"
                  placeholder="Enter Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </FormControl>
            </FormGroup>
          </CardContent>
          <CardActions>
            <Button
              variant="contained"
              color="primary"
              onClick={loginHandler}
              disabled={toggle}
            >
              {toggle && <CircularProgress size={14} />}
              {!toggle && "Login"}
            </Button>
            {!toggle && (
              <>
                <p style={{ marginLeft: "1rem" }}>New to Labcolabs ? </p>
                <Link to="/register">Register</Link>
              </>
            )}
          </CardActions>
        </Card>
      </Grid>
    </div>
  );
}
