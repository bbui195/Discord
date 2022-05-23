import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { closeModals } from "../../../actions/modal_actions";
import { createServer, fetchPublicServers, joinServer } from "../../../actions/server_actions";
import { serversNotIn } from "../../../util/server_selectors";
import Modals from "./modals"

const mapStateToProps = (state) => {
    return {
        modals: state.ui.modals,
        username: state.entities.users[state.session.id].username,
        publicServers: serversNotIn(state)
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        closeModals: () => dispatch(closeModals()),
        createServer: (server) => dispatch(createServer(server)),
        fetchPublicServers: () => dispatch(fetchPublicServers()),
        joinServer: (serverId) => dispatch(joinServer(serverId))
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Modals));