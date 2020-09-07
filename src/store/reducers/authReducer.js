/* eslint-disable no-unused-vars */
import * as actionTypes from "../actions/types";
import { updateObject } from "../../utils/utils";

const initialState = {
  token: null,
  loading: false,
  error: null,
  userCreated: false,
  loginFail:null
};

const createUserStart = (state, action) => {
  return updateObject(state, { loading: true, error: null });
};

const createUserSuccess = (state, action) => {
  return updateObject(state, {
    loading: false,
    error: null,
    userCreated: action.createdUser.data.status===200 && true,
  });
};

const createUserFail = (state, action) => {
  return updateObject(state, { loading: false, error: action.error });
};

const loginStart = (state, action) => {
  return updateObject(state, { loading: true, error: null });
};

const loginSuccess = (state, action) => {
  return updateObject(state, {
    loading: false,
    error: null,
    token: action.token,
  });
};

const loginFail = (state, action) => {
  return updateObject(state, {
    loading: false,
    loginFail: action.error,
    token: null,
  });
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CREATE_USER_START:
      return createUserStart(state, action);

    case actionTypes.CREATE_USER_SUCCESS:
      return createUserSuccess(state, action);

    case actionTypes.CREATE_USER_FAIL:
      return createUserFail(state, action);

    case actionTypes.LOGIN_START:
      return loginStart(state, action);

    case actionTypes.LOGIN_SUCCESS:
      return loginSuccess(state, action);

    case actionTypes.LOGIN_FAILURE:
      return loginFail(state, action);

    default:
      return state;
  }
};

export default authReducer;
