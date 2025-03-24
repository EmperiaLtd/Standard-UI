import { Box, Button, Text, Drawer, DrawerBody, DrawerContent, DrawerFooter, DrawerOverlay } from '@chakra-ui/react';
import { InfoDrawerProps } from '../../interfaces';
import React, { useState } from 'react';
import { CrossIcon } from '../../Icons/CrossIcon';
import MediaSlider from '../common/MediaSlider';
import { OpenInNewTabIcon } from '../../Icons/OpenLinkIcon';

interface InfoField {
  name: string;
  type: string;
  value: string | string[];
  displayOnUI: boolean;
}

function InfoDrawer({ infoData, active, close, editable }: InfoDrawerProps) {
  const [highlightImage, setHighlightImage] = useState('');
  const openLinkInNewTab = () => {
    window.open(infoData.linkToOpen.value, '_blank');
  };

  const renderField = (key: string, field: InfoField) => {
    switch (field.type) {
      case 'urlArray':
        if (field?.displayOnUI === false) {
          return null;
        }
        return (
          <MediaSlider
            key={key}
            images={field.value as string[]}
            setHighLightImage={setHighlightImage}
            turnTableUrl=""
            highlightImage={highlightImage || field.value[0]}
          />
        );
      case 'string':
        if (field?.displayOnUI === false) {
          return null;
        }
        if (key === 'title') {
          return (
            <Box padding={['0px 20px']} key={key}>
              <Text fontFamily="Montserrat-Bold" fontSize={['20px']} textTransform="uppercase" color="white" mt="10px">
                {field.value}
              </Text>
            </Box>
          );
        }
        if (key === 'buttonTitle') {
          return null;
        }
        if (key === 'displayName') {
          return null;
        }
        return (
          <Box padding={['0px 20px']} key={key}>
            <Text key={key} m="10px 0px" fontFamily="Montserrat-Medium" fontSize={['14px']} color="white">
              {field.value}
            </Text>
          </Box>
        );
      default:
        return null;
    }
  };

  return (
    <Drawer
      isOpen={active}
      placement="right"
      onClose={close}
      size={['full', 'full', 'sm', 'sm', 'md']}
      closeOnOverlayClick={editable ? false : true}
      autoFocus={false}
      trapFocus={false}
    >
      {!editable && <DrawerOverlay onClick={close} />}
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
              justifyContent={'flex-end'}
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
            <Box w="100%" height="auto" display="flex" flexDirection="column" justifyContent="space-between">
              {infoData && Object.entries(infoData).map(([key, field]) => renderField(key, field))}
            </Box>
          </Box>
        </DrawerBody>

        {infoData?.buttonTitle?.displayOnUI && (
          <DrawerFooter
            p={['20px', '20px', '20px', '30px', '30px']}
            width={['100%']}
            border-top="1px solid #FFFFFF4D"
            w="100%"
          >
            <Box width={['100%']} display="flex" gap={[4]}>
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
                {infoData?.buttonTitle?.value}
              </Button>
            </Box>
          </DrawerFooter>
        )}
      </DrawerContent>
    </Drawer>
  );
}

export default InfoDrawer;
