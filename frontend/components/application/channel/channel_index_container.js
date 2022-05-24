import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { createChannel, deleteChannel, updateChannel } from "../../../actions/channel_actions";
import ChannelIndex from "./channel_index";

const mapStateToProps = (state, ownProps) => {
    return {
        channels: Object.values(state.entities.channels)
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        createChannel: (channel) => dispatch(createChannel(channel)),
        deleteChannel: (channelId) => dispatch(deleteChannel(channelId)),
        updateChannel: (channel) => dispatch(updateChannel(channel))
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ChannelIndex));