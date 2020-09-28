import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Grid } from "@material-ui/core";
import "./style.scss";
import { Navbar } from "../../components/navbar";
import authorizationService from "../../services/authService";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../../store/actions/rootActions";
import { Footer } from "../../components/footer";
import { FeedHighlight } from "../../components/feed/feedHighlight";
import { VariableSizeList } from 'react-window';

export const FeedPage = () => {
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

  const k= ['1','2','3','4','5']



  const MyComp = ({ item, style }) => {
    style = {
      ...style,
      borderBottom: "1px solid #fbb542",
      display: "flex",
      alignItems: "center",
      color: "white",
      fontFamily: "Baloo Tamma 2, cursive",
      fontSize: "1rem",
      flex: 1,
    };

      return (
        <div style={style}>
        <p>Swag</p>
        </div>)

  };

  const Row = ({ data, index, style }) => {
    console.log(data)

    return <MyComp  style={style} />;
  };

  const getItemSize = index => {
    // return a size for items[index]
    return 175
  }

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
      <div >
        <Navbar />
        <Grid container className="feed-wrapper">
      <Grid item md={6} className="feed-list">
      <VariableSizeList
      className="window-list"
    height={500}
    width={600}
    itemCount={400}
    itemSize={getItemSize}
  >
    {Row}
  </VariableSizeList>
      </Grid>
        </Grid>
      </div>
      <Footer />
    </>
  );
};
