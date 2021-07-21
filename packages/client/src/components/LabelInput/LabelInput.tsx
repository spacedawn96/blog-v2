import React, { useCallback, useState } from 'react';

import styled, { css } from 'styled-components';
import { colors } from '../../lib/styles/colors';
import media from '../../lib/styles/media';

const LabelInputTap = styled.div<{ focus: boolean }>`
  width: 150%;
  ${media.custom(500)} {
    width: 100%;
  }
  label {
    font-weight: bold;
    font-size: 1rem;
    color: ${colors.base};
    margin-bottom: 1rem;
    transition: all 0.125s ease-in;
    ${props =>
      props.focus &&
      css`
        color: ${colors.dark};
      `}
  }
  input {
    display: block;
    font-size: 1.5rem;
    border: none;
    outline: none;
  }
  ${props =>
    props.focus &&
    css`
      color: ${colors.dark};
    `}
  &::placeholder {
    color: ${colors.greenBase};
  }
  .input-wrapper {
    padding-bottom: 0.5rem;
    margin-bottom: 1rem;
    border-bottom: 1px solid ${colors.blueLight};
    display: flex;
    align-items: center;
    ${props =>
      props.focus &&
      css`
        border-color: ${colors.blueBase};
      `}
  }
`;

export type LabelInputProps = {
  label?: string;
  placeholder?: string;
  name?: string;
  value?: any;
  onChange?: React.ChangeEventHandler;
  type?: string;
};

function LabelInput(props: LabelInputProps) {
  const [focus, setFocus] = useState(false);

  const onFocus = useCallback(() => {
    setFocus(true);
  }, []);
  const onBlur = useCallback(() => {
    setFocus(false);
  }, []);

  return (
    <LabelInputTap focus={focus}>
      <label>
        {props.label} <span style={{ color: 'red' }}> *</span>
      </label>
      <div className="input-wrapper">
        <input
          name={props.name}
          type={props.type}
          onChange={props.onChange}
          value={props.value}
          placeholder={props.placeholder}
          onFocus={onFocus}
          onBlur={onBlur}
          {...props}
        />
      </div>
    </LabelInputTap>
  );
}

export default LabelInput;
