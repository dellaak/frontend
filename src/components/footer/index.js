import React from "react"
import Grid from "@material-ui/core/Grid";
import './style.scss'

export const Footer = () =>{


    return(
        <>
        <Grid container>
            <Grid item md={12} className="footer-wrap">
                <p> Privacy policy</p>
                <p> Terms and conditions</p>
            </Grid>
        </Grid>
        </>
    )
}