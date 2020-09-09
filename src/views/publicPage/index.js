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

export const PublicPage = () => {
  const dispatch = useDispatch();
  const [selectedUser, setSelectedUser] = useState(false);
  let { user } = useParams();
  const [socialList, setSocialList] = useState([]);
  const [showEmail, setShowEmail] = useState(false);
  const publicUser = useSelector((state) => state.public);
  const [noUser, setNoUser] = useState(false);
  const [showQr, setShowQr] = useState(false);


  useEffect(() => {
    dispatch(actions.getSocialsPublic(user));
    dispatch(actions.getQrCode(user));
  }, []);

  useEffect(() => {
    setSelectedUser(publicUser.publicList);

    setSocialList(publicUser.publicList.socialsList);
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
      <PublicSocial social={social} index={index} key={index}></PublicSocial>
    );
  };

  useEffect(() => {
    if (publicUser.error ) {
      setNoUser(true);
    }
  }, [publicUser]);

  return (
    <>
      {socialList && selectedUser && (
        <div className="profile-wrapper">
          <Container maxWidth="md">
            <Grid className="wrapper-bottom" container>
              <Grid item md={12} xs={12}>
                <div className="text-wrap-profile">
                
                  <h2>@{selectedUser.username} </h2>

                  {selectedUser.showEmail && <div className="email-wrap">
                    <EmailIcon />
                    <a href={`mailto:${selectedUser.email}`}>{selectedUser.email} </a>
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

              <Grid container>
                {socialList &&
                  socialList.length > 0 &&
                  socialList.map((social, i) => renderSocials(social, i))}
              </Grid>
            </Grid>
      
          </Container>
        </div>
      )}
      {noUser && <Redirect to="/404" />}
    </>
  );
};
