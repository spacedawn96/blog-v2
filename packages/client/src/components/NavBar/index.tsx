import React from 'react';
import styled from 'styled-components';
import useGetUser from './hooks/useGetUser';
import heightMedia from '../../lib/styles/height';
import media from '../../lib/styles/media';
import Navbar from './NavBar';

export const Logo = require('./logo.png');

const HeaderTap = styled.div`
  height: 42vh;
  background: url('https://designmodo.com/wp-content/uploads/2020/06/google-analytics-ux.jpg')
    no-repeat center;
  background-size: cover;
`;

export type HeaderProps = {
  data?: number;
};

export const item = ['login', 'register'];
export const item2 = ['write', 'menu'];

function Header({}: HeaderProps) {
  const { data } = useGetUser();

  return (
    <HeaderTap>
      <div className="layout-wrapper">
        <Navbar
          items={data?.me ? item2 : item}
          Logo={Logo}
          color="#fff"
          data="a"
          loading={true}
        />
      </div>
    </HeaderTap>
  );
}

export default Header;
