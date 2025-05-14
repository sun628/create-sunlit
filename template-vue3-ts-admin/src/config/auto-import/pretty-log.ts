import { isEmpty } from 'lodash-es';

const prettyPrint = (title: string, text: string, color: string) => {
  console.log(
    `%c ${title} %c ${text} %c`,
    `background:${color};border:1px solid ${color}; padding: 1px; border-radius: 2px 0 0 2px; color: #fff;`,
    `border:1px solid ${color}; padding: 1px; border-radius: 0 2px 2px 0; color: ${color};`,
    'background:transparent'
  );
};

const titlePrint = (title: string) => {
  console.log(`%c ${title}`, 'font-size: 20px; font-weight: bold; color: #333;');
};

const tablePrint = (title: string, data: string) => {
  console.groupCollapsed(title);
  console.table(data);
  console.groupEnd();
};

const imagePrint = (title: string, url: string, scale = 1) => {
  const img = new Image();
  img.crossOrigin = 'anonymous';
  img.onload = () => {
    const c = document.createElement('canvas');
    const ctx = c.getContext('2d');
    if (ctx) {
      c.width = img.width;
      c.height = img.height;
      ctx.drawImage(img, 0, 0);
      const dataUri = c.toDataURL('image/png');
      const paddingHeight = Math.floor((img.height * scale) / 2);
      const paddingWidth = Math.floor((img.width * scale) / 2);

      console.log(
        `%c ${title}`,
        `font-size: 1px;
         padding: ${paddingHeight}px ${paddingWidth}px;
         background-image: url(${dataUri});
         background-repeat: no-repeat;
         background-size: ${img.width * scale}px ${img.height * scale}px;
         color: transparent;
        `
      );
    }
  };
  img.src = url;
};

const prettyLog = () => {
  const info = (textOrTitle: string, content = '') => {
    const title = isEmpty(content) ? 'Info' : textOrTitle;
    const text = isEmpty(content) ? textOrTitle : content;
    prettyPrint(title, text, '#909399');
  };

  const error = (textOrTitle: string, content = '') => {
    const title = isEmpty(content) ? 'Error' : textOrTitle;
    const text = isEmpty(content) ? textOrTitle : content;
    prettyPrint(title, text, '#F56C6C');
  };

  const warning = (textOrTitle: string, content = '') => {
    const title = isEmpty(content) ? 'Warning' : textOrTitle;
    const text = isEmpty(content) ? textOrTitle : content;
    prettyPrint(title, text, '#E6A23C');
  };

  const success = (textOrTitle: string, content = '') => {
    const title = isEmpty(content) ? 'Success' : textOrTitle;
    const text = isEmpty(content) ? textOrTitle : content;
    prettyPrint(title, text, '#67C23A');
  };

  const title = (text: string) => {
    titlePrint(text);
  };

  const table = (title: string, data: string) => {
    tablePrint(title, data);
  };

  const image = (title: string, imageUrl: string) => {
    imagePrint(title, imageUrl);
  };

  return {
    info,
    error,
    warning,
    success,
    title,
    table,
    image
  };
};

// 只在开发环境中使用
export const log =
  process.env.MODE === 'development'
    ? prettyLog()
    : {
        info: () => {},
        error: () => {},
        warning: () => {},
        success: () => {},
        title: () => {},
        table: () => {},
        image: () => {}
      };
