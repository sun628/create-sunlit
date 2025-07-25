<template>
  <div>
    <Alert message="自定义表单组件示例" type="info" show-icon style="margin-bottom: 12px" />
    <a-card>
      <SchemaForm @submit="handleSubmit" class="pt-20px">
        <template #f4="{ formModel, field }">
          <a-input v-model:value="formModel[field]" placeholder="自定义slot" />
        </template>
      </SchemaForm>
    </a-card>
  </div>
</template>
<script lang="tsx" setup>
import { Alert, Input, message } from 'ant-design-vue';
import { type FormSchema, useForm } from '@/components/business-components/schema-form';
import InputNumberRange from './InputNumbeRange.vue';

defineOptions({
  name: 'SchemaForm'
});

const schemas: FormSchema[] = [
  {
    field: 'field0',
    label: '自定义组件',
    colProps: {
      span: 8
    },
    rules: [
      {
        required: true,
        type: 'array',
        trigger: 'change',
        validator(_, value: string[]) {
          const isOk = Array.isArray(value) && value.length === 2 && value.every(Boolean);
          return isOk ? Promise.resolve() : Promise.reject('请输入数字范围');
        }
      }
    ],
    component: () => InputNumberRange,
    // 将多个值映射为多个字段
    transform([minNum, maxNum] = []) {
      return { minNum, maxNum };
    }
  },
  {
    field: 'field1',
    label: 'comp vnode方式',
    colProps: {
      span: 8
    },
    rules: [{ required: true }],
    component: ({ formModel, field }) => {
      return (
        <Input
          v-model={formModel[field]}
          v-slots={{ prefix: () => 'component' }}
          placeholder="请输入"
        />
      );
    }
  },
  {
    field: 'field2',
    component: 'Input',
    label: 'render组件slot',
    colProps: {
      span: 8
    },
    rules: [{ required: true }],
    componentSlots: (values) => {
      console.log('field2 componentSlots values', values);
      return {
        prefix: () => 'prefix',
        suffix: () => 'suffix'
      };
    }
  },
  {
    field: 'field3',
    component: 'Input',
    label: 'render组件slot',
    colProps: {
      span: 8
    },
    rules: [{ required: true }],
    componentSlots: {
      prefix: () => 'prefix',
      suffix: () => {
        return 'suffix';
      }
    }
  },
  {
    field: 'field4',
    component: 'Input',
    label: '自定义Slot',
    slot: 'f4',
    colProps: {
      span: 8
    },
    rules: [{ required: true }]
  }
];

const [SchemaForm] = useForm({
  labelWidth: 140,
  schemas,
  actionColOptions: {
    span: 24
  },
  submitButtonOptions: {
    text: '查询1111'
  }
});

const handleSubmit = (values: any) => {
  message.success(`click search,values:${JSON.stringify(values)}`);
  console.log('values', values);
};
</script>
