<template>
    <div class="flex items-center gap-1">
        <button v-for="tool in tools" :key="tool.name"
            class="px-2 py-1 text-xs rounded text-white shadow-md"
            :class="tool.handler.isActive ? 'bg-rose-500 hover:bg-rose-600' : 'bg-gray-800 hover:bg-gray-700'"
            @click="toggleTool(tool.handler)">
            <div class="flex flex-col items-center gap-0 mt-1">
              <MoveIcon v-if="tool.name === 'Move'" width="1.3em" fill="white" />
              <RotateIcon v-if="tool.name === 'Rotate'" width="1.3em" fill="white" />
              <ScaleIcon v-if="tool.name === 'Scale'" width="1.3em" fill="white" />
              <MirrorIcon v-if="tool.name === 'Mirror'" width="1.64em" fill="white" />

              <span class="uppercase font-bold tracking-wider" style="font-size: 0.8em;">{{ tool.name }}</span>
            </div>
          </button>
    </div>
</template>

<script setup>
import { ref } from 'vue';

import MoveIcon from './Icons/MoveIcon.vue';
import RotateIcon from './Icons/RotateIcon.vue';
import ScaleIcon from './Icons/ScaleIcon.vue';
import MirrorIcon from './Icons/MirrorIcon.vue';

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