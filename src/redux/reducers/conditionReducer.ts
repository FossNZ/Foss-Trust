import { AnyAction } from "redux";
import actions from "../actions";

const initialState  = {};

const conditionReducer = (state = initialState, action: AnyAction ) => {
    switch (action.type) {
        case actions.SET_CONDITION: {
            return action.payload;
        }
        default:
            return state;
    }
}

export default conditionReducer;