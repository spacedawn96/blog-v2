import React from 'react';
import styled from 'styled-components';
import Footer from '../Footer';
import Header from '../NavBar';

const MainPageTemplateTap = styled.div``;

export type MainPageTemplateProps = {
  children?: React.ReactNode;
};

function MainPageTemplate({ children }: MainPageTemplateProps) {
  return (
    <div>
      <Header />
      {children}
      <Footer />
    </div>
  );
}

export default MainPageTemplate;
