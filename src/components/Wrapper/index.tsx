import React, { PureComponent, useState } from 'react';
import 'antd/dist/antd.css';
import SideMenu from '../sideMenu';
import { Layout, Breadcrumb } from 'antd';
import styled from 'styled-components';

const Container = styled.div`
  background: #fff;
  height: 100%
  width: 100%;
  padding: 1.5rem;
`;

const { Content } = Layout;

const Wrapper: React.FunctionComponent = ({ children }) => (
  <Layout style={{ minHeight: '100vh' }}>
    <SideMenu></SideMenu>
    <Layout>
      <Content>
        <Container>{children}</Container>
      </Content>
    </Layout>
  </Layout>
);

export default Wrapper;
