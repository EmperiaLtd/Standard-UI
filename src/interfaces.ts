/* eslint-disable @typescript-eslint/no-explicit-any */
//UI Interfaces
export interface OverlayProps {
  activeScene: string;
  activeLang: string;
  activeSound: string;
  setActiveScene: (scene: string) => void;
  setActiveLang: (lang: string) => void;
  setActiveSound: (sound: string) => void;
  overlayData: OverlayElementObject;
  active: boolean;
  cartActive: boolean;
  cartItems: CartItemProps[];
  setCartItems: (data: CartItemProps[]) => void;
  setCartActive: (state: boolean) => void;
}
export interface TransformedOverlayData {
  height: string[];
  width: string[];
  key: string;
  text: string;
  textAlternate: string;
  content: any;
}

export interface OverlayState {
  data: OverlayElementObject;
  active: boolean;
}

export interface OverlayElementObject {
  [key: string]: OverlayElement;
}

export interface OverlayElement {
  key: string;
  text: string;
  hotspot?: string;
  textAlternate?: string;
  content?: OverlayElementContent;
}

export type OverlayElementContent = string[] | LanguageItem[] | RoomItem[] | SoundItem[];

export interface RoomItem {
  roomName: string;
  description: string;
  scene: string;
}

export interface LanguageItem {
  key: string;
  locale: string;
}

export interface SoundItem {
  name: string;
  fileURL: string;
}

export interface OverlayContent {
  roomName?: string;
  description?: string;
  scene?: string;
  name?: string;
  fileURL?: string;
}
export interface LanguageOptionProps {
  active: boolean;
  name: string;
  transition: string;
  onClick: () => void;
}

export interface OverlayInstructionsProps {
  instructionsData: string[];
}

export interface MenuOptionProps {
  content?: any;
  contentHeight?: any;
  activeMenuOption?: boolean;
  leftIcon: string;
  additionalOptions?: boolean;
  text: string;
  activateMenuOptions: boolean;
  menuOptionHovered: boolean;
  transition: string;
  onMenuOptionClick?: () => void;
  setMenuOptionHovered: (state: boolean) => void;
}

export interface SoundOptionProps {
  active: boolean;
  name: string;
  transition: string;
  onClick: () => void;
}

export interface RoomOptionProps {
  name: string;
  active: boolean;
  description: string;
  transition: string;
  onClick: () => void;
}

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
  buttonTitle: string;
  linkToOpen: string;
  mediaURLs?: string[];
}

export interface ProductDrawerProps {
  productDrawerData: ProductData;
  active: boolean;
  close: () => void;
  productId: string;
  openProductModal: (productId: string) => void;
  productIdTrail: string[];
  setCartItems: (data: CartItemProps[]) => void;
  openCart: () => void;
}

export interface ProductState {
  data: ProductData;
  active: boolean;
}

export interface ImageSliderProps {
  turnTableUrl: string;
  highlightImage: string;
  images: string[];
  setHighLightImage: (image: string) => void;
  product?: ProductData;
}

export interface SizeProps {
  active?: boolean;
  transition: string;
  sizeName: string;
  available: boolean;
  onSizeClick: () => void;
}

export interface SwatchProps {
  active?: boolean;
  transition: string;
  colorName: string;
  available: boolean;
  onSwatchClick: () => void;
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
  base_price: number;
  variants_selection_order: string[];
  variants: ProductVariant[];
  turnTableURL: string;
  retail_price: number;
  imageURLs: string[];
};

export type ProductVariantMedia = {
  url: string;
  bMain: boolean;
  thumbnail_url: string;
  media_type: string;
  mobile_version_url: string;
};

export type ProductVariant = {
  bDefault: boolean;
  variant_id: string;
  variant_sku: string;
  short_description: string;
  long_description: string;
  variants: ProductVariantType[];
  available_stock: number;
  imageURLs: string[];
  media_plugin_integration: MediaPluginIntegrationItem[];
  color_swatch: string;
  momenti_url: MomentiItem;
  three_dimension_model: {
    url: string;
  };
  retail_price: number;
  sale_price: number;
  in_stock: boolean;
  color_swatch_url: string | null;
  media?: ProductVariantMedia[];
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
  imageURLs?: string[];
};

export type MomentiItem = {
  url: string;
  sound_effect: boolean;
};

// SDK Interfaces
export type Emperia = {
  events: EventTarget;
  ui: any;
  data: EventData;
  experience: any;
  misc: MiscEvents;
  ecommerce: ECommerceEvents;
  gamification: GamificationEvents;
  integration: IntegrationEvents;
  init: (initOptions: initOptions) => void;
  initKrpano: (krpano: any) => void;
};

// Data Events
export interface FallBackData {
  data: {
    ui: {
      uiConfig: {
        overlay: OverlayElementObject;
        welcome: WelcomeData;
        instructions: InstructionsData;
      };
      infoModels: InfoModels[];
      pdpModels: PDPModels[];
      iframeModels: IframeModel[];
      mediaModels: MediaModel[];
      arModels: ARModel[];
    };
  };
}

export type EventData = {
  ui: {
    uiConfig: UiConfig;
    pdpModels: PDPModels[];
    infoModels: InfoModels[];
    iframeModels: IframeModel[];
    mediaModels: MediaModel[];
    arModels: ARModel[];
  };
};

