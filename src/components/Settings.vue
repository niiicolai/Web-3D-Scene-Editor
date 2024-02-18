<template>
    <div class="fixed right-0 top-0 flex items-center gap-1 p-3">

        <button class="px-2 py-1 text-xs rounded text-white bg-gray-800 hover:bg-gray-700"
                @click="randomizeColor(editor)">Randomize color</button>

        <button class="px-2 py-1 text-xs rounded text-white"
                :class="gridVisibility ? 'bg-rose-500 hover:bg-rose-600' : 'bg-gray-800 hover:bg-gray-700'"
                @click="toggleGrid(editor)">Grid</button>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import * as THREE from 'three';

import SetSceneColor from '../editor/commands/SetSceneColor.js';
import SetGridVisibility from '../editor/commands/SetGridVisibility.js';

const props = defineProps({
  editor: {
    type: Object,
    required: true
  }
});

const gridVisibility = ref(true);
const toggleGrid = (editor) => {
  gridVisibility.value = !gridVisibility.value;
  editor.invoke(new SetGridVisibility(gridVisibility.value));
}

const randomizeColor = (editor) => {
  const randomColor = new THREE.Color(Math.random(), Math.random(), Math.random());
  editor.invoke(new SetSceneColor(randomColor));
}
</script>