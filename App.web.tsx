// Components
import { ChakraProvider, Spinner } from '@chakra-ui/react';
import Overlay from './components/Overlay';
import WelcomeScreen from './components/WelcomeScreen';
import InfoDrawer from './components/InfoDrawer';
import InfoModal from './components/InfoModal';
import Instructions from './components/Instructions';
import ProductDrawer from './components/ProductDrawer';
import { CustomTheme } from './theme/theme';
// import BG from './assets/images/alexander-slattery-LI748t0BK8w-unsplash.jpeg';

// Styles
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './styles/App.css';

// Library
import * as Font from 'expo-font';
import { useEffect, useState } from 'react';
import { isTemplateTag } from './library/devTools';
import { Platform } from 'react-native';
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

// Dev Mode Web Compatibility
if (Platform.OS === 'web') {
  const docHead = document.querySelector('head') as HTMLElement;
  if (docHead !== undefined && docHead !== null) docHead.style.display = 'hidden';
  if (isTemplateTag.test(document.title) && process.env.REACT_APP_NAME !== undefined)
    document.title = `[DEV] ${process.env.REACT_APP_NAME}`;
}

Font.loadAsync({
  Montserrat: require('./assets/fonts/Montserrat/Montserrat-Regular.ttf'),
  'Montserrat-Medium': require('./assets/fonts/Montserrat/Montserrat-Medium.ttf'),
  'Montserrat-Bold': require('./assets/fonts/Montserrat/Montserrat-Bold.ttf'),
});

const App = () => {
  const [activeScene, setActiveScene] = useState('room_1');
  const [activeLang, setActiveLang] = useState('Language 1');
  const [activeSound, setActiveSound] = useState('Sound 1');
  const [productDrawerLoading, setProductDrawerLoading] = useState(false);
  const [productDrawerData, setProductDrawerData] = useState<ProductState>({
    data: null,
    active: false,
  });
  const [instructionsData, setInstructionsData] = useState<InstructionsState>({
    data: null,
    active: false,
  });
  const [welcomeData, setWelcomeData] = useState<WelcomeState>({
    data: null,
    active: false,
  });
  const [infoFloatingData, setInfoFloatingData] = useState<InfoState>({
    data: null,
    active: false,
  });
  const [infoData, setInfoData] = useState<InfoState>({
    data: null,
    active: false,
  });
  const [overlayData, setOverlayData] = useState<OverlayState>({
    data: null,
    active: false,
  });

  const eventMap = {
    uiReady: () => onUIReady(),
    openWelcome: () => openWelcomeModal(),
    openInstructions: () => openInstructionsModal(),
    openProduct: (productVariantId: string) => openProductModal(productVariantId),
    openInfo: (infoModalId: string) => openInfoModal(infoModalId),
  };

  const onUIReady = () => {
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

  useEffect(() => {
    const eventListener = (interceptedEvent: CustomEvent) => {
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
      {/* <Image position="absolute" height="100vh" w="100%" src={BG} objectFit="cover" /> */}
      <Overlay
        activeScene={activeScene}
        activeLang={activeLang}
        activeSound={activeSound}
        setActiveScene={(scene) => setActiveScene(scene)}
        setActiveLang={(lang) => setActiveLang(lang)}
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
