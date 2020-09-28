import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Grid } from "@material-ui/core";
import "./style.scss";
import { RegisterForm } from "../../components/registerForm";
import { StartPageSecond } from "../startPageSecond";
import { Navbar } from "../../components/navbar";
import authorizationService from "../../services/authService";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../../store/actions/rootActions";
import { Footer } from "../../components/footer";


export const StartPage = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [userName, setUserName] = useState(null);
  
  useEffect(() => {
    if (authorizationService.isAuthenticated()) {
      dispatch(actions.getPublicUser());
    }
  }, []);

  useEffect(() => {
    if (user.userData) {
      setUserName(user.userData.username);
    }
  }, [user]);


  return (
    <>
   

      <Helmet>
        <link rel="canonical" href="https://www.sharemysocials.com/" />
        <title>All your socials at one place | ShareMySocials</title>

        <meta
          name="description"
          content="Gather all your socials at one place. Get your unique QR code and link to share all of that for free! Sign up now to grow your audience!"
        />
        <meta
          name="keywords"
          content="social,soacil media, socials, platform, gather, qrcode, free, instagram,facebook,tiktok,snapchat,one place"
        />
      </Helmet>
      <div className="banner">
        <Navbar />
        <Grid container className="startpage-container">
          <Grid item md={6}>
            {authorizationService.isAuthenticated() ? (
              <div className="text-wrap">
                <h2>Start sharing your link to grow your audience!</h2>
                <p>
                  If needed you can buy high quality stickers in your settings
                  view.
                </p>
                <p>
                  The sticker includes your QR code and a small text that you
                  choose.
                </p>
                <p>Grow followers on all your platforms now!</p>
              </div>
            ) : (
              <div className="text-wrap">
                <h2>Tired of linking to different social accounts?</h2>
                <p>
                  Register now and gather all your socials at one place{" "}
                  <b>FOR FREE!</b>
                </p>
                <p>One QR-Code or link for all your socials.</p>
                <p>Grow followers on all platforms instead of one!</p>
                <p><i>Check out our simple profile <a className="a-tag-example" target="_blank" href="https://www.sharemysocials.com/sharemysocials">ShareMySocials Profile</a></i></p>
              </div>
            )}
          </Grid>
          <Grid container item md={5} justify="center" alignItems="center">
            {authorizationService.isAuthenticated() ? (
              <div className="pulic-url-wrap">
                {" "}
                <p>Your public url is:</p>
                {userName && (
                  <a href={`https://www.sharemysocials.com/${userName}`}>
                    sharemysocials.com/{userName}
                  </a>
                )}
              </div>
            ) : (
              <RegisterForm />
            )}
          </Grid>
        </Grid>
        <div className="icon-scroll"></div>
      </div>

      <div>
        <h2 className="second-title">What's <img className="textlogo" src="/images/text-logo2.png" /></h2>

        <Grid container justify="space-evenly" className="second-page">
          <StartPageSecond />
        </Grid>
      </div>
      <Footer />
    </>
  );
};
