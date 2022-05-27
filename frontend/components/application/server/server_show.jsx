import React from "react";
import { CSSTransition } from "react-transition-group";
import ChannelIndexContainer from "../channel/channel_index_container";
import ChannelShowContainer from "../channel/channel_show_container";
import ConfirmationModal from "./confirmation_modal";
import CreateChannelModal from "./create_channel_modal";
import ServerSettings from "./server_settings";
import SettingsModal from "./settings_modal";

class ServerShow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            options: false,
            settings: false,
            createChannel: false,
            leaveServerModal: false
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
                }
            );
            this.props.fetchServer();
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
                <ConfirmationModal
                    title={(`Leave '${this.props.server.name}'`)}
                    prompt={`Are you sure you want to leave ${this.props.server.name}? You won't be able to rejoin this server unless you are reinvited.`}
                    confirmText="Leave Server"
                    showing={this.state.leaveServerModal}
                    cancel={()=>this.setState({leaveServerModal: false})}
                    confirm={()=>this.props.leaveServer()
                            .then(() => this.props.history.push("/"))
                    }
                />
                <div className="channel-index">
                    <div
                        className={"server-options" + (this.state.options? " open" : "")}
                        onClick={this.toggleOptions}
                    >
                        {this.props.server.name}
                        <span className="toggle-icon">
                            {this.state.options? <i className="fa-solid fa-xmark"/> : <i className="fa-solid fa-angle-down"/>}</span>
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
                                    onClick={ () =>
                                        this.setState({leaveServerModal: true})
                                        // ()=> this.props.leaveServer()
                                        //     .then(() => this.props.history.push("/"))
                                    }
                                    >Leave Server <i className="fa-solid fa-arrow-right-from-bracket"/></div>
                            </div>
                        </CSSTransition>
                        {/* <CSSTransition
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
                        </CSSTransition> */}
                        <SettingsModal 
                            name={this.props.server.name}
                            showing={this.state.settings}
                            toggleSettings={this.toggleServerSettings}
                            delete={{
                                title: `Delete '${this.props.server.name}'`,
                                prompt: `Are you sure you want to delete ${this.props.server.name}? This action cannot be undone.`,
                                confirmText: "Delete Server",
                                action: ()=> this.props.deleteServer(this.props.server.id)
                                    .then(()=>this.props.history.push("/"))
                            }}
                            tabs={[
                                {
                                    name: "Overview",
                                    render: function() {
                                        return <>
                                            <div className="text-label">SERVER NAME</div>
                                            <input type="text"
                                                className="text-input"
                                                value={this.state.name}
                                                onChange={this.handleChange("name")}
                                            />
                                        </>
                                    }
                                },
                                {
                                    name: "Delete Server",
                                    render: () => null
                                }
                            ]}
                            item={this.props.server}
                            saveItem={this.props.saveServer}
                        />
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
                    confirm={(name)=>
                        this.props.createChannel({
                            server_id: this.props.server.id,
                            name
                        }).then(this.toggleCreateChannel)
                        // this.toggleCreateChannel()
                    }
                />
            </div>
        );
    }
}

export default ServerShow;

