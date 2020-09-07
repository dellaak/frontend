import React, { useState, useCallback, useEffect } from "react";
import { TopProfile } from "../../components/topProfile";
import { Social } from "../../components/social";
import {
  Grid,
  Container,
  Button,
  TextField,
} from "@material-ui/core/";
import "./style.scss";
import { AddNewSocial } from "../../components/addnewsocial";
import { Link, Redirect, useParams } from "react-router-dom";

import SettingsIcon from "@material-ui/icons/Settings";
import { DndProvider } from 'react-dnd-multi-backend';
import HTML5toTouch from 'react-dnd-multi-backend/dist/esm/HTML5toTouch'; 
import update from "immutability-helper";
import { DropBox } from "./dragBox";
import PhoneIcon from "@material-ui/icons/Phone";
import EmailIcon from "@material-ui/icons/Email";
import authorizationService from "../../services/authService";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../../store/actions/rootActions";
import socialsJSON from "./socialsJSON";
import Switch from "@material-ui/core/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { AsYouType, parsePhoneNumberFromString } from "libphonenumber-js";
import { Navbar } from "../../components/navbar";

export const ProfilePage = () => {
  const dispatch = useDispatch();
  const [editMode, setEditMode] = useState(false);
  const [user, setUser] = useState(null);
  const [phone, setPhone] = useState("");
  const [description, setDescription] = useState("");
  const [showEmail, setShowEmail] = useState(false);
  const [showPhone, setShowPhone] = useState(false);
  const [showQrCode, setShowQrCode] = useState(false);
  const [phoneErr, setphoneErr] = useState(false);
  const [socialList, setSocialList] = useState([]);
  const [qrcode,setQrcode] = useState('')
  const userData = useSelector((state) => state.user);
  const publicData = useSelector((state) => state.public);

  useEffect(() => {
    dispatch(actions.getPublicUser());
    
  }, []);

  useEffect(() => {
  
    dispatch(actions.getQrCode(userData.userData.username));
    setUser(userData.userData);
    setSocialList(userData.userData.socialsList);
  }, [userData.userData]);

  useEffect(() => {
    let uD = userData.userData;
    setQrcode(publicData.qrcode)
    setShowEmail(uD.showEmail);
    setDescription(uD.description)


  }, [userData.userData && userData.userData.phone,publicData]);

  const moveCard = useCallback(
    (dragIndex, hoverIndex) => {
      const dragCard = socialList[dragIndex];
      setSocialList(
        update(socialList, {
          $splice: [
            [dragIndex, 1],
            [hoverIndex, 0, dragCard],
          ],
        })
      );
    },
    [socialList]
  );

  const resetStates =( )=>{
    setDescription('')
  }

  const handleSave = () => {
    if (editMode) {
      let updatedUser = {
        phone: phone,
        socialsList: socialList,
        description: description,
        showPhone: showPhone,
        showEmail: showEmail,
      };
      dispatch(actions.updateUser(updatedUser));
    }
    dispatch(actions.getPublicUser());

    resetStates()
  };

  const renderSocials = (social, index) => {
    if (!social) return;
    socialsJSON.socials.map((k) => {
      if (k.title === social.title) {
        social.icon = k.icon;
        social.link = social.url ? social.url : k.link + social.username;
      }
    });

    return (
      <Social
        username={user.username}
        social={social}
        index={index}
        key={index}
        moveCard={moveCard}
        editMode={editMode}
      >
        <DropBox />
      </Social>
    );
  };


  return authorizationService.isAuthenticated() ? (
    <>
    <Navbar/>
      <DndProvider options={HTML5toTouch}>
        {user && (
          <div className="profile-wrapper">
            <Container maxWidth="md">
              <Grid className="wrapper-bottom" container>
                <Grid item md={12} xs={12}>
                  <div className="text-wrap-profile">
                    <Link to="/settings" className="settings-wrap">
                      <SettingsIcon className="settings-icon" />
                      <small>Settings</small>
                    </Link>
                    <a href={`https://www.sharemysocials.com/${user.username}`}
                      className="show-profile-btn"
                     target="_blank"
                    >
                      Show profile
                    </a>
                    <h2>@{user.username} </h2>
                    <div className="email-wrap">
                      {showEmail && (
                        <>
                          <EmailIcon />
                          <a href={`mailto:${user.email}`}>{user.email} </a>
                        </>
                      )}
                      {editMode && (
                        <FormControlLabel
                          control={
                            <Switch
                              className="edit-switch"
                              checked={showEmail}
                              onChange={() => {
                                setShowEmail(!showEmail);
                              }}
                            />
                          }
                          label="Show Email"
                        />
                      )}
                    </div>
                    {editMode && (
                        <FormControlLabel
                          control={
                            <Switch
                              className="edit-switch"
                              checked={showQrCode}
                              onChange={() => {
                                setShowQrCode(!showQrCode);
                              }}
                            />
                          }
                          label="Show QR Code"
                        />
                      )}
                  </div>
                
                  {!editMode && (
                    <Button
                      className="edit-button-mode"
                      onClick={() => {
                        setEditMode(!editMode);
                      }}
                    >
                      Edit Profile
                    </Button>
                  )}

                  {editMode && (
                    <Button
                      className="edit-button-mode"
                      onClick={() => {
                        setEditMode(!editMode);
                        handleSave();
                      }}
                    >
                      Save
                    </Button>
                  )}
                </Grid>

                {!editMode && (
                  <Grid item xs={12}>
                    <div className="highlight-text">
                      <p>{user.description}</p>
                    </div>
                  </Grid>
                )}
                <Grid container justify="center">
                  {editMode && (
                    <Grid item md={8} xs={10}>
                       <span className="counter">{description.length}/100</span>
                      <TextField
                        id="standard-multiline-static"
                        label="Your profile text (Max 100 characters)"
                        multiline
                        inputProps={{ maxLength: 100 }}
                        rows={3}
                        onChange={(e) => {
                          setDescription(e.target.value);
                        }}
                        value={description}
                        variant="filled"
                        className="profile-edit-text"
                      />
                     
                    </Grid>
                  )}
                </Grid>
                {editMode && (
                  <h2 className="reorder-text">
                    Drag and drop the social icons to reorder
                  </h2>
                )}
                {editMode && (
                  <AddNewSocial
                  
                  />
                )}

                <Grid container>
                  {socialList &&
                    socialList.length > 0 &&
                    socialList.map((social, i) => renderSocials(social, i))}

                  {socialList && socialList.length === 0 && (
                    <Grid item md={12}>
                      <div className="no-socials-text">
                        <h3>No socials....</h3>
                        <p>
                          Click the edit profile button and add your socials!
                        </p>
                      </div>
                    </Grid>
                  )}
                </Grid>
              </Grid>
              <TopProfile qrcode={qrcode} />
            </Container>
          </div>
        )}
      </DndProvider>
    </>
  ) : (
    <Redirect to="/login" />
  );
};
