import { Box, IconButton, Text } from "@chakra-ui/react";
import HoldAndDrag from "../assets/videos/HoldAndDrag.mp4";
import TapToMove from "../assets/videos/TapToMove.mp4";
import ClickToOpen from "../assets/videos/ClickToOpen.mp4";
import Slider from "react-slick";
import ReactPlayer from "react-player";
import { RightStemArrow } from "../assets/icons/RightStemArrow";
import { LeftStemArrow } from "../assets/icons/LeftStemArrow";
import { useState } from "react";

interface InstructionsProps {
  active: boolean;
  close: () => void;
}

interface InstructionItem {
  text: string;
  video: string;
}

function Instructions({ active, close }: InstructionsProps) {
  const transition = "all 0.2s ease-in-out";

  const [slider, setSlider] = useState<any>();
  const [activeImageIndex, setActiveImageIndex] = useState({
    oldIndex: 0,
    newIndex: 0,
  });

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
    <>
      <Box
        position="fixed"
        w="100%"
        h="100%"
        top="0"
        left="0"
        opacity={active ? 1 : 0}
        visibility={active ? "visible" : "hidden"}
        backgroundColor="rgba(0,0,0,0.2)"
        transition="all 1s"
        zIndex="6"
        onClick={close}
      />

      <Box
        zIndex="12"
        opacity={active ? 1 : 0}
        visibility={active ? "visible" : "hidden"}
        position="fixed"
        right={0}
        left={0}
        bottom={["20px", "20px", "60px"]}
        margin="auto"
        background={[
          "transparent",
          "transparent",
          "linear-gradient(0deg, rgba(0, 0, 0, 0.10) 0%, rgba(0, 0, 0, 0.10) 100%), rgba(184, 184, 184, 0.20)",
        ]}
        borderRadius={["24px", "24px", "24px", "24px"]}
        boxShadow={["none", "none", "0px 4px 4px 0px rgba(0, 0, 0, 0.25)"]}
        backdropFilter="blur(12px)"
        width={["100%", "360px", "450px"]}
        height={["400px", "270px", "400px"]}
        padding={["40px", "0px", "30px"]}
        overflowY={["auto", "auto", "unset", "unset"]}
        overflowX="hidden"
        display="flex"
        justifyContent={["space-between"]}
        alignItems={["center"]}
        flexDirection={["column", "row", "column"]}
        transition={transition}
      >
        <IconButton
          display={["unset", "unset", "none"]}
          variant="outline"
          aria-label="Move Left"
          onClick={prevSlide}
          w={["60px"]}
          height={["50px"]}
          border="1px solid rgba(255, 255, 255, 0.80)"
          backdropFilter="blur(12px)"
          background={"rgba(0, 0, 0, 0.05)"}
          _hover={{ background: "rgba(0, 0, 0, 0.15)" }}
          boxShadow="0px 4px 4px 0px rgba(0, 0, 0, 0.25)"
          borderRadius="8px"
          icon={<LeftStemArrow fill="white" boxSize={[6]} />}
        />

        <Box
          padding={["10px", "10px", "15px"]}
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="space-between"
          borderRadius={["24px", "24px", "24px", "24px"]}
          background={"rgba(0, 0, 0, 0.05)"}
          boxShadow="0px 2px 4px 0px rgba(0, 0, 0, 0.25)"
          backdropFilter="blur(12px)"
          w={["100%", "200px", "100%"]}
          height={["260px"]}
        >
          <Box w="100%" h={["190px"]}>
            <Slider ref={(slider) => setSlider(slider)} {...settings}>
              {InstructionItems?.map(
                (InstructionItem: InstructionItem, index: number) => (
                  <ReactPlayer
                    key={index}
                    id="instructions-screen-video"
                    height="190px"
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
            fontSize={["15px"]}
            fontFamily="Montserrat-Medium"
            fontWeight="900"
            bg="red"
            height={["50px", "40px", "auto"]}
            textAlign="center"
          >
            {InstructionItems[activeImageIndex.newIndex].text}
          </Text>
        </Box>

        <IconButton
          display={["unset", "unset", "none"]}
          variant="outline"
          aria-label="Move Left"
          onClick={nextSlide}
          w={["60px"]}
          height={["50px"]}
          border="1px solid rgba(255, 255, 255, 0.80)"
          backdropFilter="blur(12px)"
          background={"rgba(0, 0, 0, 0.05)"}
          _hover={{ background: "rgba(0, 0, 0, 0.15)" }}
          boxShadow="0px 4px 4px 0px rgba(0, 0, 0, 0.25)"
          borderRadius="8px"
          icon={<RightStemArrow fill="white" boxSize={[6]} />}
        />

        {/* For Desktop Only */}
        <Box
          position="relative"
          w="100%"
          height={["50px"]}
          display={["none", "none", "flex"]}
          justifyContent="center"
          alignItems="center"
        >
          <Text
            textTransform="uppercase"
            position="absolute"
            left="30px"
            color="white"
            fontSize={["15px"]}
            fontFamily="Montserrat-Medium"
            fontWeight="900"
            cursor="pointer"
          >
            Skip
          </Text>
          <Box
            w={["130px"]}
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <IconButton
              variant="outline"
              aria-label="Move Left"
              onClick={prevSlide}
              w={["60px"]}
              height={["50px"]}
              border="1px solid rgba(255, 255, 255, 0.80)"
              backdropFilter="blur(12px)"
              background={"rgba(0, 0, 0, 0.05)"}
              _hover={{ background: "rgba(0, 0, 0, 0.15)" }}
              boxShadow="0px 4px 4px 0px rgba(0, 0, 0, 0.25)"
              borderRadius="8px"
              icon={<LeftStemArrow fill="white" boxSize={[6]} />}
            />

            <IconButton
              variant="outline"
              aria-label="Move Left"
              onClick={nextSlide}
              w={["60px"]}
              height={["50px"]}
              border="1px solid rgba(255, 255, 255, 0.80)"
              backdropFilter="blur(12px)"
              background={"rgba(0, 0, 0, 0.05)"}
              _hover={{ background: "rgba(0, 0, 0, 0.15)" }}
              boxShadow="0px 4px 4px 0px rgba(0, 0, 0, 0.25)"
              borderRadius="8px"
              icon={<RightStemArrow fill="white" boxSize={[6]} />}
            />
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default Instructions;
