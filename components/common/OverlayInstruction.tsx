import { useState } from 'react';
import { Box, IconButton, Text } from '@chakra-ui/react';
import HoldAndDrag from '../../assets/videos/HoldAndDrag.webm';
import TapToMove from '../../assets/videos/TapToMove.webm';
import ClickToOpen from '../../assets/videos/ClickToOpen.webm';
import ReactPlayer from 'react-player';
import Slider from 'react-slick';
import { LeftStemArrow } from '../../assets/icons/LeftStemArrow';
import { RightStemArrow } from '../../assets/icons/RightStemArrow';
import { OverlayInstructionsProps } from '../../interfaces';

function OverlayInstruction({ instructionsData }: OverlayInstructionsProps) {
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
      display="flex"
      justifyContent={['space-between']}
      alignItems={['center']}
      flexDirection={['column']}
      h={['240px', '240px', '240px', '240px', '290PX']}
      w="100%"
      marginBottom={['10px', '10px', 'unset', 'unset', 'unset']}
    >
      <Box
        padding={['10px', '10px', '15px', '15px', '15px']}
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="space-between"
        borderRadius={['24px', '24px', '24px', '24px']}
        background={'rgba(0, 0, 0, 0.15)'}
        boxShadow="0px 2px 4px 0px rgba(0, 0, 0, 0.25)"
        w={['160px', '160px', '100%', '100%', '100%']}
        height={['190px', '190px', '185px', '185px', '220px']}
      >
        <Box w={['100%', '100%', '130px', '130px', '150px']} h={['140px', '140px', '130px', '130px', '150px']}>
          <Slider ref={(slider) => setSlider(slider)} {...settings}>
            {videos?.map((video: string, index: number) => (
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
          lineHeight={['12px', '12px', '13px', '13px', '14px']}
          fontSize={['12px', '12px', '13px', '13px', '14px']}
          fontFamily="Montserrat-Medium"
          height={['30px', '30px', '40px', '40px', '50px']}
          textAlign="center"
        >
          {instructionsData[activeImageIndex.newIndex]}
        </Text>
      </Box>

      <Box
        position="relative"
        w="100%"
        height={['40px', '40px', '50px', '50px', '60px']}
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Box
          w={['90px', '90px', '110px', '110px', '130px']}
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
              cursor:'unset',
            }}
            color="white"
            aria-label="Move Left"
            onClick={prevSlide}
            w={['40px', '40px', '50px', '50px', '60px']}
            height={['30px', '30px', '40px', '40px', '50px']}
            background={'rgba(0, 0, 0, 0.15)'}
            _hover={{ background: 'rgba(0, 0, 0, 0.25)' }}
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
            w={['40px', '40px', '50px', '50px', '60px']}
            height={['30px', '30px', '40px', '40px', '50px']}
            background={'rgba(0, 0, 0, 0.15)'}
            _hover={{ background: 'rgba(0, 0, 0, 0.25)' }}
            boxShadow="0px 4px 4px 0px rgba(0, 0, 0, 0.25)"
            borderRadius="8px"
            icon={<RightStemArrow fill="currentColor" boxSize={[4, 4, 5, 5, 6]} />}
          />
        </Box>
      </Box>
    </Box>
  );
}

export default OverlayInstruction;
