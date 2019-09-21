import React, { useState } from 'react';
import 'antd/dist/antd.css';
import { InjectedAccount } from '../../types/type';
import { Icon, Menu, Dropdown } from 'antd';
import Wrapper from '../../components/Wrapper/index';
import styled from 'styled-components';
import { Input, InputNumber } from 'antd';

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

const BeneficiariesPage: React.FunctionComponent<Props> = props => (
  <Wrapper>
    <TitleWrapper>
      <Title>Beneficiaries</Title>
      <Icon type='plus' style={{ fontSize: '1.5rem', margin: '1rem' }} />
    </TitleWrapper>
    <BeneficiaryWrapper>
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
  </Wrapper>
);

export default BeneficiariesPage;
