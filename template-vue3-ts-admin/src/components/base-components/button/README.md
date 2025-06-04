# BaseButton 组件

## 组件介绍

BaseButton 是一个基于 Ant Design Vue 的按钮组件封装，提供了更丰富的按钮类型和自定义颜色支持。

## 特性

- 支持所有 Ant Design Vue Button 组件的原生属性
- 扩展了额外的按钮类型：warning、success、error、reset
- 支持自定义按钮颜色
- 自动处理按钮主题配置
- 移除了默认的按钮阴影效果

## 使用方法

```vue
<template>
  <BaseButton type="primary">主要按钮</BaseButton>
  <BaseButton type="success">成功按钮</BaseButton>
  <BaseButton type="warning">警告按钮</BaseButton>
  <BaseButton type="error">错误按钮</BaseButton>
  <BaseButton color="#ff0000">自定义颜色按钮</BaseButton>
</template>
```

## Props 属性

| 属性名 | 类型         | 默认值 | 说明                                                                                                            |
| ------ | ------------ | ------ | --------------------------------------------------------------------------------------------------------------- |
| type   | `ButtonType` | -      | 按钮类型，支持：'default'、'primary'、'ghost'、'dashed'、'link'、'text'、'warning'、'success'、'error'、'reset' |
| color  | `string`     | -      | 自定义按钮颜色                                                                                                  |

## 预设颜色

组件内置了以下预设颜色：

- success: 使用 Ant Design Vue 的 success 主题色
- warning: 使用 Ant Design Vue 的 warning 主题色
- error: 使用 Ant Design Vue 的 error 主题色

## 注意事项

1. 当使用自定义 `type` 或 `color` 时，按钮会自动设置为 `primary` 类型
2. 组件会自动继承 Ant Design Vue Button 的所有原生属性
3. 组件默认移除了按钮阴影效果，使界面更加扁平化

## 示例代码

```vue
<!-- 使用预设类型 -->
<BaseButton type="success">成功按钮</BaseButton>

<!-- 使用自定义颜色 -->
<BaseButton color="#1890ff">自定义颜色按钮</BaseButton>

<!-- 使用原生属性 -->
<BaseButton type="primary" :loading="true" :disabled="true">
  加载中
</BaseButton>
```

## 依赖

- ant-design-vue
- vue

这个组件是对 Ant Design Vue 按钮组件的增强封装，提供了更多的按钮类型和自定义选项，同时保持了与原生组件的一致性。
