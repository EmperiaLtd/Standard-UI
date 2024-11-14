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
import Swatch from './PDP/Swatch';
import ImageSlider from './PDP/ImageSlider';
import { ProductDrawerProps, ProductVariant, ProductVariantType, SelectedVariantTypeState } from '../interfaces';
import { getOpSys, handleCopy } from '../utils/helper';
import useWindowDimensions from '../utils/hooks/useWindowDimensions';
import React from 'react';
import ParagraphWithSeeMore from './PDP/ParagraphWithSeeMore';
import ArViewer from './PDP/ArViewer';
import { LeftArrow } from '../Icons/LeftArrow';
import { ARAndoirdUrls, ARIOSUrls, ARPCUrls } from '../fallbackData';
import { ArViewer as ArViewerIcon } from '../Icons/ArViewer';
import { Share } from '../Icons/Share';
import VariantItem from './PDP/VarientItem';
import PDPFooter from './PDP/PDPFooter';

function ProductDrawer({
  productId,
  productDrawerData,
  active,
  close,
  openProductModal,
  productIdTrail,
  openCart,
}: ProductDrawerProps) {
  const transition = 'all 0.2s ease-in-out';
  const { width, height } = useWindowDimensions();

  const [selectedImage, setSelectedImage] = useState('');
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant>();
  const [currentImages, setCurrentImages] = useState<string[]>([]);
  const [itemAddedToCart, setItemAddedToCart] = useState<boolean>(false);
  const [productVariants, setProductVariants] = useState<ProductVariant[]>([]);
  const [ARViewerActive, setARViewerActive] = useState(false);
  const [count, setCount] = useState<number>(1);
  const [turnTableUrl, setTurnTableUrl] = useState('');
  const [isVariantUpdate, setIsVariantUpdate] = useState(false);
  const [selectedVariantType, setSelectedVariantType] = useState<ProductVariantType>();

  const toast = useToast();
  useEffect(() => {
    if (active) {
      //Set Product Variants
      const variants = productDrawerData?.variants;
      setProductVariants(variants);

      //set Default Variant
      const defaultVariant = variants?.find((variant: ProductVariant) => variant.bDefault) || (variants && variants[0]);
      if (defaultVariant) {
        setSelectedVariant(defaultVariant);
        //Set Turntable Url
      }
      setTurnTableUrl(productDrawerData?.turnTableURL || '');

      const selectedVariantTypeObj: SelectedVariantTypeState = {};

      // Set variant type data
      productDrawerData.variants_selection_order?.map((variantType: string, index: number) => {
        const data = defaultVariant?.variants.find((v: ProductVariantType) => v.variant_type === variantType);
        selectedVariantTypeObj[index] = {
          index,
          type: data?.variant_type || '',
          value: data?.value || '',
          name: data?.name || '',
        };
      });

      if (productDrawerData.imageURLs) {
        // Get Images
        setCurrentImages(productDrawerData.imageURLs);

        // Set Default Image
        setSelectedImage(productDrawerData.imageURLs[0]);
      }

      if (defaultVariant.media && defaultVariant.media.length > 0) {
        setCurrentImages(defaultVariant.media.map((m) => m.url));
        setSelectedImage(defaultVariant.media[0].url);
      }
    }
  }, [productDrawerData]);

  const updateVariant = (variant: ProductVariantType) => {
    const sVariant = productVariants.find((v) => v.variants.some((v) => v.variant_sku === variant.variant_sku));
    setSelectedVariantType(variant);
    setIsVariantUpdate(true);
    setSelectedVariant(sVariant);

    if (variant?.imageURLs && variant.imageURLs.length > 0) {
      // Get Images
      setCurrentImages(variant.imageURLs);
      // Set Default Image
      setSelectedImage(variant?.imageURLs[0]);
    }
    if (sVariant?.imageURLs && sVariant.imageURLs.length > 0) {
      // Get Images
      setCurrentImages(sVariant.imageURLs);
      // Set Default Image
      setSelectedImage(sVariant?.imageURLs[0]);
    }

    if (sVariant?.media && sVariant.media.length > 0) {
      setCurrentImages(sVariant.media.map((m) => m.url));
      setSelectedImage(sVariant.media[0].url);
    }
  };

  const openARViewer = () => {
    const redirectLink = process.env.REACT_APP_DOMAIN_NAME || '';
    const somethingWentWrongText = 'Something went wrong';
    const ModelFilename = ARPCUrls[productId as keyof typeof ARPCUrls]?.split('=')[1];

    const anchor = document.createElement('a');

    const detectedOs = getOpSys();

    if (detectedOs === 'IOS') {
      const fileDirectory = `${process.env.REACT_APP_DOMAIN_NAME}/` + ARIOSUrls[productId as keyof typeof ARIOSUrls];
      anchor.setAttribute('rel', 'ar');
      anchor.appendChild(document.createElement('img'));
      anchor.setAttribute('href', fileDirectory + '#allowsContentScaling=0');
      anchor.click();
    } else if (detectedOs === 'Android') {
      const fileDirectory =
        `${process.env.REACT_APP_DOMAIN_NAME}/` + ARAndoirdUrls[productId as keyof typeof ARAndoirdUrls];
      const fallbackUrl =
        'https://arvr.google.com/scene-viewer?file=' +
        encodeURIComponent(fileDirectory) +
        '&link=' +
        encodeURIComponent(redirectLink) +
        '&title=' +
        somethingWentWrongText +
        '';

      const intentConstruct =
        '?file=' +
        fileDirectory +
        '&title=' +
        ModelFilename +
        '&mode=ar_preferred#Intent;scheme=https;package=com.google.android.googlequicksearchbox;action=android.intent.action.VIEW;S.browser_fallback_url=' +
        fallbackUrl +
        ';end;';

      const sceneViewerUrl = 'intent://arvr.google.com/scene-viewer/1.0' + intentConstruct;

      anchor.href = sceneViewerUrl;
      anchor.appendChild(document.createElement('img'));
      document.body.appendChild(anchor);
      anchor.click();
    } else {
      setARViewerActive(true);
    }
  };

  const handleShare = async () => {
    const domain = `${process.env.REACT_APP_DOMAIN_NAME}/#/`;
    const productUrl = domain + `viewer/${productId}`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: productDrawerData.title,
          text: 'Check out this product I found on Walmart Realm',
          url: productDrawerData.default_url || productUrl,
        });
      } catch (error) {
        console.error('Error sharing content:', error);
      }
    } else {
      handleCopy(productDrawerData.default_url || productUrl);
      toast({
        title: `Link Copied`,
        position: 'top',
        status: 'success',
        isClosable: true,
      });
    }
  };

  const openLinkInNewTab = () => {
    window.open(productDrawerData.default_url, '_blank');
  };

  function groupVariants(variantsObj: ProductVariant[]) {
    const groupedVariants = {} as Record<string, ProductVariantType[]>;

    // Loop through the main variants array (variantsObj)
    variantsObj.forEach((product) => {
      // Access the nested variants array for each product
      const nestedVariants = product.variants;

      // Loop through each nested variant to group them by their variant_type
      nestedVariants.forEach((variant) => {
        const variantType = variant.variant_type;

        // If the variantType is not already a key in groupedVariants, initialize it as an array
        if (!groupedVariants[variantType]) {
          groupedVariants[variantType] = [];
        }

        // Push the variant into the corresponding group
        groupedVariants[variantType].push(variant);
      });
    });

    return groupedVariants;
  }

  const variants_selection_order =
    productDrawerData?.variants_selection_order?.length > 0
      ? productDrawerData?.variants_selection_order
      : Object.keys(groupVariants(productDrawerData?.variants || []));

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
  return (
    <Fragment key={productId}>
      <ArViewer pId={productId} active={ARViewerActive} close={() => setARViewerActive(false)} />
      <Drawer
        isOpen={active}
        placement={width < 769 ? 'bottom' : 'right'}
        onClose={close}
        size={['full', 'full', 'sm', 'sm', 'md']}
        autoFocus={false}
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
              justifyContent="space-between"
              alignItems="center"
              padding={['0px 20px']}
            >
              <Box onClick={() => openProductModal(productId)} height="100%" display="flex" alignItems="center">
                {productIdTrail.length > 0 && <LeftArrow cursor="pointer" stroke="white" boxSize={4} />}
              </Box>

              {ARPCUrls[productId as keyof typeof ARPCUrls]?.length > 0 && (
                <Button
                  onClick={() => {
                    openARViewer();
                  }}
                  leftIcon={<ArViewerIcon boxSize={[6]} />}
                  variant="link"
                  fontSize={['14px']}
                  fontFamily="Montserrat-Bold"
                  color="white"
                >
                  View in your space
                </Button>
              )}

              <CrossIcon
                cursor="pointer"
                onClick={close}
                boxSize={4}
                stroke="white"
                filter="drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.5))"
              />
            </Box>
            {(turnTableUrl.length > 0 || currentImages.length > 0) && (
              <ImageSlider
                turnTableUrl={turnTableUrl}
                highlightImage={selectedImage}
                images={currentImages}
                setHighLightImage={(image) => setSelectedImage(image)}
                product={productDrawerData}
              />
            )}

            <Box
              h={['fit-content', 'fit-content', 'auto', 'auto', 'auto']}
              w={['100%', '100%', '100%', '100%', '100%']}
              display="flex"
              flexDirection="column"
              justifyContent="space-between"
              p={['20px', '20px', '30px', '30px', '30px']}
            >
              <Box>
                {productDrawerData?.brand && (
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
                    {productDrawerData?.brand}
                  </Text>
                )}
                {productDrawerData?.title && (
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
                    {productDrawerData?.title}
                  </Text>
                )}
                {(productDrawerData?.base_price || productDrawerData.retail_price) && (
                  <>
                    <Box display="flex" alignItems="center" justifyContent="space-between">
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
                        ${productDrawerData.currency || '$'}
                        
                        ${
                          isVariantUpdate
                            ? Number(selectedVariantType?.price).toFixed(2) ||
                              Number(selectedVariant?.sale_price).toFixed(2)
                            : Number(productDrawerData?.base_price).toFixed(2) ||
                              Number(productDrawerData?.retail_price).toFixed(2) ||
                              0
                        }`}
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
                )}
                {variants_selection_order.map((variantType, index) => {
                  const groupedVariants = groupVariants(productDrawerData.variants);
                  return (
                    <Box key={index} mb="4" mt={['20px', '20px', '20px', '20px', '20px']}>
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
                      <Box display="flex" flexWrap="wrap" alignItems="center">
                        {groupedVariants[variantType].map((variant, i) =>
                          variantType === 'Color' && isValidColor(variant.value) ? (
                            <Swatch
                              key={i}
                              colorName={applyColor(variant.value)}
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
                              name={variant.value || ''}
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
                })}
                {/* {(productDrawerData?.short_description || selectedVariant?.short_description) && (
                  <Text
                    fontFamily="Montserrat"
                    fontWeight="700"
                    fontSize={['17px', '17px']}
                    lineHeight={['24px', '24px']}
                    letterSpacing="-0.02em"
                    color="white"
                    textAlign="left"
                    mb="4"
                  >
                    {isVariantUpdate
                      ? (selectedVariant?.short_description as string)
                      : productDrawerData?.short_description || ''}
                  </Text>
                )} */}
                {(productDrawerData?.short_description || selectedVariant?.short_description) && (
                  <ParagraphWithSeeMore
                    longText={
                      isVariantUpdate
                        ? (selectedVariant?.long_description as string)
                        : productDrawerData?.long_description || ''
                    }
                    shortText={
                      isVariantUpdate
                        ? (selectedVariant?.short_description as string)
                        : productDrawerData?.short_description || ''
                    }
                    maxLines={1}
                  />
                )}
              </Box>
            </Box>
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
