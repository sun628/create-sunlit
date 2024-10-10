export type MenuItem = {
  title: string;
  key?: string;
  active: boolean;
  onClick: (item: MenuItem) => void;
};

// 定义菜单项
const items = [
  {
    title: '路径规划',
    key: 'Driving',
  },
  {
    title: '选项二',
    key: '',
  },
  {
    title: '选项三',
    key: '',
  },
  {
    title: '选项四',
    key: '',
  },
];

export function useMenuFn(callback?: (key: string) => void) {
  const menuList = ref<MenuItem[]>(
    items.map((item) => ({
      ...item,
      active: false,
      onClick: (item) => {
        item.active = !item.active;
        callback?.(item?.key || '');
      },
    })),
  );
  return { menuList };
}

// 使用 useMenu，并传入回调
