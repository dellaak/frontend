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

export const AddNewSocial = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [selectedSocial, setSelectedSocial] = useState(null);
  const [socialList, setSocialList] = useState(null);
  const [userVal, setUserVal] = useState("");
  const userData = useSelector((state) => state.user);

  useEffect(() => {
   let uD = userData.userData
    if (uD.socialsList.length === 0) {
      setSocialList(socials.socials);
    } else {
     
      const x = uD.socialsList.map((i) => {
        return i.title;
      });
      const y = socials.socials.filter((social) => !x.includes(social.title));
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
    let social = selectedSocial
    dispatch(actions.createSocialItem(userVal, selectedSocial));
    dispatch(actions.getPublicUser())
    handleClose();
  };

//   const isUrl = (s)=> {
//     var regexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/
//   if(!regexp.test(s)){
//     return true
//   }
//  }

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
                  onChange={(e) => {
                    setUserVal(e.target.value);
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
                  onChange={(e) => {
                    setUserVal(e.target.value);
                  }}
                  label={selectedSocial && selectedSocial.title + " " + "url"}
                  type="text"
                  className="social-field"
                />
              )}
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Cancel
              </Button>
              <Button onClick={addSocial} color="primary" disabled={userVal.length<2}>
                Add social
              </Button>
            </DialogActions>
          </Dialog>
        )}
      </Grid>
    </>
  );
};