export type IframeModel = {
  id: string;
  iFrameModel: {
    uRL: string;
  };
};

export type MediaModel = {
  id: string;
  mediaModel: {
    mediaURLs: string[];
  };
};

export type ARModel = {
  id: string;
  aRModel: {
    meshURL: string;
  };
};

type UiConfig = {
  overlay: OverlayElementObject;
  welcome: WelcomeData;
  instructions: InstructionsData;
};

export type InfoModels = {
  id: string;
  infoModel: InfoData;
};

export type PDPModels = {
  id: string;
  pdpModel: ProductData;
};

// Misc Events
export type MiscEvents = {
  toggleAudio: (toggleAudioAnalytic: ToggleAudioAnalytics) => void;
  ctaClick: (ctaClickAnalytic: CTAClickAnalytics) => void;
  externalLink: (externalLinkAnalytic: ExternalLinkAnalytics) => void;
};

export type ToggleAudioAnalytics = {
  event: 'toggle_audio';
  audio_state: boolean;
};
export interface CTAClickAnalytics {
  event: 'cta_click';
  room_aggregator: string;
  cta_type: string;
  cta_name: string;
  cta_url: string;
  cta_action: string;
}
export interface ExternalLinkAnalytics {
  event: 'external_link';
  room_aggregator: string;
  url: string;
  target: string;
}

//Ecommerce Events
export type ECommerceEvents = {
  postMessage: (eventMessage: PostMessageItem) => void;
  addToCart: (addToCartAnalytic: AddToCartAnalytics) => void;
  viewProduct: (viewProductAnalytic: ViewProductAnalytics) => void;
  purchase: (purchaseAnalytic: PurchaseAnalytics) => void;
};

export type PostMessageItem = {
  product_id: string;
  color_id: string;
  title: string;
  price: string;
  size_mpn: string;
  gtin: string;
};

export type AddToCartAnalytics = {
  event: 'add_to_cart';
  currency: string;
  price: string;
  items: ProductItem[];
};

export type ViewProductAnalytics = {
  event: 'view_item';
  currency: string;
  price: string;
  items: ProductItem[];
};

export interface PurchaseAnalytics {
  event: 'purchase';
  transaction_id: string;
  currency: string;
  value: number;
  items: ProductItem[];
  room_aggregator: string;
}

// Gamification Events
export type GamificationEvents = {
  collectItem: (collectItemAnalytic: CollectItemAnalytics) => void;
};

export type CollectItemAnalytics = {
  event: 'collect_item';
  item_name: string;
  room_aggregator: string;
  progress: string;
};

// Integration Events
export type IntegrationEvents = {
  web3WalletConnect: (web3WalletConnectAnalytic: Web3WalletConnectAnalytics) => void;
  additionalMedia: (additionalMediaAnalytic: AdditionalMediaAnalytics) => void;
};
export interface Web3WalletConnectAnalytics {
  event: 'web3_wallet_connect';
  room_aggregator: string;
  wallet_id: string;
  wallet_successful_connect: boolean;
}

export type AdditionalMediaAnalytics = {
  event: 'open_additional_media';
  room_aggregator: string;
  items?: ProductItem[];
  partnership: string;
  url: string;
};

// KRPano Init Options
export type initOptions = {
  id: string;
  experience_url: string;
  ui_url: string;
  attach_ui: boolean;
  organization_id: string;
  locale: string;
  market: string;
  debug: boolean;
  analytics: boolean;
};

// Analytic Product Item
export type ProductItem = {
  item_id: string;
  item_name: string;
  affiliation: string;
  coupon: string;
  currency: string;
  discount: number;
  index: number; // 0
  item_brand: string;
  item_category: string;
  item_category2: string;
  item_category3: string;
  item_category4: string;
  item_category5: string;
  item_list_id: string;
  item_list_name: string;
  item_variant: string;
  location_id: string;
  price: number;
  quantity: number;
};

export interface ArViewerProps {
  pId: string;
  active: boolean;
  close: () => void;
}
export interface SelectedVariantTypeState {
  [key: number]: { index: number; type: string; value: string; name?: string };
}
export interface VariantItemProps {
  active?: boolean;
  transition: string;
  name: string;
  available: boolean;
  onClick: () => void;
}

export interface CounterProps {
  count: number;
  available?: boolean;
  onIncrease: () => void;
  onDecrease: () => void;
}
export interface CartItemProps {
  id: string;
  name: string;
  imageSrc: string;
  price: number;
  quantity: number;
  brand?: string;
  onItemRemove?: () => void;
  updateCart?: (id: string, newQuantity: number) => void;
  [key: string]: unknown;
}

export interface CommonProps {
  active: boolean;
  close: () => void;
}

export interface IframeData {
  data: {
    id: string;
    url: string;
  };
  active: boolean;
}

export interface MediaData {
  data: {
    id: string;
    mediaModel: {
      mediaURLs: string[];
    };
  };
  active: boolean;
}

export interface aRModels {
  data: {
    id: string;
    aRModel: {
      meshURL: string;
    };
  };
  active: boolean;
}
