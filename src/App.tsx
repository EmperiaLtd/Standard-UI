// Components
import { ChakraProvider, Spinner } from '@chakra-ui/react';
import Overlay from './components/Overlay';
import WelcomeScreen from './components/WelcomeScreen';
import InfoDrawer from './components/InfoDrawer';
import InfoModal from './components/InfoModal';
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
  ProductData,
  OverlayElementObject,
} from './interfaces';
import React from 'react';

const App = () => {
  const [activeScene, setActiveScene] = useState('room_1');
  const [activeLang, setActiveLang] = useState('en');
  const [activeSound, setActiveSound] = useState('Sound 1');
  const [productDrawerLoading, setProductDrawerLoading] = useState(false);
  const [productDrawerData, setProductDrawerData] = useState<ProductState>({
    data: {
      parent_id: '',
      parent_sku: '',
      market: '',
      title: '',
      short_description: '',
      long_description: '',
      category: '',
      brand: '',
      collection: '',
      currency: '',
      gender: '',
      age_group: '',
      default_url: '',
      tags: '',
      base_price: '',
      variants_selection_order: [],
      variants: [],
    },
    active: false,
  });
  const [instructionsData, setInstructionsData] = useState<InstructionsState>({
    data: {
      skip: '',
      content: [],
    },
    active: false,
  });
  const [welcomeData, setWelcomeData] = useState<WelcomeState>({
    data: {
      collectionImage: '',
      collectionTitle: '',
      jumboTitle: '',
      tagline: '',
      enterCTA: '',
    },
    active: false,
  });
  const [infoFloatingData, setInfoFloatingData] = useState<InfoState>({
    data: {
      image: '',
      title: '',
      subtitle: '',
      description: '',
      moreCTA: '',
    },
    active: false,
  });
  const [infoData, setInfoData] = useState<InfoState>({
    data: {
      image: '',
      title: '',
      subtitle: '',
      description: '',
      moreCTA: '',
    },
    active: false,
  });
  const [overlayData, setOverlayData] = useState<OverlayState>({
    data: {},
    active: false,
  });

  const eventMap = {
    uiReady: () => onUIReady(),
    openWelcome: () => openWelcomeModal(),
    openInstructions: () => openInstructionsModal(),
    openProduct: (productVariantId: string) => openProductModal(productVariantId),
    openInfo: (infoModalId: string) => openInfoModal(infoModalId),
    updateLanguage: () => updateLanguage(),
  };

  const onUIReady = () => {
    console.log('on UI Ready');
    const welcomeData: WelcomeData =
      window.emperia?.data.ui.uiConfig['welcome'] || fallbackData.data.ui.uiConfig['welcome'];
    const instructionsData: InstructionsData =
      window.emperia?.data.ui.uiConfig['instructions'] || fallbackData.data.ui.uiConfig['instructions'];
    const overlayData: OverlayElementObject =
      window.emperia?.data.ui.uiConfig['overlay'] || fallbackData.data.ui.uiConfig['overlay'];

    setWelcomeData({ data: welcomeData, active: true });
    setInstructionsData({
      data: instructionsData,
      active: false,
    });
    setOverlayData({
      data: overlayData,
      active: false,
    });
  };

  const openProductModal = (productVariantId: string) => {
    setProductDrawerLoading(true);

    setTimeout(() => {
      setProductDrawerLoading(false);
      const productData: ProductData =
        window.emperia?.data.ui.pdpModels[productVariantId] || fallbackData.data.ui.pdpModels[productVariantId];
      setProductDrawerData({ data: productData, active: true });
    }, 2000);
  };

  const openInfoModal = (infoModalId: string) => {
    const infoData: InfoData =
      window.emperia?.data.ui.infoModels[infoModalId] || fallbackData.data.ui.infoModels[infoModalId];
    setInfoData({ data: infoData, active: true });
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

    setWelcomeData({ data: updatedWelcomeData, active: welcomeData.active });
    setInstructionsData({
      data: updatedInstructionsData,
      active: instructionsData.active,
    });
    setOverlayData({
      data: updatedOverlayData,
      active: overlayData.active,
    });
  };

  const changeLanguage = (lang: string) => {
    setActiveLang(lang);
    window.emperia &&
      window.emperia.events.dispatchEvent(
        new CustomEvent('fromUserInterface', { detail: { name: 'changeLanguage', locale: lang } }),
      );
    window.dispatchEvent(new CustomEvent('fromUserInterface', { detail: { name: 'changeLanguage', locale: lang } }));
  };

  useEffect(() => {
    const eventListener = (event: Event) => {
      const interceptedEvent = event as CustomEvent;
      console.log('interceptedEvent in UI', interceptedEvent);
      const eventType = interceptedEvent.detail.name as keyof typeof eventMap;
      const eventData = interceptedEvent.detail.data;

      if (eventMap[eventType]) {
        eventMap[eventType](eventData);
      }
    };

    window.emperia?.events?.addEventListener('fromExperience', eventListener);
    window.addEventListener('fromExperience', eventListener);

    return () => {
      window.emperia?.events?.removeEventListener('fromExperience', eventListener);
      window.removeEventListener('fromExperience', eventListener);
    };
  }, []);

  return (
    <ChakraProvider theme={CustomTheme}>
      <Overlay
        activeScene={activeScene}
        activeLang={activeLang}
        activeSound={activeSound}
        setActiveScene={(scene) => setActiveScene(scene)}
        setActiveLang={(lang) => changeLanguage(lang)}
        setActiveSound={(sound) => setActiveSound(sound)}
        overlayData={overlayData?.data}
        active={overlayData?.active}
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
          productDrawerData={productDrawerData.data}
          active={productDrawerData.active}
          close={() => {
            setProductDrawerData({ ...productDrawerData, active: false });
          }}
        />
      )}

      <InfoDrawer
        infoData={infoData?.data}
        active={infoData?.active}
        close={() => {
          setInfoData({ ...infoData, active: false });
        }}
      />
      <InfoModal
        infoData={infoFloatingData?.data}
        active={infoFloatingData?.active}
        close={() => {
          setInfoFloatingData({ ...infoData, active: false });
        }}
      />
    </ChakraProvider>
  );
};

export default App;
