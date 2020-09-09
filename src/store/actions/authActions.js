import * as actionTypes from "./types";
import authorizationService from "../../services/authService";
import * as actions from "./rootActions"

export const createUserStart = () => {
  return {
    type: actionTypes.CREATE_USER_START,
  };
};

export const createUserSuccess = (user) => {
  return {
    type: actionTypes.CREATE_USER_SUCCESS,
    createdUser: user,
  };
};

export const createUserFail = (error) => {
  return {
    type: actionTypes.CREATE_USER_FAIL,
    error: error,
  };
};

export const loginStart = () => {
  return {
    type: actionTypes.LOGIN_START,
  };
};

export const loginSuccess = (token) => {
  return {
    type: actionTypes.LOGIN_SUCCESS,
    token: token,
  };
};

export const loginFail = (error) => {
  return {
    type: actionTypes.LOGIN_FAILURE,
    loginFail: error,
  };
};

export const logoutStart = () => {
  return {
    type: actionTypes.LOGOUT,
  };
};

export const checkAuthTimeout = (expirationTime) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(logout());
    }, expirationTime);
  };
};

export const login = (email, password) => {
  return (dispatch) => {
    dispatch(loginStart());
    authorizationService.login(email, password, (response) => {
      if (response.status === 200) {
        dispatch(loginSuccess(response.data.message.token));
        dispatch(actions.showNotification('Login success', "success"));
        //Add timeout with expiry date coming from data
        const expirationTime =
          response.data.message.expires - new Date().getTime();
        dispatch(checkAuthTimeout(expirationTime));
      } else {
        dispatch(loginFail(response.message));
        dispatch(actions.showNotification('Failed to login: '+response.data.message, "error"));
      }
    });
  };
};

export const createUser = (data) => {
  return (dispatch) => {
    dispatch(createUserStart());
    authorizationService.signup(data, (err,res) => {
      if (!err) {
        dispatch(createUserSuccess(res));
      } else {
        dispatch(createUserFail(err));
      }
    });
  };
};

export const logout = () => {
  // return dispatch => {
  //   dispatch(logoutStart());
  //   setTimeout(() => {
  //     authorizationService.logout();
  //   }, 500);
  // };
};
