import React, { useState, useCallback, useEffect } from "react";
import { TopProfile } from "../../components/topProfile";
import { Social } from "../../components/social";
import {
  Grid,
  Container,
  Button,
  TextField,
  Fade,
  Slide,
} from "@material-ui/core/";
import "./style.scss";
import { AddNewSocial } from "../../components/addnewsocial";
import { Link, Redirect, useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import SettingsIcon from "@material-ui/icons/Settings";
import { DndProvider } from "react-dnd-multi-backend";
import HTML5toTouch from "react-dnd-multi-backend/dist/esm/HTML5toTouch";
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
import { Navbar } from "../../components/navbar";
import { Highlights } from "../../components/highlights";
import { AddNewHighlight } from "../../components/addhighlight";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { SwatchesPicker } from "react-color";
import { BackgroundDiv } from "./styledProfile";
import { userDeleteFail } from "../../store/actions/userActions";

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
  const [userHighlights, setUserHighlights] = useState([]);
  const [qrcode, setQrcode] = useState("");
  const [openDelete, setOpenDelete] = useState(false);
  const [showColors, setShowColors] = useState(false);
  const [selectedColor, setSelectedColor] = useState("");
  const userData = useSelector((state) => state.user);
  const publicData = useSelector((state) => state.public);
  const authData = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(actions.getPublicUser());
  }, []);

  useEffect(() => {
    dispatch(actions.getQrCode(userData.userData.username));
    setUser(userData.userData);
    setSocialList(userData.userData.socialsList);
    setUserHighlights();
    if (userData.userData && userData.userData.selectedColor) {
      setSelectedColor(userData.userData.selectedColor);
    }
  }, [userData.userData]);

  useEffect(() => {
    let uD = userData.userData;
    setQrcode(publicData.qrcode);
    setShowEmail(uD.showEmail);
    setDescription(uD.description);
  }, [userData.userData && userData.userData.phone, publicData]);

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

  const resetStates = () => {
    setDescription("");
    setSelectedColor('')
  };

  const handleSave = () => {
    if (editMode) {
      let updatedUser = {
        phone: phone,
        socialsList: socialList,
        description: description,
        showPhone: showPhone,
        showEmail: showEmail,
        selectedColor: selectedColor,
      };
      dispatch(actions.updateUser(updatedUser));
    }
    dispatch(actions.getPublicUser());

    resetStates();
  };

  const handleClose = () => {
    setOpenDelete(false);
  };

  const handleColors = (e) => {
    setSelectedColor(e.hex);
  };

  const deleteAllHighlights = () => {
    dispatch(actions.deleteAllHighlights());
    dispatch(actions.getPublicUser());
    setOpenDelete(false);
  };

  const renderSocials = (social, index) => {
    if (!social) return;
    socialsJSON.socials.map((k) => {
      if (k.title === social.title) {
        social.icon = k.icon;
        social.link = social.url ? social.url : k.link + social.username;
        social.notExternal = k.phone || k.socialid;
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
      {user && (
        <Helmet>
          <title>{`${user && user.username} | ShareMySocials`}</title>
          <meta
            name="description"
            content={`${
              user && user.username
            } have gathered all their socials at ShareMySocials.`}
          />

          <meta
            name="description"
            content="All your socials at one place! Add highlights about latest social posts, links or news about you. Register now for free!"
          />

          <meta
            itemprop="name"
            content={`${user && user.username} | ShareMySocials.`}
          />
          <meta
            itemprop="description"
            content={`${
              user && user.username
            } have gathered all their socials at ShareMySocials.`}
          />
          <meta
            itemprop="image"
            content="https://www.sharemysocials.com/images/secondimg2.png"
          />

          <meta
            property="og:url"
            content={`https://sharemysocials.com/${user && user.username}`}
          />
          <meta property="og:type" content="website" />
          <meta
            property="og:title"
            content={`${user && user.username} | ShareMySocials.`}
          />
          <meta
            property="og:description"
            content={`${
              user && user.username
            } have gathered all their socials at ShareMySocials.`}
          />
          <meta
            property="og:image"
            content="https://www.sharemysocials.com/images/secondimg2.png"
          />

          <meta name="twitter:card" content="summary_large_image" />
          <meta
            name="twitter:title"
            content={`${user && user.username} | ShareMySocials.`}
          />
          <meta
            name="twitter:description"
            content={`${
              user && user.username
            } have gathered all their socials at ShareMySocials.`}
          />
          <meta
            name="twitter:image"
            content="https://www.sharemysocials.com/images/secondimg2.png"
          />
        </Helmet>
      )}
      <Navbar />
      <DndProvider options={HTML5toTouch}>
        {user  &&(
          <BackgroundDiv
            bgcolor={selectedColor}
            className={user && !selectedColor && "profile-wrapper"}
          >
            <Container maxWidth="md">
              <Grid className="wrapper-bottom" container>
                <Grid item md={12} xs={12}>
                  <div className="text-wrap-profile">
                    <Link to="/settings" className="settings-wrap">
                      <SettingsIcon className="settings-icon" />
                      <small>Settings</small>
                    </Link>
                    <a
                      href={`https://www.sharemysocials.com/${user.username}`}
                      className="show-profile-btn"
                      target="_blank"
                    >
                      Show profile
                    </a>
                    <h2>@{user.username} </h2>
                    <div className="email-wrap">
                      {showEmail && (
                        <>
                          <a href={`mailto:${user.email}`}>
                            <EmailIcon className="email-icon-link" />
                            {user.email}
                          </a>
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
                      <>
                        <Button
                          className="edit-bg-btn"
                          onClick={() => setShowColors(!showColors)}
                        >
                          Change Background{" "}
                        </Button>

                        {showColors && (
                          <div className="color-wrapper">
                            <p>Choose color</p>
                            <SwatchesPicker
                              onChange={(e) => {
                                handleColors(e);
                              }}
                            />
                            <Button
                              className="reset-bg-btn"
                              onClick={() => {
                                setSelectedColor(null);
                              }}
                            >
                              Reset background
                            </Button>
                          </div>
                        )}
                      </>
                    )}
                    {/* {editMode && (
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
                      )} */}
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

                <Grid item md={6} xs={12} className="highlight-window-wrap">
                  <div className="highlight-buttons">
                    {editMode && <AddNewHighlight />}
                    {editMode && user.highlights.length !== 0 && (
                      <Button
                        className="delete-all-hs"
                        onClick={() => {
                          setOpenDelete(true);
                        }}
                      >
                        {" "}
                        <DeleteForeverIcon className="trash-all-icon" />
                        Delete all highlights{" "}
                      </Button>
                    )}
                  </div>
                  <div style={{ display: "flex" }}>
                    {userData.userData.highlights && (
                      <Highlights
                        list={user && user.highlights}
                        socials={userData && userData.userData.socialsList}
                        editMode={editMode}
                      />
                    )}
                  </div>
                </Grid>
                {/* {editMode && (
                  <h2 className="reorder-text">
                    Drag and drop the social icons to re-order
                  </h2>
                )} */}

                <Grid container className={editMode ? "edit-bg" : ""}>
                  {editMode && <AddNewSocial />}
                  {socialList &&
                    socialList.length > 0 &&
                    socialList.map((social, i) => renderSocials(social, i))}

                  {socialList && socialList.length === 0 && (
                    <Grid item md={12}>
                      <div className="no-socials-text">
                        <p>
                          Click the edit profile button and start editing your
                          profile!
                        </p>
                      </div>
                    </Grid>
                  )}
                </Grid>
              </Grid>
              <TopProfile qrcode={qrcode} />
              {/*DELETE*/}
              <Dialog
                open={openDelete}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogTitle id="alert-dialog-title">
                  {"Delete media from profile"}
                </DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                    Are you sure you want to remove <b>ALL</b> your highlights
                    from your profile ?
                  </DialogContentText>
                  <small>You can't regret this..</small>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose} color="primary">
                    Cancel
                  </Button>
                  <Button
                    onClick={deleteAllHighlights}
                    color="primary"
                    autoFocus
                  >
                    Delete highlights
                  </Button>
                </DialogActions>
              </Dialog>
            </Container>
          </BackgroundDiv>
        )}
      </DndProvider>
    </>
  ) : (
    <Redirect to="/login" />
  );
};
