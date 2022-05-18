import { connect } from "react-redux";
import { closeModals } from "../../../actions/modal_actions";
import Modals from "./modals"

const mapStateToProps = (state) => {
    return {
        modals: state.ui.modals,
        username: state.entities.users[state.session.id].username
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        closeModals: () => dispatch(closeModals())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Modals);