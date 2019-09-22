import { connect } from 'react-redux';
import ConditionPage from './conditions';
import { Dispatch } from 'redux';
import actions from '../../redux/actions';
import { Condition } from '../../redux/epics/conditionEpic';
import { State } from '../../types/state';

const mapStateToProps = ({blockHeight}: State)  => ({
  blockHeight
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  updateCondition: (condition: Condition) => {
    dispatch({
      type: actions.UPDATE_CONDITION,
      payload: condition
    });
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ConditionPage);
