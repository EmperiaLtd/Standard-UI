//Overlay
interface OverlayProps {
  overlayData: OverlayElement[];
  active: boolean;
}

interface TransformedOverlayData {
  height: string[];
  width: string[];
  key: string;
  text: string;
  textAlternate: string;
  content: any;
}

interface OverlayState {
  data: OverlayElement[];
  active: boolean;
}

interface OverlayElement {
  key: string;
  text: string;
  textAlternate?: string;
  content?: any;
  [key: string]: any;
}

//Welcome
interface WelcomeProps {
  welcomeData: WelcomeData;
  active: boolean;
  close: () => void;
}

interface WelcomeState {
  data: WelcomeData;
  active: boolean;
}

interface WelcomeData {
  collectionImage: string;
  collectionTitle: string;
  jumboTitle: string;
  tagline: string;
  enterCTA: string;
}

// Instructions
interface InstructionsProps {
  instructionsData: InstructionsData;
  active: boolean;
  close: () => void;
}

interface InstructionsState {
  data: InstructionsData;
  active: boolean;
}

interface InstructionsData {
  skip: string;
  content: string[];
}

//Info Modal
interface InfoModalProps {
  infoData: InfoData;
  active: boolean;
  close: () => void;
}

interface InfoState {
  data: InfoData;
  active: boolean;
}

interface InfoData {
  image: string;
  title: string;
  subtitle: string;
  description: string;
  moreCTA: string;
}

// PDP
interface PDPProps {
  active: boolean;
  close: () => void;
}

interface ColorItem {
  id: number | string;
  name: string;
  available: boolean;
}

interface SizeItem {
  id: number | string;
  name: string;
  available: boolean;
}

//UI Ready
interface UIReadyData {
  welcome: WelcomeData;
  instructions: InstructionsData;
  overlay: OverlayElement[];
}

interface SoundItem {
  name: string;
  fileURL: string;
}

interface RoomItem {
  roomName: string;
  description: string;
  sceneToGo: string;
}
