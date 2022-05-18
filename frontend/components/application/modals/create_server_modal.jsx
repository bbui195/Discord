import React from "react";
import { CSSTransition } from "react-transition-group";

class CreateServerModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            createOptions: true,
            tellMore: false
        }
        this.tellMore = this.tellMore.bind(this);
        this.createOptions = this.createOptions.bind(this);
    }

    createOptions() {
        this.setState({
            createOptions: true,
            tellMore: false
        },()=>console.log(this.state));
    }

    tellMore() {
        this.setState({
            createOptions: false,
            tellMore: true
        },()=>console.log(this.state));
    }

    render() {
        return <>
                <CSSTransition
                    in={true}
                    appear={true}
                    timeout={500}
                    classNames={"dim-transition"}
                >
                    <div className="modal-dim" onClick={this.props.closeModals}></div>
                </CSSTransition>

                <CSSTransition
                    in={true}
                    appear={true}
                    timeout={500}
                    classNames={"add-modal-transition"}
                >
                    <div id="add-server">
                        <CSSTransition
                            in={this.state.createOptions}
                            timeout={500}
                            classNames={"add-server-page"}
                            mountOnEnter
                            unmountOnExit
                        >
                            <div className="create-options">
                                <h1>Create a server</h1>
                                <div className="close-button" onClick={this.props.closeModals}>✕</div>
                                <p>Your server is where you and your friends hang out. Make yours and start talking.</p>
                                <div className="options-container">
                                    <div className="create-option">
                                        Create My Own
                                    </div>
                                    <span>START FROM A TEMPLATE</span>
                                    {["Gaming", "School Club", "Study Group", "Friends",
                                        "Artists & Creators", "Local Community"].map(text=>(
                                            <div className="create-option" key={text}
                                                onClick={this.tellMore}>{text}</div>
                                    ))}
                                </div>
                                <h2>Have an invite already?</h2>
                                <div className="join-server">
                                    Join a Server
                                </div>
                            </div>
                        </CSSTransition>
                        <CSSTransition
                            in={this.state.tellMore}
                            timeout={500}
                            classNames={"add-server-page"}
                            mountOnEnter
                            unmountOnExit
                        >
                            <div className="tell-more">
                                <h1>Tell us more about your server</h1>
                                <p>In order to help you with your setup, is your new server for just a few friends or a larger community?</p>
                                <div className="create-option" onClick={this.createOptions}>
                                    For a club or community
                                </div>
                                <div className="create-option" onClick={this.createOptions}>
                                    For me and my friends
                                </div>
                            </div>
                        </CSSTransition>
                    </div>
                </CSSTransition>
            </>
    }
}

export default CreateServerModal;