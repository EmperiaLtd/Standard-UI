// Components
import { Box, ChakraProvider } from "@chakra-ui/react";
import Overlay from "./components/Overlay";
import WelcomeScreen from "./components/WelcomeScreen";
import InfoModal from "./components/InfoModal";
import Instructions from "./components/Instructions";
import PDP from "./components/PDP";
import { CustomTheme } from "./theme/theme";

// Styles
import "./styles/App.css";

// Library
import * as Font from "expo-font";
import { useState } from "react";
import { isTemplateTag } from "./library/devTools";
import { View, Platform } from "react-native";

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

Font.loadAsync({
  Montserrat: require("./assets/fonts/Montserrat/Montserrat-Regular.ttf"),
  "Montserrat-Medium": require("./assets/fonts/Montserrat/Montserrat-Medium.ttf"),
  "Montserrat-Bold": require("./assets/fonts/Montserrat/Montserrat-Bold.ttf"),
});

const App = () => {
  const [pdpActive, setPDPActive] = useState(false);
  const [instructionsActive, setInstructionsActive] = useState(false);
  const [infoModalActive, setInfoModalActive] = useState(false);
  const [welcomeActive, setWelcomeActive] = useState(false);

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
          <PDP
            active={pdpActive}
            close={() => {
              setPDPActive(false);
            }}
          />
          <InfoModal
            active={infoModalActive}
            close={() => {
              setInfoModalActive(false);
            }}
          />
        </Box>
        {/* <ExperienceWebView
          width={dimensions.window.width}
          height={dimensions.window.height}
        /> */}
      </ChakraProvider>
    </View>
  );
};

export default App;
