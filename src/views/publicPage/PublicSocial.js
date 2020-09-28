import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import "./style.scss";
import { Button } from "@material-ui/core";

export const PublicSocial = ({ social,id,index, username}) => {
  const [notExtern, setNotExtern] = useState(false);
  const [openShow, setOpenShow] = useState(false);
  

  useEffect(() => {
    if (social.phone || social.socialid) {
      setNotExtern(true);
    }
  }, [social]);

  const handleShowClose = ( )=>{
    setOpenShow(false)
  }

  return (
    <>
      <Grid item md={2} xs={6} className={"social-wrapper"}>
        <small>{social.title}</small>

        {notExtern && (
          <img
            className="social-icon"
            src={social.icon}
            alt="logo"
            onClick={() => {
              setOpenShow(true);
            }}
          />
        )}

        {!notExtern && (
          <a className="social-link" href={social.link ? social.link : ''} target="_blank">
            <img
              className="social-icon-link"
              src={social.icon}
              alt={social.title + "logo"}
            />
          </a>
        )}

        
        
      </Grid>
     {!social.url && <Dialog
          open={openShow}
          onClose={handleShowClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
          {social && social.title}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
             Add {username} on {social && social.title} : <b>{social.phone ? social.phone :social.socialid}</b> 
            </DialogContentText>
          </DialogContent>
          <DialogActions>

            <Button onClick={handleShowClose} color="primary">
              Cancel
            </Button>
          </DialogActions>
        </Dialog>}
    </>
  );
};
