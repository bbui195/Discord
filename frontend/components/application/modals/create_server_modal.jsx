import React from "react";
import { CSSTransition } from "react-transition-group";

class CreateServerModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            createOptions: true,
            tellMore: false,
            customize: false,
            serverName: this.props.username + "'s server"
        }
        this.tellMore = this.tellMore.bind(this);
        this.createOptions = this.createOptions.bind(this);
        this.customize = this.customize.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleCreate = this.handleCreate.bind(this);
    }

    createOptions() {
        this.setState({
            createOptions: true,
            tellMore: false,
            customize: false
        });
    }

    tellMore() {
        this.setState({
            createOptions: false,
            tellMore: true,
            customize: false
        });
    }

    customize() {
        this.setState({
            createOptions: false,
            tellMore: false,
            customize: true
        });
    }

    handleChange(e) {
        this.setState({
            serverName: e.target.value
        });
    }

    handleCreate(e) {
        e.preventDefault();
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
                                    <div className="create-option" onClick={this.tellMore}>
                                        Create My Own
                                    </div>
                                    <span className="cap-label">START FROM A TEMPLATE</span>
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
                                <div className="close-button" onClick={this.props.closeModals}>✕</div>
                                <h1>Tell us more about your server</h1>
                                <p>In order to help you with your setup, is your new server for just a few friends or a larger community?</p>
                                <div className="create-option" onClick={this.customize}>
                                    For a club or community
                                </div>
                                <div className="create-option" onClick={this.customize}>
                                    For me and my friends
                                </div>
                                <p className="unsure">Not sure? you can <span className="skip" onClick={this.customize}>skip this question</span> for now.</p>
                                <span className="back" onClick={this.createOptions}>Back</span>
                            </div>
                        </CSSTransition>
                        <CSSTransition
                            in={this.state.customize}
                            timeout={500}
                            classNames={"add-server-page"}
                            onEnter={(container)=> document.getElementById("server-name").focus()}
                            mountOnEnter
                            unmountOnExit
                        >
                            <div className="customize-server">
                                <div className="close-button" onClick={this.props.closeModals}>✕</div>
                                <h1>Customize your server</h1>
                                <p>Give your server a personality with a name and an icon. You can always change it later.</p>
                                <span className="cap-label">SERVER NAME</span>
                                <form onSubmit={this.handleCreate}>
                                    <input type="text" id="server-name"
                                        onChange={this.handleChange}
                                        value={this.state.serverName}
                                        />
                                    <p className="agree">By creating a server, you agree to Discord's <span className="guidelines">Community Guidelines</span></p>
                                    <span className="back" onClick={this.tellMore}>Back</span>
                                    <button>Create</button>
                                </form>
                            </div>
                        </CSSTransition>
                    </div>
                </CSSTransition>
            </>
    }
}

export default CreateServerModal;