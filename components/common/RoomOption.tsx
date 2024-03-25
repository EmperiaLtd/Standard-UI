import { Box, Text } from '@chakra-ui/react';
import { RoomOptionProps } from '../../interfaces';

function RoomOption({ name, active, description, transition, onClick }: RoomOptionProps) {
  return (
    <Box
      width={['160px', '160px', '90%', '90%', '90%']}
      m="0 auto"
      p={['10px 10px']}
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
        textTransform="uppercase"
        color={active ? 'black' : 'white'}
      >
        {name}
      </Text>
      <Text
        fontSize={['13px', '13px', '14px', '14px', '15px']}
        fontFamily="Montserrat"
        color={active ? 'black' : 'white'}
      >
        {description}
      </Text>
    </Box>
  );
}

export default RoomOption;
