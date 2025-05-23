import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerOverlay,
  Image,
  Text,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { Close } from '../../Icons/Close';
import Emptycart from '../../assets/images/empty cart.png';
import { CartItemProps, CommonProps } from '../../interfaces';
import CartItem from './CartItem';
import useWindowDimensions from '../../utils/hooks/useWindowDimensions';

interface CartDrawerProps extends CommonProps {
  data: CartItemProps[];
  setCartItems: (data: CartItemProps[]) => void;
}

function CartDrawer({ data, active, close, setCartItems }: CartDrawerProps) {
  const { height } = useWindowDimensions();
  const [cartSubtotal, setCartSubtotal] = useState<number>(0);

  const onItemRemove = (id: string) => {
    const cart = localStorage.getItem('ct_cart');
    if (cart !== null) {
      const _newCart = JSON.parse(cart).filter((rec: CartItemProps) => rec.id !== id);
      localStorage.setItem('ct_cart', JSON.stringify(_newCart));
      setCartItems(_newCart);
      onIframeCartChange(_newCart);
    }
  };

  const postMessageToParent = (message: { type: string; payload: CartItemProps[] }) => {
    window.parent.postMessage(message, '*');
  };

  const onIframeCartChange = (newCart: CartItemProps[]) => {
    postMessageToParent({
      type: 'updateCart',
      payload: newCart,
    });
  };

  const updateCart = (id: string, newQuantity: number) => {
    const existingCart = localStorage.getItem('ct_cart') || '';

    if (existingCart?.length > 0 && existingCart) {
      const cart = JSON.parse(existingCart);
      const newCart = cart.map((cartItem: CartItemProps) =>
        cartItem.id === id ? { ...cartItem, quantity: newQuantity } : cartItem,
      );
      onIframeCartChange(newCart);
      setCartItems(newCart);
      localStorage.setItem('wm_cart', JSON.stringify(newCart));
    }
  };

  const checkout = () => {
    // TODO: Add checkout logic
  };

  useEffect(() => {
    if (data && data.length > 0) {
      const subTotal = data.reduce((total, item) => total + Number((item.price * item.quantity).toFixed(2)), 0);
      setCartSubtotal(subTotal);
    }
  }, [data]);

  return (
    <Drawer isOpen={active} placement="right" onClose={close} size={['full', 'sm', 'sm', 'sm', 'sm']} autoFocus={false}>
      <DrawerOverlay />
      <DrawerContent
        maxH={height}
        background={'linear-gradient(0deg, rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.1) 100%), rgba(184, 184, 184, 0.2)'}
        backdropFilter="blur(12px)"
      >
        <Box
          boxSize={8}
          display="flex"
          justifyContent="center"
          alignItems="center"
          zIndex="100"
          position="absolute"
          top="10px"
          right="10px"
          cursor="pointer"
          onClick={close}
        >
          <Close stroke="white" boxSize={[4, 4, 4]} />
        </Box>
        <DrawerBody p={['20px', '20px', '40px']}>
          {data.length == 0 ? (
            <Box
              w="100%"
              h="100%"
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              gap={10}
            >
              <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center">
                <Image src={Emptycart} width={['100px', '100px', '150px']} />
                <Text
                  fontSize={['20px', '20px', '24px']}
                  fontFamily="Montserrat"
                  fontWeight="700"
                  letterSpacing="-0.02em"
                  textAlign="center"
                  color="white"
                >
                  {`Nothing to see here.`}
                </Text>
                <Text
                  fontSize={['20px', '20px', '24px']}
                  fontFamily="Montserrat"
                  fontWeight="700"
                  letterSpacing="-0.02em"
                  textAlign="center"
                  color="white"
                >
                  {`Let's fix that`}
                </Text>
              </Box>

              <Button
                variant="solid"
                color="white"
                padding={['12px']}
                borderRadius="40px"
                border="1px solid #FFFFFF4D"
                fontSize={['18px', '18px']}
                fontWeight="700"
                fontFamily="Montserrat"
                bg="rgba(0, 0, 0, 0.1)"
                _hover={{ bg: 'rgba(0, 0, 0, 0.3)' }}
                cursor="pointer"
                minW="240px"
                h="44px"
                pointerEvents="auto"
                onClick={close}
              >
                Continue shopping
              </Button>
            </Box>
          ) : (
            <>
              <Text
                fontSize={['32px', '32px']}
                lineHeight={['42px', '42px']}
                fontFamily="Montserrat"
                fontWeight="700"
                letterSpacing="-0.02em"
                textAlign="left"
                mt="1"
                color="white"
              >
                Your cart
              </Text>

              <Box w="100%" h="auto" overflowY="auto" overflowX="hidden">
                {data.map((item) => (
                  <CartItem
                    {...item}
                    key={`${item.id}`}
                    id={item.id}
                    name={item.name}
                    imageSrc={item.imageSrc}
                    price={item.price}
                    quantity={item.quantity}
                    onItemRemove={() => onItemRemove(item.id)}
                    updateCart={updateCart}
                  />
                ))}
              </Box>
            </>
          )}
        </DrawerBody>
        {data.length > 0 && (
          <DrawerFooter p={['16px 20px 32px 20px']} pt={'0px'} display="flex" flexDir="column" gap="3">
            <Box display="flex" justifyContent="space-between" w="100%" minH="40px" color={'white'}>
              <Text fontSize={['18px', '18px']} fontFamily="Montserrat" fontWeight="700" letterSpacing="-0.02em">
                Subtotal
              </Text>
              <Text fontSize={['18px', '18px']} fontFamily="Montserrat" fontWeight="700" letterSpacing="-0.02em">
                ${cartSubtotal.toFixed(2)}
              </Text>
            </Box>
            <Button
              variant="solid"
              color="white"
              padding={['16px 32px']}
              borderRadius="40px"
              border="1px solid #FFFFFF4D"
              fontSize="14px"
              fontWeight="700"
              fontFamily="Montserrat-Bold"
              transition="all 0.2s ease-in-out"
              cursor="pointer"
              w="100%"
              h="45px"
              onClick={checkout}
              bg="rgba(0, 0, 0, 0.1)"
              _hover={{ bg: 'rgba(0, 0, 0, 0.3)' }}
            >
              <Text
                fontSize={['18px', '18px']}
                lineHeight={['24px', '24px']}
                fontFamily="Montserrat"
                fontWeight="700"
                letterSpacing="-0.02em"
              >
                Checkout
              </Text>
            </Button>
          </DrawerFooter>
        )}
      </DrawerContent>
    </Drawer>
  );
}

export default CartDrawer;
