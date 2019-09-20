import React, { PureComponent } from 'react';
import 'antd/dist/antd.css';
import { Container, AccountInfo, Text } from './style';
import { InjectedAccount } from '../../types/type';
import { Icon, Menu, Dropdown } from 'antd';

type Props = {
  accounts: InjectedAccount[];
  mainAccount: InjectedAccount;
};

class AccountPage extends PureComponent<Props> {
  render() {
    const { accounts, mainAccount } = this.props as Props;
    const accountAmount = accounts.length;

    if (accountAmount < 1) {
      return (
        <Container>
          <Text>You don't have an account.</Text>
          <Text>Please create an account for further process.</Text>
        </Container>
      );
    }

    const menuItems = accounts.map((account, i) => {
      return (
        <Menu.Item key={i} onClick={() => console.log(accounts[i])}>
          {account.name}
        </Menu.Item>
      );
    });

    const menu = <Menu>{menuItems}</Menu>;

    return (
      <Container>
        <Dropdown overlay={menu}>
          <a className='ant-dropdown-link' href='#'>
            Switch account <Icon type='down' />
          </a>
        </Dropdown>
        <br />
        <br />
        {mainAccount && mainAccount.name && (
          <AccountInfo>
            <Icon type='user' /> Account:
            {mainAccount ? mainAccount.name : ''}
          </AccountInfo>
        )}
        {mainAccount && mainAccount.address && (
          <AccountInfo>
            <Icon type='wallet' /> Address:
            {mainAccount ? mainAccount.address : ''}
          </AccountInfo>
        )}
      </Container>
    );
  }
}

export default AccountPage;
