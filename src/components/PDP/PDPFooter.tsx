import { DrawerFooter, Button, Box } from '@chakra-ui/react';
import React from 'react';
import { CartPlus } from '../../Icons/CartPlus';
interface PDPFooterProps {
  count: number;
  selectedVariantInStock: boolean;
  itemAddedToCart: boolean;
  setItemAddedToCart: (state: boolean) => void;
  openCart: () => void;
  openLinkInNewTab: () => void;
  increaseCount: () => void;
  decreaseCount: () => void;
  close: () => void;
}

function PDPFooter({ itemAddedToCart, setItemAddedToCart, openCart, openLinkInNewTab, close }: PDPFooterProps) {
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
            w={['100%', '100%', '100%', '100%', '100%']}
            h="44px"
            onClick={openLinkInNewTab}
          >
            View Product
          </Button>
        </Box>
      )}
    </DrawerFooter>
  );
}

export default PDPFooter;
