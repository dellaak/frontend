import React, { useState, useEffect } from "react";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Autocomplete from "@material-ui/lab/Autocomplete";
import socials from "../../views/profilePage/socialsJSON";
import InputAdornment from "@material-ui/core/InputAdornment";
import PhoneIcon from "@material-ui/icons/Phone";
import PersonIcon from "@material-ui/icons/Person";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../store/actions/rootActions";
import "./style.scss";

export const AddNewSocial = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [selectedSocial, setSelectedSocial] = useState(null);
  const [socialList, setSocialList] = useState(null);
  const [savingUrl, setSavingUrl] = useState("");
  const [userVal, setUserVal] = useState("");
  const userData = useSelector((state) => state.user);

  //errors
  const [userErr, setUserErr] = useState(false);
  const [phoneErr, setPhoneErr] = useState(false);
  const [urlErr, setUrlErr] = useState(false);

  useEffect(() => {
    let uD = userData.userData;
    if (uD.socialsList.length === 0) {
      setSocialList(socials.socials);
    } else {
      const x = uD.socialsList.map((i) => {
        return i.title;
      });
      let y = socials.socials.filter((social) => !x.includes(social.title));

      y = y.sort(function (a, b) {
        if (a.title < b.title) {
          return -1;
        }
        if (a.title > b.title) {
          return 1;
        }
        return 0;
      });
      setSocialList(y);
    }

  }, [userData]);



  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setUserVal("");
    setSelectedSocial(null);
  };

  const addSocial = () => {
    if (selectedSocial.title === "TikTok") {
      if (userVal.charAt(0) === "@") {
        let tiktok = userVal.replace(/^@+/i, "");
        dispatch(
          actions.createSocialItem(tiktok, selectedSocial, "username")
        );
        setUrlErr(false);
        dispatch(actions.getPublicUser());
        return  handleClose();
      }
   
    }

    if (selectedSocial.url) {
      if (is_url(savingUrl)) {
        dispatch(actions.createSocialItem(savingUrl, selectedSocial, "url"));
      } else {
        return setUrlErr(true);
      }
    } else if (selectedSocial.userName) {
      dispatch(actions.createSocialItem(userVal, selectedSocial, "username"));
    } else if (selectedSocial.phone) {
      dispatch(actions.createSocialItem(userVal, selectedSocial, "phone"));
    } else if (selectedSocial.socialid) {
      dispatch(actions.createSocialItem(userVal, selectedSocial, "socialid"));
    }
    setUrlErr(false);
    dispatch(actions.getPublicUser());
    handleClose();
  };

  const handleUrl = (val) => {
    val = val.replace(/(^\w+:|^)\/\//, "");
    setUserVal(val);
    setSavingUrl("https://" + val);
  };

  const is_url = (str) => {
    let regexp = /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
    if (regexp.test(str)) {
      return true;
    } else {
      return false;
    }
  };

  const handlePhone = (val) => {
    let reg = /^[0-9,+-]*$/gm;
    if (val.match(reg)) {
      setUserVal(val);
      setPhoneErr(false);
    } else {
      setPhoneErr(true);
    }
  };

  const handleUsername = (val) => {
    var urlRegex = /(https?:\/\/[^\s]+)/g;
    if (!urlRegex.test(val)) {
      val.trim();
      setUserVal(val.replace(/\s/g, ""));
      setUserErr(false);
    } else {
      setUserErr(true);
    }
  };

  return (
    <>
      <Grid item md={12} xs={12} className="add-grid">
        <div className="add-wrapper">
          <Button color="primary" onClick={handleClickOpen}>
            <AddCircleIcon className="add-icon" />
            <p>Add new social</p>
          </Button>
        </div>

        {socialList && (
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="form-dialog-title"
            className="add-social-dialog"
          >
            <DialogTitle id="form-dialog-title">Add new social</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Add new social account easy. Select social then type in what the
                field says.
              </DialogContentText>
              <Autocomplete
                className="autocomplete"
                options={socialList}
                getOptionLabel={(option) => option.title}
                getOptionSelected={(option, value) =>
                  value.title === option.title
                }
                onChange={(_v, e) => {
                  setSelectedSocial(e);
                  setUserVal("");
                }}
                value={selectedSocial}
                style={{ width: 300 }}
                renderOption={(option) => (
                  <div className="autocomplete-row">
                    <p>{option.title}</p>
                    <img
                      className="auto-icon"
                      alt={selectedSocial && selectedSocial.title + "logo"}
                      src={option.icon}
                    />
                  </div>
                )}
                renderInput={(params) => (
                  <TextField {...params} label="Choose social" />
                )}
              />

              {selectedSocial && selectedSocial.userName && (
                <TextField
                  autoFocus
                  margin="dense"
                  value={userVal}
                  error={userErr}
                  helperText={userErr && "Cannot be an url"}
                  onChange={(e) => {
                    handleUsername(e.target.value);
                  }}
                  label={
                    selectedSocial && selectedSocial.title + " " + "username"
                  }
                  type="text"
                  className="social-field"
                />
              )}

              {selectedSocial && selectedSocial.url && (
                <TextField
                  autoFocus
                  margin="dense"
                  value={userVal}
                  error={urlErr}
                  helperText={urlErr && "Must be an url"}
                  onChange={(e) => {
                    handleUrl(e.target.value);
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <small>https://</small>
                      </InputAdornment>
                    ),
                  }}
                  label={selectedSocial && selectedSocial.title + " " + "url"}
                  type="text"
                  className="social-field-url"
                />
              )}

              {selectedSocial && selectedSocial.phone && (
                <TextField
                  autoFocus
                  margin="dense"
                  value={userVal}
                  error={phoneErr}
                  helperText={phoneErr && "Only valid phonenumber"}
                  onChange={(e) => {
                    handlePhone(e.target.value);
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PhoneIcon />
                      </InputAdornment>
                    ),
                  }}
                  label={"Your phone number"}
                  type="text"
                  className="social-field"
                />
              )}

              {selectedSocial && selectedSocial.socialid && (
                <TextField
                  autoFocus
                  margin="dense"
                  value={userVal}
                  onChange={(e) => {
                    setUserVal(e.target.value);
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PersonIcon />
                      </InputAdornment>
                    ),
                  }}
                  label={selectedSocial && selectedSocial.title + " " + "id"}
                  type="text"
                  className="social-field"
                />
              )}
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Cancel
              </Button>
              <Button
                onClick={addSocial}
                color="primary"
                disabled={userVal.length < 2}
              >
                Add social
              </Button>
            </DialogActions>
          </Dialog>
        )}
      </Grid>
    </>
  );
};
