/* GlobalState */
export interface GlobalState {
  language?: string;
  theme?: string;
}

/* UserState */
export interface UserState {
  token: string;
  userInfo: { username: string };
}

/* MenuState */
export interface MenuState {
  isCollapse: boolean;
  menuList: Menu.MenuOptions[];
}
