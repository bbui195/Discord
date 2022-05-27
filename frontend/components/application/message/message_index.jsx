import React from "react";
import ConfirmationModal from "../server/confirmation_modal";

class MessageIndex extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            message: "",
            creating: true,
            messageable: {},
            editing: undefined,
            editMessage: "",
            focusEdit: false,
            deleteModal: false,
            deleteMessage: undefined
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.handleEditSubmit = this.handleEditSubmit.bind(this);
        this.submitEdit = this.submitEdit.bind(this);
        this.stopEdit = this.stopEdit.bind(this);
    }

    handleChange(type) {
        return (e) => this.setState({[type]: e.target.value});
    }

    handleSubmit(e) {
        e.preventDefault();
        if(this.state.creating && this.state.message !== "") {
            this.props.createMessage({
                body: this.state.message,
                messageable_id: this.props.messageable.id,
                messageable_type: this.props.messageable.type
            })
            // .then(() => this.setState({message: ""}));
            this.setState({message: ""});
        };
    }

    submitEdit() {
        if(this.state.editMessage !== "") {
            this.props.updateMessage({
                id: this.state.editing,
                body: this.state.editMessage,
                messageable_id: this.props.messageable.id,
                messageable_type: this.props.messageable.type
            });
            this.stopEdit();
        }
    }

    handleEditSubmit(e) {
        if(e.key === "Enter") {
            this.submitEdit();
        }
    }

    focus() {
        let input = document.getElementsByClassName("message-input")[0];
        if(!input) {
            return;
        }
        this.setState({
            messageable: this.props.messageable,
            message: ""
        });
        input.focus();
    }

    stopEdit() {
        this.setState({
            editing: undefined,
            editMessage: "",
        });
    }

    handleKeyDown(e) {
        if(e.key === "Escape") {
            this.stopEdit();
        }
    }

    componentDidMount() {
        this.focus();
        document.addEventListener("keydown", this.handleKeyDown);
    }

    componentWillUnmount() {
        document.removeEventListener("keydown", this.handleKeyDown);
    }

    componentDidUpdate() {
        if(this.state.messageable.id !== this.props.messageable.id
            || this.state.messageable.type !== this.props.messageable.type) {
            this.focus();
        }
        if(this.state.focusEdit) {
            document.getElementsByClassName("edit-input")[0].focus();
            this.setState({
                focusEdit: false
            })
        }
    }

    handleEditClick(message) {
        return (e) => this.setState({
            editing: message.id,
            editMessage: message.body,
            focusEdit: true
        });
    }

    editLast() {
        let msg = undefined;
        this.props.messages.forEach((message) => {
            if(message.senderId === this.props.currentUserId) {
                msg = message;
            }
        });
        this.setState({
            editing: msg.id,
            editMessage: msg.body,
            focusEdit: true
        });
    }

    render() {
        return (
            <>
            <ConfirmationModal
                title={(`Delete Message`)}
                prompt={`Are you sure you want to delete this message?`}
                render={()=> this.state.deleteMessage ?
                    <div className="message">
                        <div className="profile"><i className="fa-brands fa-discord"/></div>
                        <span className="username">{this.state.deleteMessage.username}</span>
                        <span className="time">{this.state.deleteMessage.time}</span>
                        <div className="body">{this.state.deleteMessage.body}</div>
                    </div> : null
                }
                confirmText="Delete"
                showing={this.state.deleteModal}
                cancel={()=>this.setState({deleteModal: false})}
                confirm={()=>{
                        this.props.deleteMessage(this.state.deleteMessage.id);
                        this.setState({
                            deleteModal: false,
                            deleteMessage: undefined
                        });
                    }
                }
            />
            <div className={("message-index" + (this.props.messageable.type==="User"?" direct-messages":""))}>
                <form
                    onSubmit={this.handleSubmit}
                >
                    <div className="messages-wrapper">
                        <div className="messages">
                            {this.props.messages.map((message) => {
                                // return <p key={message.id}>{message.username}: {message.body}</p>
                                return <div key={message.id}
                                    className={("message" +
                                        (this.state.editing === message.id ? " editing" : ""))}>
                                    <div className="profile"><i className="fa-brands fa-discord"/></div>
                                    <span className="username">{message.username}</span>
                                    <span className="time">{message.time}</span>
                                    {this.state.editing === message.id ?
                                        <>
                                        <input type="text" className="edit-input"
                                            value={this.state.editMessage}
                                            onChange={this.handleChange("editMessage")}
                                            onKeyDown={this.handleEditSubmit}/>
                                            <div className="edit-label">escape to&nbsp;
                                                <span onClick={this.stopEdit}
                                                >cancel</span> • enter to&nbsp;
                                                <span onClick={this.submitEdit}
                                                >save</span></div>
                                        </>
                                        : <div className="body">{message.body}</div>}
                                    {this.props.owner || message.senderId === this.props.currentUserId ?
                                        <div className="edit-options">
                                            {message.senderId === this.props.currentUserId ?
                                                <div className="edit" name="Edit"
                                                    onClick={this.handleEditClick(message)}
                                                >
                                                    <i className="fa-solid fa-pencil"></i>
                                                </div>
                                            : null}
                                            <div className="delete" name="Delete"
                                                onClick={()=>{
                                                    this.setState({
                                                        deleteModal: true,
                                                        deleteMessage: message
                                                    });
                                                }}
                                            ><i className="fa-solid fa-trash-can"></i></div>
                                            
                                        </div> : null
                                    }
                                </div>
                            })}
                        </div>
                    </div>
                    <input type="text" className="message-input"
                        placeholder={`Message ${this.props.messageable.type==="User"?"@":"#"}${this.props.channel.name}`}
                        value={this.state.message}
                        onChange={this.handleChange("message")}
                        onKeyDown={(e) => e.key === "ArrowUp" ? this.editLast() : null}
                    />
                </form>
            </div>
            </>
        );
    }
}

export default MessageIndex;
