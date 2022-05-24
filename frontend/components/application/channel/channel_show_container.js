import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import ChannelShow from "./channel_show";

const mapStateToProps = (state, ownProps) => {
    console.log(ownProps);
    return {
        channel: state.entities.channels[ownProps.match.params.channelId],
        messages: []
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        getMessages: () => () => 0
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ChannelShow));