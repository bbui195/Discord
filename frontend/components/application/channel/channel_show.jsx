import React from "react";
import MessageIndex from "../message/message_index";
import ChannelUsersIndex from "./channel_users_index";


class ChannelShow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            
        };
    }

    componentDidMount() {
        this.props.getMessages();
    }

    componentDidUpdate() {
        return;
        if(!this.props.channel) {
            return;
        }
        if(this.state.channelId !== this.props.channel.id) {
            this.props.getMessages()
                .then(()=> {
                    this.setState(
                        {
                            channelId: this.props.channel.id
                        }
                    )
                }
            );
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
                    <MessageIndex messages={["m1", "m2","m1", "m2","m1", "m2","m1", "m2","m1", "m2","m1", "m2","m1", "m2","m1", "m2","m1", "m2","m1", "m2","m1", "m2","m1", "m2","m1", "m2","m1", "m2","m1", "m2","m1", "m2","m1", "m2","m1", "m2","m1", "m2","m1", "m2","m1", "m2","m1", "m2","m1", "m2","m1", "m2","m1", "m2","m1", "m2","m1", "m2","m1", "m2","m1", "m2","m1", "m2","m1", "m2","m1", "m2","m1", "m2","m1", "m2","m1", "m2","m1", "m2","m1", "m2","m1", "m2"]}
                        channel={this.props.channel}/>
                    <ChannelUsersIndex />
                </div>
            </div>
        );
    }
}

export default ChannelShow;
