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
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import "./style.scss";
import { TermsPage } from "../../views/terms";

export const RegisterForm = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [legalname, setLegalName] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [userErr, setUserErr] = useState(false);
  const [emailErr, setEmailErr] = useState(false);
  const [passwordErr, setPasswordErr] = useState(false);
  const [legalErr, setLegalErr] = useState(false);
  const [rePasswordErr, setRePasswordErr] = useState(false);
  const [disableButton, setDisableButton] = useState(true);
  const [disableCompanyButton, setDisableCompanyButton] = useState(true);
  const [userType, setUserType] = useState("personal");
  const [takenName, setTakenName] = useState(false);
  const [takenEmail, setTakenEmail] = useState(false);
  const [takenLegal, setTakenLegal] = useState(false);
  const [failed, setFailed] = useState(false);
  const [honeySpot, setHoneySpot] = useState("");
  const authUser = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [openTerms, setOpenTerms] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);

  const handleChange = (event) => {
    setUserType(event.target.value);
    resetForm();
  };

  const resetForm = () => {
    setEmail("");
    setUserName("");
    setPassword("");
    setLegalName("");
    setRePassword("");
    setUserErr(false);
    setPasswordErr(false);
    setRePasswordErr(false);
    setEmailErr(false);
    setTakenName(false);
    setTakenLegal(false);
    setTakenEmail(false);
    setLegalErr(false);
    setAcceptTerms(false);
  };

  useEffect(() => {
    if (
      userName &&
      !userErr &&
      email &&
      !emailErr &&
      password &&
      !passwordErr &&
      rePassword === password &&
      acceptTerms === true &&
      !honeySpot
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
    acceptTerms,
    honeySpot,
  ]);

  useEffect(() => {
    if (
      userName &&
      !userErr &&
      email &&
      legalname &&
      !legalErr &&
      !emailErr &&
      password &&
      !passwordErr &&
      rePassword === password &&
      acceptTerms === true &&
      !honeySpot
    ) {
      setDisableCompanyButton(false);
    } else {
      setDisableCompanyButton(true);
    }
  }, [
    userName,
    userErr,
    email,
    legalname,
    legalErr,
    emailErr,
    passwordErr,
    rePasswordErr,
    password,
    rePassword,
    acceptTerms,
    honeySpot,
  ]);

  const validateUserName = (val) => {
    val.trim();

    if (val.length < 3) {
      setUserErr(true);
    } else {
      setUserErr(false);
    }
    setTakenName(false);
    setUserName(val.toLowerCase().replace(/\s+/g, ""));
  };

  const validateLegalName = (val) => {
    val.trim();

    if (val.length < 3) {
      setLegalErr(true);
    } else {
      setLegalErr(false);
    }
    setTakenName(false);
    setLegalName(val.toLowerCase().replace(/\s+/g, ""));
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
    };

    dispatch(actions.createUser(data));
  };

  const registerCompany = () => {
    setTakenName(false);
    setTakenEmail(false);
    const data = {
      username: userName,
      email: email,
      password: password,
      legalname: legalname,
    };

    dispatch(actions.createCompany(data));
  };

  useEffect(() => {
    if (authUser.error) {
      if (authUser.error.message) {
        if (authUser.error.message.includes("Email")) {
          resetForm();
          setTakenEmail(true);
        } else if (authUser.error.message.includes("Username")) {
          resetForm();
          setTakenName(true);
        } else if (authUser.error.message.includes("Company")) {
          resetForm();
          setTakenLegal(true);
        } else {
          setTakenLegal(false);
          setTakenEmail(false);
          setTakenName(false);
        }
      } else {
        setFailed(true);
      }
    }
  }, [authUser]);

  const handleClose = () => {
    setOpenTerms(false);
  };

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

        {failed && (
          <div className="success-wrap">
            <p>Your account is created!</p>
            <p>
              BUT we failed to send activation email to <b>{email}</b>
            </p>
            <p>
              {" "}
              Please contact support for activation:{" "}
              <b>info@sharemysocials.com</b>
            </p>
          </div>
        )}

        {!authUser.userCreated && !authUser.loading && !failed && (
          <>
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
                Notice: In some cases verification of the company will be
                necessary. We'll contact you if needed.
              </p>
            )}
            {/* COMPANY */}
            {userType === "company" && (
              <Grid item md={11} xs={10}>
                <TextField
                  className="text-field"
                  label="Company username"
                  variant="outlined"
                  required
                  value={userName}
                  error={userErr || takenName}
                  helperText={
                    !takenName ? "Minimum 3 characters" : "Username exists"
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
                  required
                  value={legalname}
                  error={legalErr || takenLegal}
                  helperText={!takenLegal ? "" : "Company exists..?"}
                  onChange={(e) => {
                    validateLegalName(e.target.value);
                  }}
                />
              </Grid>
            )}
            {userType === "company" && (
              <Grid item md={5} xs={10}>
                <TextField
                  className="text-field"
                  label="Company email"
                  variant="outlined"
                  required
                  error={emailErr || takenEmail}
                  helperText={
                    !takenEmail
                      ? "We'll send an activation link to this email"
                      : "Email exists"
                  }
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
                  required
                  value={userName}
                  error={userErr || takenName}
                  helperText={
                    !takenName ? "Minimum 3 characters" : "Username exists"
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
                  required
                  variant="outlined"
                  error={emailErr || takenEmail}
                  helperText={
                    !takenEmail
                      ? "We'll send an activation link to this email"
                      : "Email exists"
                  }
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
                required
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
                required
                variant="outlined"
                onChange={(e) => {
                  validateRePassword(e.target.value);
                }}
                error={rePasswordErr}
                helperText={rePasswordErr && "No match on password"}
              />
            </Grid>
            <Grid container item md={12} justify="flex-end" alignItems="center">
              <div id="honeypotsome-div">
                If you see this, leave this form field blank
                <input
                  type="text"
                  name="body"
                  value={honeySpot}
                  onChange={(e) => {
                    setHoneySpot(e.target.value);
                  }}
                />
              </div>
              <CheckBox
                checked={acceptTerms}
                onClick={() => {
                  setAcceptTerms(!acceptTerms);
                }}
              />
              <small>
                {" "}
                I accept the{" "}
                <span
                  className="terms-link"
                  onClick={() => {
                    setOpenTerms(true);
                  }}
                >
                  Terms and Conditions
                </span>
              </small>
            </Grid>
            <Grid item md={12} className="button-wrap">
              {userType === "personal" && (
                <Button
                  className={disableButton ? "diasble-button" : "create-button"}
                  onClick={registerUser}
                  disabled={disableButton}
                >
                  Create account
                </Button>
              )}
              {userType === "company" && (
                <Button
                  className={
                    disableCompanyButton ? "diasble-button" : "create-button"
                  }
                  onClick={registerCompany}
                  disabled={disableCompanyButton}
                >
                  Create account
                </Button>
              )}
            </Grid>
          </>
        )}
        {authUser.loading && (
          <div className="loading-signup">
            <div className="lds-facebook">
              <div></div>
              <div></div>
              <div></div>
            </div>
            <p>We are creating your account...</p>{" "}
          </div>
        )}
      </Grid>

      <Dialog
        open={openTerms}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Terms and Conditions"}
        </DialogTitle>
        <DialogContent>
          <TermsPage />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
