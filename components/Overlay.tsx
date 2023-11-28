import { Box, IconButton, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import MenuOption from "./common/MenuOption";
import RoomOption from "./common/RoomOption";
import LanguageOption from "./common/LanguageOption";
import { BurgerDots } from "../assets/icons/BurgerDots";
import ReactPlayer from "react-player";
import Slider from "react-slick";
import { LeftStemArrow } from "../assets/icons/LeftStemArrow";
import { RightStemArrow } from "../assets/icons/RightStemArrow";
import HoldAndDrag from "../assets/videos/HoldAndDrag.mp4";
import TapToMove from "../assets/videos/TapToMove.mp4";
import ClickToOpen from "../assets/videos/ClickToOpen.mp4";
interface Room {
  name: string;
  description: string;
}

interface Language {
  name: string;
}

export interface InstructionItem {
  text: string;
  video: string;
}

export const InstructionItems: InstructionItem[] = [
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

function Overlay() {
  const transition = "all 0.2s ease-in-out";

  const [menuHovered, setMenuHovered] = useState(true);
  const [menuOptionHoveredOrActive, setMenuOptionHoveredOrActive] =
    useState("");

  const [activeMenuOption, setActiveMenuOption] = useState("instructions");

  const [rooms, setRooms] = useState<Room[]>();

  const [languages, setLanguages] = useState<Language[]>();

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

  useEffect(() => {
    setRooms([
      {
        name: "Room1",
        description: "room description",
      },
      {
        name: "Room2",
        description: "room description",
      },
      {
        name: "Room3",
        description: "room description",
      },
      {
        name: "Room4",
        description: "room description",
      },
      {
        name: "Room5",
        description: "room description",
      },
    ]);
    setLanguages([
      {
        name: "Lang 1",
      },
      {
        name: "Lang 2",
      },
      {
        name: "Lang 3",
      },
      {
        name: "Lang 4",
      },
      {
        name: "Lang 5",
      },
      {
        name: "Lang 6",
      },
    ]);
  }, []);

  const menuOptionsContent = {
    changeRooms: {
      height: ["230px"],
      width: ["250px"],
      content: rooms?.map((room: Room) => (
        <RoomOption
          name={room.name}
          description={room.description}
          transition={transition}
        />
      )),
    },
    instructions: {
      height: ["250px"],
      width: ["250px"],
      content: (
        <Box
          display="flex"
          justifyContent={["space-between"]}
          alignItems={["center"]}
          flexDirection={["column"]}
          h="100%"
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
            w={["150px", "200px", "100%"]}
            height={["200px", "260px", "230px"]}
          >
            <Box w={["100%", "180px", "160px"]} h={["170px", "180px", "160px"]}>
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
              fontSize={["12px", "14px", "15px"]}
              fontFamily="Montserrat-Medium"
              fontWeight="900"
              height={["50px", "40px", "auto"]}
              textAlign="center"
            >
              {InstructionItems[activeImageIndex.newIndex].text}
            </Text>
          </Box>

          {/* For Desktop Only */}
          <Box
            position="relative"
            w="100%"
            height={["70px"]}
            display={["none", "none", "flex"]}
            justifyContent="center"
            alignItems="center"
          >
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
      ),
    },
    language: {
      height: ["170px"],
      width: ["140px"],
      content: languages?.map((language: Language) => (
        <LanguageOption name={language.name} transition={transition} />
      )),
    },
  };

  return (
    <Box
      position="fixed"
      top={["15px", "15px", "30px"]}
      right={["15px", "15px", "30px"]}
      padding={["20px"]}
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      h={["auto", "auto", "350px"]}
      width={["auto"]}
      borderRadius={["30px", "30px", "30px"]}
      background="linear-gradient(0deg, rgba(0, 0, 0, 0.10) 0%, rgba(0, 0, 0, 0.10) 100%), rgba(184, 184, 184, 0.20)"
      boxShadow="0px 4px 4px 0px rgba(0, 0, 0, 0.25)"
      backdropFilter="blur(12px)"
      onMouseEnter={() => {
        setMenuHovered(true);
      }}
      // onMouseLeave={() => {
      //   if (activeMenuOption !== "") {
      //     setActiveMenuOption("");
      //     setTimeout(() => {
      //       setMenuHovered(false);
      //     }, 200);
      //   } else {
      //     setMenuHovered(false);
      //   }
      // }}
      onClick={() => setMenuHovered(true)}
      transition={transition}
      cursor="pointer"
    >
      <Box
        display={["none", "none", "unset"]}
        w={
          menuOptionsContent[
            activeMenuOption as keyof typeof menuOptionsContent
          ]?.width || "0px"
        }
        h="100%"
        mr={activeMenuOption !== "" ? ["20px"] : "0px"}
        overflowY="auto"
        overflowX="hidden"
        css={{
          "&::-webkit-scrollbar": {
            width: "6px",
          },
          "&::-webkit-scrollbar-track": {
            width: "6px",
            background: "rgba(0, 0, 0, 0.25)",
            borderRadius: "24px",
          },
          "&::-webkit-scrollbar-thumb": {
            background: "white",
            borderRadius: "24px",
            outline: "1px white solid",
          },
        }}
        transition={transition}
      >
        {
          menuOptionsContent[
            activeMenuOption as keyof typeof menuOptionsContent
          ]?.content
        }
      </Box>

      {!menuHovered && (
        <BurgerDots boxSize={[6]} display={["unset", "unset", "none"]} />
      )}

      <Box
        display={[
          menuHovered ? "flex" : "none",
          menuHovered ? "flex" : "none",
          "flex",
        ]}
        flexDirection="column"
        justifyContent="space-between"
        alignItems="center"
        width={menuHovered ? ["200px"] : ["auto", "auto", "40px"]}
        h={["auto"]}
        transition={transition}
      >
        <MenuOption
          content={
            menuOptionsContent[
              activeMenuOption as keyof typeof menuOptionsContent
            ]?.content
          }
          contentHeight={
            menuOptionsContent[
              activeMenuOption as keyof typeof menuOptionsContent
            ]?.height
          }
          activeMenuOption={activeMenuOption === "changeRooms"}
          leftIcon="changeRooms"
          additionalOptions
          text="Change Rooms"
          activateMenuOptions={menuHovered}
          menuOptionHovered={menuOptionHoveredOrActive === "changeRooms"}
          transition={transition}
          onMenuOptionClick={() => {
            const updatedValue =
              activeMenuOption === "changeRooms" ? "" : "changeRooms";
            setActiveMenuOption(updatedValue);
          }}
          setMenuOptionHovered={(state) =>
            setMenuOptionHoveredOrActive(state ? "changeRooms" : "")
          }
        />
        <MenuOption
          content={
            menuOptionsContent[
              activeMenuOption as keyof typeof menuOptionsContent
            ]?.content
          }
          contentHeight={
            menuOptionsContent[
              activeMenuOption as keyof typeof menuOptionsContent
            ]?.height
          }
          activeMenuOption={activeMenuOption === "instructions"}
          leftIcon="instructions"
          additionalOptions
          text="Instruction"
          activateMenuOptions={menuHovered}
          menuOptionHovered={menuOptionHoveredOrActive === "instructions"}
          transition={transition}
          onMenuOptionClick={() => {
            const updatedValue =
              activeMenuOption === "instructions" ? "" : "instructions";
            setActiveMenuOption(updatedValue);
          }}
          setMenuOptionHovered={(state) =>
            setMenuOptionHoveredOrActive(state ? "instructions" : "")
          }
        />
        <MenuOption
          leftIcon="sound"
          text="Sound: ON"
          activateMenuOptions={menuHovered}
          menuOptionHovered={menuOptionHoveredOrActive === "sound"}
          transition={transition}
          onMenuOptionClick={() => {
            setActiveMenuOption("");
            console.log("toggle sound");
          }}
          setMenuOptionHovered={(state) =>
            setMenuOptionHoveredOrActive(state ? "sound" : "")
          }
        />
        <MenuOption
          content={
            menuOptionsContent[
              activeMenuOption as keyof typeof menuOptionsContent
            ]?.content
          }
          contentHeight={
            menuOptionsContent[
              activeMenuOption as keyof typeof menuOptionsContent
            ]?.height
          }
          activeMenuOption={activeMenuOption === "language"}
          leftIcon="language"
          additionalOptions
          text="Language"
          activateMenuOptions={menuHovered}
          menuOptionHovered={menuOptionHoveredOrActive === "language"}
          transition={transition}
          onMenuOptionClick={() => {
            const updatedValue =
              activeMenuOption === "language" ? "" : "language";
            setActiveMenuOption(updatedValue);
          }}
          setMenuOptionHovered={(state) =>
            setMenuOptionHoveredOrActive(state ? "language" : "")
          }
        />
        <MenuOption
          leftIcon="share"
          text="Share"
          activateMenuOptions={menuHovered}
          menuOptionHovered={menuOptionHoveredOrActive === "share"}
          transition={transition}
          onMenuOptionClick={() => {
            setActiveMenuOption("");
            console.log("share");
          }}
          setMenuOptionHovered={(state: boolean) =>
            setMenuOptionHoveredOrActive(state ? "share" : "")
          }
        />
      </Box>
    </Box>
  );
}

export default Overlay;
