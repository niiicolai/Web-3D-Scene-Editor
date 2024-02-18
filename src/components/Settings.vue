<template>
  <div>
    <button class="p-1 rounded text-white shadow-md"
      :class="gridVisibility ? 'bg-rose-500 hover:bg-rose-600' : 'bg-gray-800 hover:bg-gray-700'"
      title="Toggle grid visibility" @click="toggleGrid(editor)">
      <GridIcon width="1em" fill="white" />
    </button>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import GridIcon from './Icons/GridIcon.vue';
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
</script>