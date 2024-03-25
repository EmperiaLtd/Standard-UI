import { Box, Button, IconButton, Text } from '@chakra-ui/react';
import HoldAndDrag from '../assets/videos/HoldAndDrag.webm';
import TapToMove from '../assets/videos/TapToMove.webm';
import ClickToOpen from '../assets/videos/ClickToOpen.webm';
import Slider from 'react-slick';
import ReactPlayer from 'react-player';
import { RightStemArrow } from '../assets/icons/RightStemArrow';
import { LeftStemArrow } from '../assets/icons/LeftStemArrow';
import { useState } from 'react';
import { InstructionsProps } from '../interfaces';

function Instructions({ instructionsData, active, close }: InstructionsProps) {
  const transition = 'all 0.2s ease-in-out';
  const videos = [HoldAndDrag, TapToMove, ClickToOpen];
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
      right={['unset', 'unset', '0px', '0px', '0px']}
      left={['20px', '20px', '0px', '0px', '0px']}
      bottom={['20px', '20px', '30px', '30px', '30px']}
      margin="auto"
      width={['auto', 'auto', '350px', '350px', '400px']}
      height={['240px', '240px', '315px', '315px', '370px']}
      padding={['0px', '0px', '15px', '15px', '20px']}
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
        height="auto"
        padding={['8px 16px']}
        textTransform="uppercase"
        position={['fixed', 'fixed', 'absolute', 'absolute', 'absolute']}
        right={['20px', '20px', 'unset', 'unset', 'unset']}
        left={['unset', 'unset', '20px', '20px', '30px']}
        bottom={['20px', '20px', '20px', '20px', '30px']}
        color="white"
        fontWeight="900"
        cursor="pointer"
        onClick={close}
        zIndex="10"
        borderRadius="40px"
        backdropFilter="blur(12px)"
        background={'rgba(0, 0, 0, 0.05)'}
        _hover={{ background: 'rgba(0, 0, 0, 0.15)' }}
        boxShadow="0px 4px 4px 0px rgba(0, 0, 0, 0.25)"
      >
        <Text fontSize={['12px', '12px', '13px', '13px', '14px']} fontFamily="Montserrat-Bold">
          {activeImageIndex.newIndex === videos.length - 1 ? 'Close' : instructionsData?.skip}
        </Text>
      </Button>

      <Box
        padding={['10px', '10px', '15px', '15px', '15px']}
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="space-between"
        borderRadius={['24px', '24px', '24px', '24px', '24px']}
        background={'rgba(0, 0, 0, 0.05)'}
        boxShadow="0px 2px 4px 0px rgba(0, 0, 0, 0.25)"
        backdropFilter="blur(12px)"
        w={['160px', '160px', '100%', '100%', '100%']}
        height={['195px', '195px', '220px', '220px', '250px']}
      >
        <Box w={['130px', '130px', '160px', '160px', '190px']} h={['130px', '130px', '160px', '160px', '190px']}>
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
          fontSize={['12px', '12px', '13px', '13px', '14px']}
          fontFamily="Montserrat-Medium"
          fontWeight="900"
          height={['40px', '40px', 'auto', 'auto', 'auto']}
          textAlign="center"
        >
          {instructionsData?.content[activeImageIndex.newIndex]}
        </Text>
      </Box>

      <Box
        position="relative"
        w="100%"
        height={['auto', 'auto', '50px', '50px', '60px']}
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Box
          w={['90px', '90px', '130px', '130px', '150px']}
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <IconButton
            isDisabled={activeImageIndex.newIndex === 0}
            _disabled={{
              background: 'rgba(0, 0, 0, 0.55)',
              color: 'grey',
              pointerEvents: 'none',
              cursor: 'unset',
            }}
            color="white"
            aria-label="Move Left"
            onClick={prevSlide}
            w={['40px', '40px', '60px', '60px', '70px']}
            height={['30px', '30px', '50px', '50px', '60px']}
            backdropFilter="blur(12px)"
            background={'rgba(0, 0, 0, 0.05)'}
            _hover={{ background: 'rgba(0, 0, 0, 0.15)' }}
            boxShadow="0px 4px 4px 0px rgba(0, 0, 0, 0.25)"
            borderRadius="8px"
            icon={<LeftStemArrow fill="currentColor" boxSize={[4, 4, 5, 5, 6]} />}
          />

          <IconButton
            isDisabled={activeImageIndex.newIndex === videos.length - 1}
            _disabled={{
              background: 'rgba(0, 0, 0, 0.55)',
              color: 'grey',
              pointerEvents: 'none',
              cursor: 'unset',
            }}
            color="white"
            aria-label="Move Right"
            onClick={nextSlide}
            w={['40px', '40px', '60px', '60px', '70px']}
            height={['30px', '30px', '50px', '50px', '60px']}
            backdropFilter="blur(12px)"
            background={'rgba(0, 0, 0, 0.05)'}
            _hover={{ background: 'rgba(0, 0, 0, 0.15)' }}
            boxShadow="0px 4px 4px 0px rgba(0, 0, 0, 0.25)"
            borderRadius="8px"
            icon={<RightStemArrow fill="currentColor" boxSize={[4, 4, 5, 5, 6]} />}
          />
        </Box>
      </Box>
    </Box>
  );
}

export default Instructions;
