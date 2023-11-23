import { Box, Text } from "@chakra-ui/react";

interface LanguageOptionProps {
  name: string;
  transition: string;
}

function LanguageOption({ name, transition }: LanguageOptionProps) {
  return (
    <Box
      textAlign="center"
      width={["120px"]}
      p={["10px 20px"]}
      borderRadius="12px"
      background="rgba(0, 0, 0, 0.10)"
      boxShadow="0px 2px 4px 0px rgba(0, 0, 0, 0.25)"
      marginBottom="15px"
      _hover={{ background: "rgba(0, 0, 0, 0.30)" }}
      transition={transition}
    >
      <Text fontSize={["15px"]} fontFamily="Montserrat-Bold" color="white">
        {name}
      </Text>
    </Box>
  );
}

export default LanguageOption;
