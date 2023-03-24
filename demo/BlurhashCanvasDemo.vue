<template>
  <div>
    <div class="settings-container">
      <Setting label="size" :value="`${size} (px)`">
        <input
          type="range"
          :min="1"
          :max="1024"
          :step="8"
          :value="size"
          @input="(ev: any) => size = parseInt(ev.target.value)"
        />
      </Setting>

      <Setting label="punch" :value="punch">
        <input
          type="range"
          :min="0"
          :max="20"
          :step="1"
          :value="punch"
          @input="(ev: any) => punch = parseInt(ev.target.value)"
        />
      </Setting>
    </div>

    <div class="blurhash-container">
      <BlurhashCanvas :hash="props.hash" :height="size" :width="size" :punch="punch" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { BlurhashCanvas } from '../src';
import Setting from './Setting.vue';

const size = ref(256);
const punch = ref(1);

const props = defineProps<{
  hash: string;
}>();
</script>
<style scoped>
input {
  width: 300px;
}
.settings-container {
  padding: 15px;
  display: inline-block;
  background-color: #f5f5f5;
  border: 1px solid #e4e4e4;
  border-radius: 4px;
}

.blurhash-container {
  margin-top: 18px;
}
</style>
