import React, { useState } from 'react';
import 'antd/dist/antd.css';
import { InjectedAccount } from '../../types/type';
import { Icon, Button } from 'antd';
import Wrapper from '../Wrapper/index';
import styled from 'styled-components';
import { Input, InputNumber } from 'antd';
import { BeneficiaryValue } from '../../redux/epics/beneficiariesEpic';

const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
  height: 3rem;
`;

const Title = styled.div`
  font-size: 1.5rem;
  font-weight: 500;
`;

const BeneficiaryWrapper = styled.div`
  height: 6rem;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
`;

const BeneficiaryTitle = styled.div`
  width: 6rem;
`;

const BeneficiaryAddress = styled.div`
  display: flex;
`;

const BeneficiaryWeight = styled.div`
  display: flex;
`;

type Props = {
  accounts: InjectedAccount[];
  mainAccount: InjectedAccount;
  updateBeneficiaries: (beneficiaries: BeneficiaryValue[]) => void;
};

const BeneficiariesPage: React.FunctionComponent<Props> = props => {
  const [beneficiaryAmount, setbeneficiaryAmount] = useState(1);
  const [beneficiaries, setBeneficiaires] = useState([
    { address: '', weight: 1 }
  ]);

  const { updateBeneficiaries } = props;

  const getBeneficiaryComponent = (number: number) => {
    let beneficiaryComponent = [];
    for (let i = 0; i < number; i++) {
      let sortedBeneficiaries = beneficiaries.filter(
        (value, index) => index !== i
      );
      beneficiaryComponent.push(
        <BeneficiaryWrapper key={i}>
          <BeneficiaryAddress>
            <BeneficiaryTitle>Beneficiary:</BeneficiaryTitle>
            <Input
              placeholder='Enter beneficiary account'
              style={{ width: '50%' }}
              onChange={e => {
                const value = {
                  address: e.target.value,
                  weight: (beneficiaries[i] && beneficiaries[i].weight) || 1
                };
                setBeneficiaires(sortedBeneficiaries.concat(value));
              }}
            />
          </BeneficiaryAddress>
          <BeneficiaryWeight>
            <BeneficiaryTitle>Weight:</BeneficiaryTitle>
            <InputNumber
              min={1}
              max={10}
              defaultValue={1}
              onChange={value => {
                const result = {
                  address:
                    (beneficiaries[i] && beneficiaries[i].address) || '',
                  weight: value || 1
                };
                setBeneficiaires(sortedBeneficiaries.concat(result));
              }}
            />
          </BeneficiaryWeight>
        </BeneficiaryWrapper>
      );
    }

    return beneficiaryComponent;
  };

  return (
    <Wrapper>
      <TitleWrapper>
        <Title>Beneficiaries</Title>
        <Icon
          type='plus'
          style={{ fontSize: '1.5rem', margin: '1rem' }}
          onClick={() => setbeneficiaryAmount(beneficiaryAmount + 1)}
        />
        {beneficiaryAmount > 1 && (
          <Icon
            type='minus'
            style={{ fontSize: '1.5rem', margin: '1rem' }}
            onClick={() => setbeneficiaryAmount(beneficiaryAmount - 1)}
          />
        )}
      </TitleWrapper>
      {getBeneficiaryComponent(beneficiaryAmount)}
      <Button
        type='primary'
        style={{
          marginLeft: '6rem',
          marginTop: '2rem'
        }}
        // TODO: This is the final value we need to send back to runtimemodule
        onClick={() => updateBeneficiaries(beneficiaries)}
      >
        Confirm
      </Button>
    </Wrapper>
  );
};

export default BeneficiariesPage;
