import * as actionTypes from "./types";
import * as actions from "./rootActions";
import socialsService from "../../services/socialsService";

export const getSocial = () => ({
  type: actionTypes.GET_SOCIAL,
});

export const getSocialSuccess = (social) => ({
  type: actionTypes.GET_SOCIAL_SUCCESS,
  social: social,
});

export const getSocialFailure = (error) => ({
  type: actionTypes.GET_SOCIAL_FAILURE,
  error: error,
});

export const deleteSocial = () => ({
  type: actionTypes.DELETE_SOCIAL,
});

export const deleteSocialSuccess = () => ({
  type: actionTypes.DELETE_SOCIAL_SUCCESS,
});

export const deleteSocialFailure = (error) => ({
  type: actionTypes.DELETE_SOCIAL_FAILURE,
  error: error,
});

export const createSocial = () => ({
  type: actionTypes.CREATE_SOCIAL,
});

export const createSocialSuccess = () => ({
  type: actionTypes.CREATE_SOCIAL_SUCCESS,
});

export const createSocialFailure = (error) => ({
  type: actionTypes.CREATE_SOCIAL_FAILURE,
  error: error,
});

export const updateSocial = () => ({
  type: actionTypes.UPDATE_SOCIAL,
});

export const updateSocialSuccess = () => ({
  type: actionTypes.UPDATE_SOCIAL_SUCCESS,
});

export const updateSocialFailure = (error) => ({
  type: actionTypes.UPDATE_SOCIAL_FAILURE,
  error: error,
});

export const deleteSocialItem = (id, username) => {
  return (dispatch) => {
    dispatch(deleteSocial());

    socialsService.remove(id, username, (response) => {
      if (response.status === 200) {
        dispatch(deleteSocialSuccess());
        dispatch(actions.getPublicUser());
        dispatch(actions.showNotification(response.data.message, "success"));
      } else {
        dispatch(deleteSocialFailure(response.message));
        dispatch(actions.showNotification("Failed to delete social", "error"));
      }
    });
  };
};

export const createSocialItem = (userval, socialItem,type) => {

  let data;
 if(type==='username'){
  data = {
    title: socialItem.title,
    username: userval
  };
 }else if(type==='url'){
  data = {
    title: socialItem.title,
    url: userval
  };
 }
 else if(type==='phone'){
  data = {
    title: socialItem.title,
    phone: userval
  };
 }else if(type==='socialid'){
  data = {
    title: socialItem.title,
    socialid: userval
  };
 }
 
  return (dispatch) => {
    dispatch(createSocial());
    socialsService.add(data, (response) => {
      if (response) {
        if (response.status === 200) {
          dispatch(createSocialSuccess());
          dispatch(actions.getPublicUser());
          dispatch(actions.showNotification(response.data.message, "success"));
        } else {
          dispatch(createSocialFailure(response.message));
          dispatch(actions.showNotification("Failed to add social", "error"));
        }
      } else {
        console.log("Failed");
      }
    });
  };
};

export const updateSocialItem = (userdata) => {
  const data = {
    title: userdata.title,
    url: userdata.url,
    username: userdata.username,
    phone: userdata.phone,
    socialid: userdata.socialid,
  };
  return (dispatch) => {
    dispatch(updateSocial());
    socialsService.update(data, (response) => {
      if (response) {
        if (response.status === 200) {
          dispatch(updateSocialSuccess());
          dispatch(actions.getPublicUser());
          dispatch(actions.showNotification(response.data.message, "success"));
        } else {
          dispatch(updateSocialFailure(response.message));
          dispatch(
            actions.showNotification("Failed to create social", "error")
          );
        }
      } else {
        console.log("Failed");
      }
    });
  };
};
