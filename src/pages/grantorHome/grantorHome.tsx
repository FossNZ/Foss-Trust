import React from 'react';
import 'antd/dist/antd.css';
import { Breadcrumb } from 'antd';
import { InjectedAccount } from '../../types/type';
import Wrapper from '../../components/Wrapper/index';
import AccountPage from '../../components/account/AccountPage';
import { u128 } from '@polkadot/types';
import { Beneficiary } from '../../redux/epics/beneficiariesEpic';
import BN from 'bn.js';

type Props = {
  accounts: InjectedAccount[];
  mainAccount: InjectedAccount;
  balances: u128[];
  beneficiaries: Beneficiary[];
  condition: any;

  setMainAccount: (account: InjectedAccount) => void;
  location: any;
};

class GrantorHomePage extends React.Component {
  state = {
    collapsed: false
  };

  onCollapse = (collapsed: any) => {
    console.log(collapsed);
    this.setState({ collapsed });
  };

  render() {
    const { accounts, mainAccount, balances, setMainAccount, beneficiaries, condition, location } = this.props as Props;
    const totalWeight = beneficiaries.reduce((acc, beneficiary) => acc.add(beneficiary.weight), new BN(0));

    return (
      <Wrapper>
        <div>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Trust Fund</Breadcrumb.Item>
            <Breadcrumb.Item>Account</Breadcrumb.Item>
          </Breadcrumb>

          <AccountPage
            accounts={accounts}
            mainAccount={mainAccount}
            setMainAccount={setMainAccount}
          />
          <div>
            BTC: {balances[0] ? balances[0].toString() : 0}
          </div>
          <div>
            ETH: {balances[1] ? balances[1].toString() : 0}
          </div>
          <div>
            DAI: {balances[2] ? balances[2].toString() : 0}
          </div>
          <div>
            USTD: {balances[3] ? balances[3].toString() : 0}
          </div>
          {beneficiaries.map(beneficiary => <div>{beneficiary.address.toString()} : {beneficiary.weight.muln(100).div(totalWeight).toString()}%</div>)}
          {(condition && condition !== {}) ? condition.toString() : ''}
        </div>
      </Wrapper>
    );
  }
}

export default GrantorHomePage;
