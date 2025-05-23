// ParagraphWithSeeMore.tsx
import React, { useState } from 'react';
import { Box, Button, Collapse, Text } from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';

interface ParagraphWithSeeMoreProps {
  shortText: string;
  maxLines?: number;
  longText: string;
}

const ParagraphWithSeeMore: React.FC<ParagraphWithSeeMoreProps> = ({ shortText, longText, maxLines = 3 }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpansion = () => {
    setIsExpanded(!isExpanded);
  };

  const lineHeight = 1.5; // Adjust this based on your design
  const textFontSize = 16; // Font size in px
  const collapseHeight = `${maxLines * lineHeight * textFontSize + 10}px`;

  return (
    <Box>
      <Text
        fontWeight="400"
        fontSize="16px"
        color="white"
        mt="10px"
        overflow="auto"
        letterSpacing="-0.02em"
        textAlign="left"
        lineHeight={lineHeight}
      >
        {shortText}
      </Text>
      {longText.length > 0 && (
        <Button
          leftIcon={
            <ChevronDownIcon boxSize={6} transform={isExpanded ? 'rotate(180deg)' : 'unset'} transition="0.2s all" />
          }
          mt="12px"
          onClick={toggleExpansion}
          variant="link"
          color="white"
          fontFamily="Montserrat-Bold"
          fontWeight="400"
          fontSize={['16px', '16px']}
          letterSpacing="-0.02em"
        >
          {isExpanded ? 'See less' : 'See more'}
        </Button>
      )}
      {isExpanded && (
        <Collapse startingHeight={collapseHeight} in={isExpanded}>
          <Text
            fontWeight="400"
            fontSize="16px"
            color="white"
            mt="10px"
            overflow="auto"
            letterSpacing="-0.02em"
            textAlign="left"
            lineHeight={lineHeight}
          >
            {longText}
          </Text>
        </Collapse>
      )}
    </Box>
  );
};

export default ParagraphWithSeeMore;
