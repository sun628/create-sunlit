import { reactive, ref, Ref } from 'vue';
import { cloneDeep } from 'lodash-es';
/**
 * @description  重置表单数据
 * @example
 * const [formState, resetForm] = useResetRef({a:1})
 * resetForm()
 * const [formState, resetForm] = useResetReactive({a:1})
 * resetForm()
 */

/**
 * @function
 * @description 重置数据
 * @param value 表单数据
 **/
export function useResetRef<T>(value: T) {
  const initialValue = cloneDeep(value);
  const state = ref(value) as Ref<T>;

  const reset = () => {
    state.value = cloneDeep(initialValue);
  };
  return [state, reset] as const;
}

/**
 * @function
 * @description reactive重置表单数据
 * @param {Object} value - 表单数据
 **/
export function useResetReactive<T extends Record<string, any>>(value: T) {
  const initialValue = cloneDeep(value);
  const state = reactive(value);
  const reset = () => {
    Object.keys(state).forEach((key) => delete state[key]);
    Object.assign(state, cloneDeep(initialValue));
  };
  return [state, reset] as const;
}
