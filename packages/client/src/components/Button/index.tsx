import React from 'react';

import { Button as EvergreenButton, ButtonProps } from 'evergreen-ui';

function Buttons(props: ButtonProps) {
  return (
    <EvergreenButton height={props.size} width={props.width} {...props}>
      {props.children}
    </EvergreenButton>
  );
}

export default Buttons;
