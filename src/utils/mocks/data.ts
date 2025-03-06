import { fallbackData } from '../../fallbackData';
import { Emperia } from '../../interfaces';

export const mockEmperia: Emperia = {
  events: new EventTarget(),
  ui: {},
  data: {
    config: fallbackData.data.config as {
      experience_id: string;
      organization_id: string;
    },
    ui: fallbackData.data.ui,
  },
  experience: {},
  misc: {
    toggleAudio: jest.fn(),
    ctaClick: jest.fn(),
    externalLink: jest.fn(),
  },
  ecommerce: {
    addToCart: jest.fn(),
    postMessage: jest.fn(),
    purchase: jest.fn(),
    viewProduct: jest.fn(),
  },
  gamification: {
    collectItem: jest.fn(),
  },
  integration: {
    additionalMedia: jest.fn(),
    web3WalletConnect: jest.fn(),
  },
  init: jest.fn(),
  initKrpano: jest.fn(),
};
