# 基础组件（目录说明）

| 组件名称    | 述                                                                                             | 是否全局组件 | 使用建议 |
| ----------- | ------------------------------------------------------------------------------------------------ | ------------ | -------- |
| Button      | `按钮组件`基于 a-button 二次封装，主要扩展了按钮的颜色，基本使用方式与 antd 的 a-button 保持一致 | 是           | --       |
| Tab         | `tab组件` 实现tab切换效果                                                                        | 否           | --       |
| RangePicker | `RangePicker组件` 基于 a-range-picker 二次封装，拓展使用方式，详情见下文                         | 否           | --       |

<br/>

## Button 按钮组件

### Button 属性

| 属性名 | 说明           | 类型   | 可选值 | 默认值 |
| ------ | -------------- | ------ | ------ | ------ |
| color  | 自定义按钮颜色 | string | --     | --     |

<br/>

## Tab tab切换组件

### Tab 属性

| 属性名 | 说明    | 类型          | 可选值 | 默认值 |
| ------ | ------- | ------------- | ------ | ------ |
| label  | tab名称 | string        | --     | --     |
| value  | tab值   | string/number | --     | --     |

### Tab 事件

| 事件名 | 说明            | 回调参数        |
| ------ | --------------- | --------------- |
| change | tab切换时会触发 | (item: TabItem) |

<br/>

## RangePicker 日期范围组件

### RangePicker 属性

| 属性名      | 说明                            | 类型                            | 可选值 | 默认值                                                       |
| ----------- | ------------------------------- | ------------------------------- | ------ | ------------------------------------------------------------ |
| showTime    | showTime 是否展示时间           | boolean                         | --     | true                                                         |
| format      | 日期格式化,默认值关联showTime   | string                          | --     | showTime是否为true: 'YYYY-MM-DD HH:mm:ss', 否则 'YYYY-MM-DD' |
| valueFormat | 日期值格式化,默认值关联showTime | string                          | --     | showTime是否为true:'YYYY-MM-DD HH:mm:ss', 否则 'YYYY-MM-DD'  |
| presets     | 预设时间范围快捷选择            | { label: slot, value: dayjs }[] | --     |                                                              |

    [{ label: '过去七天', value: [dayjs().add(-7, 'd'), dayjs()] },
    { label: '过去一个月', value: [dayjs().add(-30, 'd'), dayjs()] },
    { label: '过去三个月', value: [dayjs().add(-90, 'd'), dayjs()] },]

|
|disabledDate | 不可选择的日期|(currentDate: dayjs) => boolean|--|默认不可选择今日之后|
