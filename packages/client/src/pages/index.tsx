import React from 'react';
import { toast, ToastContainer } from 'react-nextjs-toast';

import styled from 'styled-components';
import MainPageTemplate from '../components/Template';

const MainTitleTap = styled.div``;

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
        <div>hello</div>
      </MainPageTemplate>
    </>
  );
}
