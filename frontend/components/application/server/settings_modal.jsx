import React from "react";
import { CSSTransition } from "react-transition-group";
import ConfirmationModal from "./confirmation_modal";
import SettingsIndexItem from "./settings_index_item";
import SettingsUnsaved from "./settings_unsaved";

class SettingsModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: this.props.tabs[0].name,
            name: this.props.name,
            unsaved: false,
            deleteModal: false,
            item: this.props.item
        };
        this.handleClick = this.handleClick.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.resetSettings = this.resetSettings.bind(this);
        this.saveSettings = this.saveSettings.bind(this);
    }

    handleClick(e) {
        if(e.target.innerHTML === this.props.tabs[this.props.tabs.length - 1].name) {
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
            this.props.toggleSettings();
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
        if(this.state.name !== this.props.name) {
            unsaved = true;
        }
        if(this.props.item !== this.state.item) {
            this.setState({
                item: this.props.item,
                name: this.props.name,
                unsaved: false
            });
        }
        else if(unsaved !== this.state.unsaved) {
            this.setState({
                unsaved
            });
        }
    }

    resetSettings() {
        this.setState({
            name: this.props.name
        });
    }

    saveSettings() {
        let newItem = Object.assign({}, this.props.item, {name: this.state.name});
        this.props.saveItem(newItem);
    }

    componentDidMount() {
        document.addEventListener("keydown", this.handleKeyDown);
    }

    componentWillUnmount() {
        document.removeEventListener("keydown", this.handleKeyDown);
    }

    render() {
        return (
            <CSSTransition
                in={this.props.showing}
                timeout={500}
                classNames={"settings-transition"}
                mountOnEnter
                unmountOnExit
            >
            <div className="settings">
                <ConfirmationModal
                    title={this.props.delete.title}
                    prompt={this.props.delete.prompt}
                    confirmText={this.props.delete.confirmText}
                    showing={this.state.deleteModal}
                    cancel={()=>this.setState({deleteModal: false})}
                    confirm={()=>{
                        this.props.delete.action()
                            .then(()=>this.setState({
                                deleteModal: false,
                                unsaved: false
                            }))
                    }}
                />

                <div className="settings-left">
                    <div className="settings-index"
                        onClick={this.handleClick}
                    >
                        <div className="text-label">{this.state.name}</div>
                        {this.props.tabs.map((tab, ind) => {
                            return <SettingsIndexItem
                                key={ind}
                                name={tab.name}
                                selected={this.state.selected}
                                onClick={()=>ind === this.props.tabs.length - 1 ?
                                    this.setState({deleteModal: true}) : null}/>
                        })}
                    </div>
                </div>
                <div className="settings-information">
                    <div className="information-container">
                        <h1>{this.state.selected}</h1>
                        <div className="close-button" onClick={this.props.toggleSettings}><i className="fa-solid fa-x"/></div>
                        {this.props.tabs.map((tab, ind) => {
                                return <div key={ind}>
                                {tab.name === this.state.selected ?
                                tab.render.call(this) : null}
                                </div>
                            }
                        )}
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
            </CSSTransition>
        )
    }
}

export default SettingsModal;
