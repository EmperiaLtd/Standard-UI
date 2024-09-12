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
import {
  CartItemProps,
  ProductDrawerProps,
  ProductMedia,
  ProductVariant,
  ProductVariantType,
  SelectedVariantTypeState,
} from '../interfaces';
import { getOpSys, getSorted, handleCopy } from '../utils/helper';
import useWindowDimensions from '../utils/hooks/useWindowDimensions';
import React from 'react';
import ParagraphWithSeeMore from './PDP/ParagraphWithSeeMore';
import ArViewer from './PDP/ArViewer';
import { LeftArrow } from '../Icons/LeftArrow';
import { ARAndoirdUrls, ARIOSUrls, ARPCUrls, turnTableUrls } from '../fallbackData';
import { ArViewer as ArViewerIcon } from '../Icons/ArViewer';
import { Share } from '../Icons/Share';
import VariantItem from './PDP/VarientItem';
import PDPFooter from './PDP/PDPFooter';
import { onIframeCartChange } from '../utils/helper/cart';

const selectedVariantTypeDefaultData: SelectedVariantTypeState = {
  0: {
    index: 0,
    type: '',
    value: '',
  },
};
function ProductDrawer({
  productId,
  productDrawerData,
  active,
  close,
  openProductModal,
  productIdTrail,
  openCart,
  setCartItems,
}: ProductDrawerProps) {
  const transition = 'all 0.2s ease-in-out';
  const { width, height } = useWindowDimensions();

  const [selectedImage, setSelectedImage] = useState('');
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant>();
  const [currentImages, setCurrentImages] = useState<ProductMedia[]>([]);
  const [itemAddedToCart, setItemAddedToCart] = useState<boolean>(false);
  const [itemsCountToAdd, setItemsCountToAdd] = useState<number>(0);
  const [productVariants, setProductVariants] = useState<ProductVariant[]>([]);
  const [ARViewerActive, setARViewerActive] = useState(false);
  const [count, setCount] = useState<number>(1);
  const [selectedVariantAttributes, setSelectedVariantAttributes] =
    useState<SelectedVariantTypeState>(selectedVariantTypeDefaultData);
  const [selectedVariantType, setSelectedVariantType] =
    useState<SelectedVariantTypeState>(selectedVariantTypeDefaultData);
  const [turnTableUrl, setTurnTableUrl] = useState('');

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
      setTurnTableUrl(productDrawerData?.turnTableURL || turnTableUrls[productId as keyof typeof turnTableUrls] || '');

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

      setSelectedVariantType(selectedVariantTypeObj);
      setSelectedVariantAttributes(selectedVariantTypeObj);

      // Get Images
      defaultVariant?.media && setCurrentImages(defaultVariant?.media);

      // Set Default Image
      defaultVariant?.media[0].url && setSelectedImage(defaultVariant?.media[0].url);
    }
  }, [productDrawerData]);

  const updateVariant = (variant: ProductVariant) => {
    if (selectedVariant === variant) return;

    setSelectedVariant(variant);

    // Get Images
    variant?.media && setCurrentImages(variant.media);

    // Set Default Image
    variant?.media[0].url && setSelectedImage(variant.media[0].url);
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
  const getUniqueVariants = (productVariants: ProductVariant[]) => {
    const uniqueVariantMap = new Map<string, ProductVariant>();

    productVariants.forEach((productVariant) => {
      productVariant.variants.forEach((variant) => {
        const variantKey = `${variant.variant_type}:${variant.value}`;
        const existingVariant = uniqueVariantMap.get(variantKey);

        if (!existingVariant || (!existingVariant.in_stock && productVariant.in_stock)) {
          // Add or replace the existing out-of-stock variant with the in-stock one
          uniqueVariantMap.set(variantKey, productVariant);
        }
      });
    });

    // Use a Set to further ensure uniqueness based on the first variant value
    const uniqueProductSet = new Set<string>();
    const uniqueProductVariants: ProductVariant[] = [];

    uniqueVariantMap.forEach((productVariant) => {
      if (!uniqueProductSet.has(productVariant.variants[0].value)) {
        uniqueProductSet.add(productVariant.variants[0].value);
        uniqueProductVariants.push(productVariant);
      }
    });

    return uniqueProductVariants;
  };
  const filterVariantsByParentVariantType = (parentVariantTypeIndex: number) =>
    productDrawerData.variants.filter((variant) => {
      const cond = Object.values(selectedVariantType).map((_, z) =>
        parentVariantTypeIndex === selectedVariantType?.[z]?.index
          ? true
          : variant.variants[selectedVariantType?.[z]?.index]?.value === selectedVariantType?.[z]?.value,
      );
      return cond.every((c) => c);
    });

  const handleShare = async () => {
    // const defaultVariant = productVariants.find((variant: ProductVariant) => variant.default);
    const domain = `${process.env.REACT_APP_DOMAIN_NAME}/#/`;
    const productUrl = domain + `viewer/${productId}`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: productDrawerData.title,
          text: 'Check out this product I found on Walmart Realm',
          url: productUrl,
        });
      } catch (error) {
        console.error('Error sharing content:', error);
      }
    } else {
      handleCopy(productUrl);
      toast({
        title: `Link Copied`,
        position: 'top',
        status: 'success',
        isClosable: true,
      });
    }
  };

  const onHandleVariantClick = (productVariant: ProductVariant, parentVariantTypeIndex: number) => {
    const obj = {
      [parentVariantTypeIndex]: {
        index: parentVariantTypeIndex,
        type: productVariant.variants[parentVariantTypeIndex].variant_type,
        value: productVariant.variants[parentVariantTypeIndex].value,
        name: productVariant.variants[parentVariantTypeIndex].name,
      },
    };
    setSelectedVariantType(obj);
    setSelectedVariantAttributes(obj);
    updateVariant(productVariant);
  };
  const updateVariantTypeData = (prev: SelectedVariantTypeState, index: number, productVariant: ProductVariant) => {
    const prevVal = { ...prev };

    Object.keys(prevVal).forEach((key: string) => {
      if (parseInt(key) > index) {
        delete prevVal[parseInt(key)];
      }
    });

    return {
      ...prevVal,
      [index]: {
        index,
        type: productVariant.variants[index].variant_type,
        value: productVariant.variants[index].value,
        name: productVariant.variants[index].name,
      },
    };
  };
  const onAddToCart = (data: CartItemProps) => {
    setItemsCountToAdd(data.quantity);

    const existingCart = localStorage.getItem('ct_cart');
    if (existingCart === null) {
      localStorage.setItem('ct_cart', JSON.stringify([data]));
      setCartItems([data]);
      onIframeCartChange([data]);
    } else {
      const _newCart = JSON.parse(existingCart);
      const index = _newCart.findIndex((rec: CartItemProps) => rec.id === data.id);
      if (index !== -1) {
        _newCart[index].quantity += data.quantity;
      } else {
        _newCart.push(data);
      }
      localStorage.setItem('ct_cart', JSON.stringify(_newCart));
      setCartItems(_newCart);
      onIframeCartChange(_newCart);
    }

    setItemAddedToCart(true);
  };

  const onAddToCartClick = () => {
    const cartImage = currentImages.find((currentImage: ProductMedia) => currentImage.bMain);

    if (selectedVariant?.in_stock) {
      const item: CartItemProps = {
        id: selectedVariant?.variant_id ? selectedVariant?.variant_id : '',
        imageSrc: cartImage?.url || '',
        name: productDrawerData.title,
        quantity: count,
        price: selectedVariant?.retail_price || 0,
        selectedVariantAttributes,
      };

      Object.keys(selectedVariantAttributes).forEach((key: string) => {
        const formattedKey = selectedVariantAttributes[parseInt(key)].type.toLowerCase();
        item[formattedKey] = selectedVariantAttributes[parseInt(key)].value;
      });
      onAddToCart(item);
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

            <ImageSlider
              turnTableUrl={turnTableUrl}
              highlightImage={selectedImage}
              images={getSorted(currentImages).map((currentImage: ProductMedia) => currentImage.url)}
              setHighLightImage={(image) => setSelectedImage(image)}
              product={productDrawerData}
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
                {selectedVariant?.sale_price && (
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
                      {`$${
                        Number(selectedVariant?.sale_price).toFixed(2) ||
                        Number(productDrawerData?.base_price).toFixed(2)
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
                )}
                <Divider />

                {productDrawerData &&
                  productDrawerData.variants_selection_order?.map(
                    (variantType: string, index: number) =>
                      (index === 0 ||
                        (selectedVariantType?.[index - 1] &&
                          filterVariantsByParentVariantType(index).length !== 0)) && (
                        <Box
                          key={variantType}
                          mt={['20px', '20px', '20px', '20px', '20px']}
                          height={['auto']}
                          display="flex"
                          flexDirection="column"
                        >
                          <Box display="flex" justifyContent="flex-start" alignItems="center">
                            <Text
                              fontFamily="Montserrat"
                              fontWeight="700"
                              fontSize={['14px', '14px', '14px', '14px', '14px']}
                              lineHeight={['18px', '18px', '14px', '14px', '14px']}
                              color="white"
                              letterSpacing="-0.02em"
                            >
                              {variantType}:
                            </Text>
                            <Text
                              ml={['5px']}
                              fontFamily="Montserrat"
                              fontSize={['14px', '14px', '14px', '14px', '14px']}
                              lineHeight={['18px', '18px', '14px', '14px', '14px']}
                              color="white"
                              textTransform="capitalize"
                              letterSpacing="-0.02em"
                            >
                              {selectedVariantAttributes[index]?.name || selectedVariantAttributes[index]?.value}
                            </Text>
                          </Box>

                          <Box
                            display="flex"
                            overflowY={['hidden', 'hidden', 'hidden', 'hidden', 'hidden']}
                            overflowX={['auto', 'auto', 'auto', 'auto', 'auto']}
                            height={['60px', '60px', '70px', '70px', '70px']}
                            w={['100%']}
                            alignItems="center"
                            justifyContent="flex-start"
                            mt="10px"
                          >
                            {index === 0
                              ? getUniqueVariants(productVariants)?.map((productVariant: ProductVariant) =>
                                  productVariant.variants[index].variant_type === 'Color' ? (
                                    <Swatch
                                      key={productVariant.variant_id}
                                      transition={transition}
                                      active={
                                        selectedVariantAttributes?.[index]?.value ===
                                        productVariant.variants[index].value
                                      }
                                      colorName={
                                        productVariant.color_swatch ||
                                        productVariant.media.find((media) => media.media_type === 'PRIMARY')
                                          ?.thumbnail_url ||
                                        ''
                                      }
                                      available={productVariant?.in_stock || false}
                                      onSwatchClick={() => onHandleVariantClick(productVariant, index)}
                                    />
                                  ) : (
                                    <VariantItem
                                      key={productVariant.variant_id}
                                      active={
                                        selectedVariantAttributes?.[index]?.value ===
                                        productVariant.variants[index].value
                                      }
                                      transition={transition}
                                      name={productVariant.variants?.[index]?.value ?? ''}
                                      available={productVariant?.in_stock || false}
                                      onClick={() => onHandleVariantClick(productVariant, index)}
                                    />
                                  ),
                                )
                              : filterVariantsByParentVariantType(index)?.map((productVariant) => {
                                  return (
                                    <VariantItem
                                      key={productVariant.variant_id}
                                      active={
                                        selectedVariantAttributes?.[index]?.value ===
                                        productVariant.variants[index].value
                                      }
                                      transition={transition}
                                      name={
                                        productVariant.variants?.[selectedVariantAttributes?.[index - 1]?.index + 1]
                                          ?.value ?? ''
                                      }
                                      available={productVariant?.in_stock || false}
                                      onClick={() => {
                                        updateVariant(productVariant);
                                        setSelectedVariantAttributes((prev: SelectedVariantTypeState) =>
                                          updateVariantTypeData(prev, index, productVariant),
                                        );
                                        if (productDrawerData.variants_selection_order?.length - 1 !== index) {
                                          setSelectedVariantType((prev: SelectedVariantTypeState) =>
                                            updateVariantTypeData(prev, index, productVariant),
                                          );
                                        }
                                      }}
                                    />
                                  );
                                })}
                          </Box>
                        </Box>
                      ),
                  )}
                {productDrawerData?.long_description && (
                  <ParagraphWithSeeMore text={productDrawerData?.long_description} maxLines={3} />
                )}
              </Box>
            </Box>
          </DrawerBody>
          <PDPFooter
            count={selectedVariant?.in_stock ? count : 0}
            selectedVariantInStock={selectedVariant?.in_stock || false}
            itemAddedToCart={itemAddedToCart}
            itemsCountToAdd={itemsCountToAdd}
            setItemAddedToCart={(state) => setItemAddedToCart(state)}
            openCart={() => openCart()}
            addToCart={() => onAddToCartClick()}
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
