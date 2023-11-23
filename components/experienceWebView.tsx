import { useRef, useEffect } from "react";
import { Platform } from "react-native";
import WebView from "react-native-web-webview";
import * as MobileWebView from "react-native-webview";
import { REACT_APP_ENV, experienceOrg, experienceName } from "env";

// const eventEmitter = new NativeEventEmitter();
const experienceURI =
  REACT_APP_ENV === "Prd"
    ? `https://emperia.digital/${experienceOrg}/${experienceName}/index.html`
    : `https://emperia.digital/preview/${experienceOrg}/${experienceName}/index.html`;

const ExperienceWebView = ({ width, height, style, nativeBlur }: any) => {
  const webView = useRef(null);

  const onMessage = (event: any) => {
    const eventData =
      typeof event.nativeEvent.data === "string"
        ? JSON.parse(event.nativeEvent.data)
        : event.nativeEvent.data;
    const json =
      typeof eventData === "string" ? JSON.parse(eventData) : eventData;
    console.log(json)
    // eventEmitter.emit(json.event, json.detail);
  };

  useEffect(() => {
    if (nativeBlur && Platform.OS !== "web") {
      webView.current.injectJavaScript(`
        var webViewBody = document.querySelector('body');
        webViewBody.style.backgroundColor = '#202029';
        webViewBody.style.filter = 'blur(25px)';
      `);
    } else if (Platform.OS !== "web") {
      webView.current.injectJavaScript(`
        var webViewBody = document.querySelector('body');
        webViewBody.style.backgroundColor = '#202029';
        webViewBody.style.filter = 'blur(0px)';
      `);
    }
  }, [nativeBlur]);

  if (Platform.OS === "web")
    return (
      <WebView
        ref={webView}
        source={{ uri: experienceURI }}
        cacheEnabled={false}
        originWhitelist={["*"]}
        javaScriptEnabled={true}
        onMessage={onMessage}
        style={[{ width: width, height: height }, style]}
      />
    );

  return (
    <MobileWebView.WebView
      ref={webView}
      source={{ uri: experienceURI }}
      cacheEnabled={false}
      originWhitelist={["*"]}
      javaScriptEnabled={true}
      onMessage={onMessage}
      style={[{ width: width, height: height }, style]}
    />
  );
};

export default ExperienceWebView;
