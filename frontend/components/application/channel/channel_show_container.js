import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import ChannelShow from "./channel_show";

const mapStateToProps = (state, ownProps) => {
    return {
        channel: {id: 1},
        messages: []
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        getMessages: () => 0
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ChannelShow));