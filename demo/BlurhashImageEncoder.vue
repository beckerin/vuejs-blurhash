<template>
  <div class="root-encoder">
    <FileInput @update:modelValue="handleFileChange" :showText="!data">
      <div class="img-preview-container">
        <template v-if="data">
          <img class="img-preview" :src="data.imageUrl" />
          <span class="img-file-name">{{ data.file.name }}</span>
        </template>
      </div>
    </FileInput>

    <div class="settings">
      <h3>Encoding settings</h3>

      <Setting label="X components" :value="componentX">
        <input type="range" min="1" max="9" v-model="componentX" />
      </Setting>

      <Setting label="Y components" :value="componentY">
        <input type="range" min="1" max="9" v-model="componentY" />
      </Setting>
    </div>
    <div class="blurhash-result-container" v-if="blurhash">
      <h3>Blurhash result</h3>

      <div class="result-blurhash">{{ blurhash }}</div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { encode } from 'blurhash';
import { computed, ref } from 'vue';
import Setting from './Setting.vue';
import FileInput from './FileInput.vue';

const props = defineProps<{
  value?: string;
}>();
const emits = defineEmits<{
  (e: 'update:modelValue', hash: string): void;
}>();

const data = ref<{ file: File; imageUrl: string; imageData: ImageData } | undefined>();
const componentY = ref(4);
const componentX = ref(4);
const blurhash = computed(() =>
  data.value
    ? returnEncodeValue(
        data.value.imageData.data,
        data.value.imageData.width,
        data.value.imageData.height,
        componentX.value,
        componentY.value,
      )
    : undefined,
);
const returnEncodeValue = (
  data: Uint8ClampedArray,
  width: number,
  height: number,
  componentX: number,
  componentY: number,
): string => {
  const hash = encode(data, width, height, componentX, componentY);
  emits('update:modelValue', hash);
  return hash;
};

const getClampedSize = (
  width: number,
  height: number,
  max: number,
): { width: number; height: number } => {
  if (width >= height && width > max) {
    return { width: max, height: Math.round((height / width) * max) };
  }

  if (height > width && height > max) {
    return { width: Math.round((width / height) * max), height: max };
  }

  return { width, height };
};

const loadImage = async (src: string): Promise<HTMLImageElement> =>
  new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = (...args) => reject(args);
    img.src = src;
  });

const getImageData = (image: HTMLImageElement, resolutionX: number, resolutionY: number) => {
  const canvas = document.createElement('canvas');
  canvas.width = resolutionX;
  canvas.height = resolutionY;
  const context = canvas.getContext('2d') as CanvasRenderingContext2D;
  context.drawImage(image, 0, 0, resolutionX, resolutionY);
  return context.getImageData(0, 0, resolutionX, resolutionY);
};

const handleFileChange = async (file: File) => {
  const imageUrl = URL.createObjectURL(file);

  const img = await loadImage(imageUrl);
  const clampSize = getClampedSize(img.width, img.height, 64);
  const imageData = getImageData(img, clampSize.width, clampSize.height);

  data.value = { file, imageUrl, imageData };
};
</script>
<style scoped>
.root-encoder {
  border: 1px solid #e4e4e4;
  border-radius: 4px;
}
.settings {
  border-top: 1px solid #e4e4e4;
  padding: 15px;
}
.result-blurhash {
  overflow-wrap: break-word;
  font-size: 1.05em;
  font-family: monospace;
  width: 100%;
  box-sizing: border-box;
}
input {
  width: 300px;
}
h3 {
  font-weight: 600;
  font-size: 1em;
  color: #777;
  margin: 0 0 10px 0;
}
.blurhash-result-container {
  padding: 15px;
  border-top: 1px solid #e4e4e4;
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
}
.img-preview-container {
  position: relative;
  display: flex;
  width: 100%;
  max-width: 1024px;
  height: 400px;
  overflow: hidden;
}
.img-preview {
  width: 100%;
  background: #f4f4f4;
  object-fit: contain;
  object-position: 50% 50%;
}
.img-file-name {
  position: absolute;
  right: 10px;
  bottom: 10px;
  font-size: 0.75em;
  color: white;
  padding: 1px 3px;
  border-radius: 2px;
  background-color: rgba(30, 30, 30, 0.6);
}
</style>
