import { connect } from "react-redux";
import { receiveMessage } from "../../actions/message_actions";
import { openAddServerModal, openJoinPublicModal } from "../../actions/modal_actions";
import { fetchPublicServers, fetchServer, fetchServers } from "../../actions/server_actions";
import { logout } from "../../actions/session_actions";
import { serversIn } from "../../util/server_selectors";
import Spicord from "./spicord";

const mapStateToProps = (state) => {
    return {
        loggedIn: Boolean(state.session.id),
        currentUser: state.entities.users[state.session.id],
        servers: serversIn(state),
        currentUserId: state.session.id
        // servers: Object.values(state.entities.servers)
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        logout: () => dispatch(logout()),
        openAddServerModal: () => dispatch(openAddServerModal()),
        openJoinPublicModal: () => dispatch(openJoinPublicModal()),
        fetchServers: () => dispatch(fetchServers()),
        fetchServer: (id) => dispatch(fetchServer(id)),
        fetchPublicServers: () => dispatch(fetchPublicServers()),
        receiveMessage: (message) => dispatch(receiveMessage(message))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Spicord);
