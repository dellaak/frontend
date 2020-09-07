import React from "react";
import Grid from "@material-ui/core/Grid";
import "./style.scss";

export const StartPageSecond = () => {
  const InfoCards = [
    {
      number: 1,
      title: "Add all your socials ",
      text: "Add all of your active social accounts on your profile page",
    },
    {
      number: 2,
      title: "Share your profile link or QR code",
      text:
        "Share one link instead of multiple. Share your unique QR code for people to scan or link",
    },
    {
      number: 3,
      title: "Make it easy for your followers",
      text:
        "All of your socials accounts are now gathered in one place, Grow your followers on all platforms",
    },
  ];

  return (
    <>
      {InfoCards.map((i) => {
        return (
          <Grid item key={i.number} md={3}>
            <div className="card-holder">
              <p className="number">{i.number}</p>
              <h3>{i.title}</h3>
              <p className="card-text">{i.text}</p>
            </div>
          </Grid>
        );
      })}

      <Grid container item md={12} className="second">
        <Grid item md={6} className="text-second">
          <h3>Gather all your social accounts at one place!</h3>
        <p>Why do you keep linking to different social medias?</p>
        <p>Start using pur platform now and grow your followers on all platforms! </p>
        </Grid>
        <Grid item md={6} className="img-second">
          <img src="/images/bannerwhite.svg" className="img-wrap" />
          {/* <div className="img-wrap" /> */}
        </Grid>
      </Grid>

      <Grid container item md={12} className="second">
        <Grid item md={6} className="img-second">
          <img src="/images/qr.webp" className="qr-start"></img>
        </Grid>
        <Grid item md={6} className="text-second">
          <h3>Share your profile with link or QR code</h3>
          <p>
            Take out your mobile camera and just point the camera at the QR code
          </p>
          <p>
            All your socials in one place. It's that easy to grow your audience
            on all your social platforms!
          </p>
        </Grid>
      </Grid>

    </>
  );
};
