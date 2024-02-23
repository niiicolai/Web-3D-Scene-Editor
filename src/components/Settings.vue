<template>
  <div class="flex items-center gap-1">
    <button class="h-6 p-1 rounded text-white shadow-md"
      :class="gridVisibility ? 'bg-rose-500 hover:bg-rose-600' : 'bg-gray-800 hover:bg-gray-700'"
      title="Toggle grid visibility" @click="toggleGrid(editor)">
      <GridIcon width="1em" fill="white" />
    </button>

    <button class="h-6 p-1 rounded text-white shadow-md"
      :class="lightVisibility ? 'bg-rose-500 hover:bg-rose-600' : 'bg-gray-800 hover:bg-gray-700'"
      title="Toggle light visibility" @click="toggleLight(editor)">
      <LightIcon width=".75em" fill="white" />
    </button>

    <button class="h-6 p-1 rounded text-white shadow-md flex items-center gap-1"
      :class="lightHelperVisibility ? 'bg-rose-500 hover:bg-rose-600' : 'bg-gray-800 hover:bg-gray-700'"
      title="Toggle light helper visibility" @click="toggleLightHelper(editor)">
      <LightIcon width=".75em" fill="white" />
      <EyeIcon width=".75em" fill="white" />
    </button>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import GridIcon from './Icons/GridIcon.vue';
import LightIcon from './Icons/LightIcon.vue';
import EyeIcon from './Icons/EyeIcon.vue';
import SetGridVisibility from '../editor/src/view/commands/SetGridVisibility.js';
import SetLightVisibility from '../editor/plugins/object/commands/SetLightVisibility.js';
import SetLightHelperVisibility from '../editor/plugins/object/commands/SetLightHelperVisibility.js';

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

const lightVisibility = ref(true);
const toggleLight = (editor) => {
  lightVisibility.value = !lightVisibility.value;
  editor.invoke(new SetLightVisibility(lightVisibility.value));
}

const lightHelperVisibility = ref(true);
const toggleLightHelper = (editor) => {
  lightHelperVisibility.value = !lightHelperVisibility.value;
  editor.invoke(new SetLightHelperVisibility(lightHelperVisibility.value));
}
</script>