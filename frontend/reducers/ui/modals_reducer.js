import { OPEN_MODAL, CLOSE_MODAL, CLOSE_MODALS } from "../../actions/modal_actions";

const modalsReducer = (state = {}, action) => {
    Object.freeze(state);
    switch(action.type) {
        case OPEN_MODAL:
            return Object.assign({}, state, {[action.modal]: true});
        case CLOSE_MODAL:
            let newState = Object.assign({}, state);
            delete newState[action.modal];
        case CLOSE_MODALS:
            return {};
        default:
            return state;
    };
};

export default modalsReducer;