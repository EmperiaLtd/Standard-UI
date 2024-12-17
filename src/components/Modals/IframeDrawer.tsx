import { Box, Modal, ModalContent, ModalOverlay, Spinner } from '@chakra-ui/react';
import React, { Fragment, useState } from 'react';
import { CrossIcon } from '../../Icons/CrossIcon';

interface IframeProps {
  iframeId: string;
  active: boolean;
  url: string;
  onClose: () => void;
}

const IframeDrawer = ({ iframeId, active, url, onClose }: IframeProps) => {
  const [loaded, setLoaded] = useState(false);

  const handleFrameLoad = () => {
    setLoaded(true);
  };
  return (
    <Fragment key={iframeId}>
      <Modal isOpen={active} onClose={onClose} size={['full', 'full', 'full', 'full', 'full']} autoFocus={false}>
        <ModalOverlay
          onClick={onClose}
          background="linear-gradient(0deg, rgba(0, 0, 0, 0.10) 0%, rgba(0, 0, 0, 0.10) 100%), rgba(184, 184, 184, 0.20)"
          backdropFilter="blur(12px)"
        />
        <ModalContent margin={0} padding={0} overflow={'hidden'} bg="transparent">
          <Box
            width={['100%', '100%', '100%', '100%', '100%']}
            margin={0}
            padding={0}
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
            position="relative"
            h={['100vh']}
            background="linear-gradient(0deg, rgba(0, 0, 0, 0.10) 0%, rgba(0, 0, 0, 0.10) 100%), rgba(184, 184, 184, 0.20)"
            backdropFilter="blur(12px)"
          >
            <Box
              height="50px"
              width="100%"
              display="flex"
              justifyContent="flex-end"
              alignItems="center"
              padding={['0px 20px']}
            >
              <CrossIcon
                cursor="pointer"
                onClick={onClose}
                boxSize={4}
                stroke="white"
                filter="drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.5))"
                zIndex={10000}
              />
            </Box>
            <Box
              margin={'auto'}
              width={['90%', '90%', '90%', '90%', '100%']}
              h={['100vh']}
              textAlign="center"
              position="relative"
              borderRadius={'16px'}
              display={'flex'}
              justifyContent={'center'}
              alignItems={'center'}
              onClick={onClose}
            >
              <iframe
                role="iframe"
                aria-labelledby="Iframe-test"
                src={url}
                title={'testIframe'}
                width="100%"
                height="80%"
                style={{ borderRadius: '8px' }}
                frameBorder="0"
                allowFullScreen
                data-testid="iframe-test"
                onLoad={handleFrameLoad}
              />
              {!loaded && (
                <Box position="absolute" top="50%" left="50%" transform="translate(-50%, -50%)" zIndex={1}>
                  <Spinner size="xl" color="white" />
                </Box>
              )}
            </Box>
          </Box>
        </ModalContent>
      </Modal>
    </Fragment>
  );
};

export default IframeDrawer;
