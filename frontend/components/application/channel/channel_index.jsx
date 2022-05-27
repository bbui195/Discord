import React from "react";
import { NavLink } from "react-router-dom";

class ChannelIndex extends React.Component {
    constructor(props) {
        super(props);
    }

    goToFirstChannel() {
        if(!this.props.match.params.channelId && this.props.channels.length > 0) {
            // const serverId = this.props.match.params.serverId;
            const serverId = this.props.channels[0].serverId;
            if(this.props.match.params.serverId === serverId.toString()) {
                const channelId = this.props.channels[0].id;
                this.props.history.replace(`/servers/${serverId}/channels/${channelId}`);
            }
        }
    }

    componentDidUpdate() {
        this.goToFirstChannel();
    }

    componentDidMount() {
        this.goToFirstChannel();
    }

    render() {
        return (
            <div className="channel-index">
                {this.props.channels.map((channel) => {
                    return <div className="channel-index-item"
                        key={channel.id}>
                    <NavLink
                        to={`/servers/${channel.serverId}/channels/${channel.id}`}>
                        {"# " + channel.name}
                    </NavLink>
                    <i className="fa-solid fa-gear"
                        onClick={
                            ()=>null
                        }/>
                    </div>
                })}
            </div>
        );
    }
}

export default ChannelIndex;

