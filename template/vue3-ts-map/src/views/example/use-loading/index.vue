<template>
  <div class="use-loading-demo">
    <h2>useLoading Hook 示例</h2>
    <div class="button-group">
      <a-button type="primary" @click="handleShowLoading">显示加载</a-button>
      <a-button @click="handleHideLoading" :disabled="loadingCount === 0">隐藏加载</a-button>
      <a-button danger @click="handleResetLoading" :disabled="loadingCount === 0">
        重置加载
      </a-button>
    </div>
    <div class="info-panel">
      <p>
        当前加载计数:
        <a-tag color="blue">{{ loadingCount }}</a-tag>
      </p>
      <div class="description">
        <p>说明:</p>
        <ul>
          <li>点击"显示加载"按钮会增加加载计数并显示全局加载遮罩</li>
          <li>点击"隐藏加载"按钮会减少加载计数，当计数为0时隐藏遮罩</li>
          <li>点击"重置加载"按钮会重置加载状态并移除遮罩元素</li>
          <li>
            延迟显示:
            <a-input-number v-model:value="delayTime" :min="0" :max="2000" step="100" />
            ms
          </li>
        </ul>
      </div>
      <p>
        模拟异步请求:
        <a-button type="primary" @click="handleFetchData" :loading="isFetching">
          {{ isFetching ? '加载中...' : '获取数据' }}
        </a-button>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
/**
 * @description: useLoading Hook示例
 * @author: wangyang
 * @date: 2023-05-20
 */
import { useLoading } from '@/hooks/useLoading';

// 设置延迟时间
const delayTime = ref(300);

// 使用useLoading hook，传入延迟选项和自定义样式
const { loadingCount, showLoading, hideLoading, resetLoading } = useLoading({
  delay: delayTime.value,
  style: {
    top: '40%'
  }
});

// 监听延迟时间变化
watch(delayTime, (_newDelay) => {
  // 当延迟时间变化时，先重置loading，再使用新的延迟时间
  resetLoading();
});

// 处理显示加载
const handleShowLoading = () => {
  showLoading();
};

// 处理隐藏加载
const handleHideLoading = () => {
  hideLoading();
};

// 处理重置加载
const handleResetLoading = () => {
  resetLoading();
};

// 模拟异步请求
const isFetching = ref(false);
const handleFetchData = async () => {
  isFetching.value = true;
  showLoading();

  try {
    // 模拟API请求延迟
    await new Promise((resolve) => setTimeout(resolve, 2000));
  } finally {
    hideLoading();
    isFetching.value = false;
  }
};
</script>

<style scoped lang="less">
.use-loading-demo {
  padding: 20px;
  .button-group {
    display: flex;
    gap: 10px;
    margin-bottom: 20px;
  }

  .info-panel {
    background-color: #f5f5f5;
    padding: 15px;
    border-radius: 4px;

    .description {
      margin-bottom: 15px;
    }

    .style-options {
      margin: 15px 0;
      padding: 10px;
      background-color: #fff;
      border-radius: 4px;

      .style-form {
        margin-top: 10px;

        .style-item {
          display: flex;
          align-items: center;
          margin-bottom: 10px;

          span {
            margin-right: 10px;
            width: 80px;
          }

          .value-display {
            width: auto;
            margin-left: 10px;
          }
        }
      }
    }

    ul {
      margin-left: 20px;
    }

    li {
      margin-bottom: 8px;
    }
  }
}
</style>
