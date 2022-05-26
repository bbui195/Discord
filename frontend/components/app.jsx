import React from "react";
import { Route, Switch } from "react-router";
import { Redirect } from "react-router-dom";
import { AuthRoute, ProtectedRoute } from "../util/route_util";
import Spicord from "./application/spicord";
import SpicordContainer from "./application/spicord_container";
import LoginFormContainer from "./auth/login_form_container";
import SignupFormContainer from "./auth/sign_up_form_container";
import Splash from "./splash";

const App = ({ cable }) => {
    return <div>
        <Switch>
            <AuthRoute exact path="/login" component={LoginFormContainer} />
            <AuthRoute exact path="/signup" component={SignupFormContainer} />
            <Route path="/" render={()=> <SpicordContainer cable={cable}/>}/>
            <Redirect to="/" />
        </Switch>
    </div>
};

export default App;