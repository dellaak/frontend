import React from "react";

import { Grid, Container, Button } from "@material-ui/core/";
import "./style.scss";
import { Navbar } from "../../components/navbar";
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';

export const DownloadPage = () => {
  return (
    <>
      <Navbar />
      <div className="public-wrapper-error">
        <Container maxWidth="md">
          <Grid className="wrapper-bottom" container>
            <Grid item md={12} xs={12} >
              <div className="download-text-wrap">
                <h2>Download icons</h2>
                <p>Download icon to put on your website. Instead of using multiple social icons, use just one!</p>
              </div>
              <div className="download-wrap">
                <Grid item md={4} className="wrap-box">
                  <p>Blue transparent logo</p>
                  <img
                  className="blue-logo logo-dl"
                    src="/images/ShareMySocials_blue_logo.png"
                    alt="black-logo-sharemysocials"
                  />
                  <a className="download-link" download href='/images/ShareMySocials_blue_logo.png'>
                    <Button className="download-btn"><CloudDownloadIcon/> </Button>
                  </a>
                </Grid>
                <Grid item md={4} className="wrap-box">
                  <p>White transparent logo</p>
                  <img
                     className="white-logo logo-dl"
                    src="/images/ShareMySocials_white_logo.png"
                    alt="black-logo-sharemysocials"
                  />
                   <a className="download-link" download href='/images/ShareMySocials_blue_logo.png'>
                    <Button className="download-btn"><CloudDownloadIcon/> </Button>
                  </a>
                </Grid>
                <Grid item md={4} className="wrap-box">
                  <p>Black transparent logo</p>
                  <img
                     className="black-logo logo-dl"
                    src="/images/ShareMySocials_black_logo.png"
                    alt="black-logo-sharemysocials"
                  />
                   <a className="download-link" download href='/images/ShareMySocials_blue_logo.png'>
                    <Button className="download-btn"><CloudDownloadIcon/> </Button>
                  </a>
                  </Grid>
              </div>
            </Grid>
          </Grid>
        </Container>
      </div>
    </>
  );
};
