import { AnyAction } from "redux";
import actions from "../actions";
import { Beneficiary } from "../epics/beneficiariesEpic";

const initialState: Beneficiary[]  = [];

const grantorBeneficiariesReducer = (state = initialState, action: AnyAction ) => {
    switch (action.type) {
        case actions.SET_GRANTOR_BENEFICIARIES: {
            return action.payload;
        }
        default:
            return state;
    }
}

export default grantorBeneficiariesReducer;