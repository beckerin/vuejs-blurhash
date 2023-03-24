<template>
  <div class="root">
    <h1 style="margin: 24px 0">vuejs-blurhash demo</h1>
    <hr />

    <div class="mode-select">
      <label for="option-1" class="radio-input">
        <input
          type="radio"
          id="option-1"
          @change="(e: any) => (mode = e.target.value)"
          v-model="mode"
          value="hash"
          :checked="mode === 'hash'"
        />
        Blurhash string
      </label>

      <label for="option-2" class="radio-input">
        <input
          type="radio"
          id="option-2"
          @change="(e: any) => (mode = e.target.value)"
          v-model="mode"
          value="image"
          :checked="mode === 'image'"
        />
        Encode image
      </label>
    </div>
    <template v-if="mode === 'hash'">
      <input class="text-input" v-model="hashInput" />
    </template>
    <template v-if="mode === 'image'">
      <div class="hint">Note: encoding is done in the browser only (no server involved)!</div>
      <BlurhashImageEncoder v-model="encodedHash" />
    </template>

    <template v-if="hash && !blurhashValid.result">
      <div class="blurhashError">
        <strong>Invalid blurhash</strong> - {{ blurhashValid.errorReason }}
      </div>
    </template>
    <template v-if="blurhashValid.result">
      <hr />
      <h2>
        <pre class="code">{{'<Blurhash />'}}</pre>
      </h2>
      <BlurhashDemo :hash="hash" />
      <hr />
      <h2>
        <pre class="code">{{'<BlurhashCanvas />'}}</pre>
      </h2>
      <BlurhashCanvasDemo :hash="hash" />
    </template>

    <footer>
      <ul>
        <li>
          <a href="https://github.com/woltapp/react-blurhash" target="_blank">vuejs-blurhash</a>
        </li>
        <li>
          <a href="https://github.com/woltapp/blurhash/tree/master/TypeScript" target="_blank"
            >Blurhash TypeScript</a
          >
        </li>
        <li>
          <a href="https://blurha.sh" target="_blank">Blurhash website</a>
        </li>
      </ul>
    </footer>
  </div>
</template>
<script setup lang="ts">
import { ref, computed } from 'vue';
import { isBlurhashValid } from 'blurhash';
import BlurhashCanvasDemo from './BlurhashCanvasDemo.vue';
import BlurhashImageEncoder from './BlurhashImageEncoder.vue';
import BlurhashDemo from './BlurhashDemo.vue';

const mode = ref('hash');
const hashInput = ref('LEHV6nWB2yk8pyo0adR*.7kCMdnj');
const encodedHash = ref('');
const hash = computed(() => (mode.value === 'hash' ? hashInput : encodedHash).value);
const blurhashValid = computed(() => isBlurhashValid(hash.value));
</script>

<style>
h1 {
  margin: 24px 0;
}
h2 {
  font-size: 1.4em;
}
.root {
  margin: 0 auto;
  max-width: 1024px;
  font-family: sans-serif;
}
.blurhashError {
  margin-top: 10px;
  color: #cc4260;
  font-weight: 500;
  font-size: 0.9em;
}
.code {
  margin: 0;
  padding: 0;
  display: inline-block;
  font-family: monospace, monospace;
}
.hint {
  font-size: 0.8em;
  color: #999;
  margin: 8px 0;
}
hr {
  height: 1px;
  background-color: #e0e0e0;
  border: none;
  margin: 24px 0;
}
.mode-select {
  margin: 15px 0;
}
.radio-input {
  display: inline-flex;
  align-items: center;
}
.radio-input input {
  margin-right: 5px;
}
.radio-input + .radio-input {
  margin-left: 14px;
}
.text-input {
  white-space: pre;
  font-size: 1em;
  font-family: monospace;
  padding: 8px;
  border-radius: 4px;
  border: 2px solid #d8d8d8;
  width: 100%;
  box-sizing: border-box;
  outline: none;
}
.text-input:focus {
  border-color: #8ab7ea;
}
footer {
  border-top: 1px solid rgb(242, 242, 242);
  margin-top: 40px;
  padding: 15px 10px;
  text-align: center;
  font-size: 0.9em;
}
footer ul {
  list-style: none;
  white-space: nowrap;
}

footer li {
  position: relative;
  display: inline;
}
footer li + li {
  margin-left: 24px;
}
footer li + li::after {
  position: absolute;
  top: 0px;
  left: -15px;
  content: '·';
  color: #c8c8c8;
}
footer a {
  color: #c8c8c8;
  text-decoration: none;
}
footer a:hover {
  color: #3d50ff;
}
footer a:active {
  color: #041ae5;
}
</style>
