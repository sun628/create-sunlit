<template>
  <div class="use-reset-demo wh-full overflow-y-auto">
    <a-card title="useResetRef示例" class="mb-4">
      <a-form :model="refFormData" layout="vertical">
        <a-form-item label="姓名">
          <a-input v-model:value="refFormData.name" />
        </a-form-item>

        <a-form-item label="年龄">
          <div class="flex items-center">
            <a-input-number v-model:value="refFormData.age" :min="1" />
            <a-button type="primary" class="ml-2" @click="incrementAge">
              <PlusOutlined />
            </a-button>
            <a-button class="ml-2" @click="decrementAge">
              <MinusOutlined />
            </a-button>
          </div>
        </a-form-item>

        <a-form-item label="邮箱">
          <a-input v-model:value="refFormData.email" />
        </a-form-item>

        <a-space>
          <a-button type="primary" @click="() => resetRefForm()">重置全部</a-button>
          <a-button @click="() => resetSpecificRefFields()">只重置姓名和年龄</a-button>
        </a-space>
      </a-form>

      <a-divider />

      <div class="mt-4">
        <h3>当前数据:</h3>
        <pre>{{ refFormData }}</pre>
      </div>
    </a-card>

    <a-card title="useResetReactive示例">
      <a-form :model="reactiveFormData" layout="vertical">
        <a-form-item label="职位">
          <a-input v-model:value="reactiveFormData.title" />
        </a-form-item>

        <a-form-item label="公司">
          <a-input v-model:value="reactiveFormData.company" />
        </a-form-item>

        <a-form-item label="薪资">
          <div class="flex items-center">
            <a-input-number v-model:value="reactiveFormData.salary" :min="0" :step="1000" />
            <a-button type="primary" class="ml-2" @click="increaseSalary">
              <PlusOutlined />
            </a-button>
            <a-button class="ml-2" @click="decreaseSalary">
              <MinusOutlined />
            </a-button>
          </div>
        </a-form-item>

        <a-form-item label="技能">
          <a-select
            v-model:value="reactiveFormData.skills"
            mode="tags"
            style="width: 100%"
            placeholder="请输入技能"
          />
        </a-form-item>

        <a-space>
          <a-button type="primary" @click="() => resetReactiveForm()">重置全部</a-button>
          <a-button @click="() => resetSpecificReactiveFields()">只重置职位和薪资</a-button>
        </a-space>
      </a-form>

      <a-divider />

      <div class="mt-4">
        <h3>当前数据:</h3>
        <pre>{{ reactiveFormData }}</pre>
      </div>
    </a-card>
  </div>
</template>

<script setup lang="ts">
/**
 * @description useReset钩子函数示例
 * @version 1.0.0
 * @author wangyang
 * @date 2023-09-01
 * @lastEditTime 2023-09-01
 * @lastEditors wangyang
 */
import { useResetRef, useResetReactive } from '@/hooks/useReset';
import { PlusOutlined, MinusOutlined } from '@ant-design/icons-vue';

// 定义表单数据类型
interface FormData {
  name: string;
  age: number;
  email: string;
}

interface ReactiveFormData {
  title: string;
  company: string;
  salary: number;
  skills: string[];
}

// 使用useResetRef示例 - 返回的是ref对象
const [refFormData, resetRefForm] = useResetRef<FormData>({
  name: '张三',
  age: 25,
  email: 'zhangsan@example.com'
});

// 使用useResetReactive示例 - 返回的是reactive对象
const [reactiveFormData, resetReactiveForm] = useResetReactive<ReactiveFormData>({
  title: '产品经理',
  company: '科技公司',
  salary: 15000,
  skills: ['沟通', '需求分析', '项目管理']
});

/**
 * @function
 * @description 重置指定字段
 * @returns {void}
 */
const resetSpecificRefFields = () => {
  resetRefForm(['name', 'age']);
};

/**
 * @function
 * @description 重置指定字段
 * @returns {void}
 */
const resetSpecificReactiveFields = () => {
  resetReactiveForm(['title', 'salary']);
};

/**
 * @function
 * @description 增加年龄
 * @returns {void}
 */
const incrementAge = () => {
  refFormData.value.age += 1;
};

/**
 * @function
 * @description 减少年龄
 * @returns {void}
 */
const decrementAge = () => {
  refFormData.value.age -= 1;
};

/**
 * @function
 * @description 增加薪资
 * @returns {void}
 */
const increaseSalary = () => {
  reactiveFormData.salary += 1000;
};

/**
 * @function
 * @description 减少薪资
 * @returns {void}
 */
const decreaseSalary = () => {
  reactiveFormData.salary -= 1000;
};
</script>

<style scoped>
.use-reset-demo {
  padding: 20px;
}

pre {
  background-color: #f5f5f5;
  padding: 10px;
  border-radius: 4px;
  max-height: 200px;
  overflow: auto;
}
</style>
