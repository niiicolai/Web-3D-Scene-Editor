<template>
    <div v-for="material in materials" :key="material.material.name">
        <div class="flex items-center gap-3 overflow-hidden p-2">
            <p class="text-sm truncate">{{ material.material.name }}</p>
        </div>
    </div>
</template>

<script setup>
import ReadCache from '../editor/plugins/cache/readers/ReadCache.js';

import { computed } from 'vue';
const props = defineProps({
    editor: {
        type: Object,
        required: true
    }
});

const readMaterials = props.editor.newReader(ReadCache, 'materials');
const materials = computed(() => readMaterials.read());
</script>
