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
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../store/actions/rootActions";
import "./style.scss";
import { FormControlLabel, Checkbox, InputAdornment } from "@material-ui/core";

export const AddNewHighlight = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [selectedSocial, setSelectedSocial] = useState(null);
  const [socialList, setSocialList] = useState(null);
  const [userUrl, setUserUrl] = useState("");
  const userData = useSelector((state) => state.user);
  const [userText, setUserText] = useState("");
  const [checkedUrl, setCheckedUrl] = useState(false);
  const [noOptionSelected,setNoOptionSelected] = useState(true)
  //errors
  const [userUrlErr, setUserUrlErr] = useState(false);


  const resetForm = () => {
    setUserUrl("");
    setSelectedSocial(null);
    setUserText("");
    setUserUrlErr(false);
    setCheckedUrl(false);
  };

  useEffect(() => {
    setSocialList(socials.socials);
    let uD = userData.userData;

    if (uD.socialsList.length === 0) {
      setSocialList([]);
    } else {
      let y = uD.socialsList.sort(function (a, b) {
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


  useEffect(() => {
    if(selectedSocial || checkedUrl){
      setNoOptionSelected(false)
    }else{
      setNoOptionSelected(true)
    }
  }, [checkedUrl,selectedSocial])

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedSocial(null);
    resetForm();
  };

  const addHighLight = (url) => {
    let dateObj = new Date();
    let month = dateObj.getUTCMonth() + 1; //months from 1-12
    let day = dateObj.getUTCDate();
    let year = dateObj.getUTCFullYear();
    let newdate = year + "/" + month + "/" + day;

    const data = {
      text: userText,
      social: selectedSocial ? selectedSocial : null,
      url: url ? url : null,
      date: newdate,
    };
    dispatch(actions.createHighlightItem(data));
    dispatch(actions.getPublicUser());
    handleClose();
    resetForm();
  };

  const handleUserText = (val) => {
    if (val.length < 100) {
      setUserText(val);
    }
  };

  const handleUrlCheck = (val) => {
    val = val.replace(/(^\w+:|^)\/\//, "");
    setUserUrl(val);
  };

  const handleSave = () => {
    let url = "https://" + userUrl;

    if (is_url(url) && checkedUrl) {
      addHighLight(url);
      setUserUrlErr(false);
    } else if (!is_url(url) && checkedUrl) {
      setUserUrlErr(true);
    } else if (!checkedUrl && userText.length > 3) {
      addHighLight();
    }
  };

  const is_url = (str) => {
    let regexp = /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
    if (regexp.test(str)) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <>
      <Grid item md={12} xs={12} className="add-grid-highlight">
        <div className="add-highlight">
          <Button color="primary" onClick={handleClickOpen}>
            <AddCircleIcon className="add-icon-highlight" />
            <p>Add new highlight</p>
          </Button>
        </div>

        {socialList && (
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="form-dialog-title"
            className="add-social-dialog"
          >
            <DialogTitle id="form-dialog-title">Add new highlight </DialogTitle>
            <DialogContent>
              <DialogContentText>
                Add a new highlight. Choose from existing social accounts or add
                a new link!
              </DialogContentText>
              <div className="dialog-select">
                {!checkedUrl ? (
                  <Autocomplete
                    className="autocomplete"
                    options={socialList}
                    noOptionsText={'No active social accounts'}
                    getOptionLabel={(option) => option.title}
                    getOptionSelected={(option, value) =>
                      value.title === option.title
                    }
                    onChange={(_v, e) => {
                      setSelectedSocial(e);
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
                    
                      <TextField
                        {...params}
                        label="Choose one of your socials"
                      />
                  
                    )}
                  />
                ) : (
                  ""
                )}
                {!selectedSocial && !checkedUrl && <p>OR</p>}
                {!selectedSocial ? (
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={checkedUrl}
                        onChange={() => {
                          setCheckedUrl(!checkedUrl);
                        }}
                        name="checkedB"
                        color="primary"
                      />
                    }
                    label="Add new link"
                  />
                ) : (
                  ""
                )}
              </div>
              {checkedUrl && (
                <TextField
                  autoFocus
                  fullWidth
                  margin="dense"
                  value={userUrl}
                  error={userUrlErr}
                  helperText={userUrlErr && "Must be an url"}
                  onChange={(e) => {
                    handleUrlCheck(e.target.value);
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <small>https://</small>
                      </InputAdornment>
                    ),
                  }}
                  label={"What link to share?"}
                  type="text"
                  className="social-field-url"
                />
              )}
                    <span className="counter-u-txt">{userText.length}/100</span>
              <TextField
                fullWidth
                multiline
                rows={2}
                autoFocus
                margin="dense"
                value={userText}
                helperText={"Min 3 characters"}
                onChange={(e) => {
                  handleUserText(e.target.value);
                }}
                label="What's new?"
                type="text"
                className="social-field"
                variant="outlined"
              />
           
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Cancel
              </Button>
              <Button
                onClick={handleSave}
                color="primary"
                disabled={userText.length<=2 ||  noOptionSelected}
              >
                Add highlight
              </Button>
            </DialogActions>
          </Dialog>
        )}
      </Grid>
    </>
  );
};
