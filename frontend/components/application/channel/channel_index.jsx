import React from "react";
import { NavLink } from "react-router-dom";

class ChannelIndex extends React.Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        console.log(this.props);
        return (
            <div className="channel-index">
                {this.props.channels.map((channel) => {
                    return <div className="channel-index-item"
                        key={channel.id}>
                    <NavLink
                        to={`/servers/${channel.serverId}/channels/${channel.id}`}>
                        {"# " + channel.name}
                    </NavLink>
                    </div>
                })}
            </div>
        );
    }
}

export default ChannelIndex;

