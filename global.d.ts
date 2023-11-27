declare module '*.svg';
declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';

export { };

declare global {
  interface Window {
    embedpano: () => void;
    openProductPopUp: (id: string) => void;
    InitiateExperience: () => void;
    openPDP: () => void;
    updateScene: (scene: string) => void;
    GotoScene: (scene: string) => void;
  }
}
