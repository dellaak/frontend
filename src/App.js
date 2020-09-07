import React from "react";
import { ProfilePage } from "./views/profilePage";
import { Navbar } from "./components/navbar";
import { StartPage } from "./views/startPage";
import { Footer } from "./components/footer";
import { LoginPage } from "./views/loginPage";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { SettingsPage } from "./views/settingsPage";
import { PublicPage} from "./views/publicPage";
import {ErrorPage} from "./views/errorPage"
import { SnackbarContainer } from "./components/alerts/SnackbarContainer";
import "./Appstyle.scss";


function App() {
  return (
    <>
<SnackbarContainer/>
        <Route exact path="/" component={StartPage} />
        <Route path="/login" component={LoginPage} />
        <Route path="/profile" component={ProfilePage} />
        <Route path="/settings" component={SettingsPage} />
        <Route path="/:user" component={PublicPage} />
        <Route path="/404" component={ErrorPage} />
        

        {/* <Footer className="footer"/> */}

    </>
  );
}

export default App;
