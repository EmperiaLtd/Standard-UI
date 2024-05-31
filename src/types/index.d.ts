import { Emperia } from '../interfaces';

/* eslint-disable prettier/prettier */
export {};
declare global {
  interface Window {
    emperia: Emperia;
    currency: string;
    embedpano: () => void;
    openProductPopUp: (id: string) => void;
    InitiateExperience: () => void;
    openPDP: () => void;
    updateScene: (scene: string) => void;
    GotoScene: (scene: string) => void;
  }
}
