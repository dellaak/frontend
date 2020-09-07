/* eslint-disable no-unused-vars */
import * as actionTypes from "../actions/types";
import { updateObject } from "../../utils/utils";

const initialState = {
  user: null,
  loading: false,
  error: null,
  userData: [],
  username: null,
  passwordUpdated: false,
};

const updateUserSuccess = (state, action) => {
  return updateObject(state, {
    loading: false,
    error: null,
    user: action.user,
  });
};

const updateUserFail = (state, action) => {
  return updateObject(state, {
    loading: false,
    error: action.error,
    user: null,
  });
};

const updateUsernameSuccess = (state, action) => {
  return updateObject(state, {
    loading: false,
    error: null,
    username: action.username,
  });
};

const updateUsernameFail = (state, action) => {
  return updateObject(state, {
    loading: false,
    error: action.error,
    user: null,
  });
};

const updatePasswordSuccess = (state, action) => {
  console.log(action)
  return updateObject(state, {
    loading: false,
    error: null,
    passwordUpdated: action.passwordUpdated.status,
  });
};

const updatePasswordFail = (state, action) => {
  return updateObject(state, {
    loading: false,
    error: action.error,
    user: null,
  });
};

const getUserDataSuccess = (state, action) => {
  return updateObject(state, {
    error: null,
    userData: action.userData,
  });
};

const getUserDataFail = (state, action) => {
  return updateObject(state, {
    loading: false,
    error: action.error,
    userData: [],
  });
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOGIN_SUCCESS:
      return updateUserSuccess(state, action);

    case actionTypes.LOGIN_FAILURE:
      return updateUserFail(state, action);

    case actionTypes.USER_UPDATE_USERNAME_SUCCESS:
      return updateUsernameSuccess(state, action);

    case actionTypes.USER_UPDATE_USERNAME_FAILURE:
      return updateUsernameFail(state, action);

    case actionTypes.USER_UPDATE_PASSWORD_SUCCESS:
      return updatePasswordSuccess(state, action);

    case actionTypes.USER_UPDATE_PASSWORD_FAILURE:
      return updatePasswordFail(state, action);

    case actionTypes.GET_USER_PUBLIC_DATA_SUCCESS:
      return getUserDataSuccess(state, action);

    case actionTypes.GET_USER_PUBLIC_DATA_FAILURE:
      return getUserDataFail(state, action);

    default:
      return state;
  }
};

export default userReducer;
