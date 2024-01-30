import { Box, Text } from '@chakra-ui/react';
import { SoundOptionProps } from '../../interfaces';

function SoundOption({ active, name, transition, onClick }: SoundOptionProps) {
  return (
    <Box
      textAlign="center"
      width={['160px', '160px', '90%', '90%', '90%']}
      m="0 auto"
      p={['10px 20px']}
      borderRadius="12px"
      background={active ? 'white' : 'rgba(0, 0, 0, 0.15)'}
      boxShadow="0px 2px 4px 0px rgba(0, 0, 0, 0.25)"
      marginBottom="15px"
      _hover={{
        background: !active && 'rgba(0, 0, 0, 0.30)',
      }}
      transition={transition}
      onClick={onClick}
    >
      <Text
        fontSize={['13px', '13px', '14px', '14px', '15px']}
        fontFamily="Montserrat-Bold"
        color={active ? 'black' : 'white'}
      >
        {name}
      </Text>
    </Box>
  );
}

export default SoundOption;
