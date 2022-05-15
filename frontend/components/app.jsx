import React from "react";
import { Route, Switch } from "react-router";
import { AuthRoute, ProtectedRoute } from "../util/route_util";
import LoginFormContainer from "./auth/login_form_container";
import SignupFormContainer from "./auth/sign_up_form_container";

const App = () => {
    return <div>
        <Switch>
            <AuthRoute exact path="/login" component={LoginFormContainer} />
            <AuthRoute exact path="/signup" component={SignupFormContainer} />
            {/* <AuthRoute exact path="/" component={Splash} />
            <ProtectedRoute path="/" component={Spicord}/>
            <Redirect to="/" /> */}
            <Route render={()=> <h1>Placeholder</h1>}/>
        </Switch>
    </div>
};

export default App;