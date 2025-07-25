<!--
* @description: useMessage钩子使用示例
* @author: wangyang
* @date: 2024-10-24
-->

<template>
  <div class="message-demo p-6">
    <h2 class="font-bold mb-6 text-center">消息提示组件示例</h2>

    <a-card class="mb-6 shadow-sm">
      <template #title>
        <div class="flex items-center">
          <span class="font-medium">基础消息类型</span>
        </div>
      </template>
      <div class="space-y-4">
        <a-input v-model:value="messageContent" placeholder="请输入消息内容" class="mb-4" />

        <div class="flex flex-wrap gap-3">
          <a-button type="primary" @click="showMessage('info')">
            <template #icon><SvgIcon name="ant-design:info-circle-outlined" /></template>
            信息提示
          </a-button>
          <a-button
            type="primary"
            @click="showMessage('success')"
            class="bg-green-500 hover:bg-green-600"
          >
            <template #icon><SvgIcon name="ant-design:check-circle-outlined" /></template>
            成功提示
          </a-button>
          <a-button
            type="primary"
            @click="showMessage('warning')"
            class="bg-yellow-500 hover:bg-yellow-600"
          >
            <template #icon><SvgIcon name="ant-design:warning-outlined" /></template>
            警告提示
          </a-button>
          <a-button
            type="primary"
            @click="showMessage('error')"
            class="bg-red-500 hover:bg-red-600"
          >
            <template #icon><SvgIcon name="ant-design:close-circle-outlined" /></template>
            错误提示
          </a-button>
          <BaseButton @click="showMessage('loading')">
            <template #icon><LoadingOutlined /></template>
            加载提示
          </BaseButton>
        </div>
      </div>
    </a-card>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <a-card class="shadow-sm">
        <template #title>
          <div class="flex items-center">
            <SvgIcon name="ant-design:interaction-outlined" class="mr-2" />
            <span class="font-medium">快速重复点击测试</span>
          </div>
        </template>
        <div class="space-y-4">
          <p class="text-gray-500">连续点击下方按钮，只会显示一条消息</p>
          <a-button type="primary" size="large" block @click="showRepeatedMessage">
            连续点击我
          </a-button>
          <div class="text-gray-400 mt-2">使用useMessage钩子，防止重复提示</div>
        </div>
      </a-card>

      <a-card class="shadow-sm">
        <template #title>
          <div class="flex items-center">
            <SvgIcon name="ant-design:api-outlined" class="mr-2" />
            <span class="font-medium">对比测试</span>
          </div>
        </template>
        <div class="space-y-4">
          <p class="text-gray-500">连续点击下方按钮，会显示多条消息</p>
          <a-button danger size="large" block @click="showOriginalMessage">
            使用原始message
          </a-button>
          <div class="text-gray-400 mt-2">使用原始message组件，会显示多条重复消息</div>
        </div>
      </a-card>
    </div>

    <a-card class="mt-6 shadow-sm">
      <template #title>
        <div class="flex items-center">
          <SvgIcon name="ant-design:clock-circle-outlined" class="mr-2" />
          <span class="font-medium">定时关闭测试</span>
        </div>
      </template>
      <div class="space-y-4">
        <p class="text-gray-500">测试消息定时关闭功能，可以设置不同的关闭时间</p>
        <div class="flex flex-wrap gap-4 items-center">
          <div class="flex items-center">
            <span class="mr-2">关闭时间：</span>
            <a-input-number
              v-model:value="closeDuration"
              :min="1"
              :max="10"
              addon-after="秒"
              style="width: 120px"
            />
          </div>
          <a-button type="primary" @click="showTimedMessage">
            <template #icon><SvgIcon name="ant-design:field-time-outlined" /></template>
            显示定时消息
          </a-button>
        </div>
      </div>
    </a-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useMessage } from '@/hooks';
import { message } from 'ant-design-vue';
import type { NoticeType } from 'ant-design-vue/es/message';

// 使用自定义消息钩子
const { info, success, warning, error, loading } = useMessage();

// 消息内容
const messageContent = ref<string>('这是一条测试消息');
// 定时关闭时间(秒)
const closeDuration = ref<number>(3);

/**
 * 显示消息
 * @param type 消息类型
 */
const showMessage = (type: NoticeType) => {
  const content = messageContent.value || '这是一条测试消息';

  switch (type) {
    case 'info':
      info(content);
      break;
    case 'success':
      success(content);
      break;
    case 'warning':
      warning(content);
      break;
    case 'error':
      error(content);
      break;
    case 'loading':
      loading(content);
      break;
    default:
      info(content);
  }
};

/**
 * 快速重复显示消息测试
 */
const showRepeatedMessage = () => {
  // 连续调用多次，但只会显示一条消息
  for (let i = 0; i < 5; i++) {
    info('这是一条重复的消息');
  }
};

/**
 * 使用原始message组件测试
 */
const showOriginalMessage = () => {
  message.info('这是一条原始message消息');
};

/**
 * 显示定时关闭的消息
 */
const showTimedMessage = () => {
  info(`这条消息将在${closeDuration.value}秒后关闭`, closeDuration.value, () => {
    success('消息已关闭');
  });
};
</script>

<style scoped>
.message-demo {
  max-width: 900px;
  margin: 0 auto;
}

:deep(.ant-card) {
  border-radius: 8px;
  transition: all 0.3s;
}

:deep(.ant-card:hover) {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

:deep(.ant-card-head) {
  border-bottom: 1px solid #f0f0f0;
  padding: 0 24px;
}

:deep(.ant-card-body) {
  padding: 24px;
}

:deep(.ant-btn) {
  display: flex;
  align-items: center;
  justify-content: center;
  .svg-icon {
    margin-right: 8px;
  }
}
</style>
