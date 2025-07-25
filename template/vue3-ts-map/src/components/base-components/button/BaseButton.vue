<template>
  <ConfigProvider :theme="ButtonTheme">
    <Button v-bind="{ ...$attrs, ...buttonProps }" :type="buttonType" :class="buttonCls">
      <template v-for="(_, slotName) of $slots" #[slotName]>
        <slot :name="slotName" />
      </template>
      <template v-if="props.text">{{ props.text }}</template>
    </Button>
  </ConfigProvider>
</template>
<script lang="ts" setup>
import { computed } from 'vue';
import { Button, ConfigProvider } from 'ant-design-vue';
import { aButtonTypes, buttonColorPrimary, type AButtonType, type ButtonProps } from './types';
import { useNamespace } from '@/hooks';
const ns = useNamespace('button');
const buttonCls = ns.b();

defineOptions({
  name: 'BaseButton'
});

const props = defineProps<ButtonProps>();

const { color: _, type: __, ...buttonProps } = props;

const isCustomType = computed(() => Reflect.has(buttonColorPrimary, props.type!));

const buttonType = computed<AButtonType>(() => {
  if (props.type && aButtonTypes.includes(props.type)) {
    return props.type as AButtonType;
  } else if (props.color || isCustomType.value) {
    return 'primary';
  }
  return 'default';
});

const ButtonTheme = computed(() => {
  if (props.color || isCustomType.value) {
    const type = props.type as keyof typeof buttonColorPrimary;
    const colorPrimary = props.color || buttonColorPrimary[type];
    return {
      token: {
        colorPrimary: colorPrimary
      }
    };
  }
  return void 0;
});
</script>
<style lang="less" scoped>
.base-button {
  box-shadow: none;
}
</style>
