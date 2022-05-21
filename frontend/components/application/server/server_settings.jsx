import React from "react";
import { CSSTransition } from "react-transition-group";
import ConfirmationModal from "./confirmation_modal";
import SettingsIndexItem from "./settings_index_item";
import SettingsUnsaved from "./settings_unsaved";

class ServerSettings extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: "Overview",
            name: this.props.server.name,
            unsaved: false,
            deleteModal: false
        };
        this.handleClick = this.handleClick.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.resetSettings = this.resetSettings.bind(this);
        this.saveSettings = this.saveSettings.bind(this);
    }

    handleClick(e) {
        if(e.target.innerHTML === "Delete Server") {
            return;
        }
        if(e.target.className === "settings-index-item") {
            this.setState({
                selected: e.target.innerHTML
            });
        }
    }

    handleKeyDown(e) {
        if(e.key === "Escape") {
            this.props.toggleServerSettings();
        }
    }
    
    handleChange(type) {
        return (e) => {    
            this.setState({
                [type]: e.target.value,
            });
        }
    }

    componentDidUpdate() {
        let unsaved = false;
        //check unsaved
        if(this.state.name !== this.props.server.name) {
            unsaved = true;
        }
        if(unsaved !== this.state.unsaved) {
            this.setState({
                unsaved
            })
        }
    }

    resetSettings() {
        this.setState({
            name: this.props.server.name
        });
    }

    saveSettings() {
        let newServer = Object.assign({}, this.props.server, {name: this.state.name});
        this.props.saveServer(newServer);
    }

    componentDidMount() {
        document.addEventListener("keydown", this.handleKeyDown);
    }

    componentWillUnmount() {
        document.removeEventListener("keydown", this.handleKeyDown);
    }

    render() {
        return (
            <div className="settings">
                <ConfirmationModal
                    title={(`Delete '${this.props.server.name}'`)}
                    prompt={`Are you sure you want to delete ${this.props.server.name}? This action cannot be undone.`}
                    confirmText="Delete Server"
                    showing={this.state.deleteModal}
                    cancel={()=>this.setState({deleteModal: false})}
                    confirm={()=>
                        this.props.deleteServer(this.props.server.id)
                            .then(()=>this.props.history.push("/"))
                    }
                />

                <div className="settings-left">
                    <div className="settings-index"
                        onClick={this.handleClick}
                    >
                        <div className="text-label">{this.state.name}</div>
                        <SettingsIndexItem name="Overview" selected={this.state.selected}/>
                        <SettingsIndexItem name="Roles" selected={this.state.selected}/>
                        <SettingsIndexItem name="Emoji" selected={this.state.selected}/>
                        <SettingsIndexItem name="Stickers" selected={this.state.selected}/>
                        <SettingsIndexItem name="Delete Server"
                            selected={this.state.selected}
                            onClick={()=>this.setState({deleteModal: true})}
                        />
                    </div>
                </div>
                <div className="settings-information">
                    <div className="information-container">
                        <h1>{this.state.selected}</h1>
                        <div className="close-button" onClick={this.props.toggleServerSettings}>x</div>
                        {this.state.selected === "Overview"? 
                            <>
                                <div className="text-label">SERVER NAME</div>
                                <input type="text"
                                    className="text-input"
                                    value={this.state.name}
                                    onChange={this.handleChange("name")}
                                />
                            </>
                        : null}
                    <CSSTransition
                        in={this.state.unsaved}
                        timeout={300}
                        classNames={"unsaved"}
                        mountOnEnter
                        unmountOnExit
                    >
                        <SettingsUnsaved reset={this.resetSettings} save={this.saveSettings}/>
                    </CSSTransition>
                    </div>
                </div>
            </div>
        )
    }
}

export default ServerSettings;
