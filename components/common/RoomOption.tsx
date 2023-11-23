import { Box, Text } from "@chakra-ui/react";

interface RoomOptionProps {
  name: string;
  description: string;
  transition: string;
}

function RoomOption({ name, description, transition }: RoomOptionProps) {
  return (
    <Box
      width={["220px"]}
      p={["10px 20px"]}
      borderRadius="12px"
      background={"rgba(0, 0, 0, 0.10)"}
      boxShadow="0px 2px 4px 0px rgba(0, 0, 0, 0.25)"
      marginBottom="15px"
      _hover={{ background: "rgba(0, 0, 0, 0.30)" }}
      transition={transition}
    >
      <Text
        fontSize={["15px"]}
        fontFamily="Montserrat-Bold"
        textTransform="uppercase"
        color="white"
      >
        {name}
      </Text>
      <Text fontSize={["15px"]} fontFamily="Montserrat" color="white">
        {description}
      </Text>
    </Box>
  );
}

export default RoomOption;
