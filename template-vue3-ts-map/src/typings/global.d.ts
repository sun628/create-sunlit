// * global
declare global {
  interface Navigator {
    msSaveOrOpenBlob: (blob: Blob, fileName: string) => void;
    browserLanguage: string;
  }
  interface _AMapSecurityConfig {
    securityJsCode: string;
  }
}

export {};
