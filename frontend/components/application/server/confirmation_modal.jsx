import React from "react";
import { CSSTransition } from "react-transition-group";

class ConfirmationModal extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
        <CSSTransition
            in={this.props.showing}
            timeout={200}
            classNames={"confirmation"}
            mountOnEnter
            unmountOnExit
        >
            <div className="confirmation-modal-container">
                <div className="dim"
                    onClick={this.props.cancel}></div>
                <div className="confirmation-modal">
                    <div className="round">
                        <h1 className="header">{this.props.title}</h1>
                        <p className="question">{this.props.prompt}</p>
                        {this.props.render ? this.props.render() : null}
                    </div>
                    <div className="confirm-options round">
                        <div className="cancel round"
                            onClick={this.props.cancel}
                        >Cancel</div>
                        <div className="confirm-text round"
                            onClick={this.props.confirm}
                        >{this.props.confirmText}</div>
                    </div>
                </div>
            </div>
        </CSSTransition>
        );
    }
}

export default ConfirmationModal;