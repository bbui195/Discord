import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { deleteServer, fetchServer, leaveServer, updateServer } from "../../../actions/server_actions";
import ServerShow from "./server_show";

const mapStateToProps = (state, ownProps) => {
    let owner = false;
    if(state.entities.servers[ownProps.match.params.serverId] &&
            state.entities.servers[ownProps.match.params.serverId].ownerId === state.session.id) {
        owner = true;
    }
    return {
        server: state.entities.servers[ownProps.match.params.serverId],
        owner: owner,
        currentUserId: state.session.id
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        fetchServer: () => dispatch(fetchServer(ownProps.match.params.serverId)),
        saveServer: (server) => dispatch(updateServer(server)),
        deleteServer: (serverId) => dispatch(deleteServer(serverId)),
        leaveServer: () => dispatch(leaveServer(ownProps.match.params.serverId))
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ServerShow));