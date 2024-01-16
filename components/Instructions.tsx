import { Box, IconButton, Text } from '@chakra-ui/react';
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
      right={0}
      left={0}
      bottom={['20px', '20px', '60px']}
      margin="auto"
      background="linear-gradient(0deg, rgba(0, 0, 0, 0.10) 0%, rgba(0, 0, 0, 0.10) 100%), rgba(184, 184, 184, 0.20)"
      borderRadius={['24px', '24px', '24px', '24px']}
      boxShadow={['none', 'none', '0px 4px 4px 0px rgba(0, 0, 0, 0.25)']}
      backdropFilter="blur(12px)"
      width={['220px', '300px', '450px']}
      height={['270px', '340px', '400px']}
      padding={['10px', '20px', '30px']}
      overflowY={['auto', 'auto', 'unset', 'unset']}
      overflowX="hidden"
      display="flex"
      justifyContent={['space-between']}
      alignItems={['center']}
      flexDirection="column"
      transition={transition}
    >
      <Text
        textTransform="uppercase"
        position="absolute"
        left={['20px', '20px', '40px']}
        bottom={['20px', '20px', '40px']}
        color="white"
        fontSize={['13px', '14px', '15px']}
        fontFamily="Montserrat-Medium"
        fontWeight="900"
        cursor="pointer"
        onClick={close}
        zIndex="10"
      >
        {instructionsData?.skip}
      </Text>

      <Box
        padding={['10px', '15px', '15px']}
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="space-between"
        borderRadius={['24px', '24px', '24px', '24px']}
        background={'rgba(0, 0, 0, 0.05)'}
        boxShadow="0px 2px 4px 0px rgba(0, 0, 0, 0.25)"
        backdropFilter="blur(12px)"
        w={['150px', '200px', '100%']}
        height={['195px', '240px', '260px']}
      >
        <Box w={['130px', '160px', '190px']} h={['130px', '160px', '190px']}>
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
          fontSize={['12px', '14px', '15px']}
          fontFamily="Montserrat-Medium"
          fontWeight="900"
          height={['40px', '40px', 'auto']}
          textAlign="center"
        >
          {instructionsData?.content[activeImageIndex.newIndex]}
        </Text>
      </Box>

      <Box position="relative" w="100%" height={['50px']} display="flex" justifyContent="center" alignItems="center">
        <Box w={['90px', '130px', '130px']} display="flex" justifyContent="space-between" alignItems="center">
          <IconButton
            aria-label="Move Left"
            onClick={prevSlide}
            w={['40px', '60px', '60px']}
            height={['30px', '50px', '50px']}
            backdropFilter="blur(12px)"
            background={'rgba(0, 0, 0, 0.05)'}
            _hover={{ background: 'rgba(0, 0, 0, 0.15)' }}
            boxShadow="0px 4px 4px 0px rgba(0, 0, 0, 0.25)"
            borderRadius="8px"
            icon={<LeftStemArrow fill="white" boxSize={[4, 5, 6]} />}
          />

          <IconButton
            aria-label="Move Left"
            onClick={nextSlide}
            w={['40px', '60px', '60px']}
            height={['30px', '50px', '50px']}
            backdropFilter="blur(12px)"
            background={'rgba(0, 0, 0, 0.05)'}
            _hover={{ background: 'rgba(0, 0, 0, 0.15)' }}
            boxShadow="0px 4px 4px 0px rgba(0, 0, 0, 0.25)"
            borderRadius="8px"
            icon={<RightStemArrow fill="white" boxSize={[4, 5, 6]} />}
          />
        </Box>
      </Box>
    </Box>
  );
}

export default Instructions;
