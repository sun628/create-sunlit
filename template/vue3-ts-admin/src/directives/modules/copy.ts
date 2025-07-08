// noinspection JSDeprecatedSymbols

/**
 * @directive v-copy
 * @description 复制某个值至剪贴板
 * @param {string | number} value - 需要复制的值
 * @example  <div v-copy="value"></div>
 */
import type { Directive, DirectiveBinding } from 'vue';

interface ElType extends HTMLElement {
  copyData: string | number;
  __handleClick__: (event: MouseEvent) => void;
}
const copy: Directive = {
  mounted(el: ElType, binding: DirectiveBinding) {
    el.copyData = binding.value;
    el.addEventListener('click', handleClick);
  },
  updated(el: ElType, binding: DirectiveBinding) {
    el.copyData = binding.value;
  },
  beforeUnmount(el: ElType) {
    el.removeEventListener('click', el.__handleClick__);
  }
};

function handleClick(this: ElType) {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(this.copyData.toLocaleString());
  } else {
    const input = document.createElement('input');
    input.value = this.copyData.toLocaleString();
    document.body.appendChild(input);
    input.select();
    document.execCommand('Copy');
    document.body.removeChild(input);
  }
}

export default copy;
