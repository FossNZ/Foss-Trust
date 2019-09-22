import React from 'react';
import 'antd/dist/antd.css';
import { Container, AccountInfo, Text } from './style';
import { InjectedAccount } from '../../types/type';
import { Icon, Menu, Dropdown } from 'antd';

type Props = {
  accounts: InjectedAccount[];
  mainAccount: InjectedAccount;
  setMainAccount: (account: InjectedAccount) => void;
};

const AccountPage: React.FunctionComponent<Props> = props => {
  const { accounts, mainAccount, setMainAccount } = props as Props;
  const accountAmount = accounts && accounts.length;

  if (accountAmount < 1 || !accounts) {
    return (
      <Container>
        <Text>You don't have an account.</Text>
        <Text>Please create an account for further process.</Text>
      </Container>
    );
  }

  const menuItems =
    accounts &&
    accounts.map((account, i) => {
      return (
        <Menu.Item
          key={i}
          onClick={() => {
            setMainAccount(accounts[i]);
          }}
        >
          {account.name}
        </Menu.Item>
      );
    });

  const menu = <Menu>{menuItems}</Menu>;

  const displayAccount = mainAccount || accounts[0];

  return (
    <Container>
      <Dropdown overlay={menu}>
        <a className='ant-dropdown-link' href='#'>
          Switch account <Icon type='down' />
        </a>
      </Dropdown>
      <br />
      <br />
      {displayAccount && displayAccount.name && (
        <AccountInfo>
          <Icon type='user' /> Account: {displayAccount.name}
        </AccountInfo>
      )}
      {displayAccount && displayAccount.address && (
        <AccountInfo>
          <Icon type='wallet' /> Address: {displayAccount.address}
        </AccountInfo>
      )}
    </Container>
  );
};

export default AccountPage;
