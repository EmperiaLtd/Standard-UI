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
import { Fragment, useState } from 'react';
import ImageSlider from './PDP/ImageSlider';
import { ProductDrawerProps, ProductVariant, ProductVariantType } from '../interfaces';
import { handleCopy } from '../utils/helper';
import useWindowDimensions from '../utils/hooks/useWindowDimensions';
import React from 'react';
import ParagraphWithSeeMore from './PDP/ParagraphWithSeeMore';
import ArViewer from './PDP/ArViewer';
import { Share } from '../Icons/Share';
import PDPFooter from './PDP/PDPFooter';
import Swatch from './PDP/Swatch';
import VariantItem from './PDP/VarientItem';

function ProductDrawer({ productId, productDrawerData, active, close, editable, openCart }: ProductDrawerProps) {
  const transition = 'all 0.2s ease-in-out';
  const { width, height } = useWindowDimensions();

  const [selectedImage, setSelectedImage] = useState('');
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant>();
  const [selectedVariantType, setSelectedVariantType] = useState<ProductVariantType>();
  const [itemAddedToCart, setItemAddedToCart] = useState<boolean>(false);
  const [ARViewerActive, setARViewerActive] = useState(false);
  const [count, setCount] = useState<number>(1);
  const toast = useToast();

  const updateVariant = (variant: ProductVariantType) => {
    const sVariant = productDrawerData?.variants?.value.find((v) =>
      v.variants.some((v) => v.variant_sku?.value === variant.variant_sku?.value),
    );
    setSelectedVariant(sVariant);
    setSelectedVariantType(variant);
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

    // Loop through the main variants array (variantsObj)
    variantsObj.forEach((product) => {
      // Access the nested variants array for each product
      const nestedVariants = product.variants;

      // Loop through each nested variant to group them by their variant_type
      nestedVariants.forEach((variant) => {
        const variantType = variant.variant_type;

        // If the variantType is not already a key in groupedVariants, initialize it as an array
        if (!groupedVariantsObj[variantType.value]) {
          groupedVariantsObj[variantType.value] = [];
        }

        // Push the variant into the corresponding group
        groupedVariantsObj[variantType.value].push(variant);
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
  function applyColor(colour: string) {
    if (!colour.startsWith('#') && /^[A-Fa-f0-9]{3,8}$/.test(colour)) {
      colour = '#' + colour;
    }
    return colour;
  }

  const renderVariants = (variants_selection_order: any, variants: any) => {
    const selection = variants_selection_order?.value || ['Color', 'Size'];
    return selection?.map((variantType: string, index: number) => {
      const groupedVariants = groupVariants(variants);
      return (
        <Box key={index} mb="4" mt={['20px', '20px', '20px', '20px', '20px']} padding={['0px 20px']}>
          <Text
            fontFamily="Montserrat"
            fontWeight="700"
            fontSize={['14px', '14px']}
            lineHeight={['18px', '18px']}
            letterSpacing="-0.02em"
            color="white"
            textAlign="left"
            mb="2"
          >
            {variantType}
          </Text>
          <Box key={index} display="flex" flexWrap="wrap" alignItems="center">
            {groupedVariants[variantType.toLowerCase()]?.map((variant, i) =>
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

  const renderField = (key: string, field: any) => {
    switch (field.type) {
      case 'urlArray': {
        return (
          <Box key={key} mb={['30px']}>
            <ImageSlider
              turnTableUrl={productDrawerData?.turnTableURL?.value || ''}
              highlightImage={selectedImage}
              images={
                (selectedVariantType?.imageURLs?.value?.length && selectedVariantType?.imageURLs?.value) ||
                (selectedVariant?.imageURLs?.value && selectedVariant?.imageURLs?.value) ||
                field.value
              }
              setHighLightImage={(image) => setSelectedImage(image)}
              product={productDrawerData}
            />
          </Box>
        );
      }
      case 'array':
        if (key === 'variants') {
          return renderVariants(productDrawerData?.variants_selection_order?.value, field.value);
        }
        break;
      case 'string':
        if (key === 'title') {
          return (
            <Box padding={['0px 20px']} key={key}>
              <Text
                fontFamily="Montserrat"
                fontWeight="700"
                fontSize={['18px', '18px']}
                lineHeight={['24px', '24px']}
                letterSpacing="-0.02em"
                color="white"
                textAlign="left"
                mb="4"
              >
                {field.value}
              </Text>
            </Box>
          );
        }
        if (key === 'brand') {
          return (
            <Box padding={['0px 20px']} key={key}>
              <Text
                fontFamily="Montserrat"
                fontWeight="400"
                fontSize={['14px', '14px']}
                lineHeight={['18px', '18px']}
                letterSpacing="-0.02em"
                color="white"
                textAlign="left"
                mb="4"
              >
                {field.value}
              </Text>
            </Box>
          );
        }
        if (key === 'base_price') {
          return (
            <>
              <Box padding={['0px 20px']} key={key} display="flex" alignItems="center" justifyContent="space-between">
                <Text
                  fontFamily="Montserrat"
                  fontWeight="700"
                  fontSize={['18px', '18px']}
                  lineHeight={['24px', '24px']}
                  letterSpacing="-0.02em"
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
                    Number(field.value).toFixed(2) ||
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
                  letterSpacing="-0.02em"
                  color="white"
                  textAlign="left"
                  onClick={handleShare}
                >
                  Share
                </Button>
              </Box>
              <Divider />
            </>
          );
        }
        if (key === 'short_description') {
          return (
            <Box padding={['0px 20px']} key={key}>
              <ParagraphWithSeeMore
                longText={selectedVariant?.long_description?.value || productDrawerData?.long_description?.value || ''}
                shortText={selectedVariant?.short_description?.value || field.value}
                maxLines={1}
              />
            </Box>
          );
        }
    }
  };

  return (
    <Fragment key={productId}>
      <ArViewer pId={productId} active={ARViewerActive} close={() => setARViewerActive(false)} />
      <Drawer
        isOpen={active}
        placement={width < 769 ? 'bottom' : 'right'}
        onClose={close}
        size={['full', 'full', 'sm', 'sm', 'md']}
        autoFocus={false}
        trapFocus={false}
      >
        <DrawerOverlay />
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
              justifyContent={editable ? 'space-between' : 'flex-end'}
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
            {productDrawerData && Object.entries(productDrawerData).map(([key, field]) => renderField(key, field))}
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
