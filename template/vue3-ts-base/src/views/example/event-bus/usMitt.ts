import mitt, { Emitter } from 'mitt';

// 定义类型别名，因全局使用并且需要自定义事件名称，所以使用索引签名定义内容
type Events = {
  // 事件名称: 事件数据类型
  'some-event': { id: number };
  // [propName: string]: any;
};

// 提供泛型参数让 emitter 能自动推断参数类型
export const emitter: Emitter<Events> = mitt<Events>();
