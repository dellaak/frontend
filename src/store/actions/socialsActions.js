import * as actionTypes from "./types";
import * as actions from "./rootActions";
import socialsService from "../../services/socialsService";
import { DragLayer } from "react-dnd";


export const getSocialList = () => ({
  type: actionTypes.GET_SOCIALS_LIST,
});

export const getSocialListSuccess = (socials) => ({
  type: actionTypes.GET_SOCIALS_LIST_SUCCESS,
  socialList: socials,
});

export const getSocialListFailure = (error) => ({
  type: actionTypes.GET_SOCIALS_LIST_FAILURE,
  error: error,
});

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
  type: actionTypes.UPDATE_SOCIAL
});

export const updateSocialSuccess = () => ({
  type: actionTypes.UPDATE_SOCIAL_SUCCESS
});

export const updateSocialFailure = error => ({
  type: actionTypes.UPDATE_SOCIAL_FAILURE,
  error: error
});

// export const getSocials = () => {
//   return (dispatch) => {
//     dispatch(getSocialList());
//     socialsService.list((response) => {
//       if (response.status === 200) {
//         dispatch(getSocialListSuccess(response.data.message));
//       } else {
//         dispatch(getSocialListFailure(response.message));
//       }
//     });
//   };
// };

export const deleteSocialItem = (id,username) => {
  return (dispatch) => {
    dispatch(deleteSocial());

    socialsService.remove(id,username, (response) => {
      if (response.status === 200) {
        dispatch(deleteSocialSuccess());
        dispatch(actions.getPublicUser())
        // dispatch(actions.showNotification(messages.ASSET_DELETED_SUCCESS, "success"));

      } else {
        dispatch(deleteSocialFailure(response.message));
        // dispatch(actions.showNotification(messages.ASSET_DELETED_ERROR, "error"));
      }
    });
  };
};

export const createSocialItem = (userval, socialItem) => {

  let urlType = false;
  if (socialItem.url) {
    urlType = true;
    
  }
  const data = {
    title: socialItem.title,
    url: urlType ? userval : '',
    username: !urlType ? userval : '',
  };
  return (dispatch) => {
    dispatch(createSocial());
    socialsService.add(data, (response) => {
      if(response){
      if (response.status === 200) {
        dispatch(createSocialSuccess());
        dispatch(actions.getPublicUser())
        // dispatch(actions.showNotification(messages.ASSET_ADDED_SUCCESS, "success"));
      } else {
        dispatch(createSocialFailure(response.message));
        // dispatch(actions.showNotification(messages.ASSET_ADDED_ERROR, "error"));
      }
    }else{
      console.log('Failed')
    }
    });
  };
};


export const updateSocialItem = (userdata) => {

  let urlType = false;
  if (userdata.url) {
    urlType = true;
    
  }
  const data = {
    title: userdata.title,
    url: urlType ? userdata.url : '',
    username: !urlType ? userdata.username : '',
  };
  return (dispatch) => {
    dispatch(updateSocial());
    socialsService.update(data, (response) => {
      if(response){
      if (response.status === 200) {
        dispatch(updateSocialSuccess());
        dispatch(actions.getPublicUser())
        // dispatch(actions.showNotification(messages.ASSET_ADDED_SUCCESS, "success"));
      } else {
        dispatch(updateSocialFailure(response.message));
        // dispatch(actions.showNotification(messages.ASSET_ADDED_ERROR, "error"));
      }
    }else{
      console.log('Failed')
    }
    });
  };
};