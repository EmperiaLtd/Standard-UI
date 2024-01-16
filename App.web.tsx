// Components
import { ChakraProvider } from '@chakra-ui/react';
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
import { fallbackWelcomeData, fallOverlayData, fallbackInstructionsData, fallbackInfoData } from './fallbackData';
import {
  InstructionsState,
  WelcomeState,
  InfoState,
  OverlayState,
  UIReadyData,
  WelcomeData,
  InstructionsData,
  InfoData,
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
  const [productDrawerActive, setProductDrawerActive] = useState(false);
  const [instructionsData, setInstructionsData] = useState<InstructionsState>({
    data: fallbackInstructionsData,
    active: false,
  });
  const [welcomeData, setWelcomeData] = useState<WelcomeState>({
    data: fallbackWelcomeData,
    active: false,
  });
  const [infoFloatingData, setInfoFloatingData] = useState<InfoState>({
    data: fallbackInfoData,
    active: false,
  });
  const [infoData, setInfoData] = useState<InfoState>({
    data: fallbackInfoData,
    active: false,
  });
  const [overlayData, setOverlayData] = useState<OverlayState>({
    data: fallOverlayData,
    active: false,
  });

  const eventMap = {
    uiReady: (uiReadyData: UIReadyData) => onUIReady(uiReadyData),
    openWelcome: (welcomeData: WelcomeData) => openWelcomeModal(welcomeData),
    openInstructions: (instructionsData: InstructionsData) => openInstructionsModal(instructionsData),
    openProduct: () => openProductModal(),
    openInfo: (infoData: InfoData) => openInfoModal(infoData),
  };

  const onUIReady = (uiReadyData: UIReadyData) => {
    setWelcomeData({
      data: uiReadyData?.welcome || fallbackWelcomeData,
      active: true,
    });
    setOverlayData({
      data: uiReadyData?.overlay || fallOverlayData,
      active: false,
    });
    setInstructionsData({
      data: uiReadyData?.instructions || fallbackInstructionsData,
      active: false,
    });
  };

  const openProductModal = () => {
    setProductDrawerActive(true);
  };

  const openInfoModal = (infoData: InfoData) => {
    setInfoData({ data: infoData || fallbackInfoData, active: true });
  };

  const openWelcomeModal = (welcomeData: WelcomeData) => {
    setWelcomeData({ data: welcomeData || fallbackWelcomeData, active: true });
  };

  const openInstructionsModal = (instructionsData: InstructionsData) => {
    setInstructionsData({
      data: instructionsData || fallbackInstructionsData,
      active: true,
    });
  };

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const eventListener = (interceptedEvent: CustomEvent) => {
      const eventType = interceptedEvent.detail.name as keyof typeof eventMap;
      const eventData = interceptedEvent.detail.data;

      if (eventMap[eventType]) {
        console.log(interceptedEvent);
        eventMap[eventType](eventData);
      }
    };

    window.emperia?.events?.addEventListener('fromExperience', eventListener);
    window.addEventListener('fromExperience', eventListener);

    return () => {
      window.emperia?.event?.removeEventListener('fromExperience', eventListener);
      window.removeEventListener('fromExperience', eventListener);
    };
  }, []);

  return (
    <ChakraProvider theme={CustomTheme}>
      {/* <Image position="absolute" height="100vh" w="100%" src={BG} objectFit="cover" /> */}
      <Overlay overlayData={overlayData?.data} active={overlayData?.active} />
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
      <ProductDrawer
        active={productDrawerActive}
        close={() => {
          setProductDrawerActive(false);
        }}
      />
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
