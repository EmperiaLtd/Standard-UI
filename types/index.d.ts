export { };
declare global {
  interface Window {
    emperia: any;
    currency: string;
    embedpano: () => void;
    openProductPopUp: (id: string) => void;
    InitiateExperience: () => void;
    openPDP: () => void;
    updateScene: (scene: string) => void;
    GotoScene: (scene: string) => void;
  }

}
