import { Box } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import MenuOption from "./common/MenuOption";
import RoomOption from "./common/RoomOption";
import LanguageOption from "./common/LanguageOption";
import SoundOption from "./common/SoundOption";
import { BurgerDots } from "../assets/icons/BurgerDots";
import OverlayInstruction from "./common/OverlayInstruction";

function Overlay({ overlayData, active }: OverlayProps) {
  const transition = "all 0.2s ease-in-out";
  const [audioActive, setAudioActive] = useState(false);
  const [menuHovered, setMenuHovered] = useState(false);
  const [menuOptionHoveredOrActive, setMenuOptionHoveredOrActive] =
    useState("");
  const [activeMenuOption, setActiveMenuOption] = useState("");

  const [transformedOverlayData, setTransformedOverlayData] =
    useState<TransformedOverlayData[]>();

  const defaultData = {
    rooms: [
      {
        roomName: "Room 1",
        description: "Description 1",
        sceneToGo: "room_1",
      },
    ],
    instructions: ["First", "Second", "Third"],
    languages: ["Lang1", "Lang2"],
  };

  const menuOptionsFallbackContent = {
    changeRooms: {
      key: "changeRooms",
      text: "Change Rooms",
      textAlternate: "",
      height: ["230px"],
      width: ["250px"],
      content: defaultData.rooms?.map((room: RoomItem) => (
        <RoomOption
          key={room.roomName}
          name={room.roomName}
          description={room.description}
          transition={transition}
        />
      )),
    },
    instructions: {
      key: "instructions",
      text: "Instructions",
      textAlternate: "",
      height: ["250px"],
      width: ["250px"],
      content: (
        <OverlayInstruction instructionsData={defaultData.instructions} />
      ),
    },
    sound: {
      key: "sound",
      text: "Sound : ON",
      textAlternate: "Sound : OFF",
      height: ["140px"],
      width: ["140px"],
      content: null,
    },
    languages: {
      key: "languages",
      text: "Languages",
      textAlternate: "",
      height: ["170px"],
      width: ["140px"],
      content: defaultData.languages?.map((language: string) => (
        <LanguageOption key={language} name={language} transition={transition} />
      )),
    },
    share: {
      key: "share",
      text: "Share",
      textAlternate: "",
      height: ["0px"],
      width: ["0px"],
      content: null,
    },
  };

  const renderMap = {
    changeRooms: (data: RoomItem[]) => renderRoomItems(data),
    instructions: (data: string[]) => renderInstructions(data),
    sound: (data: SoundItem[]) => renderSoundItems(data),
    languages: (data: string[]) => renderLanguageItems(data),
  };

  useEffect(() => {
    const transformedOverlayData = overlayData?.map(
      (overlayElement: OverlayElement) => {
        let originalContent;

        if (overlayElement?.content) {
          originalContent = renderMap[
            overlayElement.key as keyof typeof renderMap
          ](overlayElement?.content);
        }

        const fallbackContent =
          menuOptionsFallbackContent[
            overlayElement.key as keyof typeof menuOptionsFallbackContent
          ];

        const content = originalContent || fallbackContent?.content;
        const text = overlayElement?.text || fallbackContent?.text;
        const textAlternate =
          overlayElement?.textAlternate || fallbackContent?.textAlternate;
        const key = overlayElement?.key || fallbackContent?.key;

        return {
          height: fallbackContent?.height,
          width: fallbackContent?.width,
          key: key,
          text: text,
          textAlternate: textAlternate,
          content: content,
        };
      }
    );

    setTransformedOverlayData(transformedOverlayData);
  }, [overlayData]);

  const renderLanguageItems = (languages: string[]) => {
    return languages?.map((language: string) => (
      <LanguageOption key={language} name={language} transition={transition} />
    ));
  };

  const renderSoundItems = (sounds: SoundItem[]) => {
    return sounds?.map((sound: SoundItem) => (
      <SoundOption key={sound.name} name={sound.name} transition={transition} />
    ));
  };

  const renderInstructions = (instructions: string[]) => {
    return <OverlayInstruction instructionsData={instructions} />;
  };

  const renderRoomItems = (rooms: RoomItem[]) => {
    return rooms?.map((room: RoomItem) => (
      <RoomOption
        key={room.roomName}
        name={room.roomName}
        description={room.description}
        transition={transition}
      />
    ));
  };

  const activeOverlayData = transformedOverlayData?.find(
    (overlayElement: TransformedOverlayData) =>
      overlayElement.key === activeMenuOption
  );

  return (
    <>
      <Box
        display={["unset", "unset", "none"]}
        position="fixed"
        w="100%"
        h="100%"
        top="0"
        left="0"
        opacity={menuHovered ? 1 : 0}
        visibility={menuHovered ? "visible" : "hidden"}
        backgroundColor="rgba(0,0,0,0)"
        transition={transition}
        zIndex="6"
        onClick={() => setMenuHovered(false)}
      />
      <Box
        zIndex="10"
        opacity={active ? 1 : 0}
        visibility={active ? "visible" : "hidden"}
        position="fixed"
        top={["15px", "15px", "30px"]}
        right={["15px", "15px", "30px"]}
        padding={["15px", "15px", "20px"]}
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
        onMouseLeave={() => {
          if (activeMenuOption !== "") {
            setActiveMenuOption("");
            setTimeout(() => {
              setMenuHovered(false);
            }, 200);
          } else {
            setMenuHovered(false);
          }
        }}
        onClick={() => setMenuHovered(true)}
        transition={transition}
        cursor="pointer"
      >
        <Box
          display={["none", "none", "unset"]}
          w={activeOverlayData?.width}
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
          {activeOverlayData?.content}
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
          {transformedOverlayData?.map(
            (overlayElement: TransformedOverlayData) => {
              const key = overlayElement?.key;
              const content = overlayElement?.content;

              return (
                <MenuOption
                  key={overlayElement.key}
                  content={content}
                  contentHeight={overlayElement?.height}
                  activeMenuOption={activeMenuOption === key}
                  leftIcon={key}
                  additionalOptions={content !== null}
                  text={
                    overlayElement.key === "sound"
                      ? audioActive
                        ? overlayElement.text
                        : overlayElement.textAlternate
                      : overlayElement.text
                  }
                  activateMenuOptions={menuHovered}
                  menuOptionHovered={menuOptionHoveredOrActive === key}
                  transition={transition}
                  onMenuOptionClick={() => {
                    if (overlayElement.key === "sound") {
                      setAudioActive(!audioActive);
                    }

                    if (content !== null) {
                      const updatedValue = activeMenuOption === key ? "" : key;
                      setActiveMenuOption(updatedValue);
                    } else {
                      console.log("Regular Click");
                    }
                  }}
                  setMenuOptionHovered={(state) =>
                    setMenuOptionHoveredOrActive(
                      state ? overlayElement.key : ""
                    )
                  }
                />
              );
            }
          )}
        </Box>
      </Box>
    </>
  );
}

export default Overlay;
