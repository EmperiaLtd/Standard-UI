import { Box, Text } from '@chakra-ui/react';

interface SizeProps {
  active?: boolean;
  transition: string;
  sizeName: string;
  available: boolean;
  onSizeClick: () => void;
}

function Size({ active = false, transition, sizeName, available, onSizeClick }: SizeProps) {
  return (
    <Box
      _notLast={{ marginRight: '10px' }}
      mb={['10px']}
      bg={active ? 'white' : available ? 'rgba(0, 0, 0, 0.4)' : 'rgba(0, 0, 0, 0)'}
      _hover={{
        boxShadow: available ? '0px 2px 4px 0px rgba(0, 0, 0, 0.25)' : 'unset',
        bg: available ? 'white' : 'rgba(0, 0, 0, 0)',
        color: available ? 'black' : 'rgba(255, 255, 255, 0.4)',
      }}
      color={active ? 'black' : available ? 'white' : 'rgba(255, 255, 255, 0.4)'}
      borderRadius="4px"
      boxShadow={active ? '0px 2px 4px 0px rgba(0, 0, 0, 0.25)' : 'unset'}
      width={['30px', '30px', '40px', '40px', '40px']}
      height={['30px', '30px', '40px', '40px', '40px']}
      position="relative"
      overflow="hidden"
      display="flex"
      justifyContent="center"
      alignItems="center"
      cursor={available ? 'pointer' : 'unset'}
      onClick={onSizeClick}
      pointerEvents={available ? 'all' : 'none'}
      transition={transition}
    >
      <Text fontFamily="Montserrat-Medium" fontWeight="900" fontSize={['14px', '14px', '12px', '14px']}>
        {sizeName}
      </Text>
      {!available && (
        <Box
          position="absolute"
          opacity="0.3"
          bg="rgba(0, 0, 0, 0.2)"
          width={['30px', '30px', '30px', '40px']}
          height={['30px', '30px', '30px', '40px']}
        />
      )}

      {!available && (
        <Box
          width={['calc(1.414 * 30px)', 'calc(1.414 * 30px)', 'calc(1.414 * 30px)', 'calc(1.414 * 40px)']}
          transform="rotate(-45deg)"
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

export default Size;
