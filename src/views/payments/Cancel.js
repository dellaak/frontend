import React from "react";
import { Button } from "@material-ui/core";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";
import "./style.scss";
import { Link } from "react-router-dom";

export const CancelPage = () => {
  return (
    <div className="banner-fail">
        <div className="fail-wrapper">
      <div className="fail-wrap-confirm">
        <ErrorOutlineIcon />
      </div>

      <h3>Payment canceled!</h3>
      <p>Payment canceled or failed! Contact us if problem exists!</p>
      <small>If you can't order. Email us at <a href="mailto:info@sharemysocials.com">
                  Info@sharemysocials.com
                </a></small>
      <Link className="link-cancel" to="/profile">
        <Button> Go back to profile</Button>
      </Link>
      </div>
    </div>
  );
};
