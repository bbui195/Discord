import React from "react";
import SettingsIndexItem from "./settings_index_item";

class ServerSettings extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: "Overview"
        };
        this.handleClick = this.handleClick.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
    }

    handleClick(e) {
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

    componentDidMount() {
        document.addEventListener("keydown", this.handleKeyDown);
    }

    componentWillUnmount() {
        document.removeEventListener("keydown", this.handleKeyDown);
    }

    render() {
        return (
            <div className="settings">
                <div className="settings-left">
                    <div className="settings-index"
                        onClick={this.handleClick}
                    >
                        <div className="settings-label">TEST</div>
                        <SettingsIndexItem name="Overview" selected={this.state.selected}/>
                        <SettingsIndexItem name="Roles" selected={this.state.selected}/>
                        <SettingsIndexItem name="Emoji" selected={this.state.selected}/>
                        <SettingsIndexItem name="Stickers" selected={this.state.selected}/>
                    </div>
                </div>
                <div className="settings-information">
                    <div className="information-container">
                        <h1>{this.state.selected}</h1>
                        <div className="close-button" onClick={this.props.toggleServerSettings}>x</div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ServerSettings;