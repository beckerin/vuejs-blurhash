<template>
  <label class="root" :classes="innerClass" :for="id">
    <input
      :id="id"
      ref="file"
      @change="onChangeInputFile"
      type="file"
      :multiple="false"
      accept="image/*"
    />
    <template v-if="showText">
      <span class="text">Choose image</span>
    </template>
    <slot />
  </label>
</template>
<script setup lang="ts">
import { defineProps, VueElement, ref } from 'vue';
const props = withDefaults(
  defineProps<{
    children?: VueElement;
    innerClass?: string;
    id?: string;
    showText: boolean;
  }>(),
  {
    id: 'file-input',
  },
);
const emits = defineEmits<{
  (e: 'update:modelValue', file: File): void;
}>();

const file = ref<HTMLInputElement>();

function onChangeInputFile() {
  if (file.value) {
    const files = file.value.files as FileList;
    const single = files[0] as File;
    emits('update:modelValue', single);
  }
}
</script>
<style scoped>
input {
  width: 0.1px;
  height: 0.1px;
  opacity: 0;
  overflow: hidden;
  position: absolute;
  z-index: -1;
}
.root {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}
.text {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #777;
}
</style>
