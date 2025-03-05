import { Box, Modal, ModalOverlay, ModalContent } from '@chakra-ui/react';
import React, { Fragment } from 'react';
import HighlightBackground from '../../assets/images/modal_background.png';
import { CrossIcon } from '../../Icons/CrossIcon';

interface ARProps {
  arId: string;
  active: boolean;
  url: string;
  onClose: () => void;
}

const ArViewer = ({ arId, active, url, onClose }: ARProps) => {
  const handleIframeLoad = () => {
    console.log(url);
  };
  return (
    <Fragment key={arId}>
      <Modal
        onOverlayClick={onClose}
        isOpen={active}
        onClose={onClose}
        size={['full', 'full', 'full', 'full', 'full']}
        autoFocus={false}
        trapFocus={false}
      >
        <ModalOverlay onClick={onClose} />
        <ModalContent margin={0} padding={0} overflow={'hidden'}>
          <Box
            width={['100%', '100%', '100%', '100%', '100%']}
            margin={0}
            padding={0}
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
            position="relative"
          >
            <Box
              _before={{
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundImage: `url(${HighlightBackground})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                filter: 'blur(10px)',
                zIndex: -1,
              }}
            />
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
                position="absolute"
                top="20px"
                right="10px"
              />
            </Box>
            <Box
              margin={'auto'}
              width={['90%', '90%', '90%', '90%', '95%']}
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
                src="https://walmart.emperia-staging.com/AR/index.html?name=WalkerEdisonSideboard"
                frameBorder="0"
                id=""
                width="100%"
                height="100%"
                allow="camera"
                onLoad={handleIframeLoad}
              ></iframe>
            </Box>
          </Box>
        </ModalContent>
      </Modal>
    </Fragment>
  );
};

export default ArViewer;
