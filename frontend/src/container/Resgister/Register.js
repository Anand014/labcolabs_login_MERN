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
  TextField,
} from "@material-ui/core";
import { Link, useHistory } from "react-router-dom";
import Axios from "axios";
import Swal from "sweetalert2";

const d = new Date();
const SERVER = "https://labcolabs-login-mern.herokuapp.com";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [date, setDate] = useState(
    `${d.getFullYear()}-${d.getMonth(Number) + 1}-${d.getDate()}`
  );
  const [toggle, setToggle] = useState(false);

  const history = useHistory();

  useEffect(() => {
    if (localStorage.getItem("userid")) {
      history.push("/profile");
    }
  });

  let data = { name, email, password, address, phoneNumber, date };
  const registerHandler = () => {
    setToggle(true);
    setTimeout(() => {
      try {
        Axios.post(`${SERVER}/api/users/register`, data)
          .then((res) => {
            console.log(res, "register api response");
            if (res.status === 201) {
              localStorage.setItem("userid", res.data._id);
              localStorage.setItem("name", res.data.name);
              localStorage.setItem("email", res.data.email);
              localStorage.setItem("address", res.data.address);
              localStorage.setItem("dateofbirth", res.data.date);
              localStorage.setItem("phonenumber", res.data.phoneNumber);
              localStorage.setItem("token", res.data.token);
            }
            setToggle(false);
            Swal.fire({
              icon: "success",
              title: "Successfully Registered",
              showConfirmButton: false,
              timer: 1500,
            }).then(() => {
              window.location.assign(`${SERVER}/profile`);
            });
          })
          .catch((err) => {
            if (err.response) {
              if (err.response.status === 400) {
                Swal.fire({
                  icon: "error",
                  title: "Password should be more than 8 Characters",
                  showConfirmButton: false,
                  timer: 1500,
                }).then(() => {
                  setToggle(false);
                });
              } else if (err.response.status === 401) {
                Swal.fire({
                  icon: "error",
                  title: "Please Enter a Valid Email",
                  showConfirmButton: false,
                  timer: 1500,
                }).then(() => {
                  setToggle(false);
                });
              } else if (err.response.status === 403) {
                Swal.fire({
                  icon: "error",
                  title: "Email already Exists",
                  showConfirmButton: false,
                  timer: 1500,
                }).then(() => {
                  setToggle(false);
                });
              } else if (err.response.status === 404) {
                Swal.fire({
                  icon: "error",
                  title: "Phone number is registered with other user",
                  showConfirmButton: false,
                  timer: 1500,
                }).then(() => {
                  setToggle(false);
                });
              } else {
                Swal.fire({
                  icon: "error",
                  title: "Please Enter a Valid Information",
                  showConfirmButton: false,
                  timer: 1500,
                }).then(() => {
                  setToggle(false);
                });
              }
            }
          });
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Server! Down, Please Try gain Later!!!",
          showConfirmButton: false,
          timer: 1500,
        }).then(() => {
          setToggle(false);
        });
        console.log(error);
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
              Register
            </Typography>
            <FormGroup>
              <FormControl>
                <InputLabel>Name</InputLabel>
                <Input
                  type="text"
                  placeholder="Enter Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </FormControl>
            </FormGroup>
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
            <FormGroup>
              <FormControl>
                <InputLabel>Address</InputLabel>
                <Input
                  type="text"
                  placeholder="Enter Address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </FormControl>
            </FormGroup>
            <FormGroup>
              <FormControl>
                <InputLabel>Phone Number</InputLabel>
                <Input
                  type="Number"
                  placeholder="Enter Phone Number"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </FormControl>
            </FormGroup>
            <FormGroup>
              <FormControl style={{ paddingTop: "1rem" }}>
                <TextField
                  id="date"
                  label="Date of birth"
                  type="date"
                  defaultValue={date}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onChange={(e) => setDate(e.target.value)}
                />
              </FormControl>
            </FormGroup>
          </CardContent>
          <CardActions>
            <Button
              variant="contained"
              color="primary"
              onClick={registerHandler}
              disabled={toggle}
            >
              {toggle && <CircularProgress size={20} />}
              {!toggle && "Register"}
            </Button>
            {!toggle && (
              <>
                <p style={{ paddingLeft: "1rem" }}>Have an Account ? </p>
                <Link to="/">Login</Link>
              </>
            )}
          </CardActions>
        </Card>
      </Grid>
    </div>
  );
}
