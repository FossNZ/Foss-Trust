import React, { useState } from 'react';
import 'antd/dist/antd.css';
import { InjectedAccount, ConditionType } from '../../types/type';
import Wrapper from '../Wrapper/index';
import styled from 'styled-components';
import { InputNumber, Button, DatePicker } from 'antd';
import { Condition } from '../../redux/epics/conditionEpic';

const Title = styled.div`
  font-size: 1.5rem;
  font-weight: 500;
`;

const InfoWrapper = styled.div`
  margin: 1rem 0;
  border-bottom: 1px solid #d4d4d4;
`;

const Buttonrapper = styled.div`
  margin: 1rem 0;
`;

type Props = {
  updateCondition: (condition: Condition) => void;
};

const ConditionsPage: React.FunctionComponent<Props> = props => {
  const { updateCondition } = props;

  const [startBlock, setStartBlock] = useState(1);
  const [startTime, setStartTime] = useState();
  const [checkinBlock, setCheckinBlock] = useState(1);

  return (
    <Wrapper>
      <Title>Conditions</Title>
      <InfoWrapper>
        <h3>Start Block</h3>
        <div>
          Your trust fund would be distribted when it comes to block
          {startBlock}
        </div>
        <InputNumber
          min={1}
          defaultValue={1}
          onChange={value => setStartBlock(value || 1)}
        />
        <Buttonrapper>
          <Button
            type='primary'
            onClick={() => updateCondition({value: startBlock, typeId: ConditionType.BlockHeight})}
          >
            Confirm
          </Button>
        </Buttonrapper>
      </InfoWrapper>

      <InfoWrapper>
        <h3>Start time</h3>
        <div>
          Your trust fund would be distribted when it comes to
          {startTime}.
        </div>
        <DatePicker
          showTime
          placeholder='Select Time'
          onChange={value => value && setStartTime(value.format())}
        />
        <Buttonrapper>
          <Button
            type='primary'
            // TODO: This is the final value we need to send back to runtimemodule
            onClick={() => console.log('Click', startTime)}
          >
            Confirm
          </Button>
        </Buttonrapper>
      </InfoWrapper>

      <InfoWrapper>
        <h3>Check-in schedule</h3>
        <div>
          Your trust fund would be distribted if you failed to check in after
          {checkinBlock} based on current block.
        </div>
        <InputNumber
          min={1}
          defaultValue={1}
          onChange={value => setCheckinBlock(value || 1)}
        />
        <Buttonrapper>
          <Button
            type='primary'
            // TODO: This is the final value we need to send back to runtimemodule
            onClick={() => console.log('Click', checkinBlock)}
          >
            Confirm
          </Button>
        </Buttonrapper>
      </InfoWrapper>
    </Wrapper>
  );
};

export default ConditionsPage;
