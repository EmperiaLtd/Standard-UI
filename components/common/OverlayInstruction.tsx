import { useState } from "react";
import { Box, IconButton, Text } from "@chakra-ui/react";
import HoldAndDrag from "../../assets/videos/HoldAndDrag.mp4";
import TapToMove from "../../assets/videos/TapToMove.mp4";
import ClickToOpen from "../../assets/videos/ClickToOpen.mp4";
import ReactPlayer from "react-player";
import Slider from "react-slick";
import { LeftStemArrow } from "../../assets/icons/LeftStemArrow";
import { RightStemArrow } from "../../assets/icons/RightStemArrow";

function OverlayInstruction() {
  const [slider, setSlider] = useState<any>();
  const [activeImageIndex, setActiveImageIndex] = useState({
    oldIndex: 0,
    newIndex: 0,
  });

  interface InstructionItem {
    text: string;
    video: string;
  }

  const InstructionItems: InstructionItem[] = [
    {
      text: "Click on floor to move",
      video: HoldAndDrag,
    },
    {
      text: "Hold and Drag to look around",
      video: TapToMove,
    },
    {
      text: "Hover or Click on objects to learn more",
      video: ClickToOpen,
    },
  ];

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
      justifyContent={["space-between"]}
      alignItems={["center"]}
      flexDirection={["column"]}
      h={["300px", "300px", "100%"]}
      w="100%"
    >
      <Box
        padding={["10px", "15px", "15px"]}
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="space-between"
        borderRadius={["24px", "24px", "24px", "24px"]}
        background={"rgba(0, 0, 0, 0.05)"}
        boxShadow="0px 2px 4px 0px rgba(0, 0, 0, 0.25)"
        backdropFilter="blur(12px)"
        w={["160px", "180px", "100%"]}
        height={["200px", "200px", "230px"]}
      >
        <Box w={["100%", "120px", "150px"]} h={["170px", "120px", "150px"]}>
          <Slider ref={(slider) => setSlider(slider)} {...settings}>
            {InstructionItems?.map(
              (InstructionItem: InstructionItem, index: number) => (
                <ReactPlayer
                  key={index}
                  id="instructions-screen-video"
                  height="inherit"
                  width="100%"
                  loop={true}
                  muted
                  controls={false}
                  playing={true}
                  url={InstructionItem.video}
                  playsinline
                />
              )
            )}
          </Slider>
        </Box>
        <Text
          display="flex"
          alignItems="center"
          justifyContent="center"
          color="white"
          fontSize={["12px", "13px", "15px"]}
          fontFamily="Montserrat-Medium"
          fontWeight="900"
          height={["40px", "40px", "40px"]}
          textAlign="center"
        >
          {InstructionItems[activeImageIndex.newIndex].text}
        </Text>
      </Box>

      <Box
        position="relative"
        w="100%"
        height={["50px", "50px", "70px"]}
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Box
          w={["90px", "90px", "130px"]}
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <IconButton
            variant="outline"
            aria-label="Move Left"
            onClick={prevSlide}
            w={["40px", "40px", "60px"]}
            height={["30px", "30px", "50px"]}
            border="1px solid rgba(255, 255, 255, 0.80)"
            backdropFilter="blur(12px)"
            background={"rgba(0, 0, 0, 0.05)"}
            _hover={{ background: "rgba(0, 0, 0, 0.15)" }}
            boxShadow="0px 4px 4px 0px rgba(0, 0, 0, 0.25)"
            borderRadius="8px"
            icon={<LeftStemArrow fill="white" boxSize={[4, 4, 6]} />}
          />

          <IconButton
            variant="outline"
            aria-label="Move Left"
            onClick={nextSlide}
            w={["40px", "40px", "60px"]}
            height={["30px", "30px", "50px"]}
            border="1px solid rgba(255, 255, 255, 0.80)"
            backdropFilter="blur(12px)"
            background={"rgba(0, 0, 0, 0.05)"}
            _hover={{ background: "rgba(0, 0, 0, 0.15)" }}
            boxShadow="0px 4px 4px 0px rgba(0, 0, 0, 0.25)"
            borderRadius="8px"
            icon={<RightStemArrow fill="white" boxSize={[4, 4, 6]} />}
          />
        </Box>
      </Box>
    </Box>
  );
}

export default OverlayInstruction;
