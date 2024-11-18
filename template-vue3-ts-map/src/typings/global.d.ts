declare global {
  interface Navigator {
    msSaveOrOpenBlob: (blob: Blob, fileName: string) => void;
    browserLanguage: string;
  }
  interface _AMapSecurityConfig {
    securityJsCode: string;
  }
}

declare type ReqDate = {
  startTime: string;
  endTime: string;
};

declare var AMapUI: any;
