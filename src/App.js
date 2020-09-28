import React from "react";
import { ProfilePage } from "./views/profilePage";
import { Navbar } from "./components/navbar";
import { StartPage } from "./views/startPage";

import { LoginPage } from "./views/loginPage";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { SettingsPage } from "./views/settingsPage";
import { PublicPage} from "./views/publicPage";
import {ErrorPage} from "./views/errorPage"
import {VerifiedPage} from "./views/verifiedPage"
import { SnackbarContainer } from "./components/alerts/SnackbarContainer";
import "./Appstyle.scss";
import { SuccessPage } from "./views/payments/Success";
import { CancelPage } from "./views/payments/Cancel";
import { DownloadPage } from "./views/downloads";
import { FeedPage } from "./views/feedPage";


function App() {
  
  return (
    <>

<SnackbarContainer/>
        <Route exact path="/" component={StartPage} />
        <Route path="/login" component={LoginPage} />
        <Route path="/profile" component={ProfilePage} />
        <Route path="/settings" component={SettingsPage} />
        <Route path="/:user" component={PublicPage} />
        <Route path="/verify/:activationtoken" component={VerifiedPage} />
        {/* <Route path="/success" component={SuccessPage} /> */}
        <Route path="/success" component={FeedPage} />
        <Route path="/downloads" component={DownloadPage} />
        <Route path="/cancel" component={CancelPage} />
        <Route path="/404" component={ErrorPage} />
        

        {/* <Footer className="footer"/> */}

    </>
  );
}

export default App;
