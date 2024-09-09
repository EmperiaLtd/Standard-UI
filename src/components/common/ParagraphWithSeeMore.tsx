// ParagraphWithSeeMore.tsx
import React, { useState } from 'react';
import { Box, Button, Collapse, Text } from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';

interface ParagraphWithSeeMoreProps {
  text: string;
  maxLines?: number;
}

const ParagraphWithSeeMore: React.FC<ParagraphWithSeeMoreProps> = ({ text, maxLines = 3 }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpansion = () => {
    setIsExpanded(!isExpanded);
  };

  const lineHeight = 1.5; // Adjust this based on your design
  const textFontSize = 16; // Font size in px
  const collapseHeight = `${maxLines * lineHeight * textFontSize + 10}px`;

  return (
    <Box>
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
          {text}
        </Text>
      </Collapse>
      {text.length > 150 && (
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
    </Box>
  );
};

export default ParagraphWithSeeMore;
