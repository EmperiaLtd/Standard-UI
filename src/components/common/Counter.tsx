import { CounterProps } from '../../interfaces';
import { Box, Text } from '@chakra-ui/react';
import { AddIcon, MinusIcon } from '@chakra-ui/icons';
import React from 'react';

function Counter({ count, onIncrease, onDecrease }: CounterProps) {
  return (
    <Box
      w="100px"
      h="35px"
      padding="8px 12px"
      border="1px solid #9E9E9E"
      borderRadius="40px"
      display="flex"
      justifyContent="space-evenly"
      alignItems="center"
      gap={4}
    >
      <MinusIcon onClick={onDecrease} boxSize={[3]} cursor="pointer" transition="0.2s all" />
      <Text
        fontSize={['14px', '14px', '16px', '20px', '22px']}
        lineHeight={['18px', '18px', '18px', '22px', '22px']}
        fontFamily="Bogle"
        fontWeight="700"
        textAlign="center"
      >
        {count}
      </Text>
      <AddIcon onClick={onIncrease} boxSize={[3]} cursor="pointer" transition="0.2s all" />
    </Box>
  );
}

export default Counter;
