import 'expo/build/Expo.fx';
import * as React from 'react';
import { AppRegistry, Platform } from 'react-native';
import { createRoot } from './createRoot';

export default function registerRootComponent(component) {
  let qualifiedComponent = component;
  if (process.env.NODE_ENV !== 'production') {
    const { withDevTools } = require('./withDevTools');
    qualifiedComponent = withDevTools(component);
  }
  if (Platform.OS !== 'web') {
    AppRegistry.registerComponent('main', () => qualifiedComponent);
  }
  else if (typeof document !== 'undefined') {
    let tag = document.getElementById('emperia-root-container');
    if (!tag) {
      tag = document.getElementById('main');
      if (process.env.NODE_ENV !== 'production') {
        if (tag) {
          console.warn('Mounting the root React component to an HTML element with id "main" is deprecated. Use id "emperia-root-container" instead.');
        }
      }
    }
    if (!tag) {
      throw new Error('Required HTML element with id "root" was not found in the document HTML. This is required for mounting the root React component.');
    }
    const rootTag = createRoot(tag);
    rootTag.render(React.createElement(qualifiedComponent));
  }
};
