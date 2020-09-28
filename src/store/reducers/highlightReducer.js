/* eslint-disable no-unused-vars */
import * as actionTypes from "../actions/types";
import { updateObject } from "../../utils/utils";

const initialState = {
highlight:null,
loading: true,
error: null,
isHighlightCreated:false
};

const deleteAllHighlight = (state, action) => {
    return updateObject(state, { loading: true, error: null });
  };
  
  const deleteAllHighlightSuccess = (state, action) => {
    return updateObject(state, { loading: false, error: null });
  };
  
  const deleteAllHighlightFailure = (state, action) => {
    return updateObject(state, { loading: false, error: action.error });
  };

const deleteHighlight = (state, action) => {
  return updateObject(state, { loading: true, error: null });
};

const deleteHighlightSuccess = (state, action) => {
  return updateObject(state, { loading: false, error: null });
};

const deleteHighlightFailure = (state, action) => {
  return updateObject(state, { loading: false, error: action.error });
};

const createHighlight = (state, action) => {
  return updateObject(state, { loading: true, error: null });
};

const createHighlightSuccess = (state, action) => {
  return updateObject(state, { loading: false, error: null, isHighlightCreated: true });
};

const createHighlightFailure = (state, action) => {
  return updateObject(state, { loading: false, error: action.error, isHighlightCreated: false });
};



const getHighlight = (state, action) => {
  return updateObject(state, { loading: true, error: null });
};

const getHighlightSuccess = (state, action) => {
  return updateObject(state, { loading: false, error: null, highlight:action.highlight });
};

const getHighlightFailure = (state, action) => {
  return updateObject(state, { loading: false, error: action.error, highligh: null });
};



const socialsReducer = (state = initialState, action) => {
  switch (action.type) {

    case actionTypes.DELETE_HIGHLIGHT:
      return deleteHighlight(state, action);

    case actionTypes.DELETE_HIGHLIGHT_SUCCESS:
      return deleteHighlightSuccess(state, action);

    case actionTypes.DELETE_HIGHLIGHT_FAILURE:
      return deleteHighlightFailure(state, action);

      case actionTypes.DELETE_ALL_HIGHLIGHT:
        return deleteAllHighlight(state, action);
  
      case actionTypes.DELETE_ALL_HIGHLIGHT_SUCCESS:
        return deleteAllHighlightSuccess(state, action);
  
      case actionTypes.DELETE_ALL_HIGHLIGHT_FAILURE:
        return deleteAllHighlightFailure(state, action);
  

    case actionTypes.CREATE_HIGHLIGHT:
      return createHighlight(state, action);

    case actionTypes.CREATE_HIGHLIGHT_SUCCESS:
      return createHighlightSuccess(state, action);

    case actionTypes.CREATE_HIGHLIGHT_FAILURE:
      return createHighlightFailure(state, action);

    case actionTypes.GET_HIGHLIGHT:
      return getHighlight(state, action);

    case actionTypes.GET_HIGHLIGHT_SUCCESS:
      return getHighlightSuccess(state, action);

    case actionTypes.GET_HIGHLIGHT_FAILURE:
      return getHighlightFailure(state, action);

    
    default:
      return state;
  }
};

export default socialsReducer;
