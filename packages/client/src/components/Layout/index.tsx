import React from 'react';
import styled from 'styled-components';

const MainLayoutTap = styled.div``;

export type MainLayoutProps = {
  children: React.ReactNode;
};

export default function MainLayout(props: MainLayoutProps) {
  return <div>{props.children}</div>;
}

export function LeftNav({ children }) {
  return <div>{children}</div>;
}
export function CoenterCntent({ children }) {
  return <div>{children}</div>;
}

export function RightContent({ children }) {
  return <div>{children}</div>;
}

MainLayout.LeftNav = LeftNav;
MainLayout.CoenterCntent = CoenterCntent;
MainLayout.RightContent = RightContent;
