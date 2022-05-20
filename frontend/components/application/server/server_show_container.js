import { connect } from "react-redux";
import { fetchServer } from "../../../actions/server_actions";
import ServerShow from "./server_show";

const mapStateToProps = (state, ownProps) => {
    console.log(state.entities.servers[ownProps.match.params.serverId]);
    console.log(state.session.id);
    let owner = false;
    if(state.entities.servers[ownProps.match.params.serverId] &&
            state.entities.servers[ownProps.match.params.serverId].ownerId === state.session.id) {
        owner = true;
    }
    return {
        server: state.entities.servers[ownProps.match.params.serverId],
        owner: owner
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        fetchServer: () => dispatch(fetchServer(ownProps.match.params.serverId))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ServerShow);