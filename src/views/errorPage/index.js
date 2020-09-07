import React from "react";

import { Grid, Container, Button} from "@material-ui/core/";
import "./style.scss";
export const ErrorPage = () => {

const goBack = () =>{

  window.location.href='/'
}

  return (
    <>
      <div className="public-wrapper-error">
        <Container maxWidth="md">
          <Grid className="wrapper-bottom" container>
            <Grid item md={12} xs={12}>
              <div className="text-wrap-error">
                <h2 className="ops-text">OPPS.....</h2>
                <h2 className="fail-text">404</h2>
                <h3>Page not found</h3>
                <Button onClick={goBack}>GO BACK</Button>
              </div>
           
            </Grid>
           
          </Grid>
        </Container>
      </div>
    </>
  );
};
