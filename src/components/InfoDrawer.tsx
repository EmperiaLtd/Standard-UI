import { Box, Button, Text, Drawer, DrawerBody, DrawerContent, DrawerFooter, DrawerOverlay } from '@chakra-ui/react';
import { InfoDrawerProps } from '../interfaces';
import React, { useState } from 'react';
import { CrossIcon } from '../Icons/CrossIcon';
import MediaSlider from './common/MediaSlider';
import { OpenInNewTabIcon } from '../Icons/OpenLinkIcon';

function InfoDrawer({ infoData, active, close }: InfoDrawerProps) {
  const [highlightImage, setHighlightImage] = useState('');
  const openLinkInNewTab = () => {
    window.open(infoData.linkToOpen, '_blank');
  };
  return (
    <Drawer
      isOpen={active}
      placement="right"
      onClose={close}
      size={['full', 'full', 'sm', 'sm', 'md']}
      closeOnOverlayClick={true}
    >
      <DrawerOverlay />
      <DrawerContent
        background="linear-gradient(0deg, rgba(0, 0, 0, 0.10) 0%, rgba(0, 0, 0, 0.10) 100%), rgba(184, 184, 184, 0.20)"
        backdropFilter="blur(12px)"
      >
        <DrawerBody
          padding="0px"
          style={{
            scrollbarWidth: 'none',
          }}
          overflowX="hidden"
          background="linear-gradient(0deg, rgba(0, 0, 0, 0.10) 0%, rgba(0, 0, 0, 0.10) 100%), rgba(184, 184, 184, 0.20)"
          backdropFilter="blur(12px)"
        >
          <Box width="100%" height="auto" display="flex" flexDirection="column">
            <Box
              height="50px"
              width="100%"
              display="flex"
              justifyContent="flex-end"
              alignItems="center"
              padding={['0px 20px']}
              background="linear-gradient(0deg, rgba(0, 0, 0, 0.10) 0%, rgba(0, 0, 0, 0.10) 100%), rgba(184, 184, 184, 0.20)"
              backdropFilter="blur(12px)"
            >
              <CrossIcon
                cursor="pointer"
                onClick={close}
                boxSize={4}
                stroke="white"
                filter="drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.5))"
                zIndex={10}
                data-testid="cross-icon"
              />
            </Box>
            {infoData && infoData.mediaURLs && infoData.mediaURLs?.length > 0 && (
              <MediaSlider
                setHighLightImage={setHighlightImage}
                turnTableUrl=""
                images={infoData.mediaURLs}
                highlightImage={highlightImage || infoData.mediaURLs[0]}
              />
            )}
            <Box
              w="100%"
              height="auto"
              display="flex"
              flexDirection="column"
              justifyContent="space-between"
              padding={['0px 20px']}
            >
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

        {infoData?.buttonTitle && infoData.linkToOpen && (
          <DrawerFooter
            p={['20px', '20px', '20px', '30px', '30px']}
            justifyContent="flex-start"
            background="linear-gradient(0deg, rgba(0, 0, 0, 0.10) 0%, rgba(0, 0, 0, 0.10) 100%), rgba(184, 184, 184, 0.20)"
            backdropFilter="blur(12px)"
          >
            <Box
              width={['100%']}
              display="flex"
              justifyContent="center"
              alignItems="center"
              flexDir="column"
              padding="0px 24px"
            >
              <Button
                leftIcon={<OpenInNewTabIcon boxSize={['24px']} />}
                variant="solid"
                color="white"
                padding={['16px 32px']}
                borderRadius="40px"
                bg="rgba(0, 0, 0, 0.1)"
                _hover={{ bg: 'rgba(0, 0, 0, 0.3)' }}
                border="1px solid #FFFFFF4D"
                fontSize={['18px', '18px']}
                fontWeight="700"
                fontFamily="Montserrat"
                cursor="pointer"
                pointerEvents="auto"
                w={['100%', '100%', '100%', '100%', '100%']}
                h="44px"
                onClick={openLinkInNewTab}
              >
                {infoData?.buttonTitle}
              </Button>
            </Box>
          </DrawerFooter>
        )}
      </DrawerContent>
    </Drawer>
  );
}

export default InfoDrawer;
