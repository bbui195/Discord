import React from "react";
import MessageIndex from "../message/message_index";
import ChannelUsersIndex from "./channel_users_index";


class ChannelShow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            
        };
    }
    
    updateChannel() {
        this.props.fetchChannel();
        if(this.state.room) {
            this.props.cable.subscriptions.remove(this.state.room);
        }
        this.setState(
            {
                channelId: this.props.channel.id,
                room: this.props.cable.subscriptions.create({
                    channel: "ChannelsChannel",
                    channel_id: this.props.channel.id
                }, {
                    received: this.props.receiveMessage
                })
            }
        );
    }

    componentDidMount() {
        if(this.props.channel !== undefined) {
            this.updateChannel();
        }
    }

    componentDidUpdate() {
        if(!this.props.channel || this.props.channel === undefined) {
            return;
        }
        if(this.state.channelId !== this.props.channel.id) {
            this.updateChannel();
        }
    }

    render() {
        if(!this.props.messages || !this.props.channel) {
            return;
        }
        return (
            <div className="channel">
                <div className="channel-top-bar">
                    # {this.props.channel.name}
                </div>
                <div className="channel-content">
                    <MessageIndex
                        // messages={this.props.messages}
                        // channel={this.props.channel}
                        {...this.props}
                        messageable={{
                            type: "Channel",
                            id: this.props.channel.id
                        }}
                        />
                    <ChannelUsersIndex users={this.props.users}/>
                </div>
            </div>
        );
    }
}

export default ChannelShow;
