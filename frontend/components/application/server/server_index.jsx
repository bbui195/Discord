import React from "react";
import { NavLink } from "react-router-dom";

class ServerIndex extends React.Component {

    componentDidMount() {
        console.log("fetching servers");
        this.props.fetchServers();
    }
    render() {
        return (
            <div id="server-index">
                <NavLink name="Home" exact to="/" className="index-item home" />
                <div className="separator"></div>
                {this.props.servers.map((server) => {
                    return <NavLink
                        to={`/servers/${server.id}`}
                        className="index-item server"
                        name={server.name}
                        key={server.id}
                        onClick={()=>(this.props.fetchServer(server.id))}
                        >{server.name.split(" ").map(word => word.charAt(0)).join("").slice(0, 4)}</NavLink>
                })}
                {/* <NavLink to="placeholder" className="index-item" name="Placeholder"/> */}
                {/* <NavLink to="placeholder2" className="index-item" name="Placeholder2"/> */}
                <div id="server-join" className="index-item" onClick={this.props.openAddServerModal}>+</div>
            </div>
        )
    }
}

export default ServerIndex;