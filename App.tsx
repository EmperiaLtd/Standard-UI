// Library
import * as Font from 'expo-font';
import { useState, useEffect, useRef } from 'react';
import { isTemplateTag } from './shared/library/devTools';
import * as serviceWorkerRegistration from "./src/serviceWorkerRegistration";
import {
  StatusBar,
  Dimensions,
  Platform,
} from 'react-native';

/* Interfaces for Window & Screen Dimensions */
const windowDimensions = Dimensions.get('window');
const screenDimensions = Dimensions.get('screen');

const App = () => {
  const [dimensions, setDimensions] = useState<any>({
    window: windowDimensions,
    view: {
      width: windowDimensions.width,
      height:
        Platform.OS === 'ios' ? windowDimensions.height - 72 :
        Platform.OS === 'android' ? windowDimensions.height - 32:
        windowDimensions.height - 52
    },
    screen: screenDimensions,
  });
  const [fontsLoaded, setFontsLoaded] = useState<boolean>(false);

  useEffect(() => {
    Font.loadAsync({
      'Metro': require('./shared/assets/fonts/Metropolis-Regular.otf'),
      'Metro-Thin': require('./shared/assets/fonts/Metropolis-Thin.otf'),
      'Metro-Bold': require('./shared/assets/fonts/Metropolis-Bold.otf'),
      'Metro-Light': require('./shared/assets/fonts/Metropolis-Light.otf'),
      'Metro-Italic': require('./shared/assets/fonts/Metropolis-RegularItalic.otf'),
    }).then(() => setFontsLoaded(true))

    const subscription = Dimensions.addEventListener('change', ({window, screen}) => {
      setDimensions({
        window,
        view: {
          width: window.width,
          height: Platform.OS === 'ios' ? window.height - 72 : window.height - 52
        },
        screen
      });
    });

    return () => subscription?.remove();
  }, [ dimensions.window, dimensions.screen ]);

  if (!fontsLoaded) return <></>
  return <>
    <StatusBar barStyle="light-content" backgroundColor="#202029"/>
  </>;
};

/* Dev Mode Web Compatibility */
if (!isNative) {
  const docHead = document.querySelector('head') as HTMLElement;
  if (docHead !== undefined && docHead !== null) docHead.style.display = 'hidden';
  if (isTemplateTag.test(document.title) && process.env.REACT_APP_NAME !== undefined)
    document.title = `[DEV] ${process.env.REACT_APP_NAME}`;
};

export default App;
