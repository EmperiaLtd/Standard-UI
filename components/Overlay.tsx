import { Box } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import MenuOption from "./common/MenuOption";
import RoomOption from "./common/RoomOption";
import LanguageOption from "./common/LanguageOption";

interface Room {
  name: string;
  description: string;
}

interface Language {
  name: string;
}

function Overlay() {
  const transition = "all 0.2s ease-in-out";

  const [menuHovered, setMenuHovered] = useState(false);
  const [menuOptionHoveredOrActive, setMenuOptionHoveredOrActive] =
    useState("");

  const [activeMenuOption, setActiveMenuOption] = useState("");

  const [rooms, setRooms] = useState<Room[]>();

  const [languages, setLanguages] = useState<Language[]>();

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
    ]);
    setLanguages([
      {
        name: "Lang 1",
      },
      {
        name: "Lang 2",
      },
    ]);
  }, []);

  const menuOptionsContent = {
    changeRooms: {
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
      width: ["250px"],
      content: <Box>Instructions Go Here</Box>,
    },
    language: {
      width: ["140px"],
      content: languages?.map((language: Language) => (
        <LanguageOption name={language.name} transition={transition} />
      )),
    },
  };

  return (
    <>
      <Box
        position="fixed"
        top="30px"
        right="30px"
        padding={["20px"]}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        height={["350px"]}
        width={["auto"]}
        borderRadius="30px"
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
        transition={transition}
        cursor="pointer"
      >
        <Box
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

        <Box
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
          alignItems="center"
          width={menuHovered ? ["200px"] : ["40px"]}
          h="100%"
          transition={transition}
        >
          <MenuOption
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
            activeMenuOption={activeMenuOption === "instructions"}
            leftIcon="language"
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
            leftIcon="language"
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
    </>
  );
}

export default Overlay;
