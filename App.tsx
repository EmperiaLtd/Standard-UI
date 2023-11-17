// Components
import GenericModal from './components/genericModal';
import ViewManager from './components/viewManager';
import ExperienceWebView from './components/experienceWebView';
// Library
import * as Font from 'expo-font';
import * as serviceWorkerRegistration from "./src/serviceWorkerRegistration";
import { useState, useEffect, useRef } from 'react';
import { isTemplateTag } from './library/devTools';
import { View, StatusBar, Dimensions, Platform } from 'react-native';

// Dev Mode Web Compatibility
if (Platform.OS === 'web') {
  const docHead = document.querySelector('head') as HTMLElement;
  if (docHead !== undefined && docHead !== null) docHead.style.display = 'hidden';
  if (isTemplateTag.test(document.title) && process.env.REACT_APP_NAME !== undefined)
    document.title = `[DEV] ${process.env.REACT_APP_NAME}`;
};

// Interfaces for Window & Screen Dimensions
const windowDimensions = Dimensions.get('window');
const screenDimensions = Dimensions.get('screen');

const App = () => {
  const [dimensions, setDimensions] = useState<any>({ window: windowDimensions, screen: screenDimensions });
  const [fontsLoaded, setFontsLoaded] = useState<boolean>(false);

  useEffect(() => {
    Font.loadAsync({
      'Metro': require('./assets/fonts/Metropolis-Regular.otf'),
      'Metro-Thin': require('./assets/fonts/Metropolis-Thin.otf'),
      'Metro-Bold': require('./assets/fonts/Metropolis-Bold.otf'),
      'Metro-Light': require('./assets/fonts/Metropolis-Light.otf'),
      'Metro-Italic': require('./assets/fonts/Metropolis-RegularItalic.otf'),
    }).then(() => setFontsLoaded(true))

    const subscription = Dimensions.addEventListener('change', ({window, screen}) => {
      setDimensions({window, screen});
    });

    return () => subscription?.remove();
  }, [ dimensions.window, dimensions.screen ]);

  if (!fontsLoaded) return <></>
  return <View>
    <StatusBar barStyle="light-content" backgroundColor="#202029"/>
    <ExperienceWebView width={dimensions.window.width} height={dimensions.window.height}/>
    <GenericModal width={dimensions.window.width} height={dimensions.window.height}/>
  </View>;
};

export default App;
