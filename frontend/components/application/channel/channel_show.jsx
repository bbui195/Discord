import React from "react";


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
        if(!this.props.messages) {
            return;
        }
        return (
            <div>
                
            </div>
        );
    }
}

export default ChannelShow;