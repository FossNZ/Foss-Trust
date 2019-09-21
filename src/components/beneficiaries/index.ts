import { connect } from 'react-redux';
import { State } from '../../types/state';
import BeneficiariesPage from './beneficiaires';
import { Dispatch } from 'redux';
import actions from '../../redux/actions';
import { Beneficiarie } from '../../redux/epics/beneficiariesEpic';

const mapStateToProps = ({ accounts, mainAccount, balances }: State) => ({
  accounts,
  mainAccount,
  balances
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  updateBeneficiaries: (beneficiaries: Beneficiarie[]) => {
    dispatch({
      type: actions.SET_BENEFICIARIES,
      payload: beneficiaries
    });
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BeneficiariesPage);
