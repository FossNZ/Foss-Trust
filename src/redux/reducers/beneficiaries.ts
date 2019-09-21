import { AnyAction } from "redux";
import actions from "../actions";

const initialState  = {};

const BalancesReducer = (state = initialState, action: AnyAction ) => {
    switch (action.type) {
        case actions.SET_BALANCE: {
            const {payload: {id, balance}} = action;
            return {...state, [id]: balance};
        }
        default:
            return state;
    }
}

export default BalancesReducer;