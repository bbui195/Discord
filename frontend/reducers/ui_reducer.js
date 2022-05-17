import { combineReducers } from "redux";

// import { OPEN_MODAL } from "../actions/modal_actions";

const uiReducer = combineReducers({

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