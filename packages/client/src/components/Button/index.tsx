import React from 'react';

import { Button as EvergreenButton, ButtonProps } from 'evergreen-ui';

function Button(props: ButtonProps) {
  return (
    <EvergreenButton height={props.size} width={props.width} {...props}>
      {props.children}
    </EvergreenButton>
  );
}

export default Button;
