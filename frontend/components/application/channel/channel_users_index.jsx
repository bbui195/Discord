import React from "react";

class ChannelUsersIndex extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        if(this.props.users.length === 0) {
            return;
        }
        return (
            <div className="channel-users-index">
                <div className="label">USERS &#8212; {this.props.users.length}</div>
                {this.props.users.map((user) => {
                    return <div className="user-index-item" key={user.id}>
                        <div className="profile">
                            <i className="fa-brands fa-discord"/>
                        </div>
                        <div className="username">
                            {user.username}
                        </div>
                        <div className="dm-dropdown">
                            Direct Message
                        </div>
                    </div>
                })}
            </div>
        );
    }
}

export default ChannelUsersIndex;