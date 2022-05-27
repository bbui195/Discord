import React from "react";
import { CSSTransition } from "react-transition-group";

class CreateChannelModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: ""
        }
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        this.setState({
            name: e.target.value.split(" ").join("-")
        });
    }

    render() {
        return (
        <CSSTransition
            in={this.props.showing}
            timeout={200}
            classNames={"confirmation"}
            onEnter= {()=>this.setState({name: ""})}
            onEntered={()=>
                document.getElementById("channel-name-input").focus()}
            mountOnEnter
            unmountOnExit
        >
            <div className="confirmation-modal-container">
                <div className="dim"
                    onClick={this.props.cancel}></div>
                <div className="confirmation-modal">
                    <form onSubmit={(e)=>{
                        e.preventDefault();
                        this.props.confirm(this.state.name);
                        }
                    }>
                    <div className="round">
                        <h1 className="header">Create Channel</h1>
                        <div className="label">CHANNEL NAME</div>
                        <div className="input-wrapper">
                            <input type="text" className="text-input"
                                id="channel-name-input"
                                placeholder="new-channel"
                                value={this.state.name}
                                onChange={this.handleChange}
                                />
                        </div>
                    </div>
                    <div className="confirm-options round">
                        <div className="cancel round"
                            onClick={this.props.cancel}
                        >Cancel</div>
                        <div className="confirm-text purple round"
                            onClick={()=>this.props.confirm(this.state.name)}
                        >Create Channel</div>
                    </div>
                    </form>
                </div>
            </div>
        </CSSTransition>
        );
    }
}

export default CreateChannelModal;