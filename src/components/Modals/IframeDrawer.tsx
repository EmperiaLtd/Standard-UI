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
  const [iframeLoaded, setIframeLoaded] = useState(false);

  const handleIframeLoad = () => {
    setIframeLoaded(true);
  };
  return (
    <Fragment key={iframeId}>
      <Modal
        isOpen={active}
        onClose={onClose}
        size={['full']}
        autoFocus={false}
        trapFocus={false}
        onOverlayClick={onClose}
      >
        <ModalOverlay
          onClick={onClose}
          background="linear-gradient(0deg, rgba(0, 0, 0, 0.10) 0%, rgba(0, 0, 0, 0.10) 100%), rgba(184, 184, 184, 0.20)"
          backdropFilter="blur(12px)"
        />
        <ModalContent overflow={'hidden'} bg="transparent">
          <Box
            width={['100%', '100%', '100%', '100%', '100%']}
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
            position="relative"
            h={['100vh']}
            background="linear-gradient(0deg, rgba(0, 0, 0, 0.10) 0%, rgba(0, 0, 0, 0.10) 100%), rgba(184, 184, 184, 0.20)"
            backdropFilter="blur(12px)"
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

            <Box
              margin={'auto'}
              width={['90%']}
              h={['90%']}
              as="iframe"
              src={url}
              visibility={iframeLoaded ? 'unset' : 'hidden'}
              borderRadius="8px"
              overflow="hidden"
              zIndex={100}
              allowFullScreen
              onLoad={url.length > 0 ? handleIframeLoad : undefined}
            />
            {!iframeLoaded && (
              <Spinner color="white" position="absolute" left={0} right={0} top={0} bottom={0} margin="auto" />
            )}
          </Box>
        </ModalContent>
      </Modal>
    </Fragment>
  );
};

export default IframeDrawer;
