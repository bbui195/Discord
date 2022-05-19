import { combineReducers } from "redux";
import modalsReducer from "./ui/modals_reducer";

const uiReducer = combineReducers({
    modals: modalsReducer
});

export default uiReducer;