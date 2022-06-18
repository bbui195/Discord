import React from "react";


class UserOptions extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <div>
            <div>pfp</div>
            <div>username</div>
            <i className="fa-solid fa-microphone"></i>
            <i className="fa-solid fa-headphones"></i>
            <i className="fa-solid fa-gear"></i>
        </div>
    }
}

export default UserOptions;