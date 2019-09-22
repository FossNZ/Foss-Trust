import React, { useState, useEffect } from 'react';
import 'antd/dist/antd.css';
import { InjectedAccount } from '../../types/type';
import styled from 'styled-components';
import { Icon, Input } from 'antd';
import Particles from 'react-particles-js';
import { History } from 'history';

const HomeWrapper = styled.div`
  display: flex;
`;

const GrantorWrapper = styled.div`
  flex: 1;
  position: relative;
`;

const BeneficiaryWrapper = styled.div`
  flex: 1;
  position: relative;
`;

const RoleSection = styled.div`
  position: absolute;
  top: 30%;
  left: 30%;
  cursor: pointer;
  color: #ffffff8c;
  font-weight: 400;
  font-size: 5rem;
  height: 2.5rem;

  &:hover {
    color: white;
  }
`;

const getBgParticles = (background: string) => (
  <Particles
    width='50vw'
    height='100vh'
    params={{
      particles: {
        size: {
          value: 5,
          random: true,
          anim: {
            enable: false,
            speed: 80,
            size_min: 0.1,
            sync: false
          }
        },
        line_linked: {
          enable: true,
          distance: 200,
          opacity: 0.4,
          width: 1,
          shadow: {
            enable: true,
            color: '#ffffff'
          }
        }
      }
    }}
    style={{
      background
    }}
  />
);

type Props = {
  accounts: InjectedAccount[];
  mainAccount: InjectedAccount;
  history: History;
};

const HomePage: React.FunctionComponent<Props> = props => {
  const [showInput, setShowInput] = useState(false);
  const [grantorAddress, setGrantorAddress] = useState<string | null>(null);

  return (
    <HomeWrapper>
      <GrantorWrapper>
        {getBgParticles(
          'linear-gradient(122deg, rgba(28,8,36,1) 5%, rgba(68,9,121,1) 26%, rgba(69,130,196,1) 95%)'
        )}
        <RoleSection
          onClick={() => {
            setGrantorAddress(null);
            setShowInput(false);
            props.history.push('./grantorHome');
          }}
        >
          Grantor
        </RoleSection>
      </GrantorWrapper>
      <BeneficiaryWrapper>
        {getBgParticles(
          'linear-gradient(257deg, rgba(30,48,111,1) 26%, rgba(122,63,179,1) 65%, rgba(92,150,214,1) 95%)'
        )}
        {
          <RoleSection onClick={() => setShowInput(true)}>
            Beneficiary
            {showInput && (
              <Input
                placeholder='Enter grantor address..'
                style={{ width: '80%' }}
                onChange={e => {
                  setGrantorAddress(e.target.value);
                }}
              />
            )}
            {grantorAddress && <Icon type='swap-right' />}
          </RoleSection>
        }
      </BeneficiaryWrapper>
    </HomeWrapper>
  );
};

export default HomePage;
