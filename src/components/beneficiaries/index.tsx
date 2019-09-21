import React, { useState } from 'react';
import 'antd/dist/antd.css';
import { InjectedAccount } from '../../types/type';
import { Icon, Menu, Dropdown } from 'antd';
import Wrapper from '../../components/Wrapper/index';
import styled from 'styled-components';
<<<<<<< HEAD
import { Input, InputNumber, Form } from 'antd';
=======
import { Input, InputNumber } from 'antd';
>>>>>>> master

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
};

const getBeneficiaryComponent = (number: number) => {
  let beneficiaryComponent = [];
  for (let i = 0; i < number; i++) {
    beneficiaryComponent.push(
      <BeneficiaryWrapper key={i}>
        <BeneficiaryAddress>
          <BeneficiaryTitle>Beneficiary:</BeneficiaryTitle>
          <Input
            placeholder='Enter beneficiary account'
            onChange={value => console.log(value)}
            style={{ width: '50%' }}
          />
        </BeneficiaryAddress>
        <BeneficiaryWeight>
          <BeneficiaryTitle>Weight:</BeneficiaryTitle>
          <InputNumber
            min={1}
            max={10}
            defaultValue={1}
            onChange={value => console.log(value)}
          />
        </BeneficiaryWeight>
      </BeneficiaryWrapper>
    );
  }

  return beneficiaryComponent;
};

const BeneficiariesPage: React.FunctionComponent<Props> = props => {
  const [beneficiaries, setBeneficiaires] = useState([]);
  const [beneficiaryAmount, setbeneficiaryAmount] = useState(1);

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
    </Wrapper>
  );
};

export default BeneficiariesPage;
