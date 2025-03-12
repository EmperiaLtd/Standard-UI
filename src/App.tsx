// Components
import { ChakraProvider, Spinner } from '@chakra-ui/react';
import Overlay from './components/Overlay';
import WelcomeScreen from './components/WelcomeScreen';
import InfoDrawer from './components/Info/InfoDrawer';
import Instructions from './components/Instructions';
import ProductDrawer from './components/ProductDrawer';
import { CustomTheme } from './theme';

// Styles
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

// Library
import { useEffect, useState } from 'react';
import { fallbackData } from './fallbackData';
import {
  InstructionsState,
  WelcomeState,
  InfoState,
  OverlayState,
  WelcomeData,
  InstructionsData,
  InfoData,
  ProductState,
  OverlayElementObject,
  CartItemProps,
  RoomItem,
  MediaData,
  IframeData,
  aRModels,
  ProductData,
} from './interfaces';
import React from 'react';
import IframeDrawer from './components/Modals/IframeDrawer';
import MediaDrawer from './components/Modals/MediaDrawer';
import ArDrawer from './components/Modals/ArDrawer';

const App = () => {
  const [activeLang, setActiveLang] = useState('en');
  const [activeScene, setActiveScene] = useState('');
  const [activeSound, setActiveSound] = useState('Sound 1');
  const [productDrawerLoading, setProductDrawerLoading] = useState(false);
  const [highlightImage, setHighLightImage] = useState('');
  const [openEdit, setOpenEdit] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [activeId, setActiveId] = useState<number | string>('');

  const [iframeDrawerData, setIframeDrawerData] = useState<IframeData>({
    id: '',
    iFrameModel: {
      url: {
        name: '',
        value: '',
        type: 'url',
      },
    },
    active: false,
  });
  const [mediaDrawerData, setMediaDrawerData] = useState<MediaData>({
    data: {
      id: '',
      mediaModel: {
        mediaURLs: {
          name: '',
          value: [],
          type: '',
        },
      },
    },
    active: false,
  });

  const [arData, setArData] = useState<aRModels>({
    active: false,
    id: '',
    arModel: {
      meshURL: {
        name: '',
        value: '',
        type: '',
      },
    },
  });

  const [productDrawerData, setProductDrawerData] = useState<
    | ProductState
    | {
        id: string;
        data: ProductData | null;
        active: boolean;
      }
  >({
    id: '',
    data: null,
    active: false,
  });
  const [instructionsData, setInstructionsData] = useState<InstructionsState>({
    data: {
      skip: {
        name: 'skip',
        type: 'string',
        value: 'Skip',
      },
      content: {
        name: 'content',
        type: 'stringArray',
        value: [],
      },
    },
    active: false,
  });
  const [welcomeData, setWelcomeData] = useState<WelcomeState>({
    data: {
      collectionImage: {
        name: 'collectionImage',
        type: 'url',
        value: '',
      },
      collectionTitle: {
        name: 'collectionTitle',
        type: 'string',
        value: '',
      },
      jumboTitle: {
        name: 'jumboTitle',
        type: 'string',
        value: '',
      },
      tagline: {
        name: 'tagline',
        type: 'string',
        value: '',
      },
      enterCTA: {
        name: 'enterCTA',
        type: 'string',
        value: '',
      },
    },
    active: false,
  });
  const [infoData, setInfoData] = useState<InfoState>({
    id: '',
    data: null,
    active: false,
  });
  const [overlayData, setOverlayData] = useState<OverlayState>({
    data: {},
    active: false,
  });
  const [productIdTrail, setProductIdTrail] = useState<string[]>([]);
  const [cartActive, setCartActive] = useState<boolean>(false);
  const [cartItems, setCartItems] = useState<CartItemProps[]>([]);

  const eventMap = {
    uiReady: () => onUIReady(),
    openWelcome: () => openWelcomeModal(),
    openInstructions: () => openInstructionsModal(),
    OpenInfo: (infoModalId: string) => openInfoModal(infoModalId),
    updateLanguage: () => updateLanguage(),
    OpenPDP: (productVariantId: string) => openProductModal(productVariantId),
    OpenCustomModel: (customModelId: string) => {
      console.log(customModelId);
    },
    OpenIframe: (iframeId: string) => openIframeModal(iframeId),
    OpenMedia: (mediaId: string) => openMediaModal(mediaId),
    OpenAR: (arId: string) => openARId(arId),
  };

  const onUIReady = () => {
    const welcomeData: WelcomeData = fallbackData.data.ui.uiConfig['welcome'];
    const instructionsData: InstructionsData = fallbackData.data.ui.uiConfig['instructions'];
    const overlayData: OverlayElementObject =
      window.emperia?.data.ui.uiConfig['overlay'] || fallbackData.data.ui.uiConfig['overlay'];
    const newWelcome: WelcomeData = window.emperia?.data.ui.uiConfig['welcome'];
    const newInstructions: InstructionsData = window.emperia?.data.ui.uiConfig['instructions'];

    // Checking each value that was passed, and making sure it's not empty.
    // Can be prettier, but want to keep it explicit for the moment.

    //Welcome fields validation.
    if (newWelcome !== undefined) {
      if (newWelcome.collectionImage.value == '') {
        console.warn('Collection Image appears to be empty. Using default value.');
      } else welcomeData.collectionImage = newWelcome.collectionImage;
      if (newWelcome.collectionTitle.value == '') {
        console.warn('Collection Title appears to be empty. Using default value.');
      } else welcomeData.collectionTitle = newWelcome.collectionTitle;
      if (newWelcome.enterCTA.value == '') {
        console.warn('Enter CTA appears to be empty. Using default value.');
      } else welcomeData.enterCTA = newWelcome.enterCTA;
      if (newWelcome.jumboTitle.value == '') {
        console.warn('Jumbo appears to be empty. Using default value.');
      } else welcomeData.jumboTitle = newWelcome.jumboTitle;
      if (newWelcome.tagline.value == '') {
        console.warn('Tagline to be empty. Using default value.');
      } else welcomeData.tagline = newWelcome.tagline;
    }

    //Instruction fields validation.
    if (newInstructions != undefined) {
      if (newInstructions?.skip?.value == '') {
        console.warn('Skip field appears to be empty. Using default value.');
      } else instructionsData.skip = newInstructions.skip;
      if (
        newInstructions?.content &&
        newInstructions?.content?.value &&
        newInstructions?.content?.value?.some((str) => str === '')
      ) {
        console.warn('The instructions field contains empty lines. Using default values as fallback.');
      } else instructionsData.content = newInstructions.content;
    }

    if (overlayData) {
      delete overlayData.languages; // TODO: undo this later when the languages are ready
      delete overlayData.sounds; // TODO: undo this later when the sounds are ready

      // get the domain from the iframe
      const iframe = document.getElementById('experience-container') as HTMLIFrameElement;
      if (iframe && iframe.src) {
        const url = iframe.src;
        const regex = /\/private\//;
        if (regex.test(url)) {
          delete overlayData.share;
        }
      }
    }
    const room = overlayData?.changeRooms;
    if (room && room?.content) {
      const roomPPt = room.content as RoomItem;
      setActiveScene(roomPPt.value[0].scene || '');
    }
    setWelcomeData({ data: welcomeData, active: true });
    setInstructionsData({
      data: instructionsData,
      active: false,
    });
    setOverlayData({
      data: {
        ...overlayData,
        instructionsOverlay: {
          ...overlayData.instructionsOverlay,
          content: instructionsData.content.value,
        },
      },
      active: false,
    });
  };

  let isModalOpening = false;
  const openProductModal = (productVariantId: string) => {
    setActiveId(productVariantId);
    if (isModalOpening) return;
    setProductDrawerLoading(true);
    isModalOpening = true;
    setTimeout(() => {
      setProductDrawerLoading(false);
      isModalOpening = false;
      const product = window.emperia?.data.ui.pdpModels.find((i) => i.id == productVariantId);
      const productData = product?.pdpModel || fallbackData.data.ui.pdpModels[0].pdpModel;
      if (!productData) return;
      setProductDrawerData({
        data: productData,
        active: true,
        id: product?.id || fallbackData.data.ui.pdpModels[0].id,
      });
      return;
    }, 2000);
  };

  const openInfoModal = (infoModalId: string) => {
    setActiveId(infoModalId);
    const infoData: InfoData =
      window.emperia?.data.ui.infoModels.find((i) => i.id == infoModalId)?.infoModel ||
      fallbackData.data.ui.infoModels[0].infoModel;

    setInfoData({
      id: infoModalId,
      data: { ...infoData },
      active: true,
    });
    setWelcomeData({ ...welcomeData, active: false });
    setInstructionsData({ ...instructionsData, active: false });
  };

  const openWelcomeModal = () => {
    const welcomeData: WelcomeData =
      window.emperia?.data.ui.uiConfig['welcome'] || fallbackData.data.ui.uiConfig['welcome'];
    setWelcomeData({ data: welcomeData, active: true });
  };

  const openInstructionsModal = () => {
    const instructionsData: InstructionsData =
      window.emperia?.data.ui.uiConfig['instructions'] || fallbackData.data.ui.uiConfig['instructions'];
    setInstructionsData({
      data: instructionsData,
      active: true,
    });
  };

  const updateLanguage = () => {
    const updatedWelcomeData: WelcomeData =
      window.emperia?.data.ui.uiConfig['welcome'] || fallbackData.data.ui.uiConfig['welcome'];
    const updatedInstructionsData: InstructionsData =
      window.emperia?.data.ui.uiConfig['instructions'] || fallbackData.data.ui.uiConfig['instructions'];
    const updatedOverlayData: OverlayElementObject =
      window.emperia?.data.ui.uiConfig['overlay'] || fallbackData.data.ui.uiConfig['overlay'];

    setWelcomeData((prevState) => ({ ...prevState, data: updatedWelcomeData }));
    setInstructionsData((prevState) => ({ ...prevState, data: updatedInstructionsData }));
    setOverlayData((prevState) => ({ ...prevState, data: updatedOverlayData }));
  };

  const changeLanguage = (lang: string) => {
    setActiveLang(lang);
    window.emperia &&
      window.emperia.events.dispatchEvent(
        new CustomEvent('fromUserInterface', { detail: { name: 'changeLanguage', locale: lang } }),
      );
    window.dispatchEvent(new CustomEvent('fromUserInterface', { detail: { name: 'changeLanguage', locale: lang } }));
  };

  const openIframeModal = (iframeId: string) => {
    const iframeData =
      window.emperia?.data.ui.iframeModels.find((i) => i.id == iframeId)?.iFrameModel ||
      fallbackData.data.ui.iframeModels[0].iFrameModel;

    if (!iframeData) return;

    setIframeDrawerData({
      id: iframeId,
      iFrameModel: iframeData,
      active: true,
    });
  };

  const openMediaModal = (mediaId: string) => {
    const mediaData =
      window.emperia?.data.ui.mediaModels.find((i) => i.id == mediaId)?.mediaModel ||
      fallbackData.data.ui.mediaModels[0].mediaModel;
    if (!mediaData) return;

    setMediaDrawerData({
      data: {
        id: mediaId,
        mediaModel: {
          mediaURLs: mediaData.mediaURLs,
        },
      },
      active: true,
    });
  };

  const openARId = (arId: string) => {
    const arModels = window.emperia?.data?.ui?.arModels;
    // Ensure arModels is a valid array; otherwise, fallback
    const isValidArray = Array.isArray(arModels) && arModels.length > 0;
    const arDataValid = isValidArray ? arModels.find((i) => i.id == arId)?.arModel : undefined;
    const arData = arDataValid || fallbackData.data.ui.arModels[0]?.arModel;
    if (!arData) return;
    setArData({
      active: true,
      id: arId,
      arModel: arData,
    });
  };

  const closeOtherElements = (activeElement: string) => {
    if (activeElement !== 'product') {
      setProductDrawerData({ ...productDrawerData, active: false });
    }
    if (activeElement !== 'info') {
      setInfoData({ ...infoData, active: false });
    }
    if (activeElement !== 'iframe') {
      setIframeDrawerData({ ...iframeDrawerData, active: false });
    }
    if (activeElement !== 'media') {
      setMediaDrawerData({ ...mediaDrawerData, active: false });
    }
    if (activeElement !== 'ar') {
      setArData({ ...arData, active: false });
    }

    if (activeElement !== 'instructions') {
      setInstructionsData({ ...instructionsData, active: false });
    }
    if (activeElement !== 'welcome') {
      setWelcomeData({ ...welcomeData, active: false });
    }
  };

  useEffect(() => {
    const eventListener = (event: Event) => {
      const interceptedEvent = event as CustomEvent;
      event.stopImmediatePropagation();
      const eventType = interceptedEvent.detail.name as keyof typeof eventMap;
      const eventData = interceptedEvent.detail.data;

      if (eventMap[eventType]) {
        eventMap[eventType](eventData);
      }
    };
    const target = window?.emperia?.events || window;
    target.removeEventListener('fromExperience', eventListener);
    target.addEventListener('fromExperience', eventListener);
    return () => {
      target.removeEventListener('fromExperience', eventListener);
    };
  }, []);

  // useEffect(() => {
  //   const currentOrigin = window.location.origin;
  //   const acceptedOrigins = [
  //     'https://staging.dashboard.emperiavr.com',
  //     'https://dashboard.emperiavr.com',
  //     'http://localhost:3000',
  //     'http://localhost:3001',
  //   ];
  //   if (acceptedOrigins.includes(currentOrigin)) {
  //     setEditable(true);
  //   } else {
  //     setEditable(false);
  //   }
  // }, [window.location]);

  useEffect(() => {
    const currentOrigin = window.location.origin;
    let canEdit = false;
    const acceptedOrigins = [
      'https://staging.dashboard.emperiavr.com',
      'https://dashboard.emperiavr.com',
      'http://localhost:3000',
      'http://localhost:3001',
    ];
    if (acceptedOrigins.includes(currentOrigin)) {
      canEdit = true;
    }

    const eventListener = (event: Event) => {
      const interceptedEvent = event as CustomEvent;
      if (interceptedEvent.detail.name === 'updateUI') {
        setIsEditing(true);
        if (interceptedEvent.detail.type === 'info') {
          const activeTabData = interceptedEvent.detail.data;
          closeOtherElements('info');
          setInfoData({
            active: infoData.active || true,
            id: interceptedEvent.detail.id,
            data: activeTabData,
          });
          if (window.emperia) {
            window.emperia.data.ui.infoModels = window.emperia.data.ui.infoModels.map((info) => {
              if (info.id === interceptedEvent.detail.id) {
                return { id: interceptedEvent.detail.id, infoModel: activeTabData };
              }
              return info;
            });
          }
        }
        if (interceptedEvent.detail.type === 'media') {
          const activeTabData = interceptedEvent.detail.data;
          closeOtherElements('media');
          setMediaDrawerData({
            active: true,
            data: {
              id: interceptedEvent.detail.id,
              mediaModel: activeTabData,
            },
          });
          if (window.emperia) {
            window.emperia.data.ui.mediaModels = window.emperia.data.ui.mediaModels.map((media) => {
              if (media.id === interceptedEvent.detail.id) {
                return { id: interceptedEvent.detail.id, mediaModel: activeTabData };
              }
              return media;
            });
          }
        }
        if (interceptedEvent.detail.type === 'iframe') {
          closeOtherElements('iframe');
          const activeTabData = interceptedEvent.detail.data;
          setIframeDrawerData({
            active: true,
            id: interceptedEvent.detail.id,
            iFrameModel: activeTabData,
          });
          if (window.emperia) {
            window.emperia.data.ui.iframeModels = window.emperia.data.ui.iframeModels.map((iframe) => {
              if (iframe.id === interceptedEvent.detail.id) {
                return { id: interceptedEvent.detail.id, iFrameModel: activeTabData };
              }
              return iframe;
            });
          }
        }
        if (interceptedEvent.detail.type === 'ar') {
          const activeTabData = interceptedEvent.detail.data;
          closeOtherElements('ar');
          setArData({
            active: true,
            id: interceptedEvent.detail.id,
            arModel: activeTabData,
          });
          if (window.emperia) {
            window.emperia.data.ui.arModels = window.emperia.data.ui.arModels.map((ar) => {
              if (ar.id === interceptedEvent.detail.id) {
                return { id: interceptedEvent.detail.id, arModel: activeTabData };
              }
              return ar;
            });
          }
        }
        if (interceptedEvent.detail.type === 'product') {
          closeOtherElements('product');
          const product = interceptedEvent.detail.data;
          setProductDrawerData({
            active: true,
            id: interceptedEvent.detail.id,
            data: product,
          });
          if (window.emperia) {
            window.emperia.data.ui.pdpModels = window.emperia.data.ui.pdpModels.map((pdp) => {
              if (pdp.id === interceptedEvent.detail.id) {
                return { id: interceptedEvent.detail.id, pdpModel: product };
              }
              return pdp;
            });
          }
        }
        if (interceptedEvent.detail.type === 'instructions') {
          window.emperia.data.ui.uiConfig = interceptedEvent.detail.data;
          closeOtherElements('instructions');
          openInstructionsModal();
        }
        if (interceptedEvent.detail.type === 'welcome') {
          window.emperia.data.ui.uiConfig = interceptedEvent.detail.data;
          closeOtherElements('welcome');
          openWelcomeModal();
        }
      }
      if (interceptedEvent.detail.name === 'closeUI') {
        closeOtherElements(interceptedEvent.detail.data);
        setIsEditing(false);
      }
    };

    const target = window?.emperia?.events || window;
    canEdit && target.removeEventListener('fromDashboard', eventListener);
    canEdit && target.addEventListener('fromDashboard', eventListener);
    return () => {
      canEdit && target.removeEventListener('fromDashboard', eventListener);
      setIsEditing(false);
    };
  }, []);

  return (
    <ChakraProvider theme={CustomTheme}>
      <Overlay
        activeScene={activeScene}
        activeLang={activeLang}
        activeSound={activeSound}
        setActiveScene={(scene) => {
          setActiveScene(scene);
          const iframe = document.getElementById('experience-container') as HTMLIFrameElement;
          if (iframe) {
            const iframeWindow = iframe.contentWindow;
            if (iframeWindow) {
              iframeWindow.postMessage(
                {
                  type: 'loadScene',
                  scene,
                },
                '*',
              );
            }
          }
        }}
        setActiveLang={(lang) => changeLanguage(lang)}
        setActiveSound={(sound) => setActiveSound(sound)}
        overlayData={overlayData?.data}
        active={overlayData?.active}
        cartActive={cartActive}
        cartItems={cartItems}
        setCartItems={setCartItems}
        setCartActive={setCartActive}
      />
      <WelcomeScreen
        welcomeData={welcomeData?.data}
        active={welcomeData?.active}
        close={() => {
          setWelcomeData({ ...welcomeData, active: false });
          setOverlayData({ ...overlayData, active: true });
          setInstructionsData({ ...instructionsData, active: true });
        }}
      />
      <Instructions
        instructionsData={instructionsData?.data}
        active={instructionsData?.active}
        close={() => {
          setInstructionsData({ ...instructionsData, active: false });
        }}
      />

      {productDrawerLoading ? (
        <Spinner
          position="fixed"
          top="0px"
          left="0px"
          bottom="0px"
          right="0px"
          margin="auto"
          thickness="4px"
          speed="0.5s"
          color="white"
          size="xl"
        />
      ) : (
        <ProductDrawer
          productDrawerData={productDrawerData.data as ProductData}
          active={productDrawerData.active}
          close={() => {
            setProductDrawerData({ ...productDrawerData, active: false });
            setProductIdTrail([]);
            setProductDrawerData({ ...productDrawerData, active: false });
          }}
          openCart={() => {
            setCartActive(true);
            setProductDrawerData({ ...productDrawerData, active: false });
          }}
          setCartItems={setCartItems}
          openProductModal={openProductModal}
          productIdTrail={productIdTrail}
          productId={productDrawerData?.id as string}
          openEdit={openEdit}
          setOpenEdit={setOpenEdit}
          editable={isEditing}
          activeId={activeId}
        />
      )}

      <InfoDrawer
        infoData={infoData?.data as InfoData}
        active={infoData?.active}
        close={() => {
          setInfoData({ ...infoData, active: false });
        }}
        openEdit={openEdit}
        setOpenEdit={setOpenEdit}
        editable={isEditing}
        activeId={activeId}
      />
      <IframeDrawer
        iframeId={iframeDrawerData?.id}
        active={iframeDrawerData?.active}
        url={iframeDrawerData?.iFrameModel?.url?.value}
        onClose={() => {
          setIframeDrawerData({ ...iframeDrawerData, active: false });
        }}
      />
      <MediaDrawer
        mediaId={mediaDrawerData?.data.id}
        active={mediaDrawerData?.active}
        mediaURLs={mediaDrawerData?.data?.mediaModel?.mediaURLs?.value}
        highlightImage={highlightImage || mediaDrawerData?.data.mediaModel.mediaURLs.value[0]}
        setHighLightImage={setHighLightImage}
        onClose={() =>
          setMediaDrawerData({
            data: {
              id: '',
              mediaModel: {
                mediaURLs: {
                  name: '',
                  value: [],
                  type: '',
                },
              },
            },
            active: false,
          })
        }
      />
      {arData.active && (
        <ArDrawer
          onClose={() =>
            setArData({
              id: '',
              arModel: {
                meshURL: {
                  name: '',
                  value: '',
                  type: '',
                },
              },
              active: false,
            })
          }
          arId={arData.id}
          url={arData.arModel.meshURL.value}
          active={arData.active}
        />
      )}
    </ChakraProvider>
  );
};

export default App;
