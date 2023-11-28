/// <reference types="react-scripts" />

declare module '*.svg';
declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';

declare module '*.mp4' {
  const src: string;
  export default src;
};

declare module '*.mp3' {
  const src: string;
  export default src;
};

declare module '*.webm' {
  const src: string;
  export default src;
};

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

export { };
