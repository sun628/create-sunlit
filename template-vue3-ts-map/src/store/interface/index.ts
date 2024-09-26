/* GlobalState */
export interface GlobalState {
  sectionMap: {
    [key: string]: AMap.Line | AMap.Line[];
  };
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
