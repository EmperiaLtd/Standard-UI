import { Box, Spinner } from '@chakra-ui/react';
import React, { Fragment, useEffect, useState } from 'react';
import { Close } from '../../Icons/Close';
import { ArViewerProps } from '../../interfaces';
import { ARPCUrls } from '../../fallbackData';

const ArViewer = ({ pId, active, close }: ArViewerProps) => {
  const [iframeSrc, setIframeSrc] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);

  const handleIframeLoad = () => {
    setIsLoaded(true);
  };

  useEffect(() => {
    if (active) {
      setIframeSrc(`${process.env.REACT_APP_DOMAIN_NAME}/` + ARPCUrls[pId as keyof typeof ARPCUrls] || '');
    } else {
      setIframeSrc('');
      setTimeout(() => {
        setIsLoaded(false);
      }, 500);
    }
  }, [active]);

  return (
    <Fragment>
      <Box
        position="fixed"
        w="100%"
        h="100%"
        top="0"
        left="0"
        opacity={active ? 1 : 0}
        visibility={active ? 'visible' : 'hidden'}
        backgroundColor="rgba(0,0,0,0.0)"
        transition="all 0.5"
        zIndex="99998"
        onClick={() => {
          close();
          setTimeout(() => {
            setIsLoaded(false);
          }, 500);
        }}
      />
      <Box
        className="ar-view"
        zIndex="99999"
        opacity={active ? 1 : 0}
        visibility={active ? 'visible' : 'hidden'}
        transition="all 0.5s"
        position="fixed"
        top={0}
        right={0}
        left={0}
        bottom={0}
        margin="auto"
        background="linear-gradient(0deg, rgba(0, 0, 0, 0.10) 0%, rgba(0, 0, 0, 0.10) 100%), rgba(184, 184, 184, 0.20)"
        backdropFilter="blur(12px)"
        borderRadius="12px"
        width={['100%', '100%', '600px', '700px', '700px']}
        height={['100%', '100%', '500px', '600px', '600px']}
      >
        <Close
          stroke="white"
          position={'absolute'}
          top="20px"
          right="20px"
          boxSize={[4, 4, 4]}
          cursor="pointer"
          onClick={() => {
            close();
            setTimeout(() => {
              setIsLoaded(false);
            }, 500);
          }}
          zIndex={30}
        />

        <Box
          width="100%"
          height="100%"
          display="flex"
          flexDirection="column"
          justifyContent="space-around"
          alignItems="center"
        >
          <Box h="100%" w="100%" position="relative" display="flex" justifyContent="center" alignItems="center">
            <Box
              as="iframe"
              id="ar-iframe"
              visibility={isLoaded ? 'unset' : 'hidden'}
              width="100%"
              height="100%"
              src={iframeSrc}
              allow="camera"
              onLoad={handleIframeLoad}
            />
            {!isLoaded && (
              <Spinner color="white" position="absolute" left={0} right={0} top={0} bottom={0} margin="auto" />
            )}
          </Box>
        </Box>
      </Box>
    </Fragment>
  );
};
export default ArViewer;
