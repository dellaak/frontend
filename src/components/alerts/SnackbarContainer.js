import React from "react";
import { Snackbar, Icon, IconButton } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import * as actions from "../../store/actions/rootActions";
import { useDispatch, useSelector } from "react-redux";

export const SnackbarContainer = () => {
  const dispatch = useDispatch();
  const snackbar = useSelector((state) => state.ui);

  const handleClose = () => {
    dispatch(actions.hideNotification());
  };

  return (
    <Snackbar
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
      open={snackbar.show}
      autoHideDuration={3000}
      onClose={handleClose}
      action={[
        <IconButton
          key="close"
          aria-label="close"
          color="inherit"
          onClick={handleClose}
        >
          <Icon>close</Icon>
        </IconButton>,
      ]}
    >
      <Alert
        onClose={handleClose}
        severity={snackbar.alertType}
        variant="standard"
      >
        {snackbar.message}
      </Alert>
    </Snackbar>
  );
};
