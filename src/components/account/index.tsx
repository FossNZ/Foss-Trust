
import React, { PureComponent } from 'react';
import 'antd/dist/antd.css';
import {Container, AccountName, Bold} from './style';
import { InjectedAccount } from '../../types/type';
import { Icon, Menu, Dropdown } from 'antd';

type Props = {
  accounts: InjectedAccount[],
  mainAccount: InjectedAccount
}

class AccountPage extends PureComponent<Props> {
  render() {
    const { accounts, mainAccount } = this.props as Props;

    const menuItems = accounts.map((account, i) => {
      return <Menu.Item key={i}>
        {account.name}
      </Menu.Item>
    });

    const menu =  <Menu>{menuItems}</Menu>;

    return (
      <Container>
        <Dropdown overlay={menu}>
          <a className="ant-dropdown-link" href="#">
            Switch account <Icon type="down" />
          </a>
        </Dropdown>
        <br/><br/>
        <Icon type="user" />
        <AccountName><Bold>Account name:</Bold> {mainAccount ? mainAccount.name : ''}</AccountName>
        <div><Bold>Account address:</Bold> {mainAccount? mainAccount.address : ''}</div>
      </Container>
    );
  }
}

export default AccountPage;
