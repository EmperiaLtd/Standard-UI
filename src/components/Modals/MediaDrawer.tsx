import { Box, Modal, ModalContent, ModalOverlay, Image as ChakraImage } from '@chakra-ui/react';
import React, { Fragment, useEffect, useRef, useState } from 'react';
import Slider from 'react-slick';
import { ThreeDView } from '../../Icons/ThreeDView';
import { YouTubeIcon } from '../../Icons/YoutubeIcon';
import { UnknownMediaIcon } from '../../Icons/UnknownMediaIcon';
import { CrossIcon } from '../../Icons/CrossIcon';

interface IframeProps {
  mediaId: string;
  active: boolean;
  mediaURLs: string[];
  turnTableUrl?: string;
  onClose: () => void;
  setHighLightImage: (imgStr: string) => void;
  highlightImage: string;
}

// Test the function
const MediaDrawer = ({
  mediaId,
  active,
  mediaURLs,
  turnTableUrl,
  onClose,
  highlightImage,
  setHighLightImage,
}: IframeProps) => {
  const [mediaTypes, setMediaTypes] = useState<Record<string, string>>({});
  const transition = 'all 0.2s ease-in-out';
  const slider = useRef<Slider>(null);
  const [activeImageIndex, setActiveImageIndex] = useState({ oldIndex: 0, newIndex: 0 });
  const settings = {
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    draggable: false,
    swipe: false,
    adaptiveHeight: true,
    beforeChange: (oldIndex: number, newIndex: number) => {
      setActiveImageIndex({ oldIndex: oldIndex, newIndex: newIndex });
      if (highlightImage === mediaURLs[oldIndex]) {
        setHighLightImage(mediaURLs[newIndex]);
      }
    },
  };

  useEffect(() => {
    const fetchMediaTypes = async () => {
      const types: Record<string, string> = {};
      for (const media of mediaURLs) {
        const mediaType = await getMediaType(media);
        types[media] = mediaType || 'Unknown';
      }
      setMediaTypes(types);
    };

    if (mediaURLs?.length) {
      fetchMediaTypes();
    }
  }, [mediaURLs]);

  const getMediaType = async (url: string): Promise<string | null> => {
    try {
      const response = await fetch(url);
      const contentType = response.headers.get('Content-Type');
      if (contentType) {
        if (['image/jpeg', 'image/png', 'image/webp', 'image/jpg'].includes(contentType)) return 'Picture';
        if (contentType.includes('video')) return 'Video';
        if (contentType.includes('text/html')) return 'YouTube';
        return 'Unknown';
      }
      return null;
    } catch {
      return null;
    }
  };

  return (
    <Fragment key={mediaId}>
      <Modal isOpen={active} onClose={onClose} size={['full', 'full', 'full', 'full', 'full']} autoFocus={false}>
        <ModalOverlay
          onClick={onClose}
          background="linear-gradient(0deg, rgba(0, 0, 0, 0.10) 0%, rgba(0, 0, 0, 0.10) 100%), rgba(184, 184, 184, 0.20)"
        />
        <ModalContent
          margin={0}
          padding={0}
          overflow={'hidden'}
          background="linear-gradient(0deg, rgba(0, 0, 0, 0.10) 0%, rgba(0, 0, 0, 0.10) 100%), rgba(184, 184, 184, 0.20)"
        >
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
              textAlign="center"
              position="relative"
              borderRadius={'16px'}
              onClick={onClose}
            >
              <Slider ref={slider} {...settings}>
                {mediaURLs.map((media, index) => {
                  const mediaType = mediaTypes[media];
                  return (
                    <Box
                      key={index}
                      position="relative"
                      flex="0 0 auto"
                      margin={'30px auto'}
                      height={['70vh']}
                      onClick={() => {
                        setHighLightImage(typeof media === 'string' ? media : '');
                        slider?.current?.slickGoTo(index);
                      }}
                      cursor="pointer"
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                      _notLast={{ marginRight: '10px' }}
                      borderRadius={'16px'}
                      overflow="hidden"
                      bg={'blackAlpha.300'}
                      transition={transition}
                      width={['100%', '85%', '85%', '50%', '50%']}
                    >
                      {mediaType === 'Picture' && (
                        <ChakraImage
                          src={typeof media === 'string' ? media : ''}
                          objectFit={['cover', 'cover', 'cover', 'cover', 'contain']}
                          position="absolute"
                          height="100%"
                          margin={'0 auto'}
                          borderRadius={'16px !important'}
                          width={['100%']}
                        />
                      )}
                      {mediaType === 'Video' && (
                        <Box
                          as="video"
                          key={index}
                          display="flex"
                          justifyContent="center"
                          alignItems="center"
                          margin={'0 auto'}
                          cursor="pointer"
                          width={'100%'}
                          height={['100%']}
                          background={['black']}
                          objectFit="cover"
                          objectPosition="top"
                          src={typeof media === 'string' ? media : ''}
                          controls
                          autoPlay
                          loop
                          muted
                        />
                      )}

                      {['YouTube', 'Unknown'].includes(mediaType) && (
                        <Box
                          as="iframe"
                          key={index}
                          margin={'0 auto'}
                          cursor="pointer"
                          borderRadius={'16px'}
                          height={'100%'}
                          objectFit="cover"
                          width={'100%'}
                          objectPosition="top"
                          src={media}
                          title="youtube-video"
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                      )}
                    </Box>
                  );
                })}
              </Slider>
            </Box>
            <Box
              height={['70px', '80px', '80px', '80px', '100px']}
              display="flex"
              justifyContent="flex-start"
              alignItems="center"
              w="auto"
              maxW={['60%', '60%', '70%']}
              margin="0 auto"
              mb={'1rem'}
              gap={[1, 1, 1]}
              overflowX={['auto', 'auto', 'auto', 'auto', 'auto']}
            >
              {turnTableUrl && turnTableUrl?.length > 0
                ? mediaURLs?.map((image: string | React.ReactNode, index: number) =>
                    index === mediaURLs.length - 1 ? (
                      <Box
                        className={`${index} ${mediaURLs.length - 1}`}
                        key={index}
                        border={activeImageIndex.newIndex === index ? '2px solid white' : '2px solid transparent'}
                        position="relative"
                        flex="0 0 auto"
                        height={['50px', '60px', '60px', '60px', '70px']}
                        width={['50px', '60px', '60px', '60px', '70px']}
                        onClick={() => {
                          setHighLightImage(typeof image === 'string' ? image : '');
                          slider?.current?.slickGoTo(index);
                        }}
                        cursor="pointer"
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        _notLast={{ marginRight: '10px' }}
                        borderRadius="4px"
                        _hover={{
                          border: '2px solid white',
                        }}
                        overflow="hidden"
                        transition={transition}
                      >
                        <ThreeDView fill="white" width="80%" height="80%" />
                      </Box>
                    ) : (
                      <Box
                        key={index}
                        border={activeImageIndex.newIndex === index ? '2px solid white' : '2px solid transparent'}
                        position="relative"
                        flex="0 0 auto"
                        height={['50px', '60px', '60px', '60px', '70px']}
                        width={['50px', '60px', '60px', '60px', '70px']}
                        onClick={() => {
                          setHighLightImage(typeof image === 'string' ? image : '');
                          slider?.current?.slickGoTo(index);
                        }}
                        cursor="pointer"
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        _notLast={{ marginRight: '10px' }}
                        borderRadius="4px"
                        _hover={{
                          border: '2px solid white',
                        }}
                        overflow="hidden"
                        transition={transition}
                      >
                        <ChakraImage
                          src={typeof image === 'string' ? image : ''}
                          objectFit="cover"
                          position="absolute"
                          height="100%"
                          width="100%"
                          boxShadow="lg"
                        />
                      </Box>
                    ),
                  )
                : mediaURLs?.map((media: string, index: number) => {
                    const mediaType = mediaTypes[media];
                    return (
                      <Box
                        key={index}
                        border={activeImageIndex.newIndex === index ? '2px solid white' : '2px solid transparent'}
                        position="relative"
                        flex="0 0 auto"
                        height={['40px', '40px', '40px', '40px', '50px']}
                        width={['40px', '40px', '40px', '40px', '50px']}
                        onClick={() => {
                          setHighLightImage(media);
                          slider?.current?.slickGoTo(index);
                        }}
                        cursor="pointer"
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        _notLast={{ marginRight: '16px' }}
                        borderRadius="8px"
                        _hover={{
                          border: '2px solid white',
                        }}
                        overflow="hidden"
                        transition={transition}
                      >
                        {mediaType === 'Picture' && (
                          <ChakraImage src={media} objectFit="cover" position="absolute" height="100%" width="100%" />
                        )}
                        {['YouTube', 'Video'].includes(mediaType) && (
                          <Box
                            width={['100%']}
                            height={'100%'}
                            border={activeImageIndex.newIndex === index ? '' : '1px solid black'}
                            display={'flex'}
                            justifyContent="center"
                            alignItems="center"
                            borderRadius="8px"
                          >
                            <YouTubeIcon fill="white" width="100%" height="100%" />
                          </Box>
                        )}
                        {mediaType === 'Unknown' && <UnknownMediaIcon fill="white" width="100%" height="100%" />}
                      </Box>
                    );
                  })}
            </Box>
          </Box>
        </ModalContent>
      </Modal>
    </Fragment>
  );
};

export default MediaDrawer;
