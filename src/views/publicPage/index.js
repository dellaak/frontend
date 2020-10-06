import React, { useState, useEffect } from "react";
import { TopProfile } from "../../components/topProfile";
import { Grid, Container, Button, Collapse } from "@material-ui/core/";
import "./style.scss";
import { useParams, Redirect } from "react-router-dom";
import { PublicSocial } from "./PublicSocial";
import EmailIcon from "@material-ui/icons/Email";
import PhoneIcon from "@material-ui/icons/Phone";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../../store/actions/rootActions";
import socialsJSON from "../profilePage/socialsJSON";
import { Helmet } from "react-helmet";
import { Highlights } from "../../components/highlights";
import { PublicHighlight } from "./PublicHighlight";
import {BackgroundDiv} from "./styledPublic"

export const PublicPage = () => {
  const dispatch = useDispatch();
  const [selectedUser, setSelectedUser] = useState(false);
  let { user } = useParams();
  const [socialList, setSocialList] = useState([]);
  const [showEmail, setShowEmail] = useState(false);
  const publicUser = useSelector((state) => state.public);
  const [noUser, setNoUser] = useState(false);
  const [showQr, setShowQr] = useState(false);
  const [selectedColor,setSelectedColor] = useState('')


  useEffect(() => {
    dispatch(actions.getSocialsPublic(user));
    dispatch(actions.getQrCode(user));
  }, []);

  useEffect(() => {
    setSelectedUser(publicUser.publicList);
    setSocialList(publicUser.publicList.socialsList);
    if(publicUser.publicList.selectedColor){
      setSelectedColor(publicUser.publicList.selectedColor);
    }
  }, [publicUser.publicList]);

  useEffect(() => {
    let uD = publicUser.publicList;

    setShowEmail(uD.showEmail);
  }, [publicUser.publicList && publicUser.publicList.phone]);

  const renderSocials = (social, index) => {
    if (!social) return;
    socialsJSON.socials.map((k) => {
      if (k.title === social.title) {
        social.icon = k.icon;
        social.link = social.url ? social.url : k.link + social.username;
      }
    });
    return (
      <PublicSocial social={social} index={index} key={index} username={publicUser.publicList.username}></PublicSocial>
    );
  };

  useEffect(() => {
    if (publicUser.error ) {
      setNoUser(true);
    }
  }, [publicUser]);

  return (
    <>
   {selectedUser && socialList && <Helmet>
				<link rel="canonical" href={`https://www.sharemysocials.com/${selectedUser.username.toLowerCase()}`} />
				<title>
					ShareMySocials - {selectedUser.username}
          </title>

				<meta name="description" content={`${selectedUser.username} have gathered all their social medias at one place. U can do the same!`}/>
				<meta
					name="keywords"
					content={`${selectedUser.username},social medias, socials, active, instagram,facebook,tiktok.spotify,sharemysocials`}				/>

			</Helmet >}

  
      {socialList && selectedUser && (
        <BackgroundDiv bgcolor={selectedColor} className={!selectedColor &&  "profile-wrapper"}>
          <Container maxWidth="md">
            <Grid className="wrapper-bottom" container>
              <Grid item md={12} xs={12}>
                
                <div className="text-wrap-profile">
                
                  <h2>@{selectedUser.username} </h2>

                  {selectedUser.showEmail && <div className="email-wrap">
                   
                    <a href={`mailto:${selectedUser.email}`}> <EmailIcon className="email-icon-link"/> </a>
                  </div>}
                  <Button
                  className="show-button"
                    onClick={() => {
                      setShowQr(!showQr);
                    }}
                  >
                    Show QR Code
                  </Button>
                  <Collapse  in={showQr }>
                  <img src={publicUser.qrcode} className="qr-public-img" />
                  </Collapse>
                </div>


                
              </Grid>

              <Grid item xs={12}>
                <div className="highlight-text">
                  <p>{selectedUser.description}</p>
                </div>
              </Grid>

              <Grid item md={6} xs={11} className="highlight-window-wrap">
              <div style={{ display: "flex" }}>
                    {selectedUser.highlights && (
                      <PublicHighlight
                        list={selectedUser && selectedUser.highlights}
                   
                      />
                    )}
                  </div>
                  </Grid>
              <Grid container>
              {socialList.length===0 && <><h3 className="no-socials-text">{selectedUser.username} don't have any socials added :(</h3></>}
                {socialList &&
                  socialList.length > 0 &&
                  socialList.map((social, i) => renderSocials(social, i))}
              </Grid>
              
            </Grid>
            
          </Container>
          <a href="https://www.sharemysocials.com">
          <img src="/images/navlogo.svg" className="profile-logo" />
          </a>
          </BackgroundDiv>
      )}
      {noUser && <Redirect to="/404" />}
     
    </>
  );
};
