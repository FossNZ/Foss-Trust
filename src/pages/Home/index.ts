import { connect } from 'react-redux';
import HomePage from './home';
import { Dispatch } from 'redux';
import actions from '../../redux/actions';

const mapStateToProps = () => ({
});

const mapDispatchToProps = (dispatch: Dispatch) =>  ({
  updateGrantorAddress: (grantorAddress: string) => {
    dispatch({
      type: actions.SET_GRANTOR_ADDRESS,
      payload: grantorAddress
    });
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomePage);
