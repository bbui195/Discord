import React from "react";
import { NavLink } from "react-router-dom";
import SettingsModal from "../server/settings_modal";

class ChannelIndex extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            channel: {name: ""},
            settings: false
        }
        this.toggleChannelSettings = this.toggleChannelSettings.bind(this);
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
        if(this.state.channel && this.state.channel.id
            && this.state.channel !== this.props.channelsObject[this.state.channel.id]) {
            this.setState({
                channel: this.props.channelsObject[this.state.channel.id] || {name:""}
            });
        }
    }

    componentDidMount() {
        this.goToFirstChannel();
    }

    toggleChannelSettings() {
        this.setState({settings: false})
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
                            ()=>this.setState({
                                channel,
                                settings: true
                            })
                        }/>
                    </div>
                })}
                <SettingsModal 
                    name={this.state.channel.name}
                    showing={this.state.settings}
                    toggleSettings={this.toggleChannelSettings}
                    delete={{
                        title: `Delete '${this.state.channel.name}'`,
                        prompt: `Are you sure you want to delete ${this.state.channel.name}? This action cannot be undone.`,
                        confirmText: "Delete Channel",
                        action: ()=> this.props.deleteChannel(this.state.channel.id)
                            .then(this.toggleChannelSettings)
                            // .then(()=>this.props.history.push("/"))
                    }}
                    tabs={[
                        {
                            name: "Overview",
                            render: function() {
                                return <>
                                    <div className="text-label">CHANNEL NAME</div>
                                    <input type="text"
                                        className="text-input"
                                        value={this.state.name}
                                        onChange={this.handleChange("name")}
                                    />
                                </>
                            }
                        },
                        {
                            name: "Delete Channel",
                            render: () => null
                        }
                    ]}
                    item={this.state.channel}
                    saveItem={this.props.updateChannel}
                />
            </div>
        );
    }
}

export default ChannelIndex;

