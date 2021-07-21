import React from 'react';

import styled from 'styled-components';
import MainLayout from '../components/Layout';
import MainPageTemplate from '../components/Template';

const MainTitleTap = styled.div`
  color: red;
`;

export type MainTitleProps = {
  mainTitle: string;
};

export function MainTitle({ mainTitle }: MainTitleProps) {
  return <div>{mainTitle}</div>;
}

export default function Home() {
  return (
    <>
      <MainPageTemplate>
        <MainLayout.FirstContent>
          <div>hello</div>
        </MainLayout.FirstContent>
        <MainLayout.CoenterCntent>
          <div>hello2</div>
        </MainLayout.CoenterCntent>
      </MainPageTemplate>
    </>
  );
}
