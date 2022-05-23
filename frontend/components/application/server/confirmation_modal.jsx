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
                    <div>
                        <h1>{this.props.title}</h1>
                        <p>{this.props.prompt}</p>
                    </div>
                    <div className="confirm-options">
                        <div className="cancel"
                            onClick={this.props.cancel}
                        >Cancel</div>
                        <div className="confirm-text"
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