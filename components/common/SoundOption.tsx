import { Box, Text } from "@chakra-ui/react";

interface SoundOptionProps {
  name: string;
  transition: string;
}

function SoundOption({ name, transition }: SoundOptionProps) {
  return (
    <Box
      textAlign="center"
      m="0 auto"
      width={["90%", "90%", "100%"]}
      p={["10px 20px"]}
      borderRadius="12px"
      background={"rgba(0, 0, 0, 0.15)"}
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

export default SoundOption;
