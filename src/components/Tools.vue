<template>
    <div class="flex items-center gap-1">
        <button v-for="tool in tools" :key="tool.name"
            class="px-2 py-1 text-xs rounded text-white"
            :class="tool.handler.isActive ? 'bg-rose-500 hover:bg-rose-600' : 'bg-gray-800 hover:bg-gray-700'"
            @click="toggleTool(tool.handler)">{{ tool.name }}</button>
    </div>
</template>

<script setup>
import { ref } from 'vue';

import MoveTool from '../editor/tools/MoveTool.js';
import RotateTool from '../editor/tools/RotateTool.js';
import ScaleTool from '../editor/tools/ScaleTool.js';
import MirrorTool from '../editor/tools/MirrorTool.js';

const props = defineProps({
  editor: {
    type: Object,
    required: true
  }
});

const tools = ref([
  { name: 'Move', handler: new MoveTool() },
  { name: 'Rotate', handler: new RotateTool() },
  { name: 'Scale', handler: new ScaleTool() },
  { name: 'Mirror', handler: new MirrorTool() }
]);

const toggleTool = (tool) => {
  if (props.editor.isTool(tool)) {
    props.editor.deactivateTool();
  } else {
    props.editor.activateTool(tool);
  }
}
</script>