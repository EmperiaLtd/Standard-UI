import { Icon, IconProps } from '@chakra-ui/icons';
import React from 'react';

export const UnknownMediaIcon = (props: IconProps) => (
  <Icon width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    {/* Black background */}
    <rect width="64" height="64" rx="8" fill="black" />

    {/* Gray rectangle for media placeholder */}
    <rect x="12" y="12" width="40" height="40" rx="4" fill="transparent" />

    {/* Play Button */}
    <path d="M26 24L38 32L26 40V24Z" fill="white" />

    {/* Bottom Bar */}
    <path d="M20 46H44V50H20V46Z" fill="white" />
  </Icon>
);
