// Components
import { Box, ChakraProvider } from "@chakra-ui/react";
import Overlay from "./components/Overlay";
import WelcomeScreen from "./components/WelcomeScreen";
import InfoModal from "./components/InfoModal";
import Instructions from "./components/Instructions";
import ExperienceWebView from "./components/experienceWebView";
import { CustomTheme } from "./theme/theme";

// Library
import * as Font from "expo-font";
import { useState, useEffect } from "react";
import { isTemplateTag } from "./library/devTools";
import { View, Dimensions, Platform } from "react-native";

// Dev Mode Web Compatibility
if (Platform.OS === "web") {
  const docHead = document.querySelector("head") as HTMLElement;
  if (docHead !== undefined && docHead !== null)
    docHead.style.display = "hidden";
  if (
    isTemplateTag.test(document.title) &&
    process.env.REACT_APP_NAME !== undefined
  )
    document.title = `[DEV] ${process.env.REACT_APP_NAME}`;
}

// Interfaces for Window & Screen Dimensions
const windowDimensions = Dimensions.get("window");
const screenDimensions = Dimensions.get("screen");

const App = () => {
  const [dimensions, setDimensions] = useState<any>({
    window: windowDimensions,
    screen: screenDimensions,
  });
  const [fontsLoaded, setFontsLoaded] = useState<boolean>(false);

  useEffect(() => {
    Font.loadAsync({
      Montserrat: require("./assets/fonts/Montserrat/Montserrat-Regular.ttf"),
      "Montserrat-Medium": require("./assets/fonts/Montserrat/Montserrat-Medium.ttf"),
      "Montserrat-Bold": require("./assets/fonts/Montserrat/Montserrat-Bold.ttf"),
    }).then(() => setFontsLoaded(true));

    const subscription = Dimensions.addEventListener(
      "change",
      ({ window, screen }) => {
        setDimensions({ window, screen });
      }
    );

    return () => subscription?.remove();
  }, [dimensions.window, dimensions.screen]);

  const [instructionsActive, setInstructionsActive] = useState(false);
  const [infoModalActive, setInfoModalActive] = useState(false);
  const [welcomeActive, setWelcomeActive] = useState(false);

  if (!fontsLoaded) return <></>;

  return (
    <View>
      <ChakraProvider theme={CustomTheme}>
        <Box position="absolute">
          <Overlay />
          <WelcomeScreen
            active={welcomeActive}
            close={() => {
              setWelcomeActive(false);
            }}
          />
          <Instructions
            active={instructionsActive}
            close={() => {
              setInstructionsActive(false);
            }}
          />
          <InfoModal
            active={infoModalActive}
            close={() => {
              setInfoModalActive(false);
            }}
          />
        </Box>
        <ExperienceWebView
          width={dimensions.window.width}
          height={dimensions.window.height}
        />
      </ChakraProvider>
    </View>
  );
};

export default App;
