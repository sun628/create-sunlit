# SvgIcon 组件

这是一个基于 Vue 3 的 SVG 图标组件，支持自定义图标大小和颜色。

## 特性

- 支持多种图标前缀（svg、ant-design）
- 可自定义图标大小
- 可自定义图标颜色
- 使用 TypeScript 开发，提供完整的类型支持

## 使用方法

### 基础用法

```vue
<template>
  <SvgIcon name="icon-name" />
</template>
```

### 属性说明

| 属性名   | 类型                               | 默认值    | 说明             |
| -------- | ---------------------------------- | --------- | ---------------- |
| name     | string                             | -         | 图标名称（必填） |
| prefix   | 'ant-design' \| 'svg' \| undefined | 'svg'     | 图标前缀         |
| fontSize | string \| number                   | '0.24rem' | 图标大小         |
| color    | string                             | -         | 图标颜色         |

### 示例

```vue
<!-- 基础用法 -->
<SvgIcon name="home" />

<!-- 自定义大小 -->
<SvgIcon name="user" :fontSize="32" />

<!-- 自定义颜色 -->
<SvgIcon name="settings" color="#1890ff" />

<!-- 使用 ant-design 图标 -->
<SvgIcon name="user" prefix="ant-design" />
```

## 注意事项

1. 使用组件时必须提供 `name` 属性
2. `fontSize` 支持字符串（如 '0.24rem'）或数字类型
3. 图标前缀（prefix）默认为 'svg'，可选值为 'ant-design' 或 'svg'
4. ant-design 图标需要在 uno.config 中挂在

## 类型定义

```typescript
export type SvgIconProps = {
  name: string;
  prefix?: 'ant-design' | 'svg' | undefined;
  fontSize?: string;
  color?: string;
};
```
