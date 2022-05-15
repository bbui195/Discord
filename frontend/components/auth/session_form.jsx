import React from "react";
import { Link } from "react-router-dom";

class SessionForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        const user = Object.assign({}, this.state);
        this.props.processForm(user);
    }

    handleChange(type) {
        return (e) => {
            this.setState({
                [type]: e.target.value
            });
        }
    }

    componentDidMount() {
        document.getElementById("username").focus();
    }
    
    render() {
        return (
            <form id="session-form" onSubmit={this.handleSubmit}>
                <h2>{this.props.formType === "login" ? "Welcome back!" : "Create an account"}</h2>
                {this.props.formType === "login" ? 
                    <h3>We're so excited to see you again!</h3> : null}
                <label htmlFor="username">Username</label>
                <input id="username" type="text" value={this.state.username} onChange={this.handleChange("username")}/>

                <label htmlFor="password">Password</label>
                <input id="password" type="password" value={this.state.password} onChange={this.handleChange("password")} />
                <button>{this.props.formType === "login" ? "Login" : "Continue"}</button>
                <p>
                    {this.props.formType === "login" ? "Need an account? " : null}
                    <Link to={this.props.formType === "login" ? "/signup" : "/login"}>
                        {this.props.formType === "login" ? "Register" : "Already have an account?"}
                    </Link>
                </p>
            </form>
        );  
    }
}

export default SessionForm;