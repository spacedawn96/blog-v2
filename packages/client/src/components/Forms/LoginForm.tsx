import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Router from 'next/router';
import { ApolloError } from '@apollo/client';
import media from '../../lib/styles/media';
import LabelInput from '../LabelInput/LabelInput';
import Button from '../Button';

const LoginFormTap = styled.div`
  margin-top: 4rem;
  display: flex;
  align-items: flex-end;
  ${media.custom(500)} {
    display: flex;
    justify-content: center;
  }
  .button-wrapper {
    width: 150%;
    display: flex;
    justify-content: flex-end;
    ${media.custom(500)} {
      width: 100%;
    }
  }
`;

interface inputArray {
  email: string;
  password: string;
}

export type LoginFormProps = {
  inputs: inputArray;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  loginError: ApolloError;
};

function LoginForm(props: LoginFormProps) {
  const router = useRouter();

  return (
    <LoginFormTap>
      <form onSubmit={props.handleSubmit}>
        <LabelInput
          label="Email"
          placeholder="Your Email"
          name="email"
          value={props.inputs.email}
          type="text"
          onChange={props.handleChange}
        />
        <LabelInput
          label="Password"
          placeholder="Password"
          name="password"
          type="password"
          value={props.inputs.password}
          onChange={props.handleChange}
        />

        <div className="button-wrapper">
          <Button
            color="blue"
            size={24}
            iconAfter="arrow-right"
            style={{ marginRight: '1rem' }}>
            Sign In
          </Button>

          <Button color="blue" size={24} iconBefore="edit">
            Create Account
          </Button>
        </div>
      </form>
    </LoginFormTap>
  );
}

export default LoginForm;
