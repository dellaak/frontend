import * as actionTypes from "./types";
import userService from "../../services/userService";
import authorizationService from "../../services/authService";

export const userUpdateSuccess = (user) => {
  return {
    type: actionTypes.USER_UPDATE_SUCCESS,
    user: user,
  };
};

export const userUpdateFail = (error) => {
  return {
    type: actionTypes.USER_UPDATE_FAILURE,
    error: error,
  };
};


export const userUpdateUsernameSuccess = (user) => {
  return {
    type: actionTypes.USER_UPDATE_USERNAME_SUCCESS,
    username: user,
  };
};

export const userUpdateUsernameFail = (error) => {
  return {
    type: actionTypes.USER_UPDATE_USERNAME_FAILURE,
    error: error,
  };
};

export const userUpdatePasswordSuccess = (res) => {
  return {
    type: actionTypes.USER_UPDATE_PASSWORD_SUCCESS,
    passwordUpdated: res,
  };
};

export const userUpdatePasswordFail = (error) => {
  return {
    type: actionTypes.USER_UPDATE_PASSWORD_FAILURE,
    error: error,
  };
};

export const getPublicUserSuccess = (user) => {
  return {
    type: actionTypes.GET_USER_PUBLIC_DATA_SUCCESS,
    userData: user,
  };
};

export const getPublicUserFail = (error) => {
  return {
    type: actionTypes.GET_USER_PUBLIC_DATA_FAILURE,
    error: error,
  };
};

export const updateUser = (data) => {
  return (dispatch) => {
    userService.update(data, (response) => {
      if (response.status === 200) {
        dispatch(userUpdateSuccess(response.data.message));
        dispatch(getPublicUser())
      } else {
        dispatch(userUpdateFail(response.message));
      }
    });
  };
};

export const updateUsername = (data) => {
  return (dispatch) => {
    userService.updateUsername(data, (response) => {
      if (response.status === 200) {
        dispatch(userUpdateUsernameSuccess(response));
      } else if(response.status === 400){
        dispatch(userUpdateUsernameFail(response.data.message));
      }else {
        dispatch(userUpdateUsernameFail(response.data.message));
      }
    });
  };
};

export const updatePassword = (data) => {
  return (dispatch) => {
    userService.updateUserPassword(data, (response) => {
      if (response.status === 200) {
        dispatch(userUpdatePasswordSuccess(response));
      }else {
        dispatch(userUpdatePasswordFail(response.data.message));
      }
    });
  };
};


export const getPublicUser = () => {
  let token = sessionStorage.getItem("session-token");
  return (dispatch) => {
    authorizationService.getUser(token, (response) => {
     
      if (response.status===200) {
        dispatch(getPublicUserSuccess(response.data.message));
      } else {
        dispatch(getPublicUserFail(response.message));
      }
    });
  };
};
