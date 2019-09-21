import { AnyAction } from "redux";
import actions from "../actions";

// const initialState: Account;

const mainAccountReducer = (state = null, action: AnyAction ) => {
    switch (action.type) {
        case actions.SET_MAIN_ACCOUNT:
            return action.payload;
        default:
            return state;
    }
}

export default mainAccountReducer;