import React from "react";
import { NavLink } from "react-router-dom";
import { Switch } from "react-router-dom";
import { Route } from "react-router-dom";
import MessageIndex from "../message/message_index";


class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: undefined
        };
    }
    
    fetchMessages() {
        if(this.props.user.id !== -1 && this.props.user !== this.state.user) {
            this.props.getMessagesWith();
            this.setState({
                user: this.props.user
            });
        }
    }

    componentDidUpdate() {
        this.fetchMessages();
    }

    componentDidMount() {
        this.props.getUsers();
        this.fetchMessages();
    }

    render() {
        return (
            <div className="main">
                <div className="channel-index">
                    <div className="home-index">Friends</div>
                    <div className="channel-users-index">
                    {this.props.users.map((user) => {
                        return <NavLink to={`/users/${user.id}`}
                            key={user.id}>
                            <div className="user-index-item">
                                <div className="profile">
                                    <i className="fa-brands fa-discord"/>
                                </div>
                                <div className="username">
                                    {user.username}
                                </div>
                            </div>
                        </NavLink>
                    })}
                    </div>
                </div>
                <div className="main-show">
                    {/* <MessageIndex
                        {...this.props}
                        messageable={{
                            type: "User",
                            id: this.props.channel.id
                        }}
                    /> */}
                    <div className="channel-top-bar"></div>
                    <Switch>
                        <Route path="/users/:userId" render={()=>{
                            return <MessageIndex 
                                {...this.props}
                                messageable={{
                                    type: "User",
                                    id: this.props.user.id
                                }}
                            />
                        }} />
                        <Route path="/" render={()=>null} />
                    </Switch>
                </div>
            </div>
        );
    }
}

export default Home;
