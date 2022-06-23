import React from "react";
import { CSSTransition } from "react-transition-group";

class CreateServerModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            createOptions: true,
            tellMore: false,
            customize: false,
            joinServer: false,
            publicServers: false,
            serverName: this.props.username + "'s server",
            inviteLink: "",
            fetched: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleCreate = this.handleCreate.bind(this);
        this.handleJoin = this.handleJoin.bind(this);
        if(props.modals.startModal) {
            this.state.createOptions = false;
            this.state[props.modals.startModal] = true;
        }
    }

    componentDidMount() {
        if(this.state.publicServers) {
            this.setState({
                fetched: true
            });
            this.props.fetchPublicServers();
        }
    }

    componentDidUpdate() {
        if(this.state.publicServers && !this.state.fetched) {
            this.setState({
                fetched: true
            });
            this.props.fetchPublicServers();
        }
    }

    toggleModal(name) {
        const modals = ["createOptions", "tellMore", "customize",
            "joinServer", "publicServers"]
        let newState = {};
        modals.forEach((key)=> {
            newState[key] = name === key;
        });
        return () => this.setState(newState);
    }

    handleChange(type) {
        return (e) =>
            this.setState({
                [type]: e.target.value
            });
    }

    handleJoin(e) {
        e.preventDefault();
        
    }

    handleCreate(e) {
        e.preventDefault();
        this.props.createServer({name: this.state.serverName})
            .then(this.props.closeModals);
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
                                    <div className="create-option" onClick={this.toggleModal("tellMore")}>
                                        Create My Own
                                    </div>
                                    <span className="cap-label">START FROM A TEMPLATE</span>
                                    {["Gaming", "School Club", "Study Group", "Friends",
                                        "Artists & Creators", "Local Community"].map(text=>(
                                            <div className="create-option" key={text}
                                                onClick={this.toggleModal("tellMore")}>{text}</div>
                                    ))}
                                </div>
                                <h2>Have an invite already?</h2>
                                <div className="join-server"
                                    onClick={this.toggleModal("joinServer")}
                                >
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
                                <div className="create-option" onClick={this.toggleModal("customize")}>
                                    For a club or community
                                </div>
                                <div className="create-option" onClick={this.toggleModal("customize")}>
                                    For me and my friends
                                </div>
                                <p className="unsure">Not sure? you can <span className="skip" onClick={this.toggleModal("customize")}>skip this question</span> for now.</p>
                                <span className="back" onClick={this.toggleModal("createOptions")}>Back</span>
                            </div>
                        </CSSTransition>
                        <CSSTransition
                            in={this.state.customize}
                            timeout={500}
                            classNames={"add-server-page"}
                            onEntered={(container)=> document.getElementById("server-name").focus()}
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
                                        onChange={this.handleChange("serverName")}
                                        value={this.state.serverName}
                                        />
                                    <p className="agree">By creating a server, you agree to Discord's <span className="guidelines">Community Guidelines</span></p>
                                    <span className="back" onClick={this.toggleModal("tellMore")}>Back</span>
                                    <button>Create</button>
                                </form>
                            </div>
                        </CSSTransition>

                        <CSSTransition
                            in={this.state.joinServer}
                            timeout={500}
                            classNames={"add-server-page"}
                            mountOnEnter
                            unmountOnExit
                        >
                            <div className="customize-server">
                                <div className="close-button" onClick={this.props.closeModals}>✕</div>
                                <h1>Join a Server</h1>
                                <p>Enter an invite below to join an existing server.</p>
                                <span className="cap-label">INVITE LINK</span>
                                <form onSubmit={this.handleJoin}>
                                    <input type="text" id="server-name"
                                        onChange={this.handleChange("inviteLink")}
                                        value={this.state.inviteLink}
                                        placeholder="hTKzmak"
                                        />
                                    <p></p>
                                    <div className="create-option public-index" onClick={this.toggleModal("publicServers")}>
                                        <i className="fa-solid fa-compass"/>Don't have an invite?
                                        <p>Check out public communities in Server Discovery.</p>
                                    </div>
                                    <span className="back" onClick={this.toggleModal("createOptions")}>Back</span>
                                    <button>Join Server</button>
                                </form>
                            </div>
                        </CSSTransition>

                        <CSSTransition
                            in={this.state.publicServers}
                            timeout={500}
                            classNames={"add-server-page"}
                            mountOnEnter
                            unmountOnExit
                        >
                            <div className="customize-server">
                                <div className="close-button" onClick={this.props.closeModals}>✕</div>
                                <h1>Public Servers</h1>
                                <p>Choose a public server to join.</p>
                                {/* <span className="cap-label">INVITE LINK</span> */}
                                <div className="options-container">
                                    {this.props.publicServers.map((server) => {
                                        return <div key={server.id}
                                            className="create-option"
                                            onClick={
                                                () => this.props.joinServer(server.id)
                                                    .then(()=> this.props.closeModals())
                                                    .then(()=> this.props.history.push(`/servers/${server.id}`))
                                            }
                                            >{server.name}</div>
                                    })}
                                    {/* <div className="create-option"> testing123</div>
                                    <div className="create-option"> testing123</div>
                                    <div className="create-option"> testing123</div>
                                    <div className="create-option"> testing123</div>
                                    <div className="create-option"> testing123</div>
                                    <div className="create-option"> testing123</div>
                                    <div className="create-option"> testing123</div>
                                    <div className="create-option"> testing123</div>
                                    <div className="create-option"> testing123</div>
                                    <div className="create-option"> testing123</div> */}
                                </div>
                                <span className="back" onClick={this.toggleModal("joinServer")}>Back</span>
                            </div>
                        </CSSTransition>
                    </div>
                </CSSTransition>
            </>
    }
}

export default CreateServerModal;