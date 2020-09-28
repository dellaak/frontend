import React from "react";
import "./topProfileStyle.scss";
import { Button } from "@material-ui/core";
import { Grid } from "@material-ui/core/";

export const TopProfile = ({ qrcode }) => {
  return (
    <Grid item md={12} >
      <div className="profileWrapper">
        
        <a className="download-link" download href={qrcode}>
          <Button className="download-btn">Download QR-Code</Button>
        </a>
        <img src={qrcode} className="qr-code" alt="qr-code-sms"/>
      </div>
    </Grid>
  );
};
