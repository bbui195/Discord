import React from "react";

class MessageIndex extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        console.log("submitting");
    }

    render() {
        return (
            <div className="message-index">
                <form
                    onSubmit={this.handleSubmit}
                >
                    <div className="messages">
                        {this.props.messages.map((message) => {
                            return <p>{message}</p>
                        })}
                    </div>
                    <input type="text" className="message-input"
                        placeholder={`Message #${this.props.channel.name}`}/>
                </form>
            </div>
        );
    }
}

export default MessageIndex;