import { useState } from "react";
import { Box, Image } from "@chakra-ui/react";
import Slider, { CustomArrowProps } from "react-slick";
import { RightArrow } from "../../assets/icons/RightArrow";
import { LeftArrow } from "../../assets/icons/LeftArrow";

const BackArrow = (props: CustomArrowProps) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block" }}
      onClick={onClick}
    >
      <LeftArrow
        boxSize={[6]}
        stroke="white"
        filter="drop-shadow(4px 4px 4px rgba(0, 0, 0, 0.5))"
      />
    </div>
  );
};

const NextArrow = (props: CustomArrowProps) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block" }}
      onClick={onClick}
    >
      <RightArrow
        boxSize={[6]}
        stroke="white"
        filter="drop-shadow(4px 4px 4px rgba(0, 0, 0, 0.5))"
      />
    </div>
  );
};

interface ImageSliderProps {
  highlightImage: string;
  images: string[];
  setHighLightImage: (image: string) => void;
}

const ImageSlider = ({
  highlightImage,
  images,
  setHighLightImage,
}: ImageSliderProps) => {
  const [slider, setSlider] = useState<any>();

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <BackArrow />,
    beforeChange: (oldIndex: number, newIndex: number) => {
      if (highlightImage === images[oldIndex]) {
        setHighLightImage(images[newIndex]);
      }
    },
  };

  return (
    <Box
      width={["100%", "100%", "370px", "390px", "460px"]}
      maxH={["unset", "unset", "410px", "440px", "470px"]}
      display="flex"
      flexDirection={[
        "column",
        "column",
        "row-reverse",
        "row-reverse",
        "row-reverse",
      ]}
      justifyContent="space-between"
      position="relative"
    >
      <Box
        width={["100%", "100%", "310px", "320px", "380px"]}
        h={["450px", "500px", "410px", "440px", "470px"]}
        textAlign="center"
      >
        <Slider ref={(slider) => setSlider(slider)} {...settings}>
          {images?.map((image: string, index: number) => (
            <Image
              borderRadius={["0px", "0px", "12px", "12px"]}
              loading="lazy"
              key={index}
              width={["100%", "380px", "310px", "320px", "380px"]}
              h={["450px", "500px", "410px", "440px", "470px"]}
              objectFit="cover"
              src={image}
            />
          ))}
        </Slider>
      </Box>
      <Box
        width={["30px", "30px", "40px", "50px", "60px"]}
        overflowX={["hidden", "hidden", "hidden", "hidden", "hidden"]}
        overflowY={["auto", "auto", "auto", "auto", "auto"]}
        height={["100%", "100%", "100%", "100%", "100%"]}
        display={["none", "none", "flex", "flex", "flex"]}
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
      >
        {images?.map((image: string, index: number) => (
          <Box
            flex={["unset", "unset", "0 0 auto", "0 0 auto"]}
            key={index}
            width={["30px", "30px", "30px", "40px"]}
            height={["30px", "30px", "50px", "60px"]}
            margin={["5px", "5px", "5px", "5px"]}
          >
            <Image
              borderRadius="4px"
              loading="lazy"
              cursor="pointer"
              width="100%"
              height="100%"
              objectFit="cover"
              src={image}
              alt="Product Image"
              onClick={() => {
                setHighLightImage(image);
                slider.slickGoTo(index);
              }}
              border={
                image === highlightImage
                  ? "1px solid rgba(255, 255, 255, 0.80)"
                  : "transparent"
              }
              boxShadow={
                image === highlightImage
                  ? "0px 2px 4px 0px rgba(0, 0, 0, 0.25)"
                  : "unset"
              }
              opacity={image === highlightImage ? "1" : "0.7"}
            />
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default ImageSlider;
