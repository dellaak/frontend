/* eslint-disable no-unused-vars */
import * as actionTypes from "../actions/types";
import { updateObject } from "../../utils/utils";

const initialState = {
social:null,
loading: true,
error: null,
isSocialCreated:false
};



const deleteSocial = (state, action) => {
  return updateObject(state, { loading: true, error: null });
};

const deleteSocialSuccess = (state, action) => {
  return updateObject(state, { loading: false, error: null });
};

const deleteSocialFailure = (state, action) => {
  return updateObject(state, { loading: false, error: action.error });
};

const createSocial = (state, action) => {
  return updateObject(state, { loading: true, error: null });
};

const createSocialSuccess = (state, action) => {
  return updateObject(state, { loading: false, error: null, isSocialCreated: true });
};

const createSocialFailure = (state, action) => {
  return updateObject(state, { loading: false, error: action.error, isSocialCreated: false });
};

const updateSocial = (state, action) => {
  return updateObject(state, { loading: true, error: null });
};

const updateSocialSuccess = (state, action) => {
  return updateObject(state, { loading: false, error: null });
};

const updateSocialFailure = (state, action) => {
  return updateObject(state, { loading: false, error: action.error });
};


const getSocial = (state, action) => {
  return updateObject(state, { loading: true, error: null });
};

const getSocialSuccess = (state, action) => {
  return updateObject(state, { loading: false, error: null, social:action.social });
};

const getSocialFailure = (state, action) => {
  return updateObject(state, { loading: false, error: action.error, social: null });
};



const socialsReducer = (state = initialState, action) => {
  switch (action.type) {

    case actionTypes.DELETE_SOCIAL:
      return deleteSocial(state, action);

    case actionTypes.DELETE_SOCIAL_SUCCESS:
      return deleteSocialSuccess(state, action);

    case actionTypes.DELETE_SOCIAL_FAILURE:
      return deleteSocialFailure(state, action);

    case actionTypes.CREATE_SOCIAL:
      return createSocial(state, action);

    case actionTypes.CREATE_SOCIAL_SUCCESS:
      return createSocialSuccess(state, action);

    case actionTypes.CREATE_SOCIAL_FAILURE:
      return createSocialFailure(state, action);

    case actionTypes.UPDATE_SOCIAL:
      return updateSocial(state, action);

    case actionTypes.UPDATE_SOCIAL_SUCCESS:
      return updateSocialSuccess(state, action);

    case actionTypes.UPDATE_SOCIAL_FAILURE:
      return updateSocialFailure(state, action);

    case actionTypes.GET_SOCIAL:
      return getSocial(state, action);

    case actionTypes.GET_SOCIAL_SUCCESS:
      return getSocialSuccess(state, action);

    case actionTypes.GET_SOCIAL_FAILURE:
      return getSocialFailure(state, action);

    
    default:
      return state;
  }
};

export default socialsReducer;
