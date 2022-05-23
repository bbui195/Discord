import { connect } from "react-redux";
import { openAddServerModal } from "../../actions/modal_actions";
import { fetchPublicServers, fetchServer, fetchServers } from "../../actions/server_actions";
import { logout } from "../../actions/session_actions";
import { serversIn } from "../../util/server_selectors";
import Spicord from "./spicord";

const mapStateToProps = (state) => {
    return {
        loggedIn: Boolean(state.session.id),
        currentUser: state.entities.users[state.session.id],
        servers: serversIn(state)
        // servers: Object.values(state.entities.servers)
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        logout: () => dispatch(logout()),
        openAddServerModal: () => dispatch(openAddServerModal()),
        fetchServers: () => dispatch(fetchServers()),
        fetchServer: (id) => dispatch(fetchServer(id)),
        fetchPublicServers: () => dispatch(fetchPublicServers())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Spicord);
