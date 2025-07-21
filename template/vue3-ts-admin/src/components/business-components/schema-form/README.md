# SchemaForm 组件

基于 JSON Schema 的动态表单组件，提供灵活且易用的表单构建能力。

## 组件介绍

SchemaForm 是一个基于 Ant Design Vue 的高度可配置化表单组件，通过 JSON Schema 配置方式动态生成表单，简化表单开发流程，提高开发效率。支持丰富的表单项类型、自定义组件渲染、表单联动等复杂场景。

## 组件架构

```
schema-form/
├── src/
│   ├── components/         # 子组件
│   │   ├── form-action.vue # 表单操作按钮组件
│   │   ├── ApiSelect.vue   # 远程数据选择器
│   │   └── index.ts        # 组件导出
│   ├── hooks/              # 钩子函数
│   │   ├── useForm.tsx           # 表单实例 Hook
│   │   ├── useFormContext.ts     # 表单上下文 Hook
│   │   ├── useFormMethods.ts     # 表单方法 Hook
│   │   ├── useFormState.ts       # 表单状态 Hook
│   │   ├── useLabelWidth.ts      # 标签宽度计算 Hook
│   │   └── index.ts              # Hook 导出
│   ├── types/              # 类型定义
│   │   ├── form.ts         # 表单相关类型
│   │   ├── component.ts    # 组件相关类型
│   │   └── index.ts        # 类型导出
│   ├── schema-form.vue     # 表单组件
│   ├── schema-form.ts      # 表单属性定义
│   ├── schema-form-item.vue # 表单项组件
│   ├── schema-form-item.ts # 表单项属性定义
│   ├── componentMap.ts     # 组件映射表
│   └── helper.ts           # 工具函数
└── index.ts                # 模块导出
```

## 组件 API

### SchemaForm 属性

| 参数                  | 说明                         | 类型                              | 默认值           |
| --------------------- | ---------------------------- | --------------------------------- | ---------------- |
| schemas               | 表单配置数组，用于生成表单项 | `FormSchema[]`                    | `[]`             |
| mergeDynamicData      | 额外传入表单的数据，用于联动 | `object`                          | `{}`             |
| disabled              | 全局禁用表单                 | `boolean`                         | `false`          |
| labelCol              | 标签列配置                   | `ColEx`                           | `{ span: 6 }`    |
| wrapperCol            | 内容列配置                   | `ColEx`                           | `{ span: 18 }`   |
| showActionButtonGroup | 是否显示操作按钮组           | `boolean`                         | `true`           |
| submitOnReset         | 重置时是否提交表单           | `boolean`                         | `false`          |
| labelWidth            | 标签宽度                     | `number \| string`                | `110px`          |
| size                  | 表单大小                     | `'small' \| 'default' \| 'large'` | `'default'`      |
| compact               | 是否紧凑模式                 | `boolean`                         | `false`          |
| rowProps              | 表单行属性                   | `RowProps`                        | `{ gutter: 24 }` |
| submitButtonOptions   | 提交按钮选项                 | `ButtonProps`                     | -                |
| resetButtonOptions    | 重置按钮选项                 | `ButtonProps`                     | -                |
| actionColProps        | 操作按钮列属性               | `ColEx`                           | -                |

### SchemaForm 事件

| 事件名   | 说明         | 回调参数                                     |
| -------- | ------------ | -------------------------------------------- |
| register | 注册表单实例 | `(formInstance: SchemaFormInstance) => void` |
| reset    | 表单重置事件 | `(values: any) => void`                      |
| submit   | 表单提交事件 | `(values: any) => void`                      |

### FormSchema 配置

