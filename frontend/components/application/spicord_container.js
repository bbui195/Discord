import { connect } from "react-redux";
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
        logout: () => dispatch(logout())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Spicord);
