import React from "react";
import { CSSTransition } from "react-transition-group";
import ServerSettings from "./server_settings";

class ServerShow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            options: false,
            settings: false
        };
        this.toggleOptions = this.toggleOptions.bind(this);
        this.toggleServerSettings = this.toggleServerSettings.bind(this);
    }

    toggleOptions(e) {
        if(e.target.className.startsWith("server-options")) {
            this.setState({options: !this.state.options})
        }
    }

    componentDidMount() {
        this.props.fetchServer();
    }

    componentDidUpdate() {
        if(!this.props.server) {
            return;
        }
        if(this.state.serverId !== this.props.server.id) {
            this.setState(
                {
                    options: false,
                    serverId: this.props.server.id
                });
        }
    }

    toggleServerSettings() {
        this.setState({settings: !this.state.settings})
    }

    render() {
        if(!this.props.server) {
            return;
        }
        return (
            <div className="main">
                <div className="channel-index">
                    <div
                        className={"server-options" + (this.state.options? " open" : "")}
                        onClick={this.toggleOptions}
                    >
                        {this.props.server.name}
                        <span>{this.state.options? "X" : "V"}</span>
                        <CSSTransition
                            in={this.state.options}
                            timeout={200}
                            classNames={"options-dropdown"}
                            mountOnEnter
                            unmountOnExit
                        >
                            <div className="server-options-dropdown">
                                {this.props.owner? 
                                    <>
                                    <div className="dropdown-button"
                                        onClick={this.toggleServerSettings}>Server Settings</div>
                                    <div className="dropdown-button">Create Channel</div>
                                    </>
                                : null }
                                <div className="dropdown-button">Leave Server</div>
                            </div>
                        </CSSTransition>
                        <CSSTransition
                            in={this.state.settings}
                            timeout={500}
                            classNames={"settings-transition"}
                            mountOnEnter
                            unmountOnExit
                        >
                            <ServerSettings
                                server={this.props.server}
                                toggleServerSettings={this.toggleServerSettings}
                            />
                        </CSSTransition>
                    </div>
                    
                </div>

                <div className="main-show">

                </div>
            </div>
        );
    }
}

export default ServerShow;