//Overlay
export interface OverlayProps {
  overlayData: OverlayElement[];
  active: boolean;
}
export interface TransformedOverlayData {
  height: string[];
  width: string[];
  key: string;
  text: string;
  textAlternate: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  content: any;
}
export interface OverlayState {
  data: OverlayElement[];
  active: boolean;
}
export interface OverlayElement {
  key: string;
  text: string;
  textAlternate?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  content?: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

//Welcome
export interface WelcomeProps {
  welcomeData: WelcomeData;
  active: boolean;
  close: () => void;
}
export interface WelcomeState {
  data: WelcomeData;
  active: boolean;
}
export interface WelcomeData {
  collectionImage: string;
  collectionTitle: string;
  jumboTitle: string;
  tagline: string;
  enterCTA: string;
}

// Instructions
export interface InstructionsProps {
  instructionsData: InstructionsData;
  active: boolean;
  close: () => void;
}

export interface InstructionsState {
  data: InstructionsData;
  active: boolean;
}

export interface InstructionsData {
  skip: string;
  content: string[];
}

//Info Modal
export interface InfoModalProps {
  infoData: InfoData;
  active: boolean;
  close: () => void;
}

export interface InfoDrawerProps {
  infoData: InfoData;
  active: boolean;
  close: () => void;
}

export interface InfoState {
  data: InfoData;
  active: boolean;
}

export interface InfoData {
  image: string;
  title: string;
  subtitle: string;
  description: string;
  moreCTA: string;
}

// PDP
export interface ProductDrawerProps {
  active: boolean;
  close: () => void;
}

export interface ColorItem {
  id: number | string;
  name: string;
  available: boolean;
}

export interface SizeItem {
  id: number | string;
  name: string;
  available: boolean;
}

//UI Ready
export interface UIReadyData {
  welcome: WelcomeData;
  instructions: InstructionsData;
  overlay: OverlayElement[];
}

export interface SoundItem {
  name: string;
  fileURL: string;
}

export interface RoomItem {
  roomName: string;
  description: string;
  sceneToGo: string;
}
