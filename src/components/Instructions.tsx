import { Box, Button, IconButton, Text } from '@chakra-ui/react';
import HoldAndDrag from '../assets/videos/HoldAndDrag.webm';
import HoldAndDragSafari from '../assets/videos/HoldAndDrag.mov';
import TapToMove from '../assets/videos/TapToMove.webm';
import TapToMoveSafari from '../assets/videos/TapToMove.mov';
import ClickToOpen from '../assets/videos/ClickToOpen.webm';
import ClickToOpenSafari from '../assets/videos/ClickToOpen.mov';
import Slider from 'react-slick';
import ReactPlayer from 'react-player';
import { RightStemArrow } from '../Icons/RightStemArrow';
import { LeftStemArrow } from '../Icons/LeftStemArrow';
import { useState } from 'react';
import { InstructionsProps } from '../interfaces';
import React from 'react';

function Instructions({ instructionsData, active, close }: InstructionsProps) {
  function isSafari() {
    return /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
  }
  const videos = [
    !isSafari() ? HoldAndDrag : HoldAndDragSafari,
    !isSafari() ? TapToMove : TapToMoveSafari,
    !isSafari() ? ClickToOpen : ClickToOpenSafari,
  ];
  const transition = 'all 0.2s ease-in-out';
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [slider, setSlider] = useState<any>();
  const [activeImageIndex, setActiveImageIndex] = useState({
    oldIndex: 0,
    newIndex: 0,
  });

  const nextSlide = () => {
    slider.slickNext();
  };

  const prevSlide = () => {
    slider.slickPrev();
  };

  const settings = {
    speed: 500,
    arrows: false,
    infinite: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    beforeChange: (oldIndex: number, newIndex: number) => {
      setActiveImageIndex({ oldIndex: oldIndex, newIndex: newIndex });
    },
  };

  return (
    <Box
      zIndex="12"
      opacity={active ? 1 : 0}
      visibility={active ? 'visible' : 'hidden'}
      position="fixed"
      right={['0px', '0px', '0px', '0px', '0px']}
      left={['20px', '20px', '0px', '0px', '0px']}
      bottom={['100px', '100px', '50px', '50px', '50px']}
      margin="auto"
      width={['auto', 'auto', '350px', '350px', '400px']}
      height={['260px', '260px', '380px', '380px', '380px']}
      padding={['0px', '0px', '20px', '20px', '20px']}
      overflowY={['auto', 'auto', 'unset', 'unset', 'unset']}
      overflowX="hidden"
      display="flex"
      justifyContent={['space-between']}
      alignItems={['center']}
      flexDirection="column"
      overflow="visible"
      transition={transition}
    >
      <Button
        size={['sm', 'sm', 'md']}
        position={['fixed', 'fixed', 'absolute', 'absolute', 'absolute']}
        bottom={['70px', '70px', '70px', '20px', '20px']}
        color="white"
        cursor="pointer"
        onClick={close}
        zIndex="10"
        borderRadius="40px"
        border="1px solid #FFFFFF4D"
        fontSize={['14px', '14px', '16px', '16px', '16px']}
        backdropFilter="blur(12px)"
        background={'rgba(0, 0, 0, 0.05)'}
        _hover={{ background: 'rgba(0, 0, 0, 0.15)' }}
        _active={{ background: 'rgba(0, 0, 0, 0.15)' }}
        _focus={{ background: 'rgba(0, 0, 0, 0.15)' }}
        boxShadow="0px 4px 4px 0px rgba(0, 0, 0, 0.25)"
      >
        <Text fontSize={['12px', '12px', '13px', '13px', '14px']} fontFamily="Montserrat-Bold">
          {activeImageIndex.newIndex === videos.length - 1 ? 'Close' : instructionsData?.skip.value}
        </Text>
      </Button>

      <Box display="flex" flexDirection="row" alignItems="center" justifyContent="space-between" gap="20px">
        {activeImageIndex.newIndex !== 0 ? (
          <IconButton
            color="white"
            isDisabled={activeImageIndex.newIndex === 0}
            _disabled={{
              background: '#1A1A1A33',
              color: '#FFFFFF',
              pointerEvents: 'none',
              cursor: 'unset',
              opacity: '30%',
            }}
            aria-label="Move Left"
            onClick={prevSlide}
            w={['40px', '40px', '40px', '40px', '40px']}
            height={['40px', '40px', '40px', '40px', '40px']}
            backdropFilter="blur(12px)"
            opacity="100%"
            borderRadius="50%"
            icon={<LeftStemArrow fill="currentColor" boxSize={[4, 4, 4, 4, 4]} />}
            background={'rgba(0, 0, 0, 0.05)'}
            _hover={{ background: 'rgba(0, 0, 0, 0.15)' }}
            boxShadow="0px 4px 4px 0px rgba(0, 0, 0, 0.25)"
          />
        ) : (
          <Box w={['40px', '40px', '40px', '40px', '40px']} height={['40px', '40px', '40px', '40px', '40px']}></Box>
        )}

        <Box
          padding={['10px', '10px', '15px', '15px', '15px']}
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="space-around"
          borderRadius={['12px', '12px', '12px', '12px', '12px']}
          background="radial-gradient(100% 131.36% at 0% 0%, rgba(158, 158, 158, 0.3) 0%, rgba(158, 158, 158, 0.1) 100%), linear-gradient(0deg, rgba(4, 31, 65, 0.3), rgba(4, 31, 65, 0.3));"
          border="1px solid #FFFFFF4D"
          backdropFilter="blur(12px)"
          width={['160px', '160px', '225px', '225px', '225px']}
          height={['230px', '230px', '280px', '280px', '280px']}
        >
          <Box
            w={['130px', '130px', '160px', '160px', '160px']}
            h={['130px', '130px', '160px', '160px', '160px']}
            borderRadius="10px"
            overflow="hidden"
          >
            <Slider ref={(slider) => setSlider(slider)} {...settings}>
              {videos.map((video: string, index: number) => (
                <ReactPlayer
                  key={index}
                  id="instructions-screen-video"
                  height="inherit"
                  width="100%"
                  loop={true}
                  muted
                  controls={false}
                  playing={true}
                  url={video}
                  playsinline
                />
              ))}
            </Slider>
          </Box>
          <Text
            display="flex"
            alignItems="center"
            justifyContent="center"
            color="white"
            fontSize={['14px', '14px', '15px', '16px', '16px']}
            fontFamily="Montserrat-Medium"
            lineHeight={['18px', '18px', '22px']}
            fontWeight="900"
            height={['auto', 'auto', 'auto', 'auto', 'auto']}
            textAlign="center"
          >
            {instructionsData?.content.value[activeImageIndex.newIndex]}
          </Text>
        </Box>

        {activeImageIndex.newIndex !== videos.length - 1 ? (
          <IconButton
            color="white"
            isDisabled={activeImageIndex.newIndex === videos.length - 1}
            _disabled={{
              background: '#1A1A1A33',
              color: '#FFFFFF',
              pointerEvents: 'none',
              cursor: 'unset',
              opacity: '30%',
            }}
            aria-label="Move Right"
            onClick={nextSlide}
            width={['40px', '40px', '40px']}
            height={['40px', '40px', '40px']}
            backdropFilter="blur(12px)"
            borderRadius="50%"
            opacity="100%"
            icon={<RightStemArrow fill="currentColor" boxSize={[4, 4, 4, 4, 4]} />}
            background={'rgba(0, 0, 0, 0.05)'}
            _hover={{ background: 'rgba(0, 0, 0, 0.15)' }}
            boxShadow="0px 4px 4px 0px rgba(0, 0, 0, 0.25)"
          />
        ) : (
          <Box w={['40px', '40px', '40px']} height={['40px', '40px', '40px']}></Box>
        )}
      </Box>
    </Box>
  );
}

export default Instructions;
