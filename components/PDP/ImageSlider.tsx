import { Box, Image } from '@chakra-ui/react';
import Slider, { CustomArrowProps } from 'react-slick';
import { RightArrow } from '../../assets/icons/RightArrow';
import { LeftArrow } from '../../assets/icons/LeftArrow';
import { Eclipse } from '../../assets/icons/Eclipse';
import { useEffect, useState } from 'react';
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

  const [activeImageIndex, setActiveImageIndex] = useState({ oldIndex: 0, newIndex: 0 });

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <BackArrow />,
    beforeChange: (oldIndex: number, newIndex: number) => {
      setActiveImageIndex({ oldIndex: oldIndex, newIndex: newIndex });
      if (highlightImage === images[oldIndex]) {
        setHighLightImage(images[newIndex]);
      }
    },
  };

  useEffect(() => {
    console.log(highlightImage);
  }, [highlightImage]);

  return (
    <Box
      width={['100%', '100%', '100%', '100%', '100%']}
      maxH={['450px', '500px', '470px', '470px', '570px']}
      display="flex"
      flexDirection={['column', 'column', 'row-reverse', 'row-reverse', 'row-reverse']}
      justifyContent="space-between"
      position="relative"
    >
      <Box
        width={['100%', '100%', '100%', '100%', '100%']}
        h={['450px', '500px', '470px', '470px', '570px']}
        textAlign="center"
      >
        <Slider {...settings}>
          {images?.map((image: string, index: number) => (
            <Image
              cursor="pointer"
              loading="lazy"
              key={index}
              width={['100%', '100%', '100%', '100%', '100%']}
              h={['450px', '500px', '470px', '470px', '570px']}
              objectFit="cover"
              src={image}
            />
          ))}
        </Slider>
      </Box>

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
        {images.map((image: string, index: number) => (
          <Eclipse
            key={image}
            m="0px 5px"
            boxSize={activeImageIndex.newIndex === index ? [4] : [3]}
            border={activeImageIndex.newIndex === index ? 'unset' : '1px solid white'}
            borderRadius="100px"
            filter={activeImageIndex.newIndex === index ? 'drop-shadow(0px 2px 4px rgba(0, 0, 0, 0.25))' : 'unset'}
            fill={activeImageIndex.newIndex === index ? 'white' : 'black'}
            onClick={() => {
              setHighLightImage(image);
            }}
            transition={transition}
          />
        ))}
      </Box>
    </Box>
  );
};

export default ImageSlider;
