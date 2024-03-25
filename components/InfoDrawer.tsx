import {
  Box,
  Image,
  Button,
  Text,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerOverlay,
} from '@chakra-ui/react';
import { CrossIcon } from '../assets/icons/CrossIcon';
import { InfoDrawerProps } from '../interfaces';

function InfoDrawer({ infoData, active, close }: InfoDrawerProps) {
  return (
    <Drawer
      isOpen={active}
      placement="right"
      onClose={close}
      size={['full', 'full', 'sm', 'sm', 'md']}
      closeOnOverlayClick={false}
    >
      <DrawerOverlay bg="transparent" />
      <DrawerContent
        background="linear-gradient(0deg, rgba(0, 0, 0, 0.10) 0%, rgba(0, 0, 0, 0.10) 100%), rgba(184, 184, 184, 0.20)"
        backdropFilter="blur(12px)"
        boxShadow="-4px 0px 4px 0px rgba(0, 0, 0, 0.25)"
      >
        <CrossIcon
          boxSize={4}
          stroke="black"
          position="absolute"
          filter="drop-shadow(4px 4px 4px rgba(0, 0, 0, 0.5))"
          top="15px"
          right="15px"
          cursor="pointer"
          onClick={close}
        />

        <DrawerBody padding="0px">
          <Box width="100%" height={['450px', '500px', '470px', '470px', '570px']}>
            <Image objectFit="cover" src={infoData?.image} height="100%" width="100%" borderRadius="inherit" />
          </Box>
          <Box
            width="100%"
            height="auto"
            display="flex"
            flexDirection="column"
            padding={['20px', '20px', '25px', '25px', '25px']}
          >
            <Box w="100%" height="auto" display="flex" flexDirection="column" justifyContent="space-between">
              <Text fontFamily="Montserrat-Bold" fontSize={['20px']} textTransform="uppercase" color="white">
                {infoData?.title}
              </Text>
              <Text m="10px 0px" fontFamily="Montserrat-Medium" fontSize={['14px']} color="white">
                {infoData?.subtitle}
              </Text>
              <Text fontFamily="Montserrat" fontSize={['12px']} color="white">
                {infoData?.description}
              </Text>
            </Box>
          </Box>
        </DrawerBody>

        <DrawerFooter p="0px" justifyContent="flex-start">
          <Box p={['20px', '20px', '25px', '25px', '25px']}>
            <Button
              w="100%"
              maxW={['200px']}
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
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

export default InfoDrawer;
