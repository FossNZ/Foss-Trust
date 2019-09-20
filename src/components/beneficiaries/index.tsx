import React, { useState } from 'react';
import 'antd/dist/antd.css';
import { InjectedAccount } from '../../types/type';
import { Icon, Menu, Dropdown } from 'antd';
import Wrapper from '../../components/Wrapper/index';

type Props = {
  accounts: InjectedAccount[];
  mainAccount: InjectedAccount;
};

const BeneficiariesPage: React.FunctionComponent<Props> = props => (
  <Wrapper>
    <div>BeneficiariesPage</div>
  </Wrapper>
);

export default BeneficiariesPage;
