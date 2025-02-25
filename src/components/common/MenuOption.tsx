import { AddIcon } from '@chakra-ui/icons';
import { Text, Box } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { RoomShifter } from '../../Icons/RoomShifter';
import { InstructionsQuestion } from '../../Icons/InstructionsQuestion';
import { LanguageShifter } from '../../Icons/LanguageShifter';
import { Sound } from '../../Icons/Sound';
import { UpArrow } from '../../Icons/UpArrow';
import { Share } from '../../Icons/Share';
import { MenuOptionProps } from '../../interfaces';
import React from 'react';

function MenuOption({
  content,
  contentHeight,
  activeMenuOption = false,
  leftIcon,
  additionalOptions = false,
  text,
  activateMenuOptions,
  transition,
  menuOptionHovered,
  onMenuOptionClick,
  setMenuOptionHovered,
}: MenuOptionProps) {
  const icons = {
    changeRooms: (
      <RoomShifter boxSize={[4, 4, 5, 5, 6]} stroke={menuOptionHovered || activeMenuOption ? 'black' : 'white'} />
    ),
    instructions: (
      <InstructionsQuestion
        boxSize={[4, 4, 5, 5, 6]}
        stroke={menuOptionHovered || activeMenuOption ? 'black' : 'white'}
      />
    ),
    sound: <Sound boxSize={[4, 4, 5, 5, 6]} stroke={menuOptionHovered || activeMenuOption ? 'black' : 'white'} />,
    languages: (
      <LanguageShifter boxSize={[4, 4, 5, 5, 6]} stroke={menuOptionHovered || activeMenuOption ? 'black' : 'white'} />
    ),
    share: <Share boxSize={[4, 4, 5, 5, 6]} stroke={menuOptionHovered || activeMenuOption ? 'black' : 'white'} />,
  };

  const [display, setDisplay] = useState(false);

  useEffect(() => {
    if (activateMenuOptions) {
      setTimeout(() => {
        setDisplay(true);
      }, 200);
    } else {
      setTimeout(() => {
        setDisplay(false);
      }, 200);
    }
  }, [activateMenuOptions]);

  return (
    <Box
      _notFirst={{ marginTop: ['5px', '5px', '10px'] }}
      borderTopRadius={['16px', '16px', '24px', '24px', '24px']}
      borderBottomRadius={['16px', '16px', '24px', '24px', '24px']}
      h={activeMenuOption ? ['auto'] : ['35px', '35px', '40px', '40px', '50px']}
      w="100%"
      display="flex"
      flexDirection="column"
      justifyContent="flex-start"
      alignItems="center"
      background={activeMenuOption ? 'rgba(0, 0, 0, 0.10)' : 'transparent'}
      transition={transition}
      overflow="hidden"
    >
      <Box
        zIndex="20"
        borderRadius={['16px', '16px', '24px', '24px', '24px']}
        minH={['35px', '35px', '40px', '40px', '50px']}
        w="100%"
        display="flex"
        justifyContent="space-evenly"
        alignItems="center"
        background={activeMenuOption ? '#FFF' : 'unset'}
        boxShadow={activeMenuOption ? '#0px 2px 4px 0px rgba(0, 0, 0, 0.25)' : 'unset'}
        _hover={{
          background: '#FFF',
          boxShadow: '0px 2px 4px 0px rgba(0, 0, 0, 0.25)',
        }}
        transition={transition}
        onClick={onMenuOptionClick}
        onMouseEnter={() => {
          setMenuOptionHovered(true);
        }}
        onMouseLeave={() => {
          setMenuOptionHovered(false);
        }}
      >
        {icons[leftIcon as keyof typeof icons]}
        <Box
          width={['125px', '125px', '130px', '130px', '140px']}
          opacity={display ? 1 : 0}
          display={activateMenuOptions ? 'flex' : 'none'}
          justifyContent="space-between"
          alignItems="center"
          transition={transition}
        >
          <Text
            lineHeight={['13px', '13px', '14px', '14px', '15px']}
            fontSize={['13px', '13px', '14px', '14px', '15px']}
            fontFamily="Montserrat-Medium"
            color={menuOptionHovered || activeMenuOption ? 'black' : 'white'}
          >
            {text}
          </Text>
          {additionalOptions &&
            (activeMenuOption ? (
              <UpArrow boxSize={[2]} stroke="black" transform={['unset', 'unset', 'rotate(90deg)']} />
            ) : (
              <AddIcon color={menuOptionHovered || activeMenuOption ? 'black' : 'white'} boxSize={[2]} />
            ))}
        </Box>
      </Box>
      <Box
        mt="10px"
        maxH={activeMenuOption ? contentHeight : '100px'}
        display={['flex', 'flex', 'none']}
        flexDirection="column"
        alignItems="center"
        w="100%"
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
        {text === 'Share' ? 'Share' : React.isValidElement(content) ? content : <>{content}</>}
      </Box>
    </Box>
  );
}

export default MenuOption;
