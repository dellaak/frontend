import React from "react";
import Grid from "@material-ui/core/Grid";
import "./style.scss"

export const ProfileNav = () => {



  const profileLinks = [
    {
      title: "all socials",
      url: '/',
    },
    {
        title: "Music channels",
        url: '/',
      },
   
  ];

  return (
    <>
  
      <Grid item md={12} className="profile-nav" >
   {profileLinks.map(i=>{
    return <p>{i.title}</p>
   })}
</Grid>
    </>
  );
};
