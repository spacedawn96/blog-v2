import React from 'react';
import styled from 'styled-components';

const ListTap = styled.div`
  display: flex;
`;

export type ListProps = {
  children?: React.ReactNode;
};

function List(props: ListProps) {
  return <ListTap>{props.children}</ListTap>;
}

export default List;