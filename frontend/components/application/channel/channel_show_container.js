import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { getChannel } from "../../../actions/channel_actions";
import { createMessage, deleteMessage, receiveMessage, updateMessage } from "../../../actions/message_actions";
import { messagesFor } from "../../../util/message_selectors";
import ChannelShow from "./channel_show";

const mapStateToProps = (state, ownProps) => {
    const channelId = ownProps.match.params.channelId;
    let users = {};
    if(state.entities.channels[channelId]) {
        users = state.entities.channels[channelId].users || {};
    }
    return {
        channel: state.entities.channels[channelId],
        messages: messagesFor(state, "Channel", channelId),
        users: Object.values(users)
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        fetchChannel: () => dispatch(getChannel(ownProps.match.params.channelId)),
        createMessage: (message) => dispatch(createMessage(message)),
        updateMessage: (message) => dispatch(updateMessage(message)),
        deleteMessage: (messageId) => dispatch(deleteMessage(messageId)),
        receiveMessage: (message) => dispatch(receiveMessage(message))
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ChannelShow));