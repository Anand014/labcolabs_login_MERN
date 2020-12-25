import { Card, CardContent, Grid } from "@material-ui/core";
import React, { useEffect, useState } from "react";

const Profile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [image, setImage] = useState("");
  const [phoneNumber, setPhoneNumber] = useState(Number);
  const [date, setDate] = useState("");
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    if (!localStorage.getItem("userid") && !localStorage.getItem("googleId")) {
      window.location.assign("https://labcolabs-login-mern.herokuapp.com");
    } else {
      setName(localStorage.getItem("name"));
      setEmail(localStorage.getItem("email"));
      setAddress(localStorage.getItem("address"));
      setPhoneNumber(localStorage.getItem("phonenumber"));
      setDate(localStorage.getItem("dateofbirth"));
      setLoader(false);
    }
    if (localStorage.getItem("googleId")) {
      setImage(localStorage.getItem("image"));
    }
  }, []);
  return (
    <div>
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        style={{ marginTop: "5rem" }}
      >
        {" "}
        {loader ? (
          " "
        ) : (
          <>
            <Card>
              <CardContent>
                <Grid
                  container
                  direction="row"
                  justify="flex-start"
                  alignItems="flex-start"
                >
                  <img
                    src={
                      image
                        ? image
                        : "https://i.pinimg.com/originals/0c/3b/3a/0c3b3adb1a7530892e55ef36d3be6cb8.png"
                    }
                    style={{
                      width: "5rem",
                      borderRadius: "5rem",
                    }}
                  />
                  <h1 style={{ margin: "0.5rem" }}>Welcome</h1>
                </Grid>
                <hr />
                <h4>
                  <b>Name</b>-{" "}
                  {name ? name[0].toUpperCase() + name.substring(1) : " "}
                </h4>
                <h4>
                  <b>Email</b>- {email ? email : " "}
                </h4>
                <h4>
                  <b>Address</b>-{" "}
                  {address ? address : " Google Don't Share THIS"}
                </h4>
                <h4>
                  <b>Phone Number</b>-{" "}
                  {phoneNumber ? phoneNumber : " Google Don't Share THIS"}
                </h4>
                <h4>
                  <b>Date of Birth</b>-{" "}
                  {date ? date : " Google Don't Share THIS"}
                </h4>
              </CardContent>
            </Card>
          </>
        )}
      </Grid>
    </div>
  );
};

export default Profile;
