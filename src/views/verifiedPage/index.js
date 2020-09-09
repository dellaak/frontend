import React, { useState, useEffect } from "react";
import { TopProfile } from "../../components/topProfile";
import { Grid, Container, Button, Collapse } from "@material-ui/core/";
import "./style.scss";
import { useParams, Redirect } from "react-router-dom";
import EmailIcon from "@material-ui/icons/Email";
import PhoneIcon from "@material-ui/icons/Phone";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../../store/actions/rootActions";
import socialsJSON from "../profilePage/socialsJSON";

export const VerifiedPage = () => {
  const dispatch = useDispatch();
  let { activationtoken } = useParams();
  const publicUser = useSelector((state) => state.public);

  useEffect(() => {

    dispatch(actions.verifyUser(activationtoken))

  }, []);

  useEffect(() => {
  }, [publicUser]);

  return (
    <>
    
        <div className="profile-wrapper">
          <Container maxWidth="md">
          {publicUser.verified && 
          <>
          <div className="verify-wrap">
           <img src="/images/navlogo.svg" className="navbar-logo" />
     <p>Welcome!</p>
          <p>Account verified and activated!</p>
          <p>Click the button to login!</p>
          <Button onClick={()=>{window.location.href="/login"}}>Go to login</Button>
          </div></>} 
          </Container>
        </div>

     
    </>
  );
};
