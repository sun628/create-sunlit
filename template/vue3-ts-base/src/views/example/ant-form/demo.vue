<!--
 * @description: Ant Design Vue表单组件示例
 * @version: 1.0.0
 * @author: wangyang
 * @date: 2023-09-06
-->
<template>
  <div class="ant-form-demo p-24px wh-full overflow-auto">
    <a-card title="表单示例" :bordered="false" class="mb-24px">
      <a-form
        :model="formState"
        name="validateForm"
        :label-col="{ span: 6 }"
        :wrapper-col="{ span: 14 }"
        autocomplete="off"
        @finish="onFinish"
        @finishFailed="onFinishFailed"
      >
        <a-form-item
          name="username"
          label="用户名"
          :rules="[{ required: true, message: '请输入用户名' }]"
        >
          <a-input v-model:value="formState.username" placeholder="请输入用户名" />
        </a-form-item>

        <a-form-item
          name="password"
          label="密码"
          :rules="[{ required: true, message: '请输入密码' }]"
        >
          <a-input-password v-model:value="formState.password" placeholder="请输入密码" />
        </a-form-item>

        <a-form-item name="remember" :wrapper-col="{ offset: 6, span: 14 }">
          <a-checkbox v-model:checked="formState.remember">记住我</a-checkbox>
        </a-form-item>

        <a-form-item
          name="gender"
          label="性别"
          :rules="[{ required: true, message: '请选择性别' }]"
        >
          <a-radio-group v-model:value="formState.gender">
            <a-radio value="male">男</a-radio>
            <a-radio value="female">女</a-radio>
          </a-radio-group>
        </a-form-item>

        <a-form-item name="hobby" label="爱好">
          <a-checkbox-group v-model:value="formState.hobby">
            <a-checkbox value="reading">阅读</a-checkbox>
            <a-checkbox value="sports">运动</a-checkbox>
            <a-checkbox value="music">音乐</a-checkbox>
          </a-checkbox-group>
        </a-form-item>

        <a-form-item
          name="department"
          label="部门"
          :rules="[{ required: true, message: '请选择部门' }]"
        >
          <a-select
            v-model:value="formState.department"
            placeholder="请选择部门"
            :options="departmentOptions"
          ></a-select>
        </a-form-item>

        <a-form-item name="birthdate" label="出生日期">
          <a-date-picker
            v-model:value="formState.birthdate"
            placeholder="请选择出生日期"
            class="w-full"
          />
        </a-form-item>

        <a-form-item name="description" label="个人简介">
          <a-textarea
            v-model:value="formState.description"
            placeholder="请输入个人简介"
            :rows="4"
          />
        </a-form-item>

        <a-form-item :wrapper-col="{ offset: 6, span: 14 }">
          <a-space>
            <a-button type="primary" html-type="submit">提交</a-button>
            <a-button @click="resetForm">重置</a-button>
          </a-space>
        </a-form-item>
      </a-form>
    </a-card>

    <a-card title="表单数据预览" :bordered="false">
      <pre>{{ formState }}</pre>
    </a-card>
  </div>
</template>

<script setup lang="ts">
import type { Dayjs } from 'dayjs';
import { message } from 'ant-design-vue';

/**
 * 表单数据接口定义
 */
interface FormState {
  username: string;
  password: string;
  remember: boolean;
  gender: string;
  hobby: string[];
  department: string;
  birthdate: Dayjs | undefined;
  description: string;
}

// 部门选项数据
const departmentOptions = [
  { value: 'development', label: '研发部' },
  { value: 'product', label: '产品部' },
  { value: 'design', label: '设计部' },
  { value: 'marketing', label: '市场部' },
  { value: 'operations', label: '运营部' }
];

/**
 * @function
 * @description 初始化表单数据
 * @returns {FormState} 表单数据对象
 */
const initFormState = (): FormState => {
  return {
    username: '',
    password: '',
    remember: true,
    gender: '',
    hobby: [],
    department: '',
    birthdate: undefined,
    description: ''
  };
};

// 表单状态数据
const formState = reactive<FormState>(initFormState());

/**
 * @function
 * @description 表单提交成功回调
 * @param {FormState} values - 表单数据
 */
const onFinish = (values: FormState) => {
  console.log('表单提交成功:', values);
  message.success('表单提交成功');
};

/**
 * @function
 * @description 表单提交失败回调
 * @param {any} errorInfo - 错误信息
 */
const onFinishFailed = (errorInfo: any) => {
  console.log('表单提交失败:', errorInfo);
  message.error('表单提交失败，请检查表单项');
};

/**
 * @function
 * @description 重置表单数据
 */
const resetForm = () => {
  Object.assign(formState, initFormState());
  message.info('表单已重置');
};
</script>

<style scoped lang="less">
.ant-form-demo {
  .ant-card {
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  }

  pre {
    background-color: #f5f5f5;
    padding: 16px;
    border-radius: 4px;
    overflow: auto;
  }
}
</style>
