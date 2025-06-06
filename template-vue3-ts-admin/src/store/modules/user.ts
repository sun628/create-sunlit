import { defineStore } from 'pinia';

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
    return {
      token,
      userInfo
    };
  },
  {
    persist: {
      pick: ['token']
    }
  }
);
