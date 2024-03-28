import { Box, Image, Text, SliderTrack, Slider as ChakraSlider } from '@chakra-ui/react';
import Slider, { CustomArrowProps } from 'react-slick';
import { RightArrow } from '../../assets/icons/RightArrow';
import { LeftArrow } from '../../assets/icons/LeftArrow';
import { Eclipse } from '../../assets/icons/Eclipse';
import { ThreeDView } from '../../assets/icons/ThreeDView';
import { useRef, useState } from 'react';
import { ImageSliderProps } from '../../interfaces';

const BackArrow = (props: CustomArrowProps) => {
  const { className, style, onClick } = props;
  return (
    <div className={className} style={{ ...style, display: 'block' }} onClick={onClick}>
      <LeftArrow boxSize={[6]} stroke="white" filter="drop-shadow(4px 4px 4px rgba(0, 0, 0, 0.5))" />
    </div>
  );
};

const NextArrow = (props: CustomArrowProps) => {
  const { className, style, onClick } = props;
  return (
    <div className={className} style={{ ...style, display: 'block' }} onClick={onClick}>
      <RightArrow boxSize={[6]} stroke="white" filter="drop-shadow(4px 4px 4px rgba(0, 0, 0, 0.5))" />
    </div>
  );
};

const ImageSlider = ({ highlightImage, images, setHighLightImage }: ImageSliderProps) => {
  const transition = 'all 0.2s ease-in-out';
  const slider = useRef<Slider>();
  const [activeImageIndex, setActiveImageIndex] = useState({ oldIndex: 0, newIndex: 0 });

  const [imageNo, setImageNo] = useState(1);

  const formatImageNo = (number) => {
    return number.toString().padStart(2, '0');
  };

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    draggable: false,
    swipe: false,
    nextArrow: <NextArrow />,
    prevArrow: <BackArrow />,
    beforeChange: (oldIndex: number, newIndex: number) => {
      setActiveImageIndex({ oldIndex: oldIndex, newIndex: newIndex });
      if (highlightImage === images[oldIndex]) {
        setHighLightImage(images[newIndex]);
      }
    },
  };

  const sliderImages = [
    <Box
      className="identify"
      display="flex !important"
      position="relative"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      cursor="pointer"
      width={['100%', '100%', '100%', '100%', '100%']}
      h={['450px', '500px', '470px', '470px', '570px']}
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
        bottom="60px"
        margin="0 auto"
      >
        <ThreeDView fill="white" boxSize={[8]} />
        <Text fontFamily="Montserrat-Medium" color="white" fontSize={['14px']}>
          Drag To Rotate
        </Text>
      </Box>
      <ChakraSlider
        width="80%"
        min={0}
        max={100}
        step={2.77777777778}
        defaultValue={0}
        onChange={(value) => {
          const finalValue = Math.trunc(value / 2.77777777778) + 1;
          setImageNo(finalValue);
        }}
        className="chakra-custom-slider"
      >
        <SliderTrack
          bg="transparent"
          h={['450px', '500px', '470px', '470px', '570px']}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Image
            objectFit="contain"
            src={`https://images.stockx.com/360/Air-Jordan-4-Retro-Metallic-Gold-Womens/Images/Air-Jordan-4-Retro-Metallic-Gold-Womens/Lv2/img${formatImageNo(
              imageNo,
            )}.jpg?fm=avif&auto=compress&w=576&dpr=2&updated_at=1709050803&h=384&q=60`}
            height={['auto']}
            maxHeight={['300px', '300px', '350px', '350px', '400px']}
            width={['100%']}
          />
        </SliderTrack>
      </ChakraSlider>
    </Box>,
    ...images,
  ];

  return (
    <Box
      width={['100%', '100%', '100%', '100%', '100%']}
      maxH={['520px', '580px', '550px', '550px', '660px']}
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      position="relative"
    >
      <Box
        width={['100%', '100%', '100%', '100%', '100%']}
        h={['450px', '500px', '470px', '470px', '570px']}
        textAlign="center"
        position="relative"
      >
        <Slider ref={slider} {...settings}>
          {sliderImages?.map((image: string, index: number) =>
            index == 0 ? (
              image
            ) : (
              <Image
                cursor="pointer"
                loading="lazy"
                key={index}
                width={['100%', '100%', '100%', '100%', '100%']}
                h={['450px', '500px', '470px', '470px', '570px']}
                objectFit="cover"
                src={image}
              />
            ),
          )}
        </Slider>
        <Box
          position="absolute"
          margin="0 auto"
          left="0"
          right="0px"
          bottom="10px"
          display="flex"
          flexDirection="row"
          justifyContent="center"
          alignItems="center"
          h="30px"
        >
          {sliderImages.map((image: string, index: number) => (
            <Eclipse
              key={image}
              m="0px 5px"
              boxSize={activeImageIndex.newIndex === index ? [4] : [3]}
              border={activeImageIndex.newIndex === index ? 'unset' : '1px solid white'}
              borderRadius="100px"
              filter={activeImageIndex.newIndex === index ? 'drop-shadow(0px 2px 4px rgba(0, 0, 0, 0.25))' : 'unset'}
              fill={activeImageIndex.newIndex === index ? 'white' : '#00000040'}
              onClick={() => {
                setHighLightImage(image);
                slider.current.slickGoTo(index);
              }}
              transition={transition}
              cursor="pointer"
            />
          ))}
        </Box>
      </Box>

      <Box
        height={['70px', '80px', '80px', '80px', '90px']}
        display="flex"
        justifyContent="center"
        alignItems="center"
        overflowY="hidden"
        overflowX="auto"
        w="auto"
        gap={3}
        margin="0 auto"
      >
        {sliderImages?.map((image: string, index: number) =>
          index == 0 ? (
            <Box
              key={index}
              border={activeImageIndex.newIndex === index ? '2px solid white' : '2px solid transparent'}
              position="relative"
              flex="0 0 auto"
              height={['50px', '60px', '60px', '60px', '70px']}
              width={['50px', '60px', '60px', '60px', '70px']}
              onClick={() => {
                slider.current.slickGoTo(0);
              }}
              cursor="pointer"
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <ThreeDView fill="white" width="80%" height="80%" />
            </Box>
          ) : (
            <Box
              key={image}
              border={activeImageIndex.newIndex === index ? '2px solid white' : '2px solid transparent'}
              position="relative"
              flex="0 0 auto"
              height={['50px', '60px', '60px', '60px', '70px']}
              width={['50px', '60px', '60px', '60px', '70px']}
              onClick={() => {
                setHighLightImage(image);
                slider.current.slickGoTo(index);
              }}
              cursor="pointer"
            >
              <Image src={image} objectFit="cover" position="absolute" height="100%" width="100%" />
            </Box>
          ),
        )}
      </Box>
    </Box>
  );
};

export default ImageSlider;
