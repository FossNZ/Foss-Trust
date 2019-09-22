import React from 'react';
import 'antd/dist/antd.css';
import { Breadcrumb, Button } from 'antd';
import { InjectedAccount } from '../../types/type';
import Wrapper from '../../components/Wrapper/index';
import AccountPage from '../../components/account/AccountPage';
import { u128 } from '@polkadot/types';
import { Beneficiary } from '../../redux/epics/beneficiariesEpic';
import BN from 'bn.js';
import styled from 'styled-components';

const BalanceTitle = styled.h3`
  display: inline-block;
`;

const BalanceContainer = styled.div`
  padding: 24px;
`;

const BalanceInfo = styled.div`
  width: 4rem;
  display: inline-block;
`;

type Props = {
  accounts: InjectedAccount[];
  mainAccount: InjectedAccount;
  balances: u128[];
  grantorBalances: u128[];
  beneficiaries: Beneficiary[];
  setMainAccount: (account: InjectedAccount) => void;
  withDraw: (assetID: number) => void;
  location: any;
  grantor: string;
  grantorBeneficiaries: Beneficiary[];
};

class BeneficiaryHomePage extends React.Component {
  state = {
    collapsed: false,
  };

  onCollapse = (collapsed: any) => {
    console.log(collapsed);
    this.setState({ collapsed });
  };

  render() {
    const {
      accounts,
      mainAccount,
      balances,
      setMainAccount,
      beneficiaries,
      location,
      grantorBalances,
      withDraw,
      grantor,
      grantorBeneficiaries
    } = this.props as Props;

    const totalWeight =
      grantorBeneficiaries &&
      grantorBeneficiaries.reduce(
        (acc, beneficiary) => acc.add(beneficiary.weight),
        new BN(0)
      );

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
          <BalanceContainer>
            {balances && (
              <div>
                <div>
                  <BalanceInfo>BTC:</BalanceInfo>
                  {balances[0] ? balances[0].toString() : 0}
                </div>
                <div>
                  <BalanceInfo>ETH: </BalanceInfo>
                  {balances[1] ? balances[1].toString() : 0}
                </div>
                <div>
                  <BalanceInfo>DAI: </BalanceInfo>
                  {balances[2] ? balances[2].toString() : 0}
                </div>
                <div>
                  <BalanceInfo>USTD: </BalanceInfo>
                  {balances[3] ? balances[3].toString() : 0}
                </div>
              </div>
            )}
            <br />
            <br />
            <BalanceTitle>Grantor Address:</BalanceTitle>
            <div>{grantor ? grantor : ''}</div>
            <br />
            <BalanceTitle>Grantor balances</BalanceTitle>
            <div>
              <BalanceInfo>BTC:</BalanceInfo>
              {grantorBalances[0] ? grantorBalances[0].toString() : 0}
            </div>
            <div>
              <BalanceInfo>ETH: </BalanceInfo>
              {grantorBalances[1] ? grantorBalances[1].toString() : 0}
            </div>
            <div>
              <BalanceInfo>DAI: </BalanceInfo>
              {grantorBalances[2] ? grantorBalances[2].toString() : 0}
            </div>
            <div>
              <BalanceInfo>USTD: </BalanceInfo>
              {grantorBalances[3] ? grantorBalances[3].toString() : 0}
            </div>
          </BalanceContainer>
          <br />
          <br />
          <BalanceTitle>Grantor Beneficiaries:</BalanceTitle>
          <br />
          {grantorBeneficiaries.map(beneficiary => (
            <div>
              {beneficiary.address.toString()} :{' '}
              {beneficiary.weight
                .muln(100)
                .div(totalWeight)
                .toString()}
              %
            </div>
          ))}
          <br />
          <Button
            type='primary'
            style={{
              marginLeft: '6rem',
              marginTop: '2rem'
            }}
            onClick={() => withDraw(0)}
          >
            WithDraw BTC
          </Button>
          <Button
            type='primary'
            style={{
              marginLeft: '6rem',
              marginTop: '2rem'
            }}
            onClick={() => withDraw(1)}
          >
            WithDraw ETH
          </Button>
          <Button
            type='primary'
            style={{
              marginLeft: '6rem',
              marginTop: '2rem'
            }}
            onClick={() => withDraw(2)}
          >
            WithDraw DAI
          </Button>
          <Button
            type='primary'
            style={{
              marginLeft: '6rem',
              marginTop: '2rem'
            }}
            onClick={() => withDraw(3)}
          >
            WithDraw USDT
          </Button>
        </div>
      </Wrapper>
    );
  }
}

export default BeneficiaryHomePage;
