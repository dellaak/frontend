import * as actionTypes from "../actions/types";
import { updateObject } from "../../utils/utils";

const initialState = {
  publicList: [],
  loading: true,
  error: null,
  qrcode: null,
  verified: false,
};

const getPublicSocialListSuccess = (state, action) => {
  return updateObject(state, {
    loading: false,
    error: null,
    publicList: action.publicList,
  });
};

const getPublicSocialListFailure = (state, action) => {
  return updateObject(state, {
    loading: false,
    error: action.error,
    publicList: [],
  });
};

const verifyUserSuccess = (state, action) => {
  return updateObject(state, {
    loading: false,
    error: null,
    verified: action.verified,
  });
};

const verifyUserFailure = (state, action) => {
  return updateObject(state, { loading: false, error: action.error });
};

const getQrCodeSuccess = (state, action) => {
  return updateObject(state, {
    loading: false,
    error: null,
    qrcode: action.qrcode,
  });
};

const getQrCodeFailure = (state, action) => {
  return updateObject(state, {
    loading: false,
    error: action.error,
    qrcode: null,
  });
};

const publicReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_PUBLIC_SOCIALS_LIST_SUCCESS:
      return getPublicSocialListSuccess(state, action);

    case actionTypes.GET_PUBLIC_SOCIALS_LIST_FAILURE:
      return getPublicSocialListFailure(state, action);

    case actionTypes.VERIFY_USER_SUCCESS:
      return verifyUserSuccess(state, action);

    case actionTypes.VERIFY_USER_FAILED:
      return verifyUserFailure(state, action);

    case actionTypes.GET_PUBLIC_QRCODE_SUCCESS:
      return getQrCodeSuccess(state, action);

    case actionTypes.GET_PUBLIC_QRCODE_FAILURE:
      return getQrCodeFailure(state, action);

    default:
      return state;
  }
};

export default publicReducer;
