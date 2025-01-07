import { Box, Modal, ModalOverlay, ModalContent, Spinner } from '@chakra-ui/react';
import React, { Fragment, useEffect, useState } from 'react';
import { CrossIcon } from '../../Icons/CrossIcon';
import { getOpSys } from '../../utils/helper';

interface ARProps {
  arId: string;
  active: boolean;
  url: string;
  onClose: () => void;
}

const ArDrawer = ({ arId, active, url, onClose }: ARProps) => {
  const [isLoaded, setIsLoaded] = useState(false);

  const handleIframeLoad = () => {
    setIsLoaded(true);
  };

  const activateARViewer = () => {
    const redirectLink = process.env.REACT_APP_DOMAIN_NAME || '';
    const somethingWentWrongText = 'Something went wrong';

    const anchor = document.createElement('a');

    const detectedOs = getOpSys();
    if (detectedOs === 'IOS') {
      const fileDirectory = url;
      anchor.setAttribute('rel', 'ar');
      anchor.appendChild(document.createElement('img'));
      anchor.setAttribute('href', fileDirectory + '#allowsContentScaling=0');
      anchor.click();
    } else if (detectedOs === 'Android') {
      console.log('android android');
      const fileDirectory = url;
      const fallbackUrl =
        'https://arvr.google.com/scene-viewer?file=' +
        encodeURIComponent(fileDirectory) +
        '&link=' +
        encodeURIComponent(redirectLink) +
        '&title=' +
        somethingWentWrongText +
        '';

      const intentConstruct =
        '?file=' +
        fileDirectory +
        '&mode=ar_preferred#Intent;scheme=https;package=com.google.android.googlequicksearchbox;action=android.intent.action.VIEW;S.browser_fallback_url=' +
        fallbackUrl +
        ';end;';

      const sceneViewerUrl = 'intent://arvr.google.com/scene-viewer/1.0' + intentConstruct;

      anchor.href = sceneViewerUrl;
      anchor.appendChild(document.createElement('img'));
      document.body.appendChild(anchor);
      anchor.click();
    } else {
      
    }
  };

  useEffect(() => {
    if (active) {
      activateARViewer();
    }
  }, [active]);
  return (
    <Fragment key={arId}>
      <Modal
        onOverlayClick={onClose}
        isOpen={active}
        onClose={onClose}
        size={['full', 'full', 'full', 'full', 'full']}
        autoFocus={false}
      >
        <ModalOverlay
          onClick={onClose}
          background="linear-gradient(0deg, rgba(0, 0, 0, 0.10) 0%, rgba(0, 0, 0, 0.10) 100%), rgba(184, 184, 184, 0.20)"
        />

        <ModalContent
          onClick={onClose}
          margin={0}
          padding={0}
          overflow={'hidden'}
          background="linear-gradient(0deg, rgba(0, 0, 0, 0.10) 0%, rgba(0, 0, 0, 0.10) 100%), rgba(184, 184, 184, 0.20)"
          backdropFilter="blur(12px)"
        >
          <Box
            width={['100%', '100%', '100%', '100%', '100%']}
            margin={0}
            onClick={onClose}
            padding={0}
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
            position="relative"
            background="linear-gradient(0deg, rgba(0, 0, 0, 0.10) 0%, rgba(0, 0, 0, 0.10) 100%), rgba(184, 184, 184, 0.20)"
          >
            <Box
              height="55px"
              width="100%"
              display="flex"
              justifyContent="flex-end"
              alignItems="center"
              padding={['0px 20px']}
              top="20px"
              right="10px"
            >
              <CrossIcon
                cursor="pointer"
                onClick={onClose}
                boxSize={4}
                stroke="white"
                filter="drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.5))"
                zIndex={10000}
                aria-label="Close"
                top="20px" 
                right="10px"
              />
            </Box>
            <Box
              key={'dynamicKey'}
              className="identify"
              display="flex !important"
              position="relative"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              margin={'0 auto'}
              cursor="pointer"
              width={['70%', '70%', '70%', '70%', '70%']}
              h={['90vh']}
              gap={5}
            >
              <Box flex={1} width="100%" height="100%">
                <iframe
                  src={url}
                  frameBorder="0"
                  id="ar-iframe"
                  width="100%"
                  height="100%"
                  allow="camera"
                  onLoad={handleIframeLoad}
                ></iframe>
                {!isLoaded && (
                  <Spinner color="white" position="absolute" left={0} right={0} top={0} bottom={0} margin="auto" />
                )}
              </Box>
            </Box>
          </Box>
        </ModalContent>
      </Modal>
    </Fragment>
  );
};

export default ArDrawer;
