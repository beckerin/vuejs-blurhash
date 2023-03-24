<template>
  <div :style="computedStyle">
    <BlurhashCanvas
      :hash="hash"
      :height="resolutionY"
      :width="resolutionX"
      :punch="punch"
      :style="canvasStyle"
    />
  </div>
</template>
<script setup lang="ts">
import { computed, CSSProperties, onUpdated, ref } from 'vue';
import BlurhashCanvas from './BlurhashCanvas.vue';

const canvasStyle = ref<CSSProperties>({
  position: 'absolute',
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  width: '100%',
  height: '100%',
});

type BlurhashProps = {
  hash: string;
  /** CSS height, default: 128 */
  height?: number | string | 'auto';
  /** CSS width, default: 128 */
  width?: number | string | 'auto';
  punch?: number;
  /** Canvas Resolution X, default: 32, Must be greater than 0 */
  resolutionX?: number;
  /** Canvas Resolution Y, default: 32, Must be greater than 0 */
  resolutionY?: number;
  style?: CSSProperties;
};

const props = withDefaults(defineProps<BlurhashProps>(), {
  height: 128,
  width: 128,
  resolutionX: 32,
  resolutionY: 32,
});

const computedStyle = computed(
  () =>
    ({
      display: 'inline-block',
      position: 'relative',
      height: typeof props.height == 'number' ? props.height + 'px' : props.height,
      width: typeof props.width == 'number' ? props.width + 'px' : props.width,
      ...props.style,
    } as CSSProperties),
);

onUpdated(() => {
  if (props.resolutionX < 0) throw new Error('resolutionX Property must be greater than 0');
  if (props.resolutionY < 0) throw new Error('resolutionY Property must be greater than 0');
});
</script>
