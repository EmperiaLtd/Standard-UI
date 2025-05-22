import { Box, Modal, ModalContent, Spinner } from '@chakra-ui/react';
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
  const [iframeLoaded, setIframeLoaded] = useState(false);

  const handleIframeLoad = () => {
    setIframeLoaded(true);
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
      <Modal isOpen={active} onClose={onClose} size={['full', 'full', 'full', 'full', 'full']} autoFocus={false}>
        <ModalContent
          overflow={'hidden'}
          background="linear-gradient(0deg, rgba(0, 0, 0, 0.10) 0%, rgba(0, 0, 0, 0.10) 100%), rgba(184, 184, 184, 0.20)"
          backdropFilter="blur(12px)"
        >
          <Box
            width="100%"
            height="100vh"
            margin={0}
            padding={0}
            display="flex"
            justifyContent="center"
            position="relative"
            background="linear-gradient(0deg, rgba(0, 0, 0, 0.10) 0%, rgba(0, 0, 0, 0.10) 100%), rgba(184, 184, 184, 0.20)"
            onClick={onClose}
          >
            <CrossIcon
              position="absolute"
              cursor="pointer"
              onClick={onClose}
              boxSize={4}
              stroke="white"
              filter="drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.5))"
              zIndex={10000}
              fontSize={['20px']}
              aria-label="Close"
              top="20px"
              right="20px"
            />

            <Box flex={1} maxWidth={['70%', '70%', '70%', '70%', '70%']} height="100%">
              <Box
                as="iframe"
                src={url}
                id="ar-iframe"
                width="100%"
                height="100%"
                allow="camera"
                visibility={iframeLoaded ? 'unset' : 'hidden'}
                onLoad={url.length > 0 ? handleIframeLoad : undefined}
              ></Box>
              {!iframeLoaded && (
                <Spinner color="white" position="absolute" left={0} right={0} top={0} bottom={0} margin="auto" />
              )}
            </Box>
          </Box>
        </ModalContent>
      </Modal>
    </Fragment>
  );
};

export default ArDrawer;
