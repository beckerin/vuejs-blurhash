<template>
  <div class="root">
    <label class="label">{{ label }}</label>
    <slot />
    <div class="value">{{ value }}</div>
  </div>
</template>
<script setup lang="ts">
import { defineProps, VueElement } from 'vue';
const props = defineProps<{
  label: string;
  children?: VueElement;
  value: any;
}>();
</script>
<style scoped>
.root {
  display: flex;
}
.label {
  width: 120px;
  white-space: pre;
  font-size: 0.9em;
  font-family: monospace, monospace;
}
.value {
  margin-left: 8px;
  white-space: pre;
  font-size: 0.9em;
  font-family: monospace, monospace;
}

.root + .root {
  margin-top: 10px;
}
</style>
