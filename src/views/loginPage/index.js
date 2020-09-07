import React, { useState, useEffect } from "react";
import HomeIcon from "@material-ui/icons/Home";
import { Grid, Button, TextField, Container } from "@material-ui/core";
import { Link ,Redirect} from "react-router-dom";
import { useDispatch,useSelector } from "react-redux";
import * as actions from "../../store/actions/rootActions";
import authorizationService from "../../services/authService"
import "./style.scss";

export const LoginPage = () => {
  const dispatch  = useDispatch()
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const userLoggedIn = useSelector(state => state.auth);


  useEffect(() => {
if(userLoggedIn && userLoggedIn.error){
  setUserName('')
  setPassword('')
}
  }, [userLoggedIn])

  const loginUser = () => {
    dispatch(actions.login(userName.trim(), password.trim()));
  };

  const handleKeyPress = (event) => {
    if(event.key === 'Enter'){
      loginUser()
    }
  }

  return authorizationService.isAuthenticated() ? (
    <Redirect to="/profile" />
  ) : (
    <>
      <div className="bannerlogin">
      <Link to="/">
        <div className="home-button-wrap">
          <HomeIcon className="home-icon" />
          <p>home</p>
        </div>
        </Link>
        <Grid container className="login-container">
          <Grid item md={4} xs={10}>
            
            <h2 className="login-title">Login</h2>
            <div className="login-wrap">
            <img src="/images/navlogo.svg" className="navbar-logo" />
            {userLoggedIn && userLoggedIn.error && <p className="error-login">Failed to login. Please try again </p>}
              <Grid item md={12}>
                
                <TextField
                  className="text-field-login"
                  label="Username or email"
                  value={userName}
                  onKeyPress={(e)=>handleKeyPress(e)}
                  onChange={(e) => {
                    setUserName(e.target.value);
                  }}
                />
              </Grid>
              <Grid item md={12}>
                <TextField
                  className="text-field-login"
                  label="Password"
                  value={password}
                  onKeyPress={handleKeyPress}
                  type="password"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
              </Grid>
              <Grid container justify="space-around">
                <Grid item md={4}>
                  <Link to="/">
                    <Button className="register-button" onClick={loginUser}>
                      Register
                    </Button>
                  </Link>
                </Grid>
                <Grid item md={4}>
                  <Button className="login-button" onClick={loginUser}>
                    Login
                  </Button>
                </Grid>
              </Grid>
              
            </div>
          
          </Grid>
        </Grid>
      </div>
    </>
  )
};
