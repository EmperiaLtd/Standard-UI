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
      background="radial-gradient(100% 131.36% at 0% 0%, rgba(158, 158, 158, 0.3) 0%, rgba(158, 158, 158, 0.1) 100%), linear-gradient(0deg, rgba(4, 31, 65, 0.6), rgba(4, 31, 65, 0.6));"
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
            fontFamily="Bogle"
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
            background="radial-gradient(100% 131.41% at 100% 100%, #1A97FF 0%, #004F9A 100%);"
            border="1px solid #FFFFFF4D"
            fontSize={['18px', '18px']}
            fontWeight="700"
            fontFamily="Bogle"
            _hover={{ background: 'radial-gradient(100% 131.41% at 100% 100%, #007CF2 0%, #012D58 100%)' }}
            _active={{ background: 'radial-gradient(100% 131.41% at 100% 100%, #0255A6 0%, #041E40 100%)' }}
            cursor="pointer"
            pointerEvents="auto"
            w="100%"
            h="44px"
            mb="3"
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
            background="radial-gradient(115.63% 520.41% at 0% -15.63%, rgba(255, 255, 255, 0.3) 0%, rgba(255, 255, 255, 0.09) 100%), linear-gradient(0deg, rgba(4, 31, 65, 0.3), rgba(4, 31, 65, 0.3));"
            border="1px solid #FFFFFF99"
            fontSize={['18px', '18px']}
            fontWeight="700"
            fontFamily="Bogle"
            _hover={{ background: '#1A1A1A66' }}
            _active={{ background: '#1A1A1ABF' }}
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
            background="radial-gradient(100% 131.41% at 100% 100%, #1A97FF 0%, #004F9A 100%);"
            border="1px solid #FFFFFF4D"
            fontSize={['18px', '18px']}
            fontWeight="700"
            fontFamily="Bogle"
            _hover={{ background: 'radial-gradient(100% 131.41% at 100% 100%, #007CF2 0%, #012D58 100%)' }}
            _active={{ background: 'radial-gradient(100% 131.41% at 100% 100%, #0255A6 0%, #041E40 100%)' }}
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
