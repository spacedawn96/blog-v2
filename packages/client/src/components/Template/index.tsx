import React from 'react';
import styled from 'styled-components';
import Footer from '../Footer';
import Header from '../NavBar';

const MainPageTemplateTap = styled.div``;

export type MainPageTemplateProps = {
  children?: React.ReactNode;
};

function MainPageTemplate(props: MainPageTemplateProps) {
  return (
    <div>
      <Header />
      {props.children}
      <Footer />
    </div>
  );
}

export default MainPageTemplate;
