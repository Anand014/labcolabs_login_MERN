import { Grid } from "@material-ui/core";
import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <div className="Footer">
      <Grid container direction="row" justify="center" alignItems="center">
        <h4>CopyRight © 2020</h4>
      </Grid>
    </div>
  );
};

export default Footer;