| 参数            | 说明               | 类型                                                                                                 | 默认值  |
| --------------- | ------------------ | ---------------------------------------------------------------------------------------------------- | ------- |
| field           | 表单项字段名       | `string`                                                                                             | -       |
| label           | 标签名             | `string \| ((renderParams: RenderCallbackParams) => string)`                                         | -       |
| component       | 表单组件类型       | `ComponentType \| CustomRenderFn \| ((renderParams: RenderCallbackParams) => Component)`             | -       |
| componentProps  | 组件属性           | `ComponentProps \| ((renderParams: RenderCallbackParams) => ComponentProps)`                         | -       |
| componentSlots  | 组件插槽           | `((renderParams: RenderCallbackParams) => Recordable<CustomRenderFn>) \| Recordable<CustomRenderFn>` | -       |
| rules           | 校验规则           | `Rule[]`                                                                                             | -       |
| required        | 是否必填           | `boolean \| ((renderParams: RenderCallbackParams) => boolean)`                                       | `false` |
| dynamicRules    | 动态校验规则       | `(renderParams: RenderCallbackParams) => Rule[]`                                                     | -       |
| dynamicDisabled | 动态禁用           | `boolean \| ((renderParams: RenderCallbackParams) => boolean)`                                       | `false` |
| vShow           | 是否显示（v-show） | `boolean \| ((renderParams: RenderCallbackParams) => boolean)`                                       | `true`  |
| vIf             | 是否渲染（v-if）   | `boolean \| ((renderParams: RenderCallbackParams) => boolean)`                                       | `true`  |
| colProps        | 列配置             | `ColEx`                                                                                              | -       |
| formItemProps   | 表单项属性         | `Partial<FormItemProps>`                                                                             | -       |
| defaultValue    | 默认值             | `any`                                                                                                | -       |
| slot            | 自定义插槽         | `string`                                                                                             | -       |
| beforeSlot      | 前置插槽           | `string \| ((renderParams: RenderCallbackParams) => any)`                                            | -       |
| afterSlot       | 后置插槽           | `string \| ((renderParams: RenderCallbackParams) => any)`                                            | -       |

## 基本用法

```vue
<template>
  <SchemaForm :schemas="formSchemas" @register="registerForm" @submit="handleSubmit" />
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { SchemaForm, FormSchema, useForm } from '@/components/business-components/schema-form';

const formSchemas: FormSchema[] = [
  {
    field: 'username',
    label: '用户名',
    component: 'Input',
    required: true,
    componentProps: {
      placeholder: '请输入用户名'
    }
  },
  {
    field: 'gender',
    label: '性别',
    component: 'Select',
    componentProps: {
      options: [
        { label: '男', value: 'male' },
        { label: '女', value: 'female' }
      ]
    }
  },
  {
    field: 'birthday',
    label: '生日',
    component: 'DatePicker'
  }
];

const [SchemaFormRender, methods] = useForm({
  labelWidth: 160,
  schemas,
  actionColOptions: {
    span: 24
  }
});

const handleSubmit = async (values: any) => {
  console.log('表单提交', values);
};
</script>
```

## 高级用法

### 动态表单项

```ts
const dynamicFormSchemas: FormSchema[] = [
  {
    field: 'type',
    label: '类型',
    component: 'Select',
    componentProps: {
      options: [
        { label: '类型A', value: 'A' },
        { label: '类型B', value: 'B' }
      ],
      onChange: (value: string) => {
        // 根据类型动态更新其他字段
        updateSchema([
          {
            field: 'extraInfo',
            vIf: value === 'A'
          }
        ]);
      }
    }
  },
  {
    field: 'extraInfo',
    label: '附加信息',
    component: 'Input',
    vIf: false
  }
];
```

### 表单联动

```ts
const linkageFormSchemas: FormSchema[] = [
  {
    field: 'province',
    label: '省份',
    component: 'Select',
    componentProps: {
      options: provinceOptions,
      onChange: (province: string) => {
        // 更新城市选项
        updateSchema([
          {
            field: 'city',
            componentProps: {
              options: getCityOptions(province)
            }
          }
        ]);
      }
    }
  },
  {
    field: 'city',
    label: '城市',
    component: 'Select',
    componentProps: {
      options: []
    }
  }
];
```

### 远程数据加载

```ts
const remoteDataFormSchemas: FormSchema[] = [
  {
    field: 'userId',
    label: '用户',
    component: 'ApiSelect',
    componentProps: {
      api: getUserList,
      resultField: 'data',
      labelField: 'name',
      valueField: 'id'
    }
  }
];
```

## 设计思路

1. **Schema 驱动**：通过 JSON Schema 描述表单结构和行为，实现声明式表单配置。
2. **组件映射**：使用 componentMap 将字符串映射到具体组件，支持所有 Ant Design 表单组件。
3. **表单上下文**：使用 useFormContext 提供表单上下文，实现跨组件通信。
4. **响应式设计**：基于 Vue 3 响应式系统，表单状态变化自动触发视图更新。
5. **插槽系统**：丰富的插槽支持，满足自定义渲染需求。
6. **表单联动**：支持表单项联动，根据条件动态显示/隐藏或修改表单项属性。

## 注意事项

1. 所有表单项必须设置唯一的 field 字段。
2. 动态组件 props 和插槽可能影响性能，请合理使用。
3. 表单验证规则遵循 Ant Design Form 的规则格式。
4. 复杂表单建议拆分为多个子表单或使用表单分组。
