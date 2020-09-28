import * as actionTypes from "./types";
import * as actions from "./rootActions";
import highlightService from "../../services/highlightService";

export const getHighlight = () => ({
  type: actionTypes.GET_HIGHLIGHT,
});

export const getHighlightSuccess = (highlight) => ({
  type: actionTypes.GET_HIGHLIGHT_SUCCESS,
  highlight: highlight,
});

export const getHighlightFailure = (error) => ({
  type: actionTypes.GET_HIGHLIGHT_FAILURE,
  error: error,
});

export const deleteHighlight = () => ({
  type: actionTypes.DELETE_HIGHLIGHT,
});

export const deleteHighlightSuccess = () => ({
  type: actionTypes.DELETE_HIGHLIGHT_SUCCESS,
});

export const deleteHighlightFailure = (error) => ({
  type: actionTypes.DELETE_HIGHLIGHT_FAILURE,
  error: error,
});

export const deleteAllHighlight = () => ({
    type: actionTypes.DELETE_ALL_HIGHLIGHT,
  });
  
  export const deleteAllHighlightSuccess = () => ({
    type: actionTypes.DELETE_ALL_HIGHLIGHT_SUCCESS,
  });
  
  export const deleteAllHighlightFailure = (error) => ({
    type: actionTypes.DELETE_ALL_HIGHLIGHT_FAILURE,
    error: error,
  });

export const createHighlight = () => ({
  type: actionTypes.CREATE_HIGHLIGHT,
});

export const createHighlightSuccess = () => ({
  type: actionTypes.CREATE_HIGHLIGHT_SUCCESS,
});

export const createHighlightFailure = (error) => ({
  type: actionTypes.CREATE_HIGHLIGHT_FAILURE,
  error: error,
});

export const deleteHighlightItem = (id) => {
  return (dispatch) => {
    dispatch(deleteHighlight());

    highlightService.remove(id, (response) => {
      if (response.status === 200) {
        dispatch(deleteHighlightSuccess());
        dispatch(actions.getPublicUser());
        dispatch(actions.showNotification(response.data.message, "success"));
      } else {
        dispatch(deleteHighlightFailure(response.message));
        dispatch(actions.showNotification("Failed to delete highlight", "error"));
      }
    });
  };
};

export const deleteAllHighlights = () => {
    return (dispatch) => {
      dispatch(deleteAllHighlight());
      highlightService.removeall((response) => {
        if (response.status === 200) {
          dispatch(deleteAllHighlightSuccess());
          dispatch(actions.getPublicUser());
          dispatch(actions.showNotification(response.data.message, "success"));
        } else {
          dispatch(deleteAllHighlightFailure(response.message));
          dispatch(actions.showNotification("Failed to delete highlight", "error"));
        }
      });
    };
  };

export const createHighlightItem = (data) => {
 
  return (dispatch) => {
    dispatch(createHighlight());
    highlightService.add(data, (response) => {
      if (response) {
        if (response.status === 200) {
          dispatch(createHighlightSuccess());
          dispatch(actions.getPublicUser());
          dispatch(actions.showNotification(response.data.message, "success"));
        } else {
          dispatch(createHighlightFailure(response.message));
          dispatch(actions.showNotification("Failed to add highlight", "error"));
        }
      } else {
        console.log("Failed");
      }
    });
  };
};

