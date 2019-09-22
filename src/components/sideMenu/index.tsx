import React from 'react';
import 'antd/dist/antd.css';
import { Layout, Menu, Icon } from 'antd';
import { Logo } from './style';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

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
    const currentLocation = window.location.pathname;

    if (currentLocation === '/beneficiaryhome') {
      return (
        <Sider
          collapsible
          collapsed={this.state.collapsed}
          onCollapse={this.onCollapse}
        >
          <Logo>FOSS</Logo>
          <Menu theme='dark' defaultSelectedKeys={['1']} mode='inline'>
            <Menu.Item key='0'>
              <Link to='/beneficiaryhome'>
                <Icon type='team' />
                <span>Account</span>
              </Link>
            </Menu.Item>
          </Menu>
        </Sider>
      );
    }
    const activeKey = [
      '/grantorhome',
      '/beneficiaries',
      '/conditions'
    ].findIndex(value => value === window.location.pathname);
    return (
      <Sider
        collapsible
        collapsed={this.state.collapsed}
        onCollapse={this.onCollapse}
      >
        <Logo>FOSS</Logo>
        <Menu
          theme='dark'
          defaultSelectedKeys={['1']}
          selectedKeys={[`${activeKey}`]}
          mode='inline'
        >
          <Menu.Item key='0'>
            <Link to='/grantorhome'>
              <Icon type='home' />
              <span>Summary</span>
            </Link>
          </Menu.Item>
          <Menu.Item key='1'>
            <Link to='/beneficiaries'>
              <Icon type='account-book' />
              <span>Beneficiaries</span>
            </Link>
          </Menu.Item>
          <Menu.Item key='2'>
            <Link to='/conditions'>
              <Icon type='pay-circle' />
              <span>Conditions</span>
            </Link>
          </Menu.Item>
          <Menu.Item key='3'>
            <Icon type='calendar' />
            <span>Scheduling Pay</span>
          </Menu.Item>
        </Menu>
      </Sider>
    );
  }
}

export default SideMenu;
