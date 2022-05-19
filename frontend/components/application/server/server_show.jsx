import React from "react";

class ServerShow extends React.Component {

    componentDidMount() {
        this.props.fetchServer();
    }

    render() {
        if(!this.props.server) {
            return;
        }
        return (
            <div className="main">
                <div className="channel-index">
                    <div className="server-options">{this.props.server.name}</div>
                    
                </div>

                <div className="main-show">

                </div>
            </div>
        );
    }
}

export default ServerShow;