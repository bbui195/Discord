import { connect } from "react-redux";
import { openAddServerModal } from "../../actions/modal_actions";
import { fetchServer, fetchServers } from "../../actions/server_actions";
import { logout } from "../../actions/session_actions";
import Spicord from "./spicord";

const mapStateToProps = (state) => {
    return {
        loggedIn: Boolean(state.session.id),
        currentUser: state.entities.users[state.session.id],
        servers: Object.values(state.entities.servers)
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        logout: () => dispatch(logout()),
        openAddServerModal: () => dispatch(openAddServerModal()),
        fetchServers: () => dispatch(fetchServers()),
        fetchServer: (id) => dispatch(fetchServer(id)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Spicord);
