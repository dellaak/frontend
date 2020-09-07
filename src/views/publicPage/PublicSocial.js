import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";

import { useDispatch, useSelector } from "react-redux";
import "./style.scss";

export const PublicSocial= ({ social, id, index }) => {


  return (
    <>
      <Grid
        item
        md={4}
        xs={6}
        className={"social-wrapper"}
        
      >
        <small>{social.title}</small>

        <a className="social-link" href={social.link}>
          <img className="social-icon" src={social.icon} alt="logo" />
        </a>
      </Grid>
    </>
  );
};
