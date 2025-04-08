import {
  Box,
  Button,
  Text,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerOverlay,
  useToast,
  Divider,
} from '@chakra-ui/react';
import { CrossIcon } from '../Icons/CrossIcon';
import { Fragment, useEffect, useState } from 'react';
import ImageSlider from './PDP/ImageSlider';
import { ProductDrawerProps, ProductVariant, ProductVariantType } from '../interfaces';
import { handleCopy } from '../utils/helper';
import useWindowDimensions from '../utils/hooks/useWindowDimensions';
import React from 'react';
import { Share } from '../Icons/Share';
import PDPFooter from './PDP/PDPFooter';
import Swatch from './PDP/Swatch';
import VariantItem from './PDP/VariantItem';
import ParagraphWithSeeMore from './common/ParagraphWithSeeMore';

interface VariantField {
  name: string;
  type: string;
  value: string[];
  displayOnUI: boolean;
}

function ProductDrawer({ productId, productDrawerData, active, close, editable, openCart }: ProductDrawerProps) {
  const transition = 'all 0.2s ease-in-out';
  const { width, height } = useWindowDimensions();
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [turnTableUrl, setTurnTableUrl] = useState<string>('');
  const [currentImages, setCurrentImages] = useState<string[]>();
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant>();
  const [selectedVariantType, setSelectedVariantType] = useState<ProductVariantType>();
  const [itemAddedToCart, setItemAddedToCart] = useState<boolean>(false);
  const [count, setCount] = useState<number>(1);
  const toast = useToast();

  useEffect(() => {
    if (active) {
      //Set Product Variants
      const variants = productDrawerData?.variants?.value;
      // setProductVariants(variants);

      //set Default Variant
      const defaultVariant =
        variants?.find((variant: ProductVariant) => variant.bDefault.value) || (variants && variants[0]);

      if (defaultVariant) {
        setSelectedVariant(defaultVariant);
        setTurnTableUrl(productDrawerData?.turnTableURL?.value || '');
        setSelectedVariant(defaultVariant);
        setSelectedVariantType(defaultVariant?.variants[0]);

        // Get Images
        defaultVariant?.imageURLs.value && setCurrentImages(defaultVariant?.imageURLs.value);
        // Set Default Image
        defaultVariant?.imageURLs.value[0] && setSelectedImage(defaultVariant?.imageURLs.value[0]);
      }
    } else {
      setItemAddedToCart(false);
    }
  }, [active]);

  const updateVariant = (variant: ProductVariantType) => {
    const sVariant = productDrawerData?.variants?.value?.find((v) =>
      v.variants.some((v) => v.variant_sku?.value === variant.variant_sku?.value),
    );
    setSelectedVariant(sVariant);
    setSelectedVariantType(variant);
    setCurrentImages(sVariant?.imageURLs.value);
  };

  const handleShare = async () => {
    const domain = `${process.env.REACT_APP_DOMAIN_NAME}/#/`;
    const productUrl = domain + `viewer/${productId}`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: productDrawerData.title.value,
          text: 'Check out this product',
          url: productDrawerData.default_url.value || productUrl,
        });
      } catch (error) {
        console.error('Error sharing content:', error);
      }
    } else {
      handleCopy(productDrawerData.default_url.value || productUrl);
      toast({
        title: `Link Copied`,
        position: 'top',
        status: 'success',
        isClosable: true,
      });
    }
  };

  const openLinkInNewTab = () => {
    window.open(productDrawerData.default_url.value, '_blank');
  };

  function groupVariants(variantsObj: ProductVariant[]) {
    const groupedVariantsObj = {} as Record<string, ProductVariantType[]>;

    variantsObj.forEach((product) => {
      product.variants.forEach((variant) => {
        const variantTypeKey = variant.variant_type.value; // Convert key to lowercase

        if (!groupedVariantsObj[variantTypeKey]) {
          groupedVariantsObj[variantTypeKey] = [];
        }

        groupedVariantsObj[variantTypeKey].push(variant);
      });
    });

    return groupedVariantsObj;
  }

  function isValidColor(color: string) {
    // Allow hex codes without `#` by prepending it if missing
    if (!color.startsWith('#') && /^[A-Fa-f0-9]{3,8}$/.test(color)) {
      color = '#' + color;
    }

    // Regular expression for 3-, 6-, and 8-character hex codes
    const hexRegex = /^#([A-Fa-f0-9]{3}|[A-Fa-f0-9]{6}|[A-Fa-f0-9]{8})$/;
    // Regular expression for RGB color
    const rgbRegex = /^rgb\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})\)$/;

    if (hexRegex.test(color) || rgbRegex.test(color)) {
      return true;
    }

    // Try setting the color to see if the browser recognizes it as a valid color name
    const testDiv = document.createElement('div');
    testDiv.style.color = color;
    return testDiv.style.color !== ''; // Returns true if it's a valid color
  }
  function applyColor(color: string) {
    if (!color.startsWith('#') && /^[A-Fa-f0-9]{3,8}$/.test(color)) {
      color = '#' + color;
    }
    return color;
  }

  const renderVariants = (variants_selection_order: VariantField, variants: ProductVariant[]) => {
    const groupedVariants = groupVariants(variants);
    const selection =
      variants_selection_order.value.length > 0 ? variants_selection_order.value : Object.keys(groupedVariants);
    return (selection as string[])?.map((variantType: string, index: number) => {
      return (
        <Box key={index} mb="4" mt={['20px', '20px', '20px', '20px', '20px']} padding={['0px 20px']}>
          <Text
            fontFamily="Montserrat"
            fontWeight="700"
            fontSize={['14px', '14px']}
            lineHeight={['18px', '18px']}
            color="white"
            textAlign="left"
            mb="2"
          >
            {variantType}
          </Text>
          <Box key={index} display="flex" flexWrap="wrap" alignItems="center">
            {groupedVariants[variantType]?.map((variant, i) =>
              isValidColor(variant.value.value) ? (
                <Swatch
                  key={i}
                  colorName={applyColor(variant.value.value)}
                  available={true}
                  active={selectedVariant?.variant_sku === variant.variant_sku}
                  transition={transition}
                  onSwatchClick={() => {
                    updateVariant(variant);
                  }}
                />
              ) : (
                <VariantItem
                  available={true}
                  key={i}
                  name={variant.value.value || ''}
                  active={selectedVariant?.variant_sku === variant.variant_sku}
                  transition={transition}
                  onClick={() => {
                    updateVariant(variant);
                  }}
                />
              ),
            )}
          </Box>
        </Box>
      );
    });
  };

  return (
    <Fragment key={productId}>
      <Drawer
        isOpen={active}
        placement={width < 769 ? 'bottom' : 'right'}
        onClose={close}
        size={['full', 'full', 'sm', 'sm', 'md']}
        closeOnOverlayClick={editable ? false : true}
        autoFocus={false}
        trapFocus={false}
      >
        {!editable && <DrawerOverlay onClick={close} />}
        <DrawerContent
          maxH={height}
          background="linear-gradient(0deg, rgba(0, 0, 0, 0.10) 0%, rgba(0, 0, 0, 0.10) 100%), rgba(184, 184, 184, 0.20)"
          backdropFilter="blur(12px)"
        >
          <DrawerBody
            padding="0px"
            style={{
              scrollbarWidth: 'none',
            }}
            overflowX="hidden"
          >
            <Box
              height="50px"
              width="100%"
              display="flex"
              justifyContent="flex-end"
              alignItems="center"
              padding={['0px 20px']}
              background="linear-gradient(0deg, rgba(0, 0, 0, 0.10) 0%, rgba(0, 0, 0, 0.10) 100%), rgba(184, 184, 184, 0.20)"
              backdropFilter="blur(12px)"
            >
              <CrossIcon
                cursor="pointer"
                onClick={close}
                boxSize={4}
                stroke="white"
                filter="drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.5))"
                zIndex={10}
                data-testid="cross-icon"
              />
            </Box>

            {productDrawerData?.imageURLs?.displayOnUI && (
              <ImageSlider
                turnTableUrl={turnTableUrl}
                highlightImage={selectedImage}
                images={currentImages || []}
                setHighLightImage={(image) => setSelectedImage(image)}
                product={productDrawerData}
              />
            )}

            {productDrawerData?.brand?.displayOnUI && (
              <Box padding={['0px 20px']}>
                <Text
                  fontFamily="Montserrat"
                  fontWeight="400"
                  fontSize={['14px', '14px']}
                  lineHeight={['18px', '18px']}
                  color="white"
                  textAlign="left"
                  mb="4"
                >
                  {productDrawerData?.brand?.value}
                </Text>
              </Box>
            )}

            {productDrawerData?.title?.displayOnUI && (
              <Box padding={['0px 20px']}>
                <Text
                  fontFamily="Montserrat"
                  fontWeight="700"
                  fontSize={['18px', '18px']}
                  lineHeight={['24px', '24px']}
                  color="white"
                  textAlign="left"
                  mb="4"
                >
                  {productDrawerData?.title?.value}
                </Text>
              </Box>
            )}

            {productDrawerData?.base_price?.displayOnUI && (
              <Box>
                <Box padding={['0px 20px']} display="flex" alignItems="center" justifyContent="space-between">
                  <Text
                    fontFamily="Montserrat"
                    fontWeight="700"
                    fontSize={['18px', '18px']}
                    lineHeight={['24px', '24px']}
                    color="white"
                    textAlign="left"
                    mb="4"
                  >
                    {`
                    ${productDrawerData?.currency?.value || '$'}
                    ${
                      selectedVariantType?.price?.value ||
                      selectedVariant?.sale_price?.value ||
                      selectedVariant?.retail_price?.value ||
                      Number(productDrawerData?.base_price?.value).toFixed(2) ||
                      Number(productDrawerData?.retail_price?.value).toFixed(2) ||
                      0
                    }
                `}
                  </Text>
                  <Button
                    variant="link"
                    leftIcon={<Share boxSize={['16px']} />}
                    fontFamily="Montserrat"
                    fontWeight="700"
                    fontSize={['14px', '14px']}
                    lineHeight={['18px', '18px']}
                    color="white"
                    textAlign="left"
                    onClick={handleShare}
                  >
                    Share
                  </Button>
                </Box>
                <Divider />
              </Box>
            )}

            {/* Variants Here */}
            {productDrawerData?.variants?.displayOnUI && (
              <Box mb={['30px']}>
                {renderVariants(
                  productDrawerData?.variants_selection_order as VariantField,
                  productDrawerData.variants?.value as ProductVariant[],
                )}
              </Box>
            )}

            {productDrawerData?.long_description?.displayOnUI && (
              <Box padding={['0px 20px']}>
                <ParagraphWithSeeMore
                  text={selectedVariant?.long_description?.value || productDrawerData?.long_description?.value || ''}
                  maxLines={1}
                />
              </Box>
            )}
          </DrawerBody>
          <PDPFooter
            count={selectedVariant?.in_stock ? count : 0}
            selectedVariantInStock={false}
            itemAddedToCart={itemAddedToCart}
            setItemAddedToCart={(state) => setItemAddedToCart(state)}
            openCart={() => openCart()}
            openLinkInNewTab={() => openLinkInNewTab()}
            increaseCount={() => setCount((state) => ++state)}
            decreaseCount={() => count > 0 && setCount((state) => --state)}
            close={() => close()}
          />
        </DrawerContent>
      </Drawer>
    </Fragment>
  );
}

export default ProductDrawer;
