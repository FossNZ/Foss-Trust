import { connect } from 'react-redux';
import { State } from '../../types/state';
import { Dispatch } from 'redux';
import { InjectedAccount } from '../../types/type';
import actions from '../../redux/actions';
import BeneficiaryHomePage from './beneficiaryHome';

const mapStateToProps = ({
  accounts,
  mainAccount,
  balances,
  beneficiaries,
  grantorBalances
}: State) => ({
  accounts,
  mainAccount,
  balances,
  beneficiaries,
  grantorBalances
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setMainAccount: (mainAccount: InjectedAccount) => {
    dispatch({
      type: actions.SET_MAIN_ACCOUNT,
      payload: mainAccount
    });
  },
  withDraw: (assetId: number) => {
    dispatch({
      type: actions.WITHDRAW,
      payload: assetId
    });
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BeneficiaryHomePage);
