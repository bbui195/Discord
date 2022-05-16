import React from "react";
import { NavLink } from "react-router-dom";

class ServerIndex extends React.Component {

    render() {
        return (
            <div id="server-index">
                <NavLink name="Home" exact to="/" className="index-item home" />
                <div className="separator"></div>
                <NavLink to="placeholder" className="index-item" name="Placeholder"/>
                <NavLink to="placeholder2" className="index-item" name="Placeholder2"/>
            </div>
        )
    }
}

export default ServerIndex;