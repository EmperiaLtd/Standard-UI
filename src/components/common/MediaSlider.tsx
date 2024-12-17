import {
  Box,
  Image as ChakraImage,
  Slider as ChakraSlider,
  SliderTrack,
  Text,
  SliderFilledTrack,
  SliderThumb,
} from '@chakra-ui/react';
import Slider from 'react-slick';
import { useEffect, useRef, useState } from 'react';
import { ThreeDView } from '../../Icons/ThreeDView';
import { YouTubeIcon } from '../../Icons/YoutubeIcon';
import { UnknownMediaIcon } from '../../Icons/UnknownMediaIcon';
import { ImageSliderProps } from '../../interfaces';
import React from 'react';

const MediaSlider = ({ turnTableUrl, highlightImage, images, setHighLightImage }: ImageSliderProps) => {
  const transition = 'all 0.2s ease-in-out';
  const slider = useRef<Slider>(null);
  const [activeImageIndex, setActiveImageIndex] = useState({ oldIndex: 0, newIndex: 0 });
  const [imageNo, setImageNo] = useState(0);
  const [mediaTypes, setMediaTypes] = useState<Record<string, string>>({});

  useEffect(() => {
    if (turnTableUrl?.length > 0) {
      const totalFrames = 36;
      preloadImagesWithFrames(turnTableUrl, totalFrames);
    }
  }, [turnTableUrl]);

  useEffect(() => {
    const fetchMediaTypes = async () => {
      const types: Record<string, string> = {};
      for (const image of images) {
        const mediaType = await getMediaType(image);
        types[image] = mediaType || 'Unknown';
      }
      setMediaTypes(types);
    };

    if (images?.length) {
      fetchMediaTypes();
    }
  }, [images]);

  function preloadImagesWithFrames(baseUrl: string, totalFrames: number): void {
    for (let frame = 0; frame <= totalFrames; frame++) {
      const imageUrl = `${baseUrl}?frame=${frame}&width=400`;
      const img = new Image();
      img.src = imageUrl;
    }
  }

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

  const settings = {
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    draggable: false,
    swipe: false,
    adaptiveHeight: true,
    beforeChange: (oldIndex: number, newIndex: number) => {
      setActiveImageIndex({ oldIndex, newIndex });
      if (highlightImage === images[oldIndex]) {
        setHighLightImage(images[newIndex]);
      }
    },
  };

  const sliderImages = [
    ...(images ?? []),
    turnTableUrl ? (
      <Box
        key={'dynamicKey'}
        display="flex !important"
        position="relative"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        cursor="pointer"
        width="100%"
        h={['400px', '450px', '470px', '470px', '550px']}
        gap={5}
      >
        <Box
          display="flex"
          alignItems="center"
          gap={2}
          position="absolute"
          bottom={['20px', '30px']}
          left="0"
          right="0"
          margin="0 auto"
        >
          <ThreeDView fill="white" boxSize={[8]} />
          <Text fontFamily="Montserrat-Medium" fontSize="14px" color="white">
            Drag To Rotate
          </Text>
        </Box>
        <ChakraSlider
          width="100%"
          min={0}
          max={100}
          step={2.77777777778}
          defaultValue={imageNo}
          onChange={(value) => {
            setImageNo(value === 0 ? 0 : Math.trunc(value / 2.77777777778) + 1);
          }}
        >
          <SliderTrack h="470px" display="flex" justifyContent="center" alignItems="center">
            <ChakraImage
              src={`${turnTableUrl}?frame=${imageNo}&width=400`}
              objectFit="contain"
              transform="scale(1.3)"
              height="auto"
              maxHeight="400px"
              width="100%"
            />
          </SliderTrack>
        </ChakraSlider>
        <Box
          position="absolute"
          bottom={['0px', '0px', '10px', '10px', '10px']}
          width={['60%', '200px', '200px', '200px', '200px']}
        >
          <ChakraSlider
            width={['100%']}
            min={0}
            max={100}
            step={2.77777777778}
            value={imageNo * 2.77777777778}
            defaultValue={imageNo}
            onChange={(value) => {
              if (value === 0) {
                setImageNo(0);
              } else {
                const finalValue = Math.trunc(value / 2.77777777778) + 1;
                setImageNo(finalValue);
              }
            }}
          >
            <SliderTrack bg="blackAlpha.300" height="10px" borderRadius="30px">
              <SliderFilledTrack bg="blackAlpha.500" />
            </SliderTrack>
            <SliderThumb boxSize={4} />
          </ChakraSlider>
        </Box>
      </Box>
    ) : null,
  ].filter(Boolean);

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      position="relative"
      data-testid="media-slider"
      width={['100%', '100%', '100%', '100%', '100%']}
    >
      <Box
        textAlign="center"
        position="relative"
        width={['100%', '100%', '100%', '100%', '100%']}
        h={['400px', '450px', '470px', '470px', '550px']}
      >
        <Slider ref={slider} {...settings}>
          {sliderImages.map((image, index) => {
            if (typeof image === 'string') {
              const mediaType = mediaTypes[image];
              if (mediaType === 'Picture') {
                return (
                  <ChakraImage
                    key={index}
                    src={image}
                    cursor="pointer"
                    loading="lazy"
                    width={['100%', '100%', '100%', '100%', '100%']}
                    h={['400px', '450px', '470px', '470px', '550px']}
                    objectFit={['cover', 'cover', 'cover']}
                    objectPosition="top"
                    alt="info-image"
                  />
                );
              }
              if (mediaType === 'Video') {
                return (
                  <Box
                    as="video"
                    key={index}
                    src={image}
                    controls
                    autoPlay
                    loop
                    muted
                    cursor="pointer"
                    width={['100%', '100%', '100%', '100%', '100%']}
                    height={['400px', '450px', '470px', '470px', '550px']}
                    background={['black']}
                    objectFit="cover"
                    objectPosition="top"
                  />
                );
              }
              if (mediaType === 'YouTube') {
                return (
                  <Box
                    as="iframe"
                    key={index}
                    src={image}
                    allowFullScreen
                    cursor="pointer"
                    width={['100%', '100%', '100%', '100%', '100%']}
                    height={['400px', '450px', '470px', '470px', '550px']}
                    objectFit="cover"
                    objectPosition="top"
                    title="youtube-video"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  />
                );
              }
              return (
                <Box
                  key={index}
                  as="iframe"
                  className="unknown-media"
                  cursor="pointer"
                  width="100%"
                  height={['400px', '450px', '470px', '470px', '550px']}
                  objectFit="contain"
                  objectPosition="center"
                  src={image}
                  title="unknown-media"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  draggable="false"
                  overflow={'hidden'}
                />
              );
            }
            return image;
          })}
        </Slider>
      </Box>

      <Box
        height={['70px', '80px', '80px', '80px', '100px']}
        display="flex"
        justifyContent="flex-start"
        alignItems="center"
        w="auto"
        maxW={['80%', '80%', '70%']}
        margin="0 auto"
        mt="10px"
        gap={[1, 1, 1]}
        overflowX={['auto', 'auto', 'auto', 'auto', 'auto']}
      >
        <Box display="flex" alignItems="center" gap={2} overflowX="auto">
          {images?.map((image, index) => (
            <Box
              key={index}
              border={activeImageIndex.newIndex === index ? '2px solid white' : '2px solid transparent'}
              onClick={() => {
                setHighLightImage(image);
                slider.current?.slickGoTo(index);
              }}
              transition={transition}
              position="relative"
              flex="0 0 auto"
              height={['50px', '60px', '60px', '60px', '70px']}
              width={['50px', '60px', '60px', '60px', '70px']}
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
            >
              {mediaTypes[image] === 'Picture' && (
                <ChakraImage src={image} objectFit="cover" position="absolute" height="100%" width="100%" />
              )}
              {mediaTypes[image] === 'Video' && <YouTubeIcon fill="white" width="100%" height="100%" />}
              {mediaTypes[image] === 'YouTube' && <YouTubeIcon fill="white" width="100%" height="100%" />}
              {mediaTypes[image] === 'Unknown' && <UnknownMediaIcon fill="white" width="100%" height="100%" />}
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default MediaSlider;
