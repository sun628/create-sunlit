import { defineStore } from 'pinia';
import type { RouteRecordRaw } from 'vue-router';
import { storeToRefs } from 'pinia';

export interface UserInfo {
  username?: string;
  role?: string;
  permissions?: string[];
}

export const useUserStore = defineStore(
  'user',
  () => {
    const token = ref<string>('');
    const userInfo = reactive<UserInfo>({});
    const menus = reactive<RouteRecordRaw[]>([]);
    return {
      token,
      userInfo,
      menus
    };
  },
  {
    persist: {
      pick: ['token']
    }
  }
);
