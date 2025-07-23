<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-8">可重用模板演示</h1>

    <!-- 定义卡片模板 -->
    <DefineCardTemplate v-slot="{ title, content, type }">
      <div
        :class="[
          'p-6 rounded-lg shadow-md border transition-all hover:shadow-lg',
          {
            'bg-white border-gray-200': type === 'default',
            'bg-blue-50 border-blue-200': type === 'primary',
            'bg-green-50 border-green-200': type === 'success',
            'bg-yellow-50 border-yellow-200': type === 'warning',
            'bg-red-50 border-red-200': type === 'danger'
          }
        ]"
      >
        <div
          :class="[
            'text-xl font-bold mb-4',
            {
              'text-gray-800': type === 'default',
              'text-blue-700': type === 'primary',
              'text-green-700': type === 'success',
              'text-yellow-700': type === 'warning',
              'text-red-700': type === 'danger'
            }
          ]"
        >
          {{ title }}
        </div>
        <div class="mb-6 text-gray-600 leading-relaxed">{{ content }}</div>
        <div class="flex justify-end gap-3">
          <a-button size="middle">详情</a-button>
          <a-button size="middle" type="primary">确定</a-button>
        </div>
      </div>
    </DefineCardTemplate>

    <!-- 使用卡片模板 -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
      <CardTemplate
        title="默认卡片"
        content="这是默认样式的卡片，展示了createReusableTemplate的基本用法。卡片可以包含各种信息和操作按钮。"
        type="default"
      />

      <CardTemplate
        title="主要卡片"
        content="这是主要样式的卡片，适合突出显示重要信息。蓝色主题通常用于表示系统主要功能或关键信息。"
        type="primary"
      />

      <CardTemplate
        title="成功卡片"
        content="这是成功样式的卡片，可以用来展示成功的操作结果。绿色通常表示操作成功或状态正常。"
        type="success"
      />

      <CardTemplate
        title="警告卡片"
        content="这是警告样式的卡片，提醒用户注意相关内容。黄色通常表示需要注意的信息或警告提示。"
        type="warning"
      />

      <CardTemplate
        title="危险卡片"
        content="这是危险样式的卡片，表示需要谨慎操作的内容。红色通常表示危险操作或错误状态。"
        type="danger"
      />
    </div>
  </div>
</template>

<script setup>
/**
 * @description: 演示 VueUse 中 createReusableTemplate 的使用
 * @author: wangyang
 * @date: 2024-08-02
 */
import { createReusableTemplate } from '@vueuse/core';

// 创建卡片模板
const [DefineCardTemplate, CardTemplate] = createReusableTemplate();
</script>

<style scoped lang="less">
/* 添加卡片的过渡效果 */
.transition-all {
  transition: all 0.3s ease;
}

.hover\:shadow-lg:hover {
  box-shadow:
    0 10px 15px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -2px rgba(0, 0, 0, 0.05);
  transform: translateY(-2px);
}
</style>
