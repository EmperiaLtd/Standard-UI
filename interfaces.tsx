//Overlay
export interface OverlayProps {
  activeScene: string;
  setActiveScene: (scene) => void;
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

export interface ProductState {
  data: ProductData;
  active: boolean;
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
  productDrawerData: ProductData;
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
  scene: string;
}

export type ProductData = {
  parent_id: string;
  parent_sku: string;
  market: string;
  title: string;
  short_description: string;
  long_description: string;
  category: string;
  brand: string;
  collection: string;
  currency: string;
  gender: string;
  age_group: string;
  default_url: string;
  tags: string;
  base_price: string;
  variants_selection_order: string[];
  variants: ProductVariant[];
};

export type ProductVariant = {
  default: boolean;
  variant_id: string;
  variant_sku: string;
  short_description: string;
  long_description: string;
  variants: ProductVariantType[];
  available_stock: number;
  media: ProductMedia[];
  media_plugin_integration: MediaPluginIntegrationItem[];
  color_swatch: string;
  momenti_url: MomentiItem;
  three_dimension_model: {
    url: string;
  };
  retail_price: string;
  sale_price: string;
};

export interface MediaPluginIntegrationItem {
  plugin_name: string;
  url: string;
  model_id: string;
  sound_effect: boolean;
  options: '';
}

export type ProductVariantType = {
  name?: string;
  variant_type: string;
  value: string;
  price?: string;
  available_stock?: number;
  variant_sku?: string;
};

export type MomentiItem = {
  url: string;
  sound_effect: boolean;
};

export type ProductMedia = {
  url: string;
  main: boolean;
  thumbnail_url: string;
  media_type: string;
  mobile_version_url: string;
};
