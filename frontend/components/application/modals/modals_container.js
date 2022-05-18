import { connect } from "react-redux";
import { closeModals } from "../../../actions/modal_actions";
import Modals from "./modals"

const mapStateToProps = (state) => {
    return {
        modals: state.ui.modals
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        closeModals: () => dispatch(closeModals())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Modals);