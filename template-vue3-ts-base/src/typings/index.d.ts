// * Menu
declare namespace Menu {
  interface MenuOptions {
    path: string;
    title: string;
    icon?: string;
    isLink?: string;
    close?: boolean;
    children?: MenuOptions[];
  }
}

declare type ReqDate = {
  startTime: string;
  endTime: string;
};

declare var AMapUI: any;
