/* eslint-disable prettier/prettier */
export { };
declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
