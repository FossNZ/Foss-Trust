import { connect } from 'react-redux';
import { State } from '../../types/state';
import GrantorHomePage from './grantorHome';

const mapStateToProps = ({ accounts, mainAccount }: State) => ({
  accounts,
  mainAccount
});

export default connect(
  mapStateToProps
)(GrantorHomePage);
