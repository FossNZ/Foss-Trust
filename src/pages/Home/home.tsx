import React, { useState, useEffect } from 'react';
import 'antd/dist/antd.css';
import { InjectedAccount } from '../../types/type';
import Wrapper from '../../components/Wrapper/index';
import styled from 'styled-components';
import { Icon, Input, InputNumber, Button, DatePicker } from 'antd';
import Particles from 'react-particles-js';
import BeneficiariesPage from '../../components/beneficiaries/index';

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

const InputSection = styled.div`
  position: absolute;
  top: 30%;
  left: 30%;
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

type Props = {
  accounts: InjectedAccount[];
  mainAccount: InjectedAccount;
};

const HomePage: React.FunctionComponent<Props> = props => {
  const [showInput, setShowInput] = useState(false);
  const [grantorAddress, setGrantorAddress] = useState<string | null>(null);

  return (
    <HomeWrapper>
      <GrantorWrapper>
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
            background:
              'linear-gradient(122deg, rgba(28,8,36,1) 5%, rgba(68,9,121,1) 26%, rgba(69,130,196,1) 95%)'
          }}
        />
        <RoleSection
          onClick={() => {
            setGrantorAddress(null);
            setShowInput(false);
          }}
        >
          Grantor
        </RoleSection>
      </GrantorWrapper>
      <BeneficiaryWrapper>
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
            background:
              'linear-gradient(264deg, rgba(34,48,101,1) 5%, rgba(140,85,190,1) 40%, rgba(78,137,201,1) 95%)'
          }}
        />
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
