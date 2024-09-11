import React from 'react';
import { Icon, IconProps } from '@chakra-ui/icons';

export const Plus = (props: IconProps) => (
  <Icon width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      d="M12 19.5V12M12 12V4.5M12 12H4.5M12 12H19.5"
      stroke="white"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Icon>
);
