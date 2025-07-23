<template>
  <div class="ant-form-container">
    <a-card title="活动表单" :bordered="false">
      <a-form
        :model="formState"
        :rules="rules"
        :label-col="{ span: 4 }"
        :wrapper-col="{ span: 14 }"
        ref="formRef"
      >
        <a-form-item label="活动名称" name="activityName">
          <a-input v-model:value="formState.activityName" placeholder="请输入活动名称" />
        </a-form-item>

        <a-form-item label="活动区域" name="activityZone">
          <a-select
            v-model:value="formState.activityZone"
            placeholder="请选择活动区域"
            :options="zoneOptions"
          />
        </a-form-item>

        <a-form-item label="活动时间" name="activityTime">
          <a-date-picker
            v-model:value="formState.activityTime"
            style="width: 100%"
            placeholder="请选择日期"
            valueFormat="YYYY-MM-DD"
          />
        </a-form-item>

        <a-form-item label="即时配送" name="instantDelivery">
          <a-switch v-model:checked="formState.instantDelivery" />
        </a-form-item>

        <a-form-item label="活动类型" name="activityType">
          <a-checkbox-group v-model:value="formState.activityType">
            <a-checkbox value="online">线上活动</a-checkbox>
            <a-checkbox value="promotion">促销活动</a-checkbox>
            <a-checkbox value="offline">线下活动</a-checkbox>
          </a-checkbox-group>
        </a-form-item>

        <a-form-item label="特殊资源" name="resources">
          <a-radio-group v-model:value="formState.resources">
            <a-radio value="sponsor">赞助商</a-radio>
            <a-radio value="venue">场地</a-radio>
          </a-radio-group>
        </a-form-item>

        <a-form-item label="活动形式" name="activityForm">
          <a-textarea
            v-model:value="formState.activityForm"
            placeholder="请输入活动形式"
            :rows="4"
          />
        </a-form-item>

        <a-form-item :wrapper-col="{ offset: 4, span: 14 }">
          <a-space>
            <a-button type="primary" @click="onSubmit">创建</a-button>
            <a-button @click="resetForm">重置</a-button>
          </a-space>
        </a-form-item>
      </a-form>
    </a-card>
  </div>
</template>

<script setup lang="ts">
/**
 * @description: 活动表单示例
 * @version: 1.0.0
 * @author: wangyang
 * @date: 2023-08-01
 * @lastEditTime: 2023-08-01
 * @lastEditors: wangyang
 */
import { message } from 'ant-design-vue';
import type { FormInstance, Rule } from 'ant-design-vue/es/form';
import { reactive, ref } from 'vue';

interface FormState {
  activityName: string;
  activityZone: string;
  activityTime: string;
  instantDelivery: boolean;
  activityType: string[];
  resources: string;
  activityForm: string;
}

const formRef = ref<FormInstance>();

const formState = reactive<FormState>({
  activityName: '',
  activityZone: '',
  activityTime: '',
  instantDelivery: false,
  activityType: [],
  resources: '',
  activityForm: ''
});

const zoneOptions = [
  { value: 'beijing', label: '北京' },
  { value: 'shanghai', label: '上海' },
  { value: 'guangzhou', label: '广州' },
  { value: 'shenzhen', label: '深圳' }
];

const rules = {
  activityName: [
    { required: true, message: '请输入活动名称', trigger: 'blur' } as Rule,
    { min: 3, max: 20, message: '长度应为3到20个字符', trigger: 'blur' } as Rule
  ],
  activityZone: [{ required: true, message: '请选择活动区域', trigger: 'change' } as Rule],
  activityTime: [{ required: true, message: '请选择活动时间', trigger: 'change' } as Rule],
  activityType: [{ required: true, message: '请至少选择一个活动类型', trigger: 'change' } as Rule],
  resources: [{ required: true, message: '请选择特殊资源', trigger: 'change' } as Rule],
  activityForm: [{ required: true, message: '请填写活动形式', trigger: 'blur' } as Rule]
};

/**
 * @function onSubmit
 * @description 提交表单
 * @returns {Promise<void>}
 */
const onSubmit = async (): Promise<void> => {
  try {
    if (formRef.value) {
      await formRef.value.validate();
      message.success('提交成功');
      console.log('表单数据:', formState);
    }
  } catch (error) {
    console.error('验证失败:', error);
    message.error('请检查表单填写是否正确');
  }
};

/**
 * @function resetForm
 * @description 重置表单
 * @returns {void}
 */
const resetForm = (): void => {
  formRef.value?.resetFields();
};
</script>

<style scoped lang="less">
.ant-form-container {
  padding: 20px;

  :deep(.ant-form-item-label > label) {
    color: #606266;
  }

  :deep(.ant-card-head) {
    border-bottom: 1px solid #f0f0f0;
    margin-bottom: 20px;
  }
}
</style>
