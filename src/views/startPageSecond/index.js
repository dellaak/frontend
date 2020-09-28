import React from "react";
import Grid from "@material-ui/core/Grid";
import "./style.scss";

export const StartPageSecond = () => {
  const InfoCards = [
    {
      number: 1,
      title: "Create an account ",
      text: "Register your account for FREE and activate it with the activation link sent to your email",
    },
    {
      number: 2,
      title: "Add all your socials and highlights ",
      text: "Add all of your active social accounts on your profile page. Add a highlight if needed ",
    },
    {
      number: 3,
      title: "Share your profile link or QR code",
      text:
        "Share one link instead of multiple. Let people scan your QR-code or share your profile link",
    },
    {
      number: 4,
      title: "Make it easy for your followers",
      text:
        "All of your socials accounts are now gathered in one place, Grow your followers on all platforms",
    },
  ];



  return (
    <>
    <Grid item md={9} className="start-text-sp">
          <p> ShareMySocials is a platform where we make it easy for you to collect all your social media accounts at one place. Instead of sharing multiple links, you only need one link to share! The service we provide is <b> 100% FREE</b> without any bulls#!t.</p> 
        <p>We offer stickers for the person or company that needs it. The stickers have your QR-code on it, ready to be scanned and redirects to your profile! The stickers can be placed at tables, cars, mugs or wherever you want! You can find the shop in Profile - Settings - Store</p>
        </Grid>


        <Grid item md={10} className="grid-wrap">
          <Grid item md={12}>
          <p className="start-txt">How it works </p>
          </Grid>
        
        <Grid container >
 {InfoCards.map((i) => {
        return (
          
          <Grid item key={i.number} md={3} xs={12} className="card-holder-grid" >
            
            <div className="card-holder" >
            <span className="numberdiv">0{i.number}</span>
              <h3>{i.title}</h3>
              <p className="card-text">{i.text}</p>
            </div>
          
          </Grid>
   
        );
      })}
      </Grid>
      </Grid>
     
      <Grid container item md={12} className="second-first">

        <Grid item md={6} className="text-second">
          <h3>Gather all your social accounts at one place!</h3>
        <p>Why do you keep linking to different social medias with different links?</p>
        <p>By gather all your social accounts at one place makes it easier for the user to follow you on the platform they like.</p>
        <p>Start using our service now and grow your followers on all platforms instead of one! </p>
        </Grid>
        <Grid item md={6} className="img-second">
          <img src="/images/secondimg2.png" alt="sharesocial-example" className="img-wrap"/>
        </Grid>
      </Grid>

      <Grid container item md={12} className="second">
        <Grid item md={6} className="img-second">
          <img src="/images/hsex.jpg" className="high-start" alt="highlight-ex"></img>
        </Grid>
        <Grid item md={6} className="text-second">
          <h3>Add highlights</h3>
          <p>
           Want to share when you're going live or maybe a website?
          </p>
          <p>
           Highlights are easy to add and letting your followers be up to date about your latest posts or news regarding you.
          </p>
        </Grid>
        </Grid>

      <Grid container item md={12} className="second">
      
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
        <Grid item md={6} className="img-second">
          <img src="/images/qrcode.png" className="qr-start" alt="sharemysocials-qrcode"></img>
        </Grid>
      </Grid>

    </>
  );
};
