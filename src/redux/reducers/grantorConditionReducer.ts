import { AnyAction } from "redux";
import actions from "../actions";

const initialState  = {};

const grantorConditionReducer = (state = initialState, action: AnyAction ) => {
    switch (action.type) {
        case actions.SET_GRANTOR_CONDITION: {
            return action.payload;
        }
        default:
            return state;
    }
}

export default grantorConditionReducer;