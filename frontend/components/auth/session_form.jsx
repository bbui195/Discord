import React, { useState } from "react";
import { Link } from "react-router-dom";
import { CSSTransition } from "react-transition-group";

class SessionForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.demoLogin = this.demoLogin.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        if(this.props.errors.username || this.props.errors.password) {
            this.props.resetErrors();
        }
        let errors = {};
        let errored = false;
        Object.keys(this.state).forEach((key) => {
            if(!this.state[key]) {
                errors[key] = "required"
                errored = true;
            }
        });
        if(errored) {
            this.props.receiveErrors(errors);
            return;
        }

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
        this.props.resetErrors();
        document.getElementById("username").focus();
    }

    demoLogin() {
        this.props.processForm({
            username: "demo-user",
            password: "demo-password"
        })
    }
    
    render() {
        return (
            <>
            <img src="assets/login_background.svg" className = "login-background"/>
            <CSSTransition
                in={true}
                appear={true}
                timeout={300}
                classNames={"form-transition"}
                enter={false}
            >
            <form id="session-form" onSubmit={this.handleSubmit}>
                <h2>{this.props.formType === "login" ? "Welcome back!" : "Create an account"}</h2>
                {this.props.formType === "login" ? 
                    <h3>We're so excited to see you again!</h3> : null}
                <label htmlFor="username"
                    className={this.props.errors.username}
                    >Username</label>
                <input id="username" type="text"
                    value={this.state.username}
                    onChange={this.handleChange("username")}
                />

                <label htmlFor="password"
                    className={this.props.errors.password}
                    >Password</label>
                <input id="password" type="password"
                    value={this.state.password}
                    onChange={this.handleChange("password")}
                />

                {this.props.formType === "login" ? 
                    <a className="demo" onClick={this.demoLogin}>Demo login</a> : null}

                <button>{this.props.formType === "login" ? "Login" : "Continue"}</button>
                <p>
                    {this.props.formType === "login" ? "Need an account? " : null}
                    <Link to={this.props.formType === "login" ? "/signup" : "/login"}>
                        {this.props.formType === "login" ? "Register" : "Already have an account?"}
                    </Link>
                </p>
            </form>
            </CSSTransition>
            </>
        );  
    }
}

export default SessionForm;