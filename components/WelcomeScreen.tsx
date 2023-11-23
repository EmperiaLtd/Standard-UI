import { Box, Button, Image, Text } from "@chakra-ui/react";
import { OutlineRightArrow } from "../assets/icons/OutlineRightArrow";

interface WelcomeProps  {
  active:boolean;
  close:()=>void;
}

function WelcomeScreen({active,close}:WelcomeProps) {
  return (
    <Box
    opacity={active ? 1 : 0}
    visibility={active ? 'visible' : 'hidden'}
    transition="all 1s"
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
      backdropFilter="blur(20px)"
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
            src="https://picsum.photos/200/200"
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
            The Bicester Collection
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
          VIRTUAL VOYAGE
        </Text>
        <Text
          fontFamily="Montserrat-Bold"
          width={["100%", "100%", "450px", "450px", "450px"]}
          fontSize={["13px", "13px", "14px", "15px", "15px"]}
          color="white"
        >
          Explore The Bicester Collection universe and immerse yourself in a 360
          journey of delight.
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
          Enter
        </Button>
      </Box>
    </Box>
  );
}

export default WelcomeScreen;
