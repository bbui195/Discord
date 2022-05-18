import { connect } from "react-redux";
import { openAddServerModal } from "../../actions/modal_actions";
import { logout } from "../../actions/session_actions";
import Spicord from "./spicord";

const mapStateToProps = (state) => {
    return {
        loggedIn: Boolean(state.session.id),
        currentUser: state.entities.users[state.session.id]
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        logout: () => dispatch(logout()),
        openAddServerModal: () => dispatch(openAddServerModal())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Spicord);
