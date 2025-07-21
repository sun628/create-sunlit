import { reactive, ref } from 'vue';
import { cloneDeep } from 'lodash-es';
/**
 * @description  重置表单数据
 * @example
 * const [formState, resetForm] = useResetRef({a:1})
 * resetForm()
 * const [formState, resetForm] = useResetRef({a:1})
 * resetForm(['a'])
 *
 * 重置整个表单reactive
 * const [formState, resetForm] = useResetReactive({a:1})
 * resetForm()
 * const [formState, resetForm] = useResetRef({a:1,b:2})
 * resetForm(['a','b'])
 */

/**
 * @function
 * @description 重置数据
 * @param value 表单数据
 **/
export function useResetRef<T extends Recordable>(value: T) {
  const initialValue = cloneDeep(value);
  const state = ref(value) as Ref<T>;

  const reset = (keys?: Array<keyof T>) => {
    if (keys) {
      keys.forEach((key) => {
        if (key in initialValue) {
          state.value[key] = initialValue[key];
        }
      });
    } else {
      state.value = cloneDeep(initialValue);
    }
  };
  return [state, reset] as const;
}

/**
 * @function
 * @description reactive重置表单数据
 * @param {Object} value - 表单数据
 **/
export function useResetReactive<T extends Recordable>(value: T) {
  const initialValue = cloneDeep(value);
  const state = reactive(value);

  const reset = (keys?: Array<keyof T>) => {
    if (keys) {
      keys.forEach((key) => {
        if (key in initialValue) {
          (state as any)[key] = initialValue[key];
        }
      });
    } else {
      Object.keys(state).forEach((key) => delete (state as any)[key]);
      Object.assign(state, initialValue);
    }
  };
  return [state, reset] as const;
}
