import { AnyAction } from "redux";
import actions from "../actions";

const initialState: Account[] = [];

const accountsReducer = (state = initialState, action: AnyAction ) => {
    switch (action.type) {
        case actions.SET_ACCOUNTS:
            return action.payload;
        default:
            return state;
    }
}

export default accountsReducer;