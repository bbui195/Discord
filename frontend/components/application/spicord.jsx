import React from "react";
import { Redirect } from "react-router-dom";
import { Route } from "react-router-dom";
import { Switch } from "react-router-dom";
import Splash from "../splash";
import ServerIndex from "./server/server_index";
import HomeContainer from "./home/home_container";
import ModalsContainer from "./modals/modals_container";
import ServerShowContainer from "./server/server_show_container";

class Spicord extends React.Component{


    render() {
        return this.props.loggedIn?
            (<div id="app-container">
                <ModalsContainer />
                {/* <ServerIndex openAddServerModal={this.props.openAddServerModal} /> */}
                <ServerIndex {...this.props} />
                <div className="logged-in-container">
                    <p>Logged in as {this.props.currentUser ? this.props.currentUser.username : null}</p>
                    <button onClick={this.props.logout}>Logout</button>
                </div>
                
                <Switch>
                    {/* <Route path="/placeholder" render={()=><div/>}/>
                    <Route path="/placeholder2" render={()=><div/>}/> */}
                    <Route path="/servers/:serverId" render={()=> null} />
                    <Route exact path="/" render={()=> null}/>
                    <Redirect to="/" />
                </Switch>

                <Switch>
                    <Route path="/servers/:serverId/channels/:channelId" component={ServerShowContainer} />
                    <Route path="/servers/:serverId" component={ServerShowContainer} />
                    {/* <Route path="/servers/:serverId" render={()=><div>testing123</div>} /> */}
                    <Route path="/" component={HomeContainer} />
                </Switch>
            </div>) :
            (<Switch>
                <Route exact path="/" component={Splash}/>
                <Redirect to="/" />
            </Switch>);
    }
}
export default Spicord;
