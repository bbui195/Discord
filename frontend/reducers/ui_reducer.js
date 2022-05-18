import { combineReducers } from "redux";
import modalsReducer from "./ui/modals_reducer";

// import { OPEN_MODAL } from "../actions/modal_actions";

const uiReducer = combineReducers({
    modals: modalsReducer
});

// const uiReducer = (state = {}, action) => {
//     Object.freeze(state);
//     switch(action.type) {
//         case OPEN_MODAL:
//             return Object.assign({}, state, {modals: {[action.modal]: true}});
//         default:
//             return state;
//     }
// };

export default uiReducer;