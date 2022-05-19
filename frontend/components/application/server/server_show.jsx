import React from "react";
import { CSSTransition } from "react-transition-group";

class ServerShow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            options: false
        };
        this.toggleOptions = this.toggleOptions.bind(this);
    }

    toggleOptions() {
        this.setState({options: !this.state.options})
    }

    componentDidMount() {
        this.props.fetchServer();
    }

    render() {
        if(!this.props.server) {
            return;
        }
        return (
            <div className="main">
                <div className="channel-index">
                    <div className="server-options" onClick={this.toggleOptions}>
                        {this.props.server.name}
                        <span>{this.state.options? "X" : "V"}</span>
                        {/* <CSSTransition>

                        </CSSTransition> */}
                    </div>
                    
                </div>

                <div className="main-show">

                </div>
            </div>
        );
    }
}

export default ServerShow;