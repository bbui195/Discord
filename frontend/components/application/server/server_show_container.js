import { connect } from "react-redux";
import { fetchServer } from "../../../actions/server_actions";
import ServerShow from "./server_show";

const mapStateToProps = (state, ownProps) => {
    return {
        server: state.entities.servers[ownProps.match.params.serverId]
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        fetchServer: () => dispatch(fetchServer(ownProps.match.params.serverId))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ServerShow);