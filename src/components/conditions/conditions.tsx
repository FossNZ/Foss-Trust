import React, { useState } from 'react';
import 'antd/dist/antd.css';
import { InjectedAccount, ConditionType } from '../../types/type';
import Wrapper from '../Wrapper/index';
import styled from 'styled-components';
import { InputNumber, Button, DatePicker, Select } from 'antd';
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
  blockHeight: string;
};

const ConditionsPage: React.FunctionComponent<Props> = props => {
  const { updateCondition, blockHeight} = props;

  const [startBlock, setStartBlock] = useState(1);
  const [startTime, setStartTime] = useState();
  const [checkinBlock, setCheckinBlock] = useState(1);
  const [condition, setCondition] = useState();

  return (
    <Wrapper>
      <Title>Conditions</Title>
      <div>Choose the conditions for the start date of your turst fund</div>
      <div>
        <Select
          showSearch
          style={{ width: 300, margin: '1rem 0' }}
          placeholder='Select a person'
          optionFilterProp='children'
          onChange={value => setCondition(value)}
        >
          <Select.Option value='0'>Switch at block</Select.Option>
          <Select.Option value='1'>Switch by time</Select.Option>
          <Select.Option value='2'>Switch by schedule scheckin</Select.Option>
        </Select>
      </div>

      {condition === '0' && (
        <InfoWrapper>
          <h3>Switch at block</h3>
          <h5>Current Block Height: {blockHeight}</h5>
          <div>
            living status switch at block: 
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
              // TODO: This is the final value we need to send back to runtimemodule
              onClick={() => updateCondition({ value: startBlock, typeId: ConditionType.BlockHeight})}
            >
              Confirm
            </Button>
          </Buttonrapper>
        </InfoWrapper>
      )}

      {condition === '1' && (
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
      )}

      {condition === '2' && (
        <Buttonrapper>
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
        </Buttonrapper>
      )}
    </Wrapper>
  );
};

export default ConditionsPage;
