import React from 'react';
import styled from 'styled-components';
import heightMedia from '../../lib/styles/height';

const CardTap = styled.div`
  background: #fff;
  padding: 50px 20px;
  box-shadow: 0px 20px 40px rgba(10, 33, 65, 0.05), 0px 0px 2px rgba(0, 0, 0, 0.13);
  border-radius: 6px;
  max-width: 460px;
  margin: 0 auto;
  line-height: 1.5;
  background: ${props => props.color};
  margin-top: 5vh;
  height: 50vh;
  ${heightMedia.custom(800)} {
    height: unset;
  }
  label,
  input {
    display: block;
  }
`;
const Title = styled.div`
  font-size: 21px;
  text-align: center;
  margin-bottom: 15px;
  color: #262626;
  font-weight: bold;
  font-weight: 600;
`;

export type CardProps = {
  children?: React.ReactNode;
  title?: string;
};

function Card(props: CardProps) {
  return (
    <CardTap>
      <Title>{props.title}</Title>
      <div>{props.children}</div>
    </CardTap>
  );
}

export default Card;
