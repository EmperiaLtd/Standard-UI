import { DrawerFooter, Button, Text, Box } from '@chakra-ui/react';
import React from 'react';
import { CartPlus } from '../../Icons/CartPlus';
import ProductCounter from './ProductCounter';

interface PDPFooterProps {
  count: number;
  selectedVariantInStock: boolean;
  itemAddedToCart: boolean;
  itemsCountToAdd: number;
  setItemAddedToCart: (state: boolean) => void;
  openCart: () => void;
  addToCart: () => void;
  increaseCount: () => void;
  decreaseCount: () => void;
  close: () => void;
}

function PDPFooter({
  count,
  selectedVariantInStock,
  itemAddedToCart,
  itemsCountToAdd,
  setItemAddedToCart,
  openCart,
  addToCart,
  increaseCount,
  decreaseCount,
  close,
}: PDPFooterProps) {
  return (
    <DrawerFooter
      p={['20px', '20px', '20px', '30px', '30px']}
      width={['100%']}
      border-top="1px solid #FFFFFF4D"
      w="100%"
    >
      {itemAddedToCart ? (
        <Box
          width={['100%']}
          display="flex"
          justifyContent="center"
          alignItems="center"
          flexDir="column"
          padding="0px 24px"
        >
          <Text
            fontFamily="Montserrat"
            fontWeight="700"
            fontSize={['18px', '18px']}
            lineHeight={['24px', '24px']}
            letterSpacing="-0.02em"
            color="white"
            textAlign="left"
            mb="8"
          >
            {itemsCountToAdd > 1 ? 'Items' : 'Item'} added to your cart
          </Text>

          <Button
            variant="solid"
            color="white"
            padding={['16px 32px']}
            borderRadius="40px"
            border="1px solid #FFFFFF4D"
            fontSize={['18px', '18px']}
            fontWeight="700"
            fontFamily="Montserrat"
            cursor="pointer"
            pointerEvents="auto"
            w="100%"
            h="44px"
            mb="3"
            bg="rgba(0, 0, 0, 0.1)"
            _hover={{ bg: 'rgba(0, 0, 0, 0.3)' }}
            onClick={() => {
              setItemAddedToCart(false);
              openCart();
            }}
          >
            View Cart
          </Button>
          <Button
            variant="solid"
            color="white"
            borderRadius="40px"
            bg="rgba(0, 0, 0, 0.1)"
            _hover={{ bg: 'rgba(0, 0, 0, 0.3)' }}
            border="1px solid #FFFFFF99"
            fontSize={['18px', '18px']}
            fontWeight="700"
            fontFamily="Montserrat"
            cursor="pointer"
            pointerEvents="auto"
            w="100%"
            h="44px"
            mt="0"
            onClick={() => {
              setItemAddedToCart(false);
              close();
            }}
          >
            Continue Shopping
          </Button>
        </Box>
      ) : (
        <Box width={['100%']} display="flex" gap={[4]}>
          <ProductCounter
            count={count}
            available={selectedVariantInStock}
            onDecrease={decreaseCount}
            onIncrease={increaseCount}
          />
          <Button
            leftIcon={<CartPlus boxSize={['24px']} />}
            variant="solid"
            color="white"
            padding={['16px 32px']}
            borderRadius="40px"
            bg="rgba(0, 0, 0, 0.1)"
            _hover={{ bg: 'rgba(0, 0, 0, 0.3)' }}
            border="1px solid #FFFFFF4D"
            fontSize={['18px', '18px']}
            fontWeight="700"
            fontFamily="Montserrat"
            cursor="pointer"
            pointerEvents="auto"
            w={['60%', '60%', '70%']}
            h="44px"
            onClick={addToCart}
            isDisabled={!selectedVariantInStock || count === 0}
          >
            Add to cart
          </Button>
        </Box>
      )}
    </DrawerFooter>
  );
}

export default PDPFooter;
