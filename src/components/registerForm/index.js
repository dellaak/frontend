import React, { useState, useEffect } from "react";
import { TextField, Grid, Button } from "@material-ui/core";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import CheckBox from "@material-ui/core/CheckBox";
import * as actions from "../../store/actions/rootActions";
import { useDispatch, useSelector } from "react-redux";
import "./style.scss";

export const RegisterForm = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [userErr, setUserErr] = useState(false);
  const [emailErr, setEmailErr] = useState(false);
  const [passwordErr, setPasswordErr] = useState(false);
  const [rePasswordErr, setRePasswordErr] = useState(false);
  const [disableButton, setDisableButton] = useState(true);
  const [userType, setUserType] = useState("personal");
  const [takenName, setTakenName] = useState(false);
  const [takenEmail, setTakenEmail] = useState(false);
  const authUser = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleChange = (event) => {
    setUserType(event.target.value);
  };

  useEffect(() => {
    if (
      userName &&
      !userErr &&
      email &&
      !emailErr &&
      password &&
      !passwordErr &&
      rePassword === password
    ) {
      setDisableButton(false);
    } else {
      setDisableButton(true);
    }
  }, [
    userName,
    userErr,
    email,
    emailErr,
    passwordErr,
    rePasswordErr,
    password,
    rePassword,
  ]);

  const validateUserName = (val) => {
    val.trim();

    if (val.length < 3) {
      setUserErr(true);
    } else {
      setUserErr(false);
    }
setTakenName(false)
    setUserName(val.toLowerCase().replace(/\s+/g, ""));
  };

  const validateEmail = (val) => {
    val.trim();
    let regexp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    setEmailErr(!regexp.test(String(val).toLowerCase()));
    setEmail(val.toLowerCase());
  };

  const validatePassword = (val) => {
    val.trim();

    let regexp = /\d/;
    if (!regexp.test(val) || val.length < 6) {
      setPasswordErr(true);
    } else {
      setPasswordErr(false);
    }

    setPassword(val);
  };

  const validateRePassword = (val) => {
    val.trim();

    if (val === password) {
      setRePasswordErr(false);
    } else {
      setRePasswordErr(true);
    }

    setRePassword(val);
  };

  const registerUser = () => {
    setTakenName(false);
    setTakenEmail(false);
    const data = {
      username: userName,
      password: password,
      email,
      type: userType,
    };

    dispatch(actions.createUser(data));
  };

  useEffect(() => {
   
    if (authUser.error) {
      if (authUser.error.message.includes("Email")) {
        setTakenEmail(true);
      } else if(authUser.error.message.includes("Username")){
        setTakenName(true);
      }else{
        setTakenEmail(false);
        setTakenName(false)
      }
    }
  }, [authUser]);

  return (
    <>


      <Grid container className="reg-wrapper" justify="space-around">
     
        {authUser.userCreated && (
          <div className="success-wrap">
            <div class="success-checkmark">
              <div class="check-icon">
                <span class="icon-line line-tip"></span>
                <span class="icon-line line-long"></span>
                <div class="icon-circle"></div>
                <div class="icon-fix"></div>
              </div>
            </div>
            <p>
              We send an activation link to <b>{email}</b>
            </p>
            <p> Login to your email and activate your account.</p>
          </div>
        )}

        {!authUser.userCreated && !authUser.loading &&  <>
          
            <h2>Register now to share your socials accounts</h2>
            <Grid item md={12} xs={12}>
              <FormControl component="fieldset" className="radio-fieldset">
                <FormLabel component="legend" className="radio-title">
                  Used for
                </FormLabel>
                <RadioGroup
                  aria-label="Used for"
                  name="Used for"
                  value={userType}
                  onChange={handleChange}
                  className="radio-wrap"
                >
                  <FormControlLabel
                    value="personal"
                    control={<Radio />}
                    label="Personal"
                  />
                  <FormControlLabel
                    value="company"
                    control={<Radio />}
                    label="Company"
                  />
                </RadioGroup>
              </FormControl>
            </Grid>
            {userType === "company" && (
              <p>
                All company registrations will be reviewed manually and need to
                be verified
              </p>
            )}
            {/* COMPANY */}
            {userType === "company" && (
              <Grid item md={11} xs={10}>
                <TextField
                  className="text-field"
                  label="Company username"
                  variant="outlined"
                  value={userName}
                  error={userErr}
                  helperText={
                    userErr
                      ? "Minimum 3 characters"
                      : "This name is shown to public"
                  }
                  onChange={(e) => {
                    validateUserName(e.target.value);
                  }}
                />
              </Grid>
            )}
            {userType === "company" && (
              <Grid item md={5} xs={10}>
                <TextField
                  className="text-field"
                  label="Company legal name"
                  variant="outlined"
                  value={userName}
                  error={userErr}
                  helperText={userErr && "Minimum 3 characters"}
                  onChange={(e) => {
                    validateUserName(e.target.value);
                  }}
                />
              </Grid>
            )}
            {userType === "company" && (
              <Grid item md={5} xs={10}>
                <TextField
                  className="text-field"
                  label="Email"
                  variant="outlined"
                  error={emailErr}
                  onChange={(e) => {
                    validateEmail(e.target.value);
                  }}
                />
              </Grid>
            )}
            {/* PERSONAL */}
            {userType === "personal" && (
              <Grid item md={5} xs={10}>
                <TextField
                  className="text-field"
                  label="Username"
                  variant="outlined"
                  value={userName}
                  error={userErr || takenName}
                  helperText={
                    !takenName
                      ? "Minimum 3 characters"
                      : "Username exists"
                  }
                  onChange={(e) => {
                    validateUserName(e.target.value);
                  }}
                />
              </Grid>
            )}
            {userType === "personal" && (
              <Grid item md={5} xs={10}>
                <TextField
                  className="text-field"
                  label="Email"
                  variant="outlined"
                  error={emailErr || takenEmail}
                  onChange={(e) => {
                    validateEmail(e.target.value);
                  }}
                />
              </Grid>
            )}
            <Grid item md={5} xs={10}>
              <TextField
                className="text-field"
                label="Password"
                type="password"
                variant="outlined"
                error={passwordErr}
                helperText={passwordErr && "Minimum 6 characters and 1 number"}
                onChange={(e) => {
                  validatePassword(e.target.value);
                }}
              />
            </Grid>
            <Grid item md={5} xs={10}>
              <TextField
                type="password"
                className="text-field"
                label="Repeat Password"
                variant="outlined"
                onChange={(e) => {
                  validateRePassword(e.target.value);
                }}
                error={rePasswordErr}
                helperText={rePasswordErr && "No match on password"}
              />
            </Grid>
            <Grid item md={12}>
              <CheckBox />
              <small> I accept the terms and conditions</small>
            </Grid>
            <Grid item md={12} className="button-wrap">
              <Button
                className={disableButton ? "diasble-button" : "create-button"}
                onClick={registerUser}
                disabled={disableButton}
              >
                Create account
              </Button>
            </Grid>
          </>
        }
         {authUser.loading && <div className="loading-signup"><div className="lds-facebook"><div></div><div></div><div></div></div><p>We are creating your account...</p> </div>}
      </Grid>
    </>
  );
};
