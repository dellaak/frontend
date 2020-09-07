/* eslint-disable no-unused-vars */
import * as actionTypes from "../actions/types";
import { updateObject } from "../../utils/utils";

const initialState = {
  show: false,
  alertType: null,
  message: ""
};

const showSnackbar = (state, action) => {
  return updateObject(state, { show: true, alertType: action.alertType, message: action.message });
};

const hideSnackbar = (state, action) => {
  return updateObject(state, {
    show: action.payload,
    alertType: "success",
    message: ""
  });
};

const uiReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SHOW_NOTIFICATION:
      return showSnackbar(state, action);

    case actionTypes.HIDE_NOTIFICATION:
      return hideSnackbar(state, action);

    default:
      return state;
  }
};

export default uiReducer;
