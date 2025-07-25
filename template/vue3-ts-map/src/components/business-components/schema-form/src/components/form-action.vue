<template>
  <Col v-if="showActionButtonGroup" v-bind="actionColOpt">
    <div style="width: 100%" :style="{ textAlign: actionColOpt.style.textAlign }">
      <FormItem>
        <slot name="resetBefore" />
        <BaseButton
          v-if="showResetButton"
          type="default"
          class="mr-2"
          v-bind="getResetBtnOptions"
          @click="resetFields"
        >
          {{ getResetBtnOptions.text }}
        </BaseButton>
        <slot name="submitBefore" />

        <BaseButton
          v-if="showSubmitButton"
          type="primary"
          class="mr-2"
          v-bind="getSubmitBtnOptions"
          @click="handleSubmit($event)"
        >
          {{ getSubmitBtnOptions.text }}
        </BaseButton>
        <slot />
      </FormItem>
    </div>
  </Col>
</template>
<script lang="ts" setup>
import { computed, type PropType } from 'vue';
import type { ButtonProps } from '@base-components/button';
import { useFormContext } from '../hooks/useFormContext';
import BaseButton from '@base-components/button';
import type { ColEx } from '../types/component';
import { Form, Col } from 'ant-design-vue';

const FormItem = Form.Item;
type ButtonOptions = Partial<ButtonProps> & { text: string };

defineOptions({
  name: 'FormAction',
  inheritAttrs: false
});

const props = defineProps({
  showActionButtonGroup: {
    type: Boolean,
    default: true
  },
  showResetButton: {
    type: Boolean,
    default: true
  },
  showSubmitButton: {
    type: Boolean,
    default: true
  },
  resetButtonOptions: {
    type: Object as PropType<ButtonOptions>,
    default: () => ({})
  },
  submitButtonOptions: {
    type: Object as PropType<ButtonOptions>,
    default: () => ({})
  },
  actionColOptions: {
    type: Object as PropType<Partial<ColEx>>,
    default: () => ({})
  }
});

const { resetFields, submit } = useFormContext();
const actionColOpt = computed(() => {
  const actionColOpt: Partial<ColEx> = {
    style: { textAlign: 'right' },
    span: 4,
    ...props.actionColOptions
  };
  return actionColOpt;
});

const getResetBtnOptions = computed((): ButtonOptions => {
  return Object.assign(
    {
      text: '重置'
    },
    props.resetButtonOptions
  );
});

const getSubmitBtnOptions = computed(() => {
  return Object.assign(
    {
      text: '查询'
    },
    props.submitButtonOptions
  );
});

const handleSubmit = async (e: Event) => {
  await submit(e).catch(() => {});
};
</script>
