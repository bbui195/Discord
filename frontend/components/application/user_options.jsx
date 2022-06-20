import React from "react";
import { connect } from "react-redux";
import { logout } from "../../actions/session_actions";
import SettingsModal from "./server/settings_modal";

const mapStateToProps = (state) => {
    return {
        username: state.session.username
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        logout: () => dispatch(logout()),
    };
};

class UserOptions extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            settings: false
        }
        this.toggleChannelSettings = this.toggleChannelSettings.bind(this);
    }

    toggleChannelSettings() {
        this.setState({
            settings: false
        });
    }

    render() {
        return <div className="index-user">
            <div className="profile-container">
                <div className="profile"><i className="fa-brands fa-discord"/></div>
                <div className="username">{this.props.username}</div>
            </div>
            <div className="buttons-container">
                <i className="fa-solid fa-microphone"></i>
                <i className="fa-solid fa-headphones"></i>
                <i className="fa-solid fa-gear"
                    onClick={()=>this.setState({settings: true})}
                ></i>
            </div>
            <SettingsModal 
                name="USER SETTINGS"
                username={this.props.username}
                showing={this.state.settings}
                toggleSettings={this.toggleChannelSettings}
                delete={{
                    title: `Log Out`,
                    prompt: `Are you sure you want to log out?`,
                    confirmText: "Log Out",
                    action: ()=> {
                        console.log(this.props);
                        this.props.logout()
                    }
                }}
                tabs={[
                    {
                        name: "My Account",
                        render: function() {
                            return <>
                                <div className="text-label">USERNAME</div>
                                <input type="text"
                                    className="text-input"
                                    value={this.state.username}
                                    onChange={this.handleChange("username")}
                                />
                                {this.props.username === "demo-user" ? 
                                <div className="cannot-change">
                                    Editing disabled for demo account
                                </div>
                                : null}
                            </>
                        }
                    },
                    {
                        name: "Log Out",
                        render: () => null
                    }
                ]}
                item={this.state.channel}
                saveItem={this.props.updateChannel}
            />
        </div>
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserOptions);