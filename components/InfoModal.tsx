import { Box, Button, Text } from '@chakra-ui/react';
import { CrossIcon } from '../assets/icons/CrossIcon';
import { InfoModalProps } from '../interfaces';

function InfoModal({ infoData, active, close }: InfoModalProps) {
  const transition = 'all 0.2s ease-in-out';

  return (
    <Box
      zIndex="12"
      opacity={active ? 1 : 0}
      visibility={active ? 'visible' : 'hidden'}
      transition={transition}
      position="fixed"
      right={['0px', '0px', '20px']}
      bottom={['0px', '0px', '20px']}
      margin="auto"
      background="linear-gradient(0deg, rgba(0, 0, 0, 0.10) 0%, rgba(0, 0, 0, 0.10) 100%), rgba(184, 184, 184, 0.20)"
      borderRadius={['0px', '0px', '12px', '12px']}
      boxShadow="0px 4px 4px 0px rgba(0, 0, 0, 0.25)"
      backdropFilter="blur(12px)"
      width={['100%', '100%', '375px', '425px', '425px']}
      height={['auto', 'auto', 'auto', 'auto']}
      overflowY={['auto', 'auto', 'unset', 'unset']}
      overflowX="hidden"
      display="flex"
      flexDirection={['column', 'column', 'column', 'row']}
    >
      <CrossIcon
        boxSize={4}
        stroke="white"
        position="absolute"
        filter="drop-shadow(4px 4px 4px rgba(0, 0, 0, 0.5))"
        top="15px"
        right="15px"
        cursor="pointer"
        onClick={close}
      />

      <Box width="100%" height="100%" display="flex" flexDirection="column" padding={['20px', '20px', '25px', '25px']}>
        <Box w="100%" height="auto" display="flex" flexDirection="column" justifyContent="space-between" mb="40px">
          <Text fontFamily="Montserrat-Bold" fontSize={['20px']} textTransform="uppercase" color="white">
            {infoData?.title}
          </Text>
          <Text m="10px 0px" fontFamily="Montserrat-Medium" fontSize={['14px']} color="white">
            {infoData?.subtitle}
          </Text>
          <Text
            fontFamily="Montserrat"
            fontSize={['12px']}
            color="white"
            maxH={['105px', '160px', '145px', '200px']}
            overflow="auto"
          >
            {infoData?.description}
          </Text>
        </Box>
        <Button
          marginTop="auto"
          maxW="200px"
          textTransform="uppercase"
          fontFamily="Montserrat"
          bg="rgba(0, 0, 0, 0.1)"
          _hover={{ bg: 'rgba(0, 0, 0, 0.3)' }}
          border="1px solid rgba(255, 255, 255, 0.80)"
          boxShadow="0px 4px 4px 0px rgba(0, 0, 0, 0.25);"
          backdropFilter="blur(12px)"
          color="white"
        >
          {infoData?.moreCTA}
        </Button>
      </Box>
    </Box>
  );
}

export default InfoModal;
