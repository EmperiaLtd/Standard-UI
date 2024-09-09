import { Box, Button, Image, Text } from '@chakra-ui/react';
import { useState } from 'react';
import { CartItemProps, SelectedVariantTypeState } from '../../interfaces';
import { Trash } from '../../Icons/Trash';
import React from 'react';
import Counter from './Counter';

function CartItem({
  id,
  name,
  imageSrc,
  price,
  quantity,
  selectedVariantAttributes,
  onItemRemove,
  updateCart,
}: CartItemProps) {
  const [productCount, setProductCount] = useState<number>(quantity);

  //  eslint-disable-next-line @typescript-eslint/no-explicit-any
  const debounce = <F extends (...args: any[]) => any>(func: F, delay: number) => {
    let timeoutId: ReturnType<typeof setTimeout>;
    return function (this: ThisParameterType<F>, ...args: Parameters<F>) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func.apply(this, args);
      }, delay);
    };
  };

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const debouncedUpdateCart = debounce(updateCart ? updateCart : function () {}, 1000);

  const onIncrease = () => {
    setProductCount((state) => ++state);
    debouncedUpdateCart(id, productCount + 1);
  };

  const onDecrease = () => {
    if (productCount > 1) {
      setProductCount((state) => --state);
      debouncedUpdateCart(id, productCount - 1);
    }
  };

  return (
    <>
      <Box w="100%" h="auto" display="flex" flexDirection="column" gap="20px" key={id} padding="20px 0px">
        <Box display="flex" gap="3">
          <Image src={imageSrc} w="130px" h="auto" alt="product" objectFit="cover" />
          <Box display="flex" flexDirection="column" gap="10px">
            <Text
              fontSize={['14px', '14px']}
              lineHeight={['18px', '18px']}
              fontFamily="Montserrat"
              fontWeight="700"
              letterSpacing="-0.02em"
              textAlign="left"
              color="white"
            >
              {name}
            </Text>

            {Object.keys(selectedVariantAttributes as SelectedVariantTypeState).map((key: string) => (
              <Box display="flex" gap="5px" key={key}>
                <Text
                  fontSize={['14px', '14px']}
                  lineHeight={['18px', '18px']}
                  fontFamily="Montserrat"
                  fontWeight="700"
                  letterSpacing="-0.02em"
                  textAlign="left"
                  color="white"
                >
                  {(selectedVariantAttributes as SelectedVariantTypeState)[parseInt(key)].type}:
                </Text>
                <Text
                  fontSize={['14px', '14px']}
                  lineHeight={['18px', '18px']}
                  fontFamily="Montserrat"
                  fontWeight="400"
                  letterSpacing="-0.02em"
                  textAlign="left"
                  color="white"
                >
                  {(selectedVariantAttributes as SelectedVariantTypeState)[parseInt(key)].value}
                </Text>
              </Box>
            ))}
          </Box>
        </Box>

        <Box display="flex" p="0px 10px" flexDirection="column" alignItems="flex-end" gap={2}>
          <Box width="100%" display="flex" alignItems="center" justifyContent="space-between">
            <Counter count={productCount} onIncrease={onIncrease} onDecrease={onDecrease} />
            <Text
              fontSize={['18px', '18px']}
              lineHeight={['24px', '24px']}
              fontFamily="Montserrat"
              fontWeight="700"
              letterSpacing="-0.02em"
              textAlign="right"
              color="white"
            >
              ${(productCount * price).toFixed(2)}
            </Text>
          </Box>

          <Button
            rightIcon={<Trash boxSize={[4, 4, 5]} />}
            variant="link"
            fontSize={['12px', '12px']}
            lineHeight={['16px', '16px']}
            fontFamily="Montserrat"
            fontWeight="400"
            textAlign="right"
            color="#757575"
            onClick={onItemRemove}
          >
            Remove
          </Button>
        </Box>
      </Box>

      <svg width="353" height="2" viewBox="0 0 353 2" fill="none" xmlns="http://www.w3.org/2000/svg">
        <line y1="1.07886" x2="353" y2="1.07886" stroke="#C2C2C2" />
      </svg>
    </>
  );
}

export default CartItem;
