import Constants, { ExecutionEnvironment } from 'expo-constants';
import * as React from 'react';
import { Platform } from 'react-native';
import DevLoadingView from 'expo/build/environment/DevLoadingView';

export function withDevTools(AppRootComponent) {
  const useOptionalKeepAwake = (() => {
    if (Platform.OS !== 'web') {
      try {
        const { useKeepAwake, ExpoKeepAwakeTag } = require('expo-keep-awake');
        return () => useKeepAwake(ExpoKeepAwakeTag, { suppressDeactivateWarnings: true });
      }
      catch { }
    }
    return () => { };
  })();
  const shouldUseExpoFastRefreshView = Platform.select({
    web: true,
    ios: Constants.executionEnvironment !== ExecutionEnvironment.Bare,
    default: false,
  });
  function WithDevTools(props) {
    useOptionalKeepAwake();
    if (shouldUseExpoFastRefreshView) {
      return (React.createElement(React.Fragment, null,
        React.createElement(AppRootComponent, { ...props }),
        React.createElement(DevLoadingView, null)));
    }
    return React.createElement(AppRootComponent, { ...props });
  }
  const name = AppRootComponent.displayName || AppRootComponent.name || 'Anonymous';
  WithDevTools.displayName = `withDevTools(${name})`;
  return WithDevTools;
}
