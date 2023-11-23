import { Box } from "@chakra-ui/react";
import { CrossIcon } from "../assets/icons/CrossIcon";

interface InstructionsProps {
  active: boolean;
  close: () => void;
}

function Instructions({ active, close }: InstructionsProps) {
  return (
    <>
      <Box
        position="fixed"
        w="100%"
        h="100%"
        top="0"
        left="0"
        opacity={active ? 1 : 0}
        visibility={active ? "visible" : "hidden"}
        backgroundColor="rgba(0,0,0,0.2)"
        transition="all 1s"
        zIndex="6"
        onClick={close}
      />

      <Box
        zIndex="12"
        opacity={active ? 1 : 0}
        visibility={active ? "visible" : "hidden"}
        transition="all 0.5s"
        position="fixed"
        top={0}
        right={0}
        left={0}
        bottom={0}
        margin="auto"
        background="rgba(255, 255, 255, 0.2)"
        borderRadius={["0px", "12px", "12px", "30px"]}
        boxShadow="0px 4px 4px 0px rgba(0, 0, 0, 0.25)"
        backdropFilter="blur(12px)"
        width={["100%", "100%", "500px", "1100px"]}
        height={[
          "-webkit-fill-available",
          "-webkit-fill-available",
          "fit-content",
          "750px",
        ]}
        padding={["40px"]}
        overflowY={["auto", "auto", "unset", "unset"]}
        overflowX="hidden"
        display="flex"
        justifyContent={["space-between"]}
        alignItems={["flex-end"]}
        flexDirection={["column", "column", "column", "column"]}
      >
        <CrossIcon
          boxSize={4}
          position="absolute"
          filter="drop-shadow(4px 4px 4px rgba(0, 0, 0, 0.5))"
          top={["15px", "15px", "10px", "15px"]}
          right={["15px", "15px", "10px", "15px"]}
        />
        Instructions Modal
      </Box>
    </>
  );
}

export default Instructions;
