import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import router from '@/router/routes';
import { useUserStore } from '@/store/modules/user';

NProgress.configure({
  easing: 'ease', // 动画方式
  speed: 500, // 递增进度条的速度
  showSpinner: true, // 是否显示加载ico
  trickleSpeed: 200, // 自动递增间隔
  minimum: 0.3, // 初始化时的最小百分比
});
const TITLE = import.meta.env.VITE_TITLE;

/**
 * @description 路由拦截 beforeEach
 * */
router.beforeEach(async (to, _from, next) => {
  NProgress.start();

  const userStore = useUserStore();

  // 动态设置标题
  document.title = to.meta.title ? `${TITLE} - ${to.meta.title}` : TITLE;

  // 判断当前路由是否需要访问权限
  if (!to.matched.some((record) => record.meta.requiresAuth)) return next();

  // 判断访问页面是否在路由白名单地址(静态路由)中，如果存在直接放行
  if ($config.routerWhiteList.includes(to.path)) return next();

  // 判断是否有 Token，没有重定向到 login 页面
  if (!userStore.token) return next({ path: '/login', replace: true });
  next();
});

router.afterEach((_to) => {
  NProgress.done();
});

export default router;
