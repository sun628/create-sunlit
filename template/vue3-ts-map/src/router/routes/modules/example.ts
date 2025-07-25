import { RouteRecordRaw } from 'vue-router';

/**
 * @description 地图示例模块
 **/
const example: RouteRecordRaw = {
  path: '/example',
  name: 'Example',
  redirect: '/example/schema-form',
  meta: {
    title: '示例',
    icon: 'appstore-outlined'
  },
  children: [
    {
      path: 'map',
      name: 'Map',
      meta: {
        title: '地图示例'
      },
      children: [
        {
          path: 'marker',
          name: 'Marker',
          component: () => import('@/views/example/map/marker/index.vue'),
          meta: {
            title: '点标记（Marker）'
          }
        }
      ]
    },
    {
      path: 'echarts',
      name: 'Echarts',
      component: () => import('@/views/example/Echarts.vue'),
      meta: {
        title: 'Echarts图表'
      }
    },
    {
      path: 'schema-form',
      name: 'SchemaForm',
      component: () => import('@/views/example/scheme-form/index.vue'),
      meta: {
        title: 'Schema表单'
      }
    },
    {
      path: 'ant-form',
      name: 'AntForm',
      component: () => import('@/views/example/ant-form/demo.vue'),
      meta: {
        title: 'ant表单'
      }
    },
    {
      path: 'message',
      name: 'Message',
      component: () => import('@/views/example/Message.vue'),
      meta: {
        title: '消息提示'
      }
    },

    {
      path: 'event-bus',
      name: 'EventBus',
      component: () => import('@/views/example/event-bus/index.vue'),
      meta: {
        title: '事件总线'
      }
    },
    {
      path: 'use-reset',
      name: 'UseReset',
      component: () => import('@/views/example/use-reset/index.vue'),
      meta: {
        title: 'useReset'
      }
    },
    {
      path: 'use-loading',
      name: 'UseLoading',
      component: () => import('@/views/example/use-loading/index.vue'),
      meta: {
        title: 'useLoading'
      }
    },
    {
      path: 'use-able-template',
      name: 'UseAbleTemplate',
      component: () => import('@/views/example/create-reusable-template/index.vue'),
      meta: {
        title: 'useAbleTemplate'
      }
    }
  ]
};

export default example;
