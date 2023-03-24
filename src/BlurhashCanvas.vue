<template>
  <canvas
    id="blurhash-canvas"
    :punch="props.punch"
    :height="props.height"
    :width="props.width"
    :ref="handleRef"
  />
</template>
<script setup lang="ts">
import { decode } from 'blurhash';
import { ref, withDefaults } from 'vue';

type Props = {
  hash: string;
  height?: number;
  punch?: number;
  width?: number;
};
const props = withDefaults(defineProps<Props>(), {
  height: 128,
  width: 128,
});

const blurhash = ref<HTMLCanvasElement>();

const handleRef = (canvas: HTMLCanvasElement) => {
  blurhash.value = canvas;
  draw();
};

const draw = () => {
  if (blurhash.value) {
    const pixels = decode(props.hash, props.width, props.height, props.punch);

    const ctx = blurhash.value.getContext('2d');
    const imageData = ctx.createImageData(props.width, props.height);
    imageData.data.set(pixels);
    ctx.putImageData(imageData, 0, 0);
  }
};
</script>
