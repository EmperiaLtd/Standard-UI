import { CounterProps } from '../../interfaces';
import { Box, Text } from '@chakra-ui/react';
import { Minus } from '../../Icons/Minus';
import { Plus } from '../../Icons/Plus';
import React from 'react';

function ProductCounter({ count, available, onIncrease, onDecrease }: CounterProps) {
  return (
    <Box
      w={['40%', '40%', '30%']}
      h="44px"
      padding="8px 12px"
      background="radial-gradient(100% 131.36% at 0% 0%, rgba(158, 158, 158, 0.3) 0%, rgba(158, 158, 158, 0.1) 100%), linear-gradient(0deg, rgba(4, 31, 65, 0.3), rgba(4, 31, 65, 0.3));"
      border="1px solid #FFFFFF4D"
      gap="12px"
      borderRadius="40px"
      display="flex"
      justifyContent="space-evenly"
      alignItems="center"
    >
      <Minus
        boxSize={['24px']}
        opacity={count === 0 || !available ? '0.2' : '1'}
        onClick={available ? onDecrease : () => console.log('Not Available')}
        cursor="pointer"
      />
      <Text
        fontSize={['14px', '14px', '16px', '20px', '22px']}
        lineHeight={['18px', '18px', '18px', '22px', '22px']}
        fontFamily="Bogle"
        fontWeight="700"
        letterSpacing="-0.02em"
        textAlign="center"
        minW="20px"
        color="white"
        opacity={!available ? '0.2' : '1'}
      >
        {count}
      </Text>
      <Plus
        boxSize={['24px']}
        opacity={!available ? '0.2' : '1'}
        onClick={available ? onIncrease : () => console.log('Not Available')}
        cursor="pointer"
      />
    </Box>
  );
}

export default ProductCounter;
