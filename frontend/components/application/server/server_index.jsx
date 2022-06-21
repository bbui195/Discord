import React from "react";
import { NavLink } from "react-router-dom";

class ServerIndex extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // scrollPos: 0
        };
        this.handleWheel = this.handleWheel.bind(this);
    }

    componentDidMount() {
        this.props.fetchServers();
    }

    handleWheel(e) {
        this.serverIndex ||= document.getElementById("server-index");
        this.setState({
            scrollPos: this.state.scrollPos - e.deltaY
        }, ()=>
            this.serverIndex.style.top = `${this.state.scrollPos}px`);
        
    }
    render() {
        return (
            <div id="server-index">
                {/* onWheel={this.handleWheel}> */}
                <NavLink name="Home" exact to="/" className="index-item home"><i className="fa-brands fa-discord"/></NavLink>
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
                
                <div id="server-join" className="index-item" onClick={this.props.openAddServerModal}><i className="fa-solid fa-plus"/></div>
                <div id="server-join" className="index-item public"
                    onClick={this.props.openJoinPublicModal}
                ><i className="fa-solid fa-compass"/></div>
            </div>
        )
    }
}

export default ServerIndex;