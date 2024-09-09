import { Box, Text } from '@chakra-ui/react';
import { VariantItemProps } from '../../interfaces';
import React, { useEffect, useRef, useState } from 'react';

function VariantItem({ active = false, transition, name, available, onClick }: VariantItemProps) {
  const boxRef = useRef<HTMLDivElement>(null);
  const [boxDimensions, setBoxDimensions] = useState({ width: 0, height: 0 });
  const [angle, setAngle] = useState(0);

  useEffect(() => {
    if (boxRef.current) {
      setBoxDimensions({
        width: boxRef.current.offsetWidth,
        height: boxRef.current.offsetHeight,
      });
    }
  }, [boxRef.current]);

  useEffect(() => {
    const calculateAngle = () => {
      const box = boxRef.current;
      if (!box) return;

      const width = box.offsetWidth;
      const height = box.offsetHeight;
      const radians = Math.atan(height / width);
      const degrees = radians * (180 / Math.PI);

      setAngle(degrees);
    };

    calculateAngle();
  }, []);

  const diagonalLength = Math.sqrt(boxDimensions.width ** 2 + boxDimensions.height ** 2);

  return (
    <Box
      ref={boxRef}
      _notLast={{ marginRight: '10px' }}
      mt={['10px']}
      mb={['10px']}
      padding={['0px 5px', '0px 5px', '0px 5px', '0px 5px', '0px 5px']}
      bg={
        active
          ? 'white'
          : available
          ? 'radial-gradient(100% 131.36% at 0% 0%, rgba(158, 158, 158, 0.3) 0%, rgba(158, 158, 158, 0.1) 100%),linear-gradient(0deg, rgba(4, 31, 65, 0.3), rgba(4, 31, 65, 0.3))'
          : 'transparent'
      }
      _hover={{
        boxShadow: available ? '0px 2px 4px 0px rgba(0, 0, 0, 0.25)' : 'unset',
        bg: available ? 'white' : 'rgba(0, 0, 0, 0)',
        color: available ? 'black' : 'rgba(255, 255, 255, 0.4)',
      }}
      border={active ? 'white' : '1px solid #FFFFFF4D'}
      color={active ? 'black' : available ? 'white' : 'rgba(255, 255, 255, 0.4)'}
      borderRadius="4px"
      boxShadow={active ? '0px 2px 4px 0px rgba(0, 0, 0, 0.25)' : 'unset'}
      width="auto"
      minW={name.length > 5 ? 'fit-content' : ['44px', '44px', '50px', '50px', '50px']}
      height={['44px', '44px', '50px', '50px', '50px']}
      position="relative"
      overflow="hidden"
      display="flex"
      justifyContent="center"
      alignItems="center"
      cursor={available ? 'pointer' : 'unset'}
      onClick={onClick}
      pointerEvents={available ? 'all' : 'none'}
      transition={transition}
    >
      <Text
        fontFamily="Bogle"
        fontWeight="700"
        fontSize={['14px', '14px', '12px', '14px']}
        lineHeight={['18px', '18px']}
      >
        {name}
      </Text>
      {!available && <Box position="absolute" opacity="0.3" bg="rgba(0, 0, 0, 0.2)" width="100%" height="100%" />}

      {!available && (
        <Box
          width={`${diagonalLength}px`}
          transform={`rotate(-${angle}deg)`}
          transformOrigin="top right"
          borderTop="1px solid rgb(255, 255, 255)"
          position="absolute"
          top="-2px"
          right="-1px"
          boxSizing="border-box"
        ></Box>
      )}
    </Box>
  );
}

export default VariantItem;
