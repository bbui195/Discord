import { connect } from "react-redux";
import { createMessage, deleteMessage, getMessagesWith, updateMessage } from "../../../actions/message_actions";
import { getUsers } from "../../../actions/user_actions";
import { messagesFor } from "../../../util/message_selectors";
import { exceptCurrentUser } from "../../../util/user_selectors";
import Home from "./home";

const mapStateToProps = (state, ownProps) => {
    let user = {id: -1, username: "Loading..."};
    let id = ownProps.match.params.userId;
    if(id) {
        user = state.entities.users[id] || {id: -1, username: "Loading..."};
    }
    return {
        // map friends and direct messages here
        users: exceptCurrentUser(state),
        user: user,
        messages: messagesFor(state, "User", id),
        channel: {name: user.username},
        currentUserId: state.session.id
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        getUsers: () => dispatch(getUsers()),
        getMessagesWith: () => dispatch(getMessagesWith(ownProps.match.params.userId)),
        createMessage: (message) => dispatch(createMessage(message)),
        updateMessage: (message) => dispatch(updateMessage(message)),
        deleteMessage: (messageId) => dispatch(deleteMessage(messageId))

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
