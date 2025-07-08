//去除谷歌浏览器的scroll、wheel等事件警告
(function () {
  if (typeof EventTarget !== 'undefined') {
    const originalAddEventListener = EventTarget.prototype.addEventListener; // 保存原始的 addEventListener 方法
    EventTarget.prototype.addEventListener = function (type, fn, capture) {
      if (typeof capture !== 'boolean') {
        capture = capture || {};
        capture.passive = false; // 强制将 passive 设置为 false
      }
      originalAddEventListener.call(this, type, fn, capture); // 使用原始的方法添加事件监听器
    };
  }
})();
