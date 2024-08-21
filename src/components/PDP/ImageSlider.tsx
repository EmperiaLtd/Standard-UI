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
import { ImageSliderProps } from '../../interfaces';
import React from 'react';

const ImageSlider = ({ turnTableUrl, highlightImage, images, setHighLightImage }: ImageSliderProps) => {
  const transition = 'all 0.2s ease-in-out';
  const slider = useRef<Slider>(null);
  const [activeImageIndex, setActiveImageIndex] = useState({ oldIndex: 0, newIndex: 0 });
  const [imageNo, setImageNo] = useState(0);
  useEffect(() => {
    if (turnTableUrl?.length > 0) {
      const totalFrames = 36;
      preloadImagesWithFrames(turnTableUrl, totalFrames);
    }
  }, [turnTableUrl]);

  function preloadImagesWithFrames(baseUrl: string, totalFrames: number): void {
    for (let frame = 0; frame <= totalFrames; frame++) {
      const imageUrl = `${baseUrl}?frame=${frame}&width=400`;
      const img = new Image();
      img.src = imageUrl;
    }
  }

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
      if (highlightImage === images[oldIndex]) {
        setHighLightImage(images[newIndex]);
      }
    },
  };

  const sliderImages: (string | React.ReactNode)[] = [
    ...images,
    <Box
      key={'dynamicKey'}
      className="identify"
      display="flex !important"
      position="relative"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      cursor="pointer"
      width={['100%', '100%', '100%', '100%', '100%']}
      h={['400px', '450px', '470px', '470px', '550px']}
      gap={5}
    >
      <Box
        display="flex"
        alignItems="center"
        gap={2}
        width="fit-content"
        position="absolute"
        padding="10px 20px"
        left="0px"
        right="0px"
        bottom={['20px', '20px', '30px', '30px', '30px']}
        margin="0 auto"
      >
        <ThreeDView fill="white" boxSize={[8]} />
        <Text fontFamily="Montserrat-Medium" fontSize={['14px']} color="white" zIndex="100">
          Drag To Rotate
        </Text>
      </Box>
      <ChakraSlider
        width={['100%']}
        min={0}
        max={100}
        step={2.77777777778}
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
        <SliderTrack
          bg="transparent"
          h={['400px', '450px', '470px', '470px', '550px']}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <ChakraImage
            loading="eager"
            objectFit="contain"
            transform={'scale(1.3)'}
            src={`${turnTableUrl}?frame=${imageNo}&width=400`}
            height={['auto']}
            maxHeight={['300px', '350px', '350px', '350px', '400px']}
            width={['100%']}
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
    </Box>,
  ];

  function isString(value: string | React.ReactNode): value is string {
    return typeof value === 'string';
  }

  return (
    <Box
      width={['100%', '100%', '100%', '100%', '100%']}
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      position="relative"
    >
      <Box
        width={['100%', '100%', '100%', '100%', '100%']}
        h={['400px', '450px', '470px', '470px', '550px']}
        textAlign="center"
        position="relative"
      >
        <Slider ref={slider} {...settings}>
          {turnTableUrl?.length > 0
            ? sliderImages?.map((image: string | React.ReactNode, index: number) =>
                !isString(image) ? (
                  image
                ) : (
                  <ChakraImage
                    key={index}
                    cursor="pointer"
                    loading="lazy"
                    width={['100%', '100%', '100%', '100%', '100%']}
                    h={['400px', '450px', '470px', '470px', '550px']}
                    objectFit={['cover', 'contain', 'contain']}
                    objectPosition="top"
                    src={typeof image === 'string' ? image : ''}
                  />
                ),
              )
            : images?.map((image: string, index: number) => (
                <ChakraImage
                  key={index}
                  cursor="pointer"
                  loading="lazy"
                  width={['100%', '100%', '100%', '100%', '100%']}
                  h={['400px', '450px', '470px', '470px', '550px']}
                  objectFit={['cover', 'contain', 'contain']}
                  objectPosition="top"
                  src={image}
                />
              ))}
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
        {turnTableUrl?.length > 0
          ? sliderImages?.map((image: string | React.ReactNode, index: number) =>
              index === sliderImages.length - 1 ? (
                <Box
                  className={`${index} ${sliderImages.length - 1}`}
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
                  />
                </Box>
              ),
            )
          : images?.map((image: string, index: number) => (
              <Box
                key={index}
                border={activeImageIndex.newIndex === index ? '2px solid white' : '2px solid transparent'}
                position="relative"
                flex="0 0 auto"
                height={['50px', '60px', '60px', '60px', '70px']}
                width={['50px', '60px', '60px', '60px', '70px']}
                onClick={() => {
                  setHighLightImage(image);
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
                <ChakraImage src={image} objectFit="cover" position="absolute" height="100%" width="100%" />
              </Box>
            ))}
      </Box>
    </Box>
  );
};

export default ImageSlider;
