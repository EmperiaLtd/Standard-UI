import {
  Box,
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import ImageSlider from "../components/PDP/ImageSlider";
import { CrossIcon } from "../assets/icons/CrossIcon";
import { Hanger } from "../assets/icons/Hanger";
import Swatch from "./PDP/Swatch";
import Size from "./PDP/Size";

interface PDPProps {
  active: boolean;
  close: () => void;
}

interface ColorItem {
  id: number | string;
  name: string;
  available: boolean;
}

interface SizeItem {
  id: number | string;
  name: string;
  available: boolean;
}

const PDP = ({ active, close }: PDPProps) => {
  const transition = "all 0.2s ease-in-out";

  const [selectedImage, setSelectedImage] = useState(
    "https://picsum.photos/800/800"
  );
  const [colors, setColors] = useState<ColorItem[]>();
  const [selectedColor, setSelectedColor] = useState<ColorItem>();
  const [sizes, setSizes] = useState<SizeItem[]>();
  const [selectedSize, setSelectedSize] = useState<SizeItem>();

  useEffect(() => {
    setColors([
      {
        id: 0,
        name: "black",
        available: true,
      },
      {
        id: 1,
        name: "red",
        available: false,
      },
      {
        id: 2,
        name: "blue",
        available: true,
      },
    ]);

    setSelectedColor({
      id: 0,
      name: "black",
      available: true,
    });

    setSizes([
      {
        id: 0,
        name: "XS",
        available: true,
      },
      {
        id: 1,
        name: "S",
        available: false,
      },
      {
        id: 2,
        name: "M",
        available: true,
      },
    ]);

    setSelectedSize({
      id: 0,
      name: "XS",
      available: true,
    });
  }, []);

  return (
    <Modal onClose={() => close()} isOpen={active}>
      <ModalOverlay />
      <ModalContent
        m={["0px", "0px", "auto", "auto", "auto"]}
        h={[
          "-webkit-fill-available",
          "-webkit-fill-available",
          "450px",
          "500px",
          "550px",
        ]}
        maxW={["100%", "100%", "fit-content", "fit-content", "fit-content"]}
        width={["100%", "100%", "auto", "auto", "auto"]}
        overflowY={["auto", "auto", "unset", "unset", "unset"]}
        overflowX="hidden"
        position="fixed"
        top="0"
        left="0"
        bottom="0"
        right="0"
        background="linear-gradient(0deg, rgba(0, 0, 0, 0.10) 0%, rgba(0, 0, 0, 0.10) 100%), rgba(184, 184, 184, 0.20)"
        borderRadius={["0px", "0px", "12px", "12px"]}
        boxShadow="0px 4px 4px 0px rgba(0, 0, 0, 0.25)"
        backdropFilter="blur(12px)"
        border="0.731px solid rgba(255, 255, 255, 0.80)"
      >
        <CrossIcon
          position="absolute"
          filter="drop-shadow(4px 4px 4px rgba(0, 0, 0, 0.5))"
          top={["10px", "10px", "10px", "10px", "10px"]}
          right={["10px", "10px", "10px", "10px", "10px"]}
          boxSize={[5, 5, 5, 6]}
          cursor="pointer"
          strokeWidth={0.5}
          zIndex={30}
          stroke="white"
          borderRadius="100%"
          onClick={close}
        />

        <ModalBody
          height={["auto", "auto", "400px", "450px", "500px"]}
          pointerEvents={active ? "all" : "none"}
          padding={["0px", "0px", "20px", "30px", "40px"]}
          display="flex"
          flexDirection={["column", "column", "row", "row", "row"]}
          justifyContent={[
            "flex-start",
            "flex-start",
            "space-between",
            "space-between",
            "space-between",
          ]}
        >
          <ImageSlider
            highlightImage={selectedImage}
            images={[
              "https://picsum.photos/800/800",
              "https://picsum.photos/900/900",
              "https://picsum.photos/1000/1000",
              "https://picsum.photos/1001/1001",
              "https://picsum.photos/1002/1002",
            ]}
            setHighLightImage={(image) => setSelectedImage(image)}
          />
          <Box
            h={["fit-content", "fit-content", "400px", "450px", "470px"]}
            w={["100%", "100%", "320px", "360px", "400px"]}
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
            p={["20px", "30px", "0px 0px 0px 20px", "0px 0px 0px 30px"]}
          >
            <Box>
              <Text
                fontFamily="Montserrat-Bold"
                fontSize={["20px"]}
                color="white"
              >
                Product Name
              </Text>
              <Text
                fontFamily="Montserrat-Medium"
                fontSize={["14px"]}
                color="white"
                mt={["5px"]}
              >
                Subtitle
              </Text>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                width={["85px"]}
                mt={["5px"]}
              >
                <Text
                  fontFamily="Montserrat-Medium"
                  fontSize={["14px"]}
                  color="white"
                >
                  $ 300
                </Text>
                <Text
                  fontFamily="Montserrat-Bold"
                  fontSize={["14px"]}
                  color="white"
                  textDecoration="line-through"
                >
                  $ 450
                </Text>
              </Box>
              <Text
                fontFamily="Montserrat"
                fontSize={["12px"]}
                color="white"
                mt={["10px"]}
              >
                Iconic medium shoulder bag with monogram motif and silver chain.
                Versatile design with detachable handle and shoulder strap.
                Crafted metalware details. Made in Italy.
              </Text>

              {/* Variant */}
              <Box
                mt={["15px", "15px", "10px", "20px"]}
                height={["auto"]}
                display="flex"
                flexDirection="column"
              >
                <Box
                  display="flex"
                  justifyContent="flex-start"
                  alignItems="center"
                >
                  <Text
                    fontFamily="Montserrat-Bold"
                    fontSize={["13px", "13px", "13px", "14px"]}
                    color="white"
                  >
                    Variant:
                  </Text>
                  <Text
                    ml={["5px"]}
                    fontFamily="Montserrat"
                    fontSize={["13px", "13px", "13px", "14px"]}
                    color="white"
                  >
                    {selectedColor?.name?.charAt(0).toUpperCase() +
                      selectedColor?.name?.slice(1)}
                  </Text>
                </Box>

                <Box
                  display="flex"
                  overflowY={["hidden", "hidden", "hidden", "hidden", "hidden"]}
                  overflowX={["auto", "auto", "auto", "auto", "auto"]}
                  height={["40px", "40px", "40px", "50px"]}
                  w={["100%"]}
                  alignItems="center"
                  justifyContent="flex-start"
                >
                  {colors?.map((color: ColorItem) => (
                    <Swatch
                      key={color.id}
                      transition={transition}
                      active={selectedColor.id === color.id}
                      colorName={color.name}
                      available={color.available}
                      onSizeClick={() => setSelectedColor(color)}
                    />
                  ))}
                </Box>
              </Box>

              {/* Size */}
              <Box
                mt={["15px", "15px", "10px", "20px"]}
                height={["auto"]}
                display="flex"
                flexDirection="column"
              >
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  width={["100%"]}
                >
                  <Text
                    fontFamily="Montserrat-Bold"
                    fontSize={["13px", "13px", "13px", "14px"]}
                    color="white"
                  >
                    Size:
                  </Text>
                  <Text
                    fontFamily="Montserrat"
                    fontSize={["13px", "13px", "13px", "14px"]}
                    color="white"
                    textDecoration="underline"
                    cursor="pointer"
                    _hover={{ color: "#CCCCCC" }}
                    transition={transition}
                  >
                    Size Guide
                  </Text>
                </Box>

                <Box
                  mt={["5px"]}
                  display="flex"
                  flexWrap="wrap"
                  overflowY={["hidden", "hidden", "hidden", "hidden", "hidden"]}
                  overflowX={["auto", "auto", "auto", "auto", "auto"]}
                  height={["auto"]}
                  w={["100%"]}
                  alignItems="center"
                  justifyContent="flex-start"
                >
                  {sizes?.map((size: SizeItem) => (
                    <Size
                      active={selectedSize.id === size.id}
                      transition={transition}
                      sizeName={size.name}
                      available={size.available}
                      onSizeClick={() => setSelectedSize(size)}
                    />
                  ))}
                </Box>
              </Box>
            </Box>

            <Button
              m="0 auto"
              mt={["20px", "20px", "unset", "unset"]}
              leftIcon={
                <Hanger
                  boxSize={[6, 6, 5, 6]}
                  mr={["10px", "10px", "5px", "10px"]}
                />
              }
              width={["100%", "300px", "100%", "100%"]}
              height={["40px", "40px", "40px", "50px"]}
              fontSize={["15px", "15px", "14px", "15px"]}
              lineHeight={["15px"]}
              color="white"
              fontFamily="Montserrat"
              textTransform="uppercase"
              borderRadius="8px"
              border="1px solid rgba(255, 255, 255, 0.80)"
              background="rgba(0, 0, 0, 0.10)"
              _hover={{ background: "rgba(0, 0, 0, 0.30)" }}
              boxShadow="0px 4px 4px 0px rgba(0, 0, 0, 0.25)"
              backdropFilter="blur(12px)"
            >
              Add to bag
            </Button>
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
export default PDP;
