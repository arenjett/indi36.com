
declare global {
  interface Window {
    dataLayer: any[];  
  }
  interface Navigator {
    standalone?: boolean;
  }
}

export {};  
