import { Box, Button, Text, Drawer, DrawerBody, DrawerContent, DrawerFooter, DrawerOverlay } from '@chakra-ui/react';
import { CrossIcon } from '../assets/icons/CrossIcon';
import { useEffect, useState } from 'react';
import Size from './PDP/Size';
import Swatch from './PDP/Swatch';
import ImageSlider from './PDP/ImageSlider';
import { ColorItem, ProductDrawerProps, SizeItem } from '../interfaces';

function ProductDrawer({ active, close }: ProductDrawerProps) {
  const transition = 'all 0.2s ease-in-out';

  const [selectedImage, setSelectedImage] = useState('https://picsum.photos/800/800');
  const [colors, setColors] = useState<ColorItem[]>();
  const [selectedColor, setSelectedColor] = useState<ColorItem>();
  const [sizes, setSizes] = useState<SizeItem[]>();
  const [selectedSize, setSelectedSize] = useState<SizeItem>();

  useEffect(() => {
    setColors([
      {
        id: 0,
        name: 'black',
        available: true,
      },
      {
        id: 1,
        name: 'red',
        available: false,
      },
      {
        id: 2,
        name: 'blue',
        available: true,
      },
    ]);

    setSelectedColor({
      id: 0,
      name: 'black',
      available: true,
    });

    setSizes([
      {
        id: 0,
        name: 'XS',
        available: true,
      },
      {
        id: 1,
        name: 'S',
        available: false,
      },
      {
        id: 2,
        name: 'M',
        available: true,
      },
    ]);

    setSelectedSize({
      id: 0,
      name: 'XS',
      available: true,
    });
  }, []);

  return (
    <Drawer
      isOpen={active}
      placement="right"
      onClose={close}
      size={['full', 'full', 'xs', 'sm', 'sm']}
      closeOnOverlayClick={false}
    >
      <DrawerOverlay bg="transparent" />
      <DrawerContent
        background="linear-gradient(0deg, rgba(0, 0, 0, 0.10) 0%, rgba(0, 0, 0, 0.10) 100%), rgba(184, 184, 184, 0.20)"
        backdropFilter="blur(12px)"
        boxShadow="-4px 0px 4px 0px rgba(0, 0, 0, 0.25)"
      >
        <CrossIcon
          zIndex="20"
          boxSize={4}
          stroke="black"
          position="absolute"
          filter="drop-shadow(4px 4px 4px rgba(0, 0, 0, 0.5))"
          top="15px"
          right="15px"
          cursor="pointer"
          onClick={close}
        />

        <DrawerBody padding="0px">
          <ImageSlider
            highlightImage={selectedImage}
            images={[
              'https://picsum.photos/800/800',
              'https://picsum.photos/900/900',
              'https://picsum.photos/1000/1000',
              'https://picsum.photos/1001/1001',
              'https://picsum.photos/1002/1002',
            ]}
            setHighLightImage={(image) => setSelectedImage(image)}
          />
          <Box
            h={['fit-content', 'fit-content', '400px', '450px', '470px']}
            w={['100%', '100%', '100%', '100%', '100%']}
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
            p={['20px', '20px', '20px', '30px', '30px']}
          >
            <Box>
              <Text fontFamily="Montserrat-Bold" fontSize={['20px']} color="white">
                Product Name
              </Text>
              <Text fontFamily="Montserrat-Medium" fontSize={['14px']} color="white" mt={['5px']}>
                Subtitle
              </Text>
              <Box display="flex" justifyContent="space-between" alignItems="center" width={['85px']} mt={['5px']}>
                <Text fontFamily="Montserrat-Medium" fontSize={['14px']} color="white">
                  $ 300
                </Text>
                <Text fontFamily="Montserrat-Bold" fontSize={['14px']} color="white" textDecoration="line-through">
                  $ 450
                </Text>
              </Box>
              <Text
                fontFamily="Montserrat"
                fontSize={['12px']}
                color="white"
                mt={['10px']}
                maxH={['200px']}
                h="auto"
                overflow="auto"
              >
                Iconic medium shoulder bag with monogram motif and silver chain. Versatile design with detachable handle
                and shoulder strap. Crafted metalware details. Made in Italy. Iconic medium shoulder bag with monogram
                motif and silver chain.
              </Text>

              {/* Variant */}
              <Box mt={['15px', '15px', '10px', '20px']} height={['auto']} display="flex" flexDirection="column">
                <Box display="flex" justifyContent="flex-start" alignItems="center">
                  <Text fontFamily="Montserrat-Bold" fontSize={['13px', '13px', '13px', '14px']} color="white">
                    Variant:
                  </Text>
                  <Text ml={['5px']} fontFamily="Montserrat" fontSize={['13px', '13px', '13px', '14px']} color="white">
                    {selectedColor?.name?.charAt(0).toUpperCase() + selectedColor?.name?.slice(1)}
                  </Text>
                </Box>

                <Box
                  display="flex"
                  overflowY={['hidden', 'hidden', 'hidden', 'hidden', 'hidden']}
                  overflowX={['auto', 'auto', 'auto', 'auto', 'auto']}
                  height={['40px', '40px', '40px', '50px']}
                  w={['100%']}
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
                      onSwatchClick={() => setSelectedColor(color)}
                    />
                  ))}
                </Box>
              </Box>

              {/* Size */}
              <Box mt={['15px', '15px', '10px', '20px']} height={['auto']} display="flex" flexDirection="column">
                <Box display="flex" justifyContent="space-between" alignItems="center" width={['100%']}>
                  <Text fontFamily="Montserrat-Bold" fontSize={['13px', '13px', '13px', '14px']} color="white">
                    Size:
                  </Text>
                  <Text
                    fontFamily="Montserrat"
                    fontSize={['13px', '13px', '13px', '14px']}
                    color="white"
                    textDecoration="underline"
                    cursor="pointer"
                    _hover={{ color: '#CCCCCC' }}
                    transition={transition}
                  >
                    Size Guide
                  </Text>
                </Box>

                <Box
                  mt={['5px']}
                  display="flex"
                  flexWrap="wrap"
                  overflowY={['hidden', 'hidden', 'hidden', 'hidden', 'hidden']}
                  overflowX={['auto', 'auto', 'auto', 'auto', 'auto']}
                  height={['auto']}
                  w={['100%']}
                  alignItems="center"
                  justifyContent="flex-start"
                >
                  {sizes?.map((size: SizeItem) => (
                    <Size
                      key={size.id}
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
          </Box>
        </DrawerBody>

        <DrawerFooter p="0px">
          <Box p={['20px', '20px', '20px', '30px', '30px']} width={['100%']}>
            <Button
              width={['100%']}
              textTransform="uppercase"
              fontFamily="Montserrat"
              bg="rgba(0, 0, 0, 0.1)"
              _hover={{ bg: 'rgba(0, 0, 0, 0.3)' }}
              border="1px solid rgba(255, 255, 255, 0.80)"
              boxShadow="0px 4px 4px 0px rgba(0, 0, 0, 0.25);"
              backdropFilter="blur(12px)"
              color="white"
            >
              Add To Bag
            </Button>
          </Box>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

export default ProductDrawer;
