import React, { useState, useEffect } from "react";

import { Grid } from "@material-ui/core";
import "./style.scss";
import { RegisterForm } from "../../components/registerForm";
import { StartPageSecond } from "../startPageSecond";
import { Navbar } from "../../components/navbar";
import authorizationService from "../../services/authService";
import {useSelector,useDispatch} from "react-redux"
import * as actions from "../../store/actions/rootActions"

export const StartPage = () => {
 const dispatch = useDispatch()
  const user = useSelector(state => state.user)
const [userName,setUserName] = useState(null)


useEffect(() => {
  dispatch(actions.getPublicUser());
}, [])

useEffect(() => {
  if(user.userData){
setUserName(user.userData.username)
  }
}, [user])

  return (
    <>
      <div className="banner">
        <Navbar />
        <Grid container className="startpage-container">
          <Grid item md={6}>
          
            <div className="text-wrap">
              <h2>Tired of linking to different social accounts?</h2>
              <p>Register now and gather all your socials at one place</p>
              <p>One QR-Code for all your socials</p>
              <p>Grow followers on all platforms instead of one!</p>
            </div>
            
            
          </Grid>
          <Grid container item md={5} justify="center" alignItems="center">
        {authorizationService.isAuthenticated() ?<div className="pulic-url-wrap"> <p>Your public url is:</p>
  {userName && <a href={`https://www.sharemysocials.com/${userName}`}>sharemysocials.com/{userName}</a>}</div>:<RegisterForm /> } 
          </Grid>
         
        
        </Grid>
        <div className="icon-scroll"></div>
      </div>

      <div>
        <h2 className="second-title">How does it work?</h2>

        <Grid
          container
          spacing={3}
          justify="space-evenly"
          className="second-page"
        >
    
          <StartPageSecond />
        </Grid>
      </div>
    </>
  );
};
