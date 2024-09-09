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
      <DrawerContent maxH={height}>
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
          <Close stroke="black" boxSize={[4, 4, 4]} />
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
                  fontFamily="Bogle"
                  fontWeight="700"
                  letterSpacing="-0.02em"
                  textAlign="center"
                >
                  {`Nothing to see here.`}
                </Text>
                <Text
                  fontSize={['20px', '20px', '24px']}
                  fontFamily="Bogle"
                  fontWeight="700"
                  letterSpacing="-0.02em"
                  textAlign="center"
                >
                  {`Let's fix that`}
                </Text>
              </Box>

              <Button
                variant="solid"
                color="white"
                padding={['12px']}
                borderRadius="40px"
                background="radial-gradient(100% 131.41% at 100% 100%, #1A97FF 0%, #004F9A 100%);"
                border="1px solid #FFFFFF4D"
                fontSize="18px"
                fontWeight="700"
                fontFamily="Bogle-Bold"
                _hover={{ background: 'radial-gradient(100% 131.41% at 100% 100%, #007CF2 0%, #012D58 100%)' }}
                _active={{ background: 'radial-gradient(100% 131.41% at 100% 100%, #0255A6 0%, #041E40 100%)' }}
                _focus={{ background: 'radial-gradient(100% 131.41% at 100% 100%, #0255A6 0%, #041E40 100%)' }}
                cursor="pointer"
                minW="240px"
                height="50px"
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
                fontFamily="Bogle"
                fontWeight="700"
                letterSpacing="-0.02em"
                textAlign="left"
                mt="1"
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
          <DrawerFooter p={['16px 20px 32px 20px']} pt={'0px'} bg="#E6F1FC" display="flex" flexDir="column" gap="3">
            <Box display="flex" justifyContent="space-between" w="100%" minH="40px">
              <Text fontSize={['18px', '18px']} fontFamily="Bogle" fontWeight="700" letterSpacing="-0.02em">
                Subtotal
              </Text>
              <Text fontSize={['18px', '18px']} fontFamily="Bogle" fontWeight="700" letterSpacing="-0.02em">
                ${cartSubtotal.toFixed(2)}
              </Text>
            </Box>
            <Button
              variant="solid"
              color="white"
              padding={['16px 32px']}
              borderRadius="40px"
              background="radial-gradient(100% 131.41% at 100% 100%, #1A97FF 0%, #004F9A 100%);"
              border="1px solid #FFFFFF4D"
              fontSize="14px"
              fontWeight="700"
              fontFamily="Bogle-Bold"
              _hover={{ background: 'radial-gradient(100% 131.41% at 100% 100%, #007CF2 0%, #012D58 100%)' }}
              _active={{ background: 'radial-gradient(100% 131.41% at 100% 100%, #0255A6 0%, #041E40 100%)' }}
              _focus={{ background: 'radial-gradient(100% 131.41% at 100% 100%, #0255A6 0%, #041E40 100%)' }}
              transition="all 0.2s ease-in-out"
              cursor="pointer"
              w="100%"
              h="45px"
              onClick={checkout}
            >
              <Text
                fontSize={['18px', '18px']}
                lineHeight={['24px', '24px']}
                fontFamily="Bogle"
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
