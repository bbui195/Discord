import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { login, receiveSessionErrors, resetSessionErrors } from "../../actions/session_actions";
import SessionForm from "./session_form";

const mapStateToProps = (state, ownProps) => {
    return {
        errors: state.errors.session,
        formType: 'login',
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        processForm: (user) => dispatch(login(user)),
        receiveErrors: (errors) => dispatch(receiveSessionErrors(errors)),
        resetErrors: () => dispatch(resetSessionErrors())
    };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SessionForm));