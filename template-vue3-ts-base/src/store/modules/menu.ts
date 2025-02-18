import { defineStore } from 'pinia';
import { MenuState } from '../interface';
import piniaPersistConfig from '@/store/piniaPersist';

// MenuStore
export const MenuStore = defineStore('MenuState', {
  state: (): MenuState => ({
    isCollapse: false, // menu collapse
    menuList: [], // menu List
  }),
  getters: {},
  actions: {
    async setCollapse() {
      this.isCollapse = !this.isCollapse;
    },
    async setMenuList(menuList: Menu.MenuOptions[]) {
      this.menuList = menuList;
    },
  },
  persist: piniaPersistConfig('MenuState'),
});
