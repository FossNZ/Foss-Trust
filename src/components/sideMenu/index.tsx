import React from 'react';
import 'antd/dist/antd.css';
import { Layout, Menu, Icon } from 'antd';
import { Logo } from './style';

const { Sider } = Layout;

class SideMenu extends React.Component {
  state = {
    collapsed: false
  };

  onCollapse = (collapsed: any) => {
    console.log(collapsed);
    this.setState({ collapsed });
  };

  render() {
    return (
      <Sider
        collapsible
        collapsed={this.state.collapsed}
        onCollapse={this.onCollapse}
      >
        <Logo>Foss</Logo>
        <Menu theme='dark' defaultSelectedKeys={['1']} mode='inline'>
          <Menu.Item key='1'>
            <Icon type='team' />
            <span>Account</span>
          </Menu.Item>
          <Menu.Item key='2'>
            <Icon type='account-book' />
            <span>Beneficiaries</span>
          </Menu.Item>
          <Menu.Item key='3'>
            <Icon type='pay-circle' />
            <span>Payment</span>
          </Menu.Item>
          <Menu.Item key='4'>
            <Icon type='calendar' />
            <span>Scheduling Pay</span>
          </Menu.Item>
        </Menu>
      </Sider>
    );
  }
}

export default SideMenu;
