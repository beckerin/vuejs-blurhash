import { defineConfig, build } from 'tsup';

export default defineConfig([
  {
    name: 'main',
    entry: ['./src/index.ts'],
    format: ['cjs', 'esm'],
    legacyOutput: true,
    sourcemap: true,
    clean: true,
    splitting: false,
    dts: false,
    minify: true,
  },
  {
    name: 'typedefs',
    entry: ['./src/index.ts'],
    clean: false,
    loader: require('vue-loader'),
    dts: {
      only: true,
    },
  },
]);
