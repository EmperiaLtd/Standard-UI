import { Box, Image, Button, Text } from "@chakra-ui/react";
import { CrossIcon } from "../assets/icons/CrossIcon";



function InfoModal({ infoData, active, close }: InfoModalProps) {
  const transition = "all 0.2s ease-in-out";

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
        background="rgba(0, 0, 0, 0)"
        transition={transition}
        zIndex="6"
        onClick={close}
      />

      <Box
        zIndex="12"
        opacity={active ? 1 : 0}
        visibility={active ? "visible" : "hidden"}
        transition={transition}
        position="fixed"
        top={0}
        right={0}
        left={0}
        bottom={0}
        margin="auto"
        background="linear-gradient(0deg, rgba(0, 0, 0, 0.10) 0%, rgba(0, 0, 0, 0.10) 100%), rgba(184, 184, 184, 0.20)"
        borderRadius={["0px", "12px", "12px", "12px"]}
        boxShadow="0px 4px 4px 0px rgba(0, 0, 0, 0.25)"
        backdropFilter="blur(12px)"
        width={["100%", "100%", "500px", "850px"]}
        height={[
          "-webkit-fill-available",
          "-webkit-fill-available",
          "fit-content",
          "550px",
        ]}
        overflowY={["auto", "auto", "unset", "unset"]}
        overflowX="hidden"
        display="flex"
        flexDirection={["column", "column", "column", "row"]}
      >
        <CrossIcon
          boxSize={4}
          position="absolute"
          filter="drop-shadow(4px 4px 4px rgba(0, 0, 0, 0.5))"
          top={["15px", "15px", "10px", "15px"]}
          right={["15px", "15px", "10px", "15px"]}
        />

        <Box
          width={["100%", "100%", "100%", "425px"]}
          height={["500px", "500px", "350px", "100%"]}
          borderRadius={["0px", "0px", "12px", "12px"]}
          padding={["0px", "0px", "25px", "25px"]}
        >
          <Image
            objectFit="cover"
            src={infoData?.image}
            height="100%"
            width="100%"
            borderRadius="inherit"
          />
        </Box>
        <Box
          width={["100%", "100%", "100%", "425px", "425px"]}
          height={["auto", "auto", "auto", "100%"]}
          display="flex"
          flexDirection="column"
          padding={["20px", "20px", "25px", "25px"]}
        >
          <Box
            w="100%"
            height="auto"
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
            mb={["20px", "20px", "20px", "auto"]}
          >
            <Text
              fontFamily="Montserrat-Bold"
              fontSize={["20px"]}
              textTransform="uppercase"
              color="white"
            >
              {infoData?.title}
            </Text>
            <Text
              m="10px 0px"
              fontFamily="Montserrat-Medium"
              fontSize={["14px"]}
              color="white"
            >
              {infoData?.subtitle}
            </Text>
            <Text fontFamily="Montserrat" fontSize={["12px"]} color="white">
              {infoData?.description}
            </Text>
          </Box>
          <Button
            marginTop={["20px", "20px", "20px", "auto"]}
            width={["200px"]}
            textTransform="uppercase"
            fontFamily="Montserrat"
            bg="rgba(0, 0, 0, 0.1)"
            _hover={{ bg: "rgba(0, 0, 0, 0.3)" }}
            border="1px solid rgba(255, 255, 255, 0.80)"
            boxShadow="0px 4px 4px 0px rgba(0, 0, 0, 0.25);"
            backdropFilter="blur(12px)"
            color="white"
          >
            {infoData?.moreCTA}
          </Button>
        </Box>
      </Box>
    </>
  );
}

export default InfoModal;
