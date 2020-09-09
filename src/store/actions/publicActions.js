import publicService from "../../services/publicService";
import * as actionTypes from "./types";

export const getPublicSocialListSuccess = (socials) => ({
  type: actionTypes.GET_PUBLIC_SOCIALS_LIST_SUCCESS,
  publicList: socials,
});

export const getPublicSocialListFailure = (error) => ({
  type: actionTypes.GET_PUBLIC_SOCIALS_LIST_FAILURE,
  error: error,
});

export const getQrCodeSuccess = (code) => ({
  type: actionTypes.GET_PUBLIC_QRCODE_SUCCESS,
  qrcode: code,
});

export const getQrCodeFailure = (error) => ({
  type: actionTypes.GET_PUBLIC_QRCODE_FAILURE,
  error: error,
});

export const verifyUserSuccess = (res) => ({
  type: actionTypes.VERIFY_USER_SUCCESS,
  verified: res,
});

export const verifyUserFailure = (error) => ({
  type: actionTypes.VERIFY_USER_FAILED,
  error: error,
});


export const getSocialsPublic = (username) => {
  return (dispatch) => {
    publicService.list(username, (response) => {
      if (response.status === 200) {
        dispatch(getPublicSocialListSuccess(response.data.message));
      } else {
        dispatch(getPublicSocialListFailure(response));
      }
    });
  };
};

export const getQrCode = (username) => {
  return (dispatch) => {
    publicService.getQr(username, (response) => {
      if (response.status === 200) {
        dispatch(getQrCodeSuccess(response.data.message));
      } else {
        dispatch(getQrCodeFailure(response));
      }
    });
  };
};

export const verifyUser = (token) => {
  return (dispatch) => {
    publicService.verify(token, (response) => {
      if (response.status === 200) {
        dispatch(verifyUserSuccess(response.data.message));
      } else {
        dispatch(verifyUserFailure(response));
      }
    });
  };
};
