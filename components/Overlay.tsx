import { Box, Image, Link, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import MenuOption from './common/MenuOption';
import RoomOption from './common/RoomOption';
import LanguageOption from './common/LanguageOption';
import SoundOption from './common/SoundOption';
import { BurgerDots } from '../assets/icons/BurgerDots';
import Emperia from '../assets/images/Emperia.png';
import OverlayInstruction from './common/OverlayInstruction';
import { OverlayProps, TransformedOverlayData, RoomItem, SoundItem, OverlayElement, LanguageItem } from '../interfaces';

function Overlay({
  activeScene,
  activeLang,
  activeSound,
  setActiveScene,
  setActiveLang,
  setActiveSound,
  overlayData,
  active,
}: OverlayProps) {
  const transition = 'all 0.2s ease-in-out';
  const [audioActive, setAudioActive] = useState(false);
  const [menuHovered, setMenuHovered] = useState(false);
  const [menuOptionHoveredOrActive, setMenuOptionHoveredOrActive] = useState('');
  const [activeMenuOption, setActiveMenuOption] = useState('');

  const [transformedOverlayData, setTransformedOverlayData] = useState<TransformedOverlayData[]>();

  const menuOptionsDimensions = {
    changeRooms: {
      height: ['220px', '220px', '240px', '240px', '290px'],
      width: ['230px', '230px', '230px', '230px', '230px'],
    },
    instructions: {
      height: ['250px', '250px', '240px', '240px', '290px'],
      width: ['unset', 'unset', '240px', '240px', '270px'],
    },
    sound: {
      height: ['160px', '160px', '240px', '240px', '290px'],
      width: ['140px', '140px', '180px', '180px', '180px'],
    },
    languages: {
      height: ['160px', '160px', '240px', '240px', '290px'],
      width: ['140px', '140px', '180px', '180px', '180px'],
    },
    share: {
      height: ['0px'],
      width: ['0px'],
    },
  };

  // const renderMap = {
  //   instructions: (data: string[]) => renderInstructions(data),
  //   changeRooms: (data: RoomItem[]) => renderRoomItems(data),
  //   sound: (data: SoundItem[]) => renderSoundItems(data),
  //   languages: (data: LanguageItem[]) => renderLanguageItems(data),
  // };

  useEffect(() => {
    const transformedOverlayData =
      overlayData &&
      Object?.values(overlayData)?.map((overlayElement: OverlayElement) => {
        let originalContent;

        if (overlayElement?.content) {
          switch (overlayElement.key) {
            case 'instructions':
              originalContent = renderInstructions(overlayElement.content as string[]);
              break;
            case 'changeRooms':
              originalContent = renderRoomItems(overlayElement.content as RoomItem[]);
              break;
            case 'sound':
              originalContent = renderSoundItems(overlayElement.content as SoundItem[]);
              break;
            case 'languages':
              originalContent = renderLanguageItems(overlayElement.content as LanguageItem[]);
              break;
            default:
              console.log('No Configuration For This Key', overlayElement.key);
              break;
          }
        }

        const fallbackContent = menuOptionsDimensions[overlayElement.key as keyof typeof menuOptionsDimensions];

        const content = originalContent || overlayElement.content;
        const text = overlayElement.text;
        const textAlternate = overlayElement.textAlternate;
        const key = overlayElement.key;

        return {
          height: fallbackContent?.height,
          width: fallbackContent?.width,
          key: key,
          text: text,
          textAlternate: textAlternate,
          content: content,
        };
      });

    setTransformedOverlayData(transformedOverlayData);
  }, [overlayData, activeScene, activeLang, activeSound]);

  // useEffect(() => {
  //   const transformedOverlayData = overlayData?.map((overlayElement: OverlayElement) => {
  //     let originalContent;

  //     if (overlayElement?.content) {
  //       originalContent = renderMap[overlayElement.key as keyof typeof renderMap](overlayElement?.content);
  //     }

  //     const fallbackContent = menuOptionsDimensions[overlayElement.key as keyof typeof menuOptionsDimensions];

  //     const content = originalContent;
  //     const text = overlayElement?.text;
  //     const textAlternate = overlayElement?.textAlternate;
  //     const key = overlayElement?.key;

  //     return {
  //       height: fallbackContent?.height,
  //       width: fallbackContent?.width,
  //       key: key,
  //       text: text,
  //       textAlternate: textAlternate,
  //       content: content,
  //     };
  //   });

  //   setTransformedOverlayData(transformedOverlayData);
  // }, [overlayData, activeScene, activeLang, activeSound]);

  const renderLanguageItems = (languages: LanguageItem[]) => {
    return languages?.map((language: LanguageItem) => (
      <LanguageOption
        active={language.locale === activeLang}
        key={language.key}
        name={language.key}
        transition={transition}
        onClick={() => setActiveLang(language.locale)}
      />
    ));
  };

  const renderSoundItems = (sounds: SoundItem[]) => {
    return sounds?.map((sound: SoundItem) => (
      <SoundOption
        active={sound.name === activeSound}
        key={sound.name}
        name={sound.name}
        transition={transition}
        onClick={() => setActiveSound(sound.name)}
      />
    ));
  };

  const renderInstructions = (instructions: string[]) => {
    return <OverlayInstruction instructionsData={instructions} />;
  };

  const renderRoomItems = (rooms: RoomItem[]) => {
    return rooms?.map((room: RoomItem) => (
      <RoomOption
        key={room.roomName}
        active={activeScene === room.scene}
        name={room.roomName}
        description={room.description}
        transition={transition}
        onClick={() => setActiveScene(room.scene)}
      />
    ));
  };

  const activeOverlayData = transformedOverlayData?.find(
    (overlayElement: TransformedOverlayData) => overlayElement.key === activeMenuOption,
  );

  return (
    <>
      <Box
        position="fixed"
        w="100%"
        h="100%"
        top="0"
        left="0"
        opacity={menuHovered ? 1 : 0}
        visibility={menuHovered ? 'visible' : 'hidden'}
        backgroundColor="rgba(0,0,0,0)"
        transition="all 1s"
        zIndex="9"
        onClick={() => {
          if (activeMenuOption !== '') {
            setActiveMenuOption('');
            setTimeout(() => {
              setMenuHovered(false);
            }, 200);
          } else {
            setMenuHovered(false);
          }
        }}
      />

      <Box
        zIndex="10"
        opacity={active ? 1 : 0}
        visibility={active ? 'visible' : 'hidden'}
        position="fixed"
        top={['10px', '10px', '15px', '15px', '20px']}
        left={['10px', '10px', '15px', '15px', '20px']}
        padding={['10px', '10px', '15px', '15px', '20px']}
        display="flex"
        justifyContent="space-between"
        alignItems="flex-start"
        h={['auto']}
        width={['auto']}
        borderRadius={['30px', '30px', '30px']}
        background="linear-gradient(0deg, rgba(0, 0, 0, 0.10) 0%, rgba(0, 0, 0, 0.10) 100%), rgba(184, 184, 184, 0.20)"
        boxShadow="0px 4px 4px 0px rgba(0, 0, 0, 0.25)"
        backdropFilter="blur(12px)"
        onMouseEnter={() => {
          setMenuHovered(true);
        }}
        onMouseLeave={() => {
          if (activeMenuOption !== '') {
            setActiveMenuOption('');
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
        {!menuHovered && <BurgerDots boxSize={[4, 4, 5, 5]} display={['unset', 'unset', 'none']} />}

        <Box
          display={[menuHovered ? 'flex' : 'none', menuHovered ? 'flex' : 'none', 'flex']}
          flexDirection="column"
          justifyContent="space-between"
          alignItems="center"
          width={menuHovered ? ['180px', '180px', '180px', '180px', '220px'] : ['auto', 'auto', '30px', '30px', '40px']}
          h={['auto']}
          transition={transition}
        >
          {transformedOverlayData?.map((overlayElement: TransformedOverlayData) => {
            const key = overlayElement?.key;
            const content = overlayElement?.content;

            return (
              <MenuOption
                key={overlayElement.key}
                content={content}
                contentHeight={overlayElement?.height}
                activeMenuOption={activeMenuOption === key}
                leftIcon={key}
                additionalOptions={content}
                text={
                  overlayElement.key === 'sound'
                    ? audioActive
                      ? overlayElement.text
                      : overlayElement.textAlternate
                    : overlayElement.text
                }
                activateMenuOptions={menuHovered}
                menuOptionHovered={menuOptionHoveredOrActive === key}
                transition={transition}
                onMenuOptionClick={() => {
                  if (content) {
                    const updatedValue = activeMenuOption === key ? '' : key;
                    setActiveMenuOption(updatedValue);
                  } else if (overlayElement.key === 'sound') {
                    setAudioActive(!audioActive);
                  } else {
                    setActiveMenuOption('');
                    console.log('Regular Click');
                  }
                }}
                setMenuOptionHovered={(state) => setMenuOptionHoveredOrActive(state ? overlayElement.key : '')}
              />
            );
          })}
        </Box>

        <Box
          display={['none', 'none', 'unset']}
          w={activeOverlayData?.width}
          h="100%"
          maxHeight={menuOptionsDimensions[activeMenuOption as keyof typeof menuOptionsDimensions]?.height}
          ml={activeMenuOption !== '' ? ['20px'] : '0px'}
          overflowY="auto"
          overflowX="hidden"
          css={{
            '&::-webkit-scrollbar': {
              width: '6px',
            },
            '&::-webkit-scrollbar-track': {
              width: '6px',
              background: 'rgba(0, 0, 0, 0.25)',
              borderRadius: '24px',
            },
            '&::-webkit-scrollbar-thumb': {
              background: 'white',
              borderRadius: '24px',
              outline: '1px white solid',
            },
          }}
          transition={transition}
        >
          {activeOverlayData?.content}
        </Box>
      </Box>

      <Link
        href="https://emperiavr.com/"
        target="_blank"
        cursor="pointer"
        opacity={active ? 1 : 0}
        visibility={active ? 'visible' : 'hidden'}
        transition={transition}
      >
        <Box
          opacity={!menuHovered ? 1 : 0}
          visibility={!menuHovered ? 'visible' : 'hidden'}
          w={['180px', '180px', '225px']}
          position="fixed"
          top={['10px', '15px', 'unset']}
          bottom={['unset', 'unset', '20px']}
          right={['10px', '15px', '20px']}
          p={['10px']}
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          background="linear-gradient(0deg, rgba(0, 0, 0, 0.10) 0%, rgba(0, 0, 0, 0.10) 100%), rgba(184, 184, 184, 0.20)"
          boxShadow="0px 4px 4px 0px rgba(0, 0, 0, 0.25)"
          backdropFilter="blur(12px)"
          borderRadius="10px"
          transition={transition}
        >
          <Text
            lineHeight={['9px', '9px', '13px']}
            fontSize={['10px', '10px', '13px']}
            fontFamily="Montserrat-Medium"
            color="white"
            textTransform="uppercase"
          >
            Powered By
          </Text>
          <Image src={Emperia} width={['80px', '80px', '100px']} />
        </Box>
      </Link>
    </>
  );
}

export default Overlay;
