import { AnyAction } from "redux";
import actions from "../actions";

const initialState  = {};

const BeneficiariesReducer = (state = initialState, action: AnyAction ) => {
    switch (action.type) {
        case actions.SET_BENEFICIARIES: {
            return action.payload;
        }
        default:
            return state;
    }
}

export default BeneficiariesReducer;