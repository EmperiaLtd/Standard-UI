import { Box, Button, Text, Drawer, DrawerBody, DrawerContent, DrawerFooter, Slide } from '@chakra-ui/react';
import { CrossIcon } from '../Icons/CrossIcon';
import { Fragment, useEffect, useState } from 'react';
import Size from './PDP/Size';
import Swatch from './PDP/Swatch';
import ImageSlider from './PDP/ImageSlider';
import { ProductDrawerProps, ProductMedia, ProductVariant, ProductVariantType } from '../interfaces';
import { sortSizes } from '../utils/helper';
import useWindowDimensions from '../utils/hooks/useWindowDimensions';
import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';
import React from 'react';

function ProductDrawer({ productDrawerData, active, close }: ProductDrawerProps) {
  const transition = 'all 0.2s ease-in-out';
  const { width, height } = useWindowDimensions();

  const [mobileDrawerActive, setMobileDrawerActive] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant>();
  const [currency, setCurrency] = useState('');
  const [selectedSize, setSelectedSize] = useState<ProductVariantType>();
  const [selectedColor, setSelectedColor] = useState('');
  const [currentSizes, setCurrentSizes] = useState<ProductVariantType[]>([]);
  const [currentImages, setCurrentImages] = useState<ProductMedia[]>([]);
  const [productVariants, setProductVariants] = useState<ProductVariant[]>([]);

  useEffect(() => {
    if (active) {
      //Set Product Variants
      const variants = productDrawerData.variants;
      setProductVariants(variants);

      //set Default Variant
      const defaultVariant = variants.find((variant: ProductVariant) => variant.default);
      if (defaultVariant) {
        defaultVariant && setSelectedVariant(defaultVariant);
      }

      //Get Default Color
      const colorName = defaultVariant?.variants.find(
        (variant: ProductVariantType) => variant.variant_type === 'color',
      );
      colorName?.name && setSelectedColor(colorName?.name);

      // Get Sizes
      const sizes = defaultVariant?.variants.filter((variant: ProductVariantType) => variant.variant_type === 'size');
      const sortedSizes = sizes && sortSizes(sizes);
      sortedSizes && setCurrentSizes(sortedSizes);

      //Get First Size
      sortedSizes && setSelectedSize(sortedSizes[0]);

      //Set Currency
      setCurrency(productDrawerData.currency);

      // Get Images
      defaultVariant?.media && setCurrentImages(defaultVariant?.media);

      // Set Default Image
      defaultVariant?.media[0].url && setSelectedImage(defaultVariant?.media[0].url);
    }
  }, [productDrawerData]);

  const updateVariant = (variant: ProductVariant) => {
    if (selectedVariant === variant) return;

    setSelectedVariant(variant);

    //Set  Color
    const colorName = variant?.variants.find((variant: ProductVariantType) => variant.variant_type === 'color');
    colorName?.name && setSelectedColor(colorName.name);

    // Get Sizes
    const sizes = variant?.variants.filter((variant: ProductVariantType) => variant.variant_type === 'size');
    const sortedSizes = sizes && sortSizes(sizes);
    sortedSizes && setCurrentSizes(sortedSizes);

    // Check if prev selected size is available in new selected color
    const prevSelectedSizeAvailable = variant?.variants.find(
      (variant: ProductVariantType) => variant.value === selectedSize?.value,
    );

    prevSelectedSizeAvailable &&
      prevSelectedSizeAvailable.available_stock &&
      prevSelectedSizeAvailable?.available_stock > 0 &&
      setSelectedSize(prevSelectedSizeAvailable);

    // Get Images
    variant?.media && setCurrentImages(variant?.media);

    // Set Default Image
    variant?.media[0].url && setSelectedImage(variant?.media[0].url);
  };

  return (
    <Fragment>
      <Box
        as={Slide}
        direction={width < 769 ? 'bottom' : 'left'}
        in={active}
        zIndex={['999', '999', '9999']}
        position="fixed"
        height="100vh"
        maxW={['100%', '100%', 'calc(100vw - 448px)', 'calc(100vw - 448px)', 'calc(100vw - 512px)']}
        display="flex"
        flexDirection="column"
        justifyContent="flex-end"
        alignItems="flex-end"
      >
        <CrossIcon
          display={['unset', 'unset', 'none']}
          zIndex="25"
          boxSize={4}
          stroke="white"
          position="absolute"
          filter="drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.5))"
          top="15px"
          right="15px"
          cursor="pointer"
          onClick={() => close()}
        />

        <Box width={['100%']} height={['-webkit-fill-available']} bg="transparent" onClick={close} />

        <Box
          width={['100%']}
          height={['auto']}
          background="linear-gradient(0deg, rgba(0, 0, 0, 0.10) 0%, rgba(0, 0, 0, 0.10) 100%), rgba(184, 184, 184, 0.20)"
          backdropFilter="blur(12px)"
          display={['unset', 'unset', 'none']}
          borderTopRadius="10px"
        >
          <Box borderBottom="1px solid white" width={['100%']} p={['5px']} display="flex" justifyContent="center">
            <ChevronUpIcon cursor="pointer" color="white" boxSize={[8]} onClick={() => setMobileDrawerActive(true)} />
          </Box>
          <Box p="20px">
            <Text fontFamily="Montserrat-Bold" fontSize={['20px']} color="white">
              {productDrawerData?.title}
            </Text>
            <Text fontFamily="Montserrat-Medium" fontSize={['14px']} color="white" mt={['5px']}>
              {productDrawerData?.short_description}
            </Text>
            <Box display="flex" alignItems="center" gap={3}>
              <Text fontFamily="Montserrat-Medium" fontSize={['18px']} color="black">
                {`${currency} ${productDrawerData?.base_price}`}
              </Text>
              <Text fontFamily="Montserrat-Bold" fontSize={['18px']} color="black" textDecoration="line-through">
                {`${currency} ${selectedVariant?.retail_price}`}
              </Text>
            </Box>
          </Box>
        </Box>
      </Box>

      <Drawer
        isOpen={width < 769 ? mobileDrawerActive && active : active}
        placement={width < 769 ? 'bottom' : 'right'}
        onClose={close}
        size={['full', 'full', 'sm', 'sm', 'md']}
        autoFocus={false}
        closeOnOverlayClick={false}
      >
        <DrawerContent
          maxH={height}
          background="linear-gradient(0deg, rgba(0, 0, 0, 0.10) 0%, rgba(0, 0, 0, 0.10) 100%), rgba(184, 184, 184, 0.20)"
          backdropFilter="blur(12px)"
          boxShadow="-4px 0px 4px 0px rgba(0, 0, 0, 0.25)"
        >
          <ChevronDownIcon
            display={['unset', 'unset', 'none']}
            zIndex="25"
            boxSize={8}
            color="white"
            position="absolute"
            top="15px"
            right="15px"
            cursor="pointer"
            onClick={() => setMobileDrawerActive(false)}
          />
          <CrossIcon
            display={['none', 'none', 'unset']}
            zIndex="25"
            boxSize={4}
            stroke="white"
            filter="drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.5))"
            position="absolute"
            top="15px"
            right="15px"
            cursor="pointer"
            onClick={() => close()}
          />

          <DrawerBody
            padding="0px"
            style={{
              scrollbarWidth: 'none',
            }}
            overflowX="hidden"
          >
            <ImageSlider
              turnTableUrl={productDrawerData?.turnTableURL}
              highlightImage={selectedImage}
              images={currentImages.map((currentImage: ProductMedia) => currentImage.url)}
              setHighLightImage={(image) => setSelectedImage(image)}
            />
            <Box
              h={['fit-content', 'fit-content', 'auto', 'auto', 'auto']}
              w={['100%', '100%', '100%', '100%', '100%']}
              display="flex"
              flexDirection="column"
              justifyContent="space-between"
              p={['20px', '20px', '30px', '30px', '30px']}
            >
              <Box>
                <Text fontFamily="Montserrat-Bold" fontSize={['20px']} color="white">
                  {productDrawerData?.title}
                </Text>
                <Text fontFamily="Montserrat-Medium" fontSize={['14px']} color="white" mt={['5px']}>
                  {productDrawerData?.short_description}
                </Text>
                <Box display="flex" justifyContent="space-between" alignItems="center" width={['85px']} mt={['5px']}>
                  <Text fontFamily="Montserrat-Medium" fontSize={['14px']} color="white">
                    {`${currency} ${selectedSize?.price}`}
                  </Text>
                  <Text fontFamily="Montserrat-Bold" fontSize={['14px']} color="white" textDecoration="line-through">
                    {`${currency} ${selectedVariant?.retail_price}`}
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
                  {productDrawerData?.long_description}
                </Text>

                {/* Variant */}
                <Box
                  mt={['15px', '15px', '20px', '20px', '20px']}
                  height={['auto']}
                  display="flex"
                  flexDirection="column"
                >
                  <Box display="flex" justifyContent="flex-start" alignItems="center">
                    <Text
                      fontFamily="Montserrat-Bold"
                      fontSize={['13px', '13px', '14px', '14px', '14px']}
                      color="white"
                    >
                      Variant:
                    </Text>
                    <Text
                      ml={['5px']}
                      fontFamily="Montserrat"
                      fontSize={['13px', '13px', '14px', '14px', '14px']}
                      color="white"
                      textTransform="capitalize"
                    >
                      {selectedColor}
                    </Text>
                  </Box>

                  <Box
                    display="flex"
                    overflowY={['hidden', 'hidden', 'hidden', 'hidden', 'hidden']}
                    overflowX={['auto', 'auto', 'auto', 'auto', 'auto']}
                    height={['40px', '40px', '50px', '50px', '50px']}
                    w={['100%']}
                    alignItems="center"
                    justifyContent="flex-start"
                  >
                    {productVariants?.map((productVariant: ProductVariant) => (
                      <Swatch
                        key={productVariant.variant_id}
                        transition={transition}
                        active={selectedVariant?.color_swatch === productVariant.color_swatch}
                        colorName={productVariant.color_swatch}
                        available={productVariant.available_stock > 0}
                        onSwatchClick={() => updateVariant(productVariant)}
                      />
                    ))}
                  </Box>
                </Box>

                {/* Size */}
                <Box
                  mt={['15px', '15px', '20px', '20px', '20px']}
                  height={['auto']}
                  display="flex"
                  flexDirection="column"
                >
                  <Box display="flex" justifyContent="space-between" alignItems="center" width={['100%']}>
                    <Text
                      fontFamily="Montserrat-Bold"
                      fontSize={['13px', '13px', '14px', '14px', '14px']}
                      color="white"
                    >
                      Size:
                    </Text>
                    <Text
                      fontFamily="Montserrat"
                      fontSize={['13px', '13px', '14px', '14px', '14px']}
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
                    {currentSizes?.map((size: ProductVariantType) => (
                      <Size
                        key={size.value}
                        active={
                          selectedSize?.value === size.value && size?.available_stock
                            ? size?.available_stock > 0
                            : false
                        }
                        transition={transition}
                        sizeName={size.value}
                        available={size?.available_stock ? size?.available_stock > 0 : false}
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
    </Fragment>
  );
}

export default ProductDrawer;
