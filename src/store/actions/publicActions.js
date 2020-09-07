import publicService from "../../services/publicService";
import * as actionTypes from "./types"


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
  

export const getSocialsPublic = (username) => {
    return (dispatch) => {
      publicService.list(username,(response) => {
        if (response.status === 200 && !response.data.includes('route')) {
          dispatch(getPublicSocialListSuccess(response.data.message));
        } else {
          dispatch(getPublicSocialListFailure(response));
        }
      });
    };
  };

  export const getQrCode = (username) => {
    return (dispatch) => {
      publicService.getQr(username,(response) => {
        if (response.status === 200) {
          dispatch(getQrCodeSuccess(response.data.message));
        } else {
          dispatch(getQrCodeFailure(response));
        }
      });
    };
  };