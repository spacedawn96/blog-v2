import React from 'react';
import styled from 'styled-components';
import Navbar from './NavBar';
import useGetUser from './hooks/useGetUser';
import heightMedia from '../../lib/styles/height';
import media from '../../lib/styles/media';

export const Logo = require('./logo.png');

const TopBannerTap = styled.div`
  height: 42vh;
  background: url('https://designmodo.com/wp-content/uploads/2020/06/google-analytics-ux.jpg')
    no-repeat center;
  background-size: cover;
`;
const BarCenter = styled.div`
  ${heightMedia.custom(600)} {
    display: none;
  }
  display: inline-block;
  text-align: center;
  padding-top: 4rem;
  margin: 0 auto;
  width: 100%;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, Segoe UI, Helvetica, Arial,
    sans-serif;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2), 0 5px 10px rgba(0, 0, 0, 0.2);
  ${media.custom(400)} {
    padding-top: 2rem;
  }
`;

const Barlog = styled.div`
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2), 0 5px 10px rgba(0, 0, 0, 0.2);
  font-size: 4rem;
  font-weight: 600;
  line-height: 1;
  letter-spacing: -0.022em;
  color: #fff;
  text-align: center;
  font-weight: bold;
  margin-bottom: 1rem;
`;

const BarPost = styled(Barlog)`
  font-size: 20px;
`;

export type TopBannerProps = {
  datas?: number;
};

export const item = ['login', 'register'];
export const item2 = ['write', 'menu'];

function TopBanner(props: TopBannerProps) {
  const { data } = useGetUser();

  return (
    <TopBannerTap>
      <div className="layout-wrapper">
        {/* <Navbar items={data?.me ? item2 : item} Logo={Logo} color="#fff" /> */}
        {/* {props.datas ? (
          <BarCenter>
            <Barlog>Dev Post</Barlog>
            <BarPost>{props.datas} ARTICLES</BarPost>
          </BarCenter>
        ) : (
          ''
        )} */}
      </div>
    </TopBannerTap>
  );
}

export default TopBanner;
