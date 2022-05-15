import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { signup } from "../../actions/session_actions";
import SessionForm from "./session_form";

const mapStateToProps = (state, ownProps) => {
    return {
        errors: state.errors.session,
        formType: 'signup',
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        processForm: (user) => dispatch(signup(user))
    };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SessionForm));