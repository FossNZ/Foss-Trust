import { AnyAction } from "redux";
import actions from "../actions";

const blockHeightReducer = (state = null, action: AnyAction ) => {
    switch (action.type) {
        case actions.SET_BLOCK_HEIGHT: {
            return action.payload;
        }
        default:
            return state;
    }
}

export default blockHeightReducer;