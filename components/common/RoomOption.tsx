import { Box, Text } from "@chakra-ui/react";

interface RoomOptionProps {
  name: string;
  description: string;
  transition: string;
}

function RoomOption({ name, description, transition }: RoomOptionProps) {
  return (
    <Box
      width={["180px", "180px", "220px"]}
      p={["10px 10px", "10px 10px", "10px 20px"]}
      borderRadius="12px"
      background={"rgba(0, 0, 0, 0.15)"}
      boxShadow="0px 2px 4px 0px rgba(0, 0, 0, 0.25)"
      marginBottom="15px"
      _hover={{ background: "rgba(0, 0, 0, 0.20)" }}
      transition={transition}
    >
      <Text
        fontSize={["14px", "14px", "15px"]}
        fontFamily="Montserrat-Bold"
        textTransform="uppercase"
        color="white"
      >
        {name}
      </Text>
      <Text
        fontSize={["14px", "14px", "15px"]}
        fontFamily="Montserrat"
        color="white"
      >
        {description}
      </Text>
    </Box>
  );
}

export default RoomOption;
