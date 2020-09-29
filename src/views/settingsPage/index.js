import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import TextField from "@material-ui/core/TextField";
import StoreIcon from "@material-ui/icons/Store";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Navbar } from "../../components/navbar";
import { Button } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../../store/actions/rootActions";
import "./style.scss";
import authorizationService, {
  SESSION_TOKEN_KEY,
  SESSION_TOKEN_EXPIRATION_DATE_KEY,
} from "../../services/authService";
import { Redirect } from "react-router";
import { Store } from "./Store";
import { Footer } from "../../components/footer";

export const SettingsPage = () => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user);
  const [activeTab, setActiveTab] = useState(0);
  const [activeSecondTab, setActiveSecondTab] = useState(0);
  const [userName, setUserName] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordError, setNewPasswordError] = useState("");
  const [retypePassword, setRetypePassword] = useState("");
  const [openConfirm, setOpenConfirm] = useState(false);
  const [openConfirmPassword, setOpenConfirmPassword] = useState(false);
  const [openConfirmDelete, setOpenConfirmDelete] = useState(false);
  const [exist, setExist] = useState(false);

  const handleChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleSecondChange = (event, newValue) => {
    setActiveSecondTab(newValue);
  };

  const validateUserName = (val) => {
    setUserName(val);
  };

  const updateUserName = () => {
    const data = {
      newusername: userName,
    };

    dispatch(actions.updateUsername(data));
  };

  useEffect(() => {
    if (userData.error) {
      setExist(true);
    } else {
      setExist(false);
    }

    if (userData.username && userData.username.status === 200) {
      setOpenConfirm(true);
      setTimeout(() => {
        sessionStorage.removeItem(SESSION_TOKEN_EXPIRATION_DATE_KEY);
        sessionStorage.removeItem(SESSION_TOKEN_KEY);
        window.location.href = "/login";
      }, 3000);
    }
  }, [userData, userData.userName && userData.userName.status]);

  const handleNewPassword = (val) => {
    val.trim();

    let regexp = /\d/;
    if (!regexp.test(val) || val.length < 6) {
      setNewPasswordError(true);
    } else {
      setNewPasswordError(false);
    }

    setNewPassword(val);
  };


  const handleDeleteAcc = () => {


    dispatch(actions.deleteUser());

    setTimeout(() => {
      sessionStorage.removeItem(SESSION_TOKEN_EXPIRATION_DATE_KEY);
      sessionStorage.removeItem(SESSION_TOKEN_KEY);
      window.location.href = "/";
    }, 1000);
  };

  const handlePasswordSave = () => {
    const data = {
      newpassword: newPassword,
    };

    dispatch(actions.updatePassword(data));
   
  };

  const handlePasswordClose = () => {
    setOpenConfirmPassword(false);
  };

  useEffect(() => {
    if (userData.passwordUpdated === 200) {
      setOpenConfirmPassword(true);
      setNewPassword("");
      setRetypePassword("");
    }
  }, [userData, userData.passwordUpdated]);

  return authorizationService.isAuthenticated() ? (
    <>
      <Navbar />
      <Grid item md={12}>
        <Tabs
          value={activeTab}
          onChange={handleChange}
          variant="fullWidth"
          indicatorColor="primary"
          textColor="secondary"
          aria-label="icon label tabs example"
          className="sidebar"
        >
          <Tab icon={<AccountCircleIcon />} label="ACCOUNT" />
          <Tab icon={<StoreIcon />} label="STICKERS" />
        </Tabs>
      </Grid>

      <Grid
        container
        item
        md={12}
        justify="center"
        className="settings-container"
      >
        {activeTab === 0 && (
          <Grid
            container
            justify="center"
            direction="column"
            alignItems="center"
          >
            <Grid item md={10}>
              <h3 className="account-title">Account settings</h3>
            </Grid>
            <Grid item md={6}>
              <Tabs
                value={activeSecondTab}
                onChange={handleSecondChange}
                variant="fullWidth"
                indicatorColor="primary"
                textColor="secondary"
                aria-label="icon label tabs example"
                className="sidebar-second"
              >
                <Tab label="Username" />
                <Tab label="Password" />
                <Tab label="Delete Account" />
                {/* <Tab  label="Verified" /> */}
              </Tabs>
            </Grid>

            <Grid container item justify="space-around">
              {activeSecondTab === 0 && (
                <Grid item md={6} xs={10} className="username-wrap-settings">
                  <p className="change-text">Change your username</p>
                  <Grid item md={10}>
                    <TextField
                      className="text-field-settings"
                      label="Change username"
                      variant="outlined"
                      error={exist}
                      helperText={
                        exist ? "Username taken" : "Min 3 characters and max 30"
                      }
                      value={userName}
                      inputProps={{ maxLength: 25 }}
                      onChange={(e) => {
                        validateUserName(e.target.value);
                      }}
                    />
                    <Button
                      className={
                        userName.length < 3
                          ? "userName-disabled-btn"
                          : "save-button-account"
                      }
                      onClick={updateUserName}
                      disabled={userName.length < 3 && true}
                    >
                      Save username
                    </Button>
                  </Grid>
                </Grid>
              )}

              {activeSecondTab === 1 && (
                <Grid item md={6} xs={10} className="username-wrap-settings">
                  <p className="change-text">Change your password</p>
                  <Grid item md={10} className="text-field-wrap">
                    <TextField
                      className="text-field-settings"
                      label="Your new password"
                      variant="outlined"
                      type="password"
                      value={newPassword}
                      error={newPasswordError ? true : false}
                      helperText={
                        newPasswordError && "Minimum 6 characters and 1 number"
                      }
                      onChange={(e) => {
                        handleNewPassword(e.target.value);
                      }}
                    />
                  </Grid>

                  <Grid item md={10} className="text-field-wrap">
                    <TextField
                      className="text-field-settings"
                      label="Retype password"
                      type="password"
                      variant="outlined"
                      value={retypePassword}
                      error={retypePassword !== newPassword ? true : false}
                      helperText={
                        retypePassword.length > 2 &&
                        retypePassword !== newPassword &&
                        "Password is not equal"
                      }
                      onChange={(e) => {
                        setRetypePassword(e.target.value);
                      }}
                    />
                  </Grid>
                  <Button
                    onClick={handlePasswordSave}
                    className={
                      newPasswordError ||
                      retypePassword !== newPassword ||
                      newPassword.length === 0
                        ? "userName-disabled-btn"
                        : "save-button-account"
                    }
                    disabled={
                      newPasswordError ||
                      retypePassword !== newPassword ||
                      (newPassword.length < 6 && retypePassword.length < 6)
                    }
                  >
                    Save password
                  </Button>
                </Grid>
              )}
            </Grid>
          </Grid>
        )}

        {activeSecondTab === 2 && (
          <Grid item md={6} xs={10} className="delete-wrap-settings">
            <p className="change-text">
              Click on the button to delete your account
            </p>
            <small>
              You can <b>not</b> regret this action!
            </small>
            <Grid item md={10}>
              <Button
                className="delete-button-account"
                onClick={()=>{setOpenConfirmDelete(true)}}
              >
                Delete my account
              </Button>
            </Grid>
          </Grid>
        )}

        {activeTab === 1 && <Store />}
      </Grid>

      <Dialog
        open={openConfirm}
        aria-labelledby="form-dialog-title"
        className="add-social-dialog"
      >
        <DialogTitle id="form-dialog-title">Username changed</DialogTitle>
        <DialogContent>
          <div className="success-wrap">
            <div className="success-checkmark">
              <div className="check-icon">
                <span className="icon-line line-tip"></span>
                <span className="icon-line line-long"></span>
                <div className="icon-circle"></div>
                <div className="icon-fix"></div>
              </div>
            </div>
            <div>
              <p className="first-dialog-p">
                Username changed to <b>{userName}</b>!{" "}
              </p>
              <p className="second-dialog-p">
                Please login with your new username!
              </p>
              <p className="third-dialog-p">
                If you're not redirected within 5 seconds.{" "}
              </p>
              <p className="fourth-dialog-p">
                Please <a href="/login">click here to login</a>
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog
        open={openConfirmPassword}
        aria-labelledby="form-dialog-title"
        className="add-social-dialog"
      >
        <DialogTitle id="form-dialog-title">Password changed</DialogTitle>
        <DialogContent>
          <div className="success-wrap">
            <div className="success-checkmark">
              <div className="check-icon">
                <span className="icon-line line-tip"></span>
                <span className="icon-line line-long"></span>
                <div className="icon-circle"></div>
                <div className="icon-fix"></div>
              </div>
            </div>
            <div>
              <p className="first-dialog-p">
                <b>Your password is now changed :)</b>{" "}
              </p>
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handlePasswordClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={openConfirmDelete}
        aria-labelledby="form-dialog-title"
        className="add-social-dialog"
      >
        <DialogTitle id="form-dialog-title">Delete account</DialogTitle>
        <DialogContent>
          <p className="first-dialog-p">
            <b>Are you sure you want to delete your account permanent?</b>{" "}
          </p>
          <small className="small-delete">
            You<b> CAN NOT</b> regret this option.
          </small>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={()=>{setOpenConfirmDelete(false)}} color="primary">
            Abort
          </Button>
          <Button className="delete-confirm-btn" autoFocus onClick={handleDeleteAcc} color="primary">
            Delete Account
          </Button>
        </DialogActions>
      </Dialog>
    </>
  ) : (
    <Redirect to="/login" />
  );
};
