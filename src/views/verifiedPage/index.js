import React, {useEffect } from "react";
import {Container, Button} from "@material-ui/core/";
import "./style.scss";
import { useParams } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import * as actions from "../../store/actions/rootActions";


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
           <img src="/images/navlogo.svg" className="navbar-logo" alt="sharemysocials-logo"/>
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
