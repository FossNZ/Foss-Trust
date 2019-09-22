import React, { useState, useEffect } from 'react';
import 'antd/dist/antd.css';
import { InjectedAccount } from '../../types/type';
import Wrapper from '../../components/Wrapper/index';
import styled from 'styled-components';
import { Icon, Input, InputNumber, Button, DatePicker, Select } from 'antd';

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
  accounts: InjectedAccount[];
  mainAccount: InjectedAccount;
};

const ConditionsPage: React.FunctionComponent<Props> = props => {
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
          <Select.Option value='0'>Start by block</Select.Option>
          <Select.Option value='1'>Start by time</Select.Option>
          <Select.Option value='2'>Start by schedule scheckin</Select.Option>
        </Select>
      </div>

      {condition === '0' && (
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
              // TODO: This is the final value we need to send back to runtimemodule
              onClick={() => console.log('Click', startBlock)}
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
