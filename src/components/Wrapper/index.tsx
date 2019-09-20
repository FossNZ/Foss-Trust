import React, { PureComponent, useState } from 'react';
import 'antd/dist/antd.css';
import SideMenu from '../sideMenu';
import { Layout, Breadcrumb } from 'antd';

const { Content } = Layout;

const Wrapper: React.FunctionComponent = ({ children }) => (
  <Layout style={{ minHeight: '100vh' }}>
    <SideMenu></SideMenu>
    <Layout>
      <Content style={{ margin: '0 16px' }}>{children}</Content>
    </Layout>
  </Layout>
);

export default Wrapper;
