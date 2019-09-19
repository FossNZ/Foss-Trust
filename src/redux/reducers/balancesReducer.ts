import { AnyAction } from "redux";
import actions from "../actions";

const initialState  = {
    ETH: 0,
    BTC: 0,
    DOT: 0,
    EOS: 0
};

const accountsReducer = (state = initialState, action: AnyAction ) => {
    switch (action.type) {
        case actions.SET_ACCOUNTS:
            return action.payload;
        default:
            return state;
    }
}

export default accountsReducer;