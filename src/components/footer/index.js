import React, { useState} from "react";
import Grid from "@material-ui/core/Grid";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import "./style.scss";
import { TermsPage } from "../../views/terms";
import { Button} from "@material-ui/core";
import { PrivacyPage } from "../../views/terms/policy";
import ReactGA from "react-ga";
import CookieConsent from "react-cookie-consent";
import { Link } from "react-router-dom";


export const Footer = () => {
  const [open, setOpen] = useState({ open: false, opt: 0 });
  const handleClose = () => {
    setOpen({ open: false, opt: 0 });
  };



  const acceptCookie = () => {
      ReactGA.initialize("UA-178433154-1");
      ReactGA.pageview(window.location.pathname + window.location.search);
     
    };

  return (
    <>
    
    <CookieConsent
        cookieName="GA"
        cookieName={'GA_USER'}
        onAccept={() => {
          return acceptCookie();
        }}
      >
        This website uses cookies to analyise traffic and ensure you get the
        best experience on our website. By using our website you agree to our
        use of cookies.{" "}
        <span style={{cursor:"pointer"}} onClick={() => setOpen({ open: true, opt: 1 })}>Read more</span>
      </CookieConsent>
      <Grid container item md={12} className="footer-wrap">
        <Grid item md={4} xs={12}  className="footer-div">
          <a href="https://www.sharemysocials.com/sharemysocials">
            <img src="/images/logofooter.png" />
          </a>
          
        </Grid>

        <Grid item md={4} xs={12}  className="footer-div">
        <a className="dl-link-fot" href="mailto:info@sharemysocials.com">info@sharemysocials.com</a>
        
          
        </Grid>
        <Grid item md={4} xs={12} className="footer-div">
        <Link className="dl-link-fot" to="/downloads" >Download Icons</Link>
          <p style={{cursor:"pointer"}} onClick={() => setOpen({ open: true, opt: 1 })}> Privacy policy</p>
          <p style={{cursor:"pointer"}} onClick={() => setOpen({ open: true, opt: 2 })}>
            {" "}
            Terms and conditions
          </p>
          
        </Grid>
      </Grid>

      <Dialog
        open={open.open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {open.opt === 1 && "Privacy policy"}
          {open.opt === 2 && "Terms and Conditions"}
        </DialogTitle>
        <DialogContent>
          {open.opt === 1 && <PrivacyPage />}
          {open.opt === 2 && <TermsPage />}
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
