import React from "react";
import { Grid, Button } from "@material-ui/core";
import "./style.scss"
import { Link } from "react-router-dom";

export const SuccessPage = () => {
  return (
    <div className="banner-success" >

          <div className="success-wrap-confirm">
            <div class="success-checkmark">
              <div class="check-icon">
                <span class="icon-line line-tip"></span>
                <span class="icon-line line-long"></span>
                <div class="icon-circle"></div>
                <div class="icon-fix"></div>
              </div>
            </div>
            <h3>Payment confirmed!</h3>
            <p>
              We send the recipe to your email. If you don't get it contact us
              info@sharemysocials.com
            </p>
            <small>Remember that the order can take up to 20 business days.</small>
            <Link to="/profile"><Button> Go back to profile</Button></Link>
          </div>

    </div>
  );
};
