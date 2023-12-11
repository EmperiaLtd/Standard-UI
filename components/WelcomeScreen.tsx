import { Box, Button, Image, Text } from "@chakra-ui/react";
import { OutlineRightArrow } from "../assets/icons/OutlineRightArrow";



function WelcomeScreen({ welcomeData, active, close }: WelcomeProps) {
  const transition = "all 0.2s ease-in-out";

  return (
    <Box
      opacity={active ? 1 : 0}
      visibility={active ? "visible" : "hidden"}
      transition={transition}
      display="flex"
      flexDirection={["column", "column", "row", "row", "row"]}
      justifyContent={[
        "flex-end",
        "flex-end",
        "space-between",
        "space-between",
        "space-between",
      ]}
      alignItems={["flex-end", "center", "flex-end", "flex-end", "flex-end"]}
      position="fixed"
      top="0"
      left="0"
      h="100%"
      w="100%"
      background="linear-gradient(0deg, rgba(0, 0, 0, 0.10) 0%, rgba(0, 0, 0, 0.10) 100%), rgba(184, 184, 184, 0.20)"
      backdropFilter="blur(12px)"
      padding={["40px", "40px", "60px", "80px", "100px"]}
    >
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
        width={["100%", "310px", "450px", "600px", "1000px"]}
        height={["auto", "160px", "180px", "200px", "300px"]}
      >
        <Box
          width={["260px", "260px", "285px", "290px", "300px"]}
          height={["50px", "50px", "55px", "60px", "70px"]}
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <Image
            src={welcomeData?.collectionImage}
            height={["50px", "50px", "55px", "60px", "70px"]}
            width={["50px", "50px", "55px", "60px", "70px"]}
            borderRadius="100"
          />
          <Text
            textTransform="uppercase"
            fontFamily="Montserrat-Medium"
            width={["200px", "200px", "220px", "220px", "220px"]}
            fontSize={["18px", "18px", "20px", "22px", "25px"]}
            lineHeight={["20px", "20px", "22px", "24px", "27px"]}
            color="white"
          >
            {welcomeData?.collectionTitle}
          </Text>
        </Box>
        <Text
          fontFamily="Montserrat-Bold"
          width="100%"
          m={["20px 0px", "unset", "unset", "unset"]}
          fontSize={["30px", "30px", "40px", "60px", "100px"]}
          lineHeight={["30px", "30px", "40px", "60px", "100px"]}
          color="white"
        >
          {welcomeData?.jumboTitle}
        </Text>
        <Text
          fontFamily="Montserrat-Bold"
          width={["100%", "100%", "450px", "450px", "450px"]}
          fontSize={["13px", "13px", "14px", "15px", "15px"]}
          color="white"
        >
          {welcomeData?.tagline}
        </Text>
      </Box>
      <Box
        display="flex"
        alignItems="flex-end"
        width={["100%", "310px", "180px", "180px", "250px"]}
        mt="30px"
        h="auto"
      >
        <Button
          w="100%"
          boxShadow="rgba(0, 0, 0, 0.24) 0px 3px 8px"
          textTransform="uppercase"
          rightIcon={<OutlineRightArrow boxSize={[5]} />}
          onClick={close}
        >
          {welcomeData?.enterCTA}
        </Button>
      </Box>
    </Box>
  );
}

export default WelcomeScreen;
