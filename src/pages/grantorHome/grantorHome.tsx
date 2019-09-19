
import React from 'react';
import 'antd/dist/antd.css';
import { Layout, Breadcrumb } from 'antd';
import SideMenu from '../../components/sideMenu';
import AccountPage from '../../components/account';
import { InjectedAccount } from '../../types/type';

const { Content } = Layout;

type Props = {
  accounts: InjectedAccount[],
  mainAccount: InjectedAccount
}

class GrantorHomePage extends React.Component {
  state = {
    collapsed: false,
  };

  onCollapse = (collapsed: any) => {
    console.log(collapsed);
    this.setState({ collapsed });
  };

  render() {
    const { accounts, mainAccount } = this.props as Props;
    
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <SideMenu></SideMenu>
        <Layout>
          <Content style={{ margin: '0 16px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Trust Fund</Breadcrumb.Item>
              <Breadcrumb.Item>Account</Breadcrumb.Item>
            </Breadcrumb>

            <AccountPage
              accounts={accounts}
              mainAccount={mainAccount}
            />
          </Content>
        </Layout>
      </Layout>
    );
  }
}

export default GrantorHomePage;
