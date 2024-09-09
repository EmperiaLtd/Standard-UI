import { CartItemProps } from '../../interfaces';

export const postMessageToParent = (message: { type: string; payload: CartItemProps[] }) => {
  window.parent.postMessage(message, '*');
};

export const onIframeCartChange = (newCart: CartItemProps[]) => {
  postMessageToParent({
    type: 'updateCart',
    payload: newCart,
  });
};
