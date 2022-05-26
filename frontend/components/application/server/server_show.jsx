import React from "react";
import { CSSTransition } from "react-transition-group";
import ChannelIndexContainer from "../channel/channel_index_container";
import ChannelShowContainer from "../channel/channel_show_container";
import CreateChannelModal from "./create_channel_modal";
import ServerSettings from "./server_settings";

class ServerShow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            options: false,
            settings: false,
            createChannel: false
        };
        this.toggleOptions = this.toggleOptions.bind(this);
        this.toggleServerSettings = this.toggleServerSettings.bind(this);
        this.toggleCreateChannel = this.toggleCreateChannel.bind(this);
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

    toggleCreateChannel() {
        this.setState({createChannel: !this.state.createChannel})
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
                        <span>{this.state.options? <i className="fa-solid fa-xmark"/> : <i className="fa-solid fa-angle-down"/>}</span>
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
                                        onClick={this.toggleServerSettings}>Server Settings<i className="fa-solid fa-gear"/></div>
                                    <div className="dropdown-button"
                                        onClick={this.toggleCreateChannel}
                                        >Create Channel<i className="fa-solid fa-circle-plus"/></div>
                                    </>
                                : null }
                                <div className="dropdown-button leave"
                                    onClick={
                                        ()=> this.props.leaveServer()
                                            .then(() => this.props.history.push("/"))
                                    }
                                    >Leave Server <i className="fa-solid fa-arrow-right-from-bracket"/></div>
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
                                saveServer={this.props.saveServer}
                                deleteServer={this.props.deleteServer}
                                history={this.props.history}
                            />
                        </CSSTransition>
                    </div>
                    {/* channel index here  */}
                    <ChannelIndexContainer />
                </div>

                <div className="main-show">
                    <ChannelShowContainer 
                        cable={this.props.cable}
                        owner={this.props.owner}
                        currentUserId={this.props.currentUserId}
                    />
                </div>

                <CreateChannelModal 
                    showing={this.state.createChannel}
                    cancel={this.toggleCreateChannel}
                    confirm={()=>
                        console.log("making channel")
                        // this.toggleCreateChannel()
                    }
                />
            </div>
        );
    }
}

export default ServerShow;
