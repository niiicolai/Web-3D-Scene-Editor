<template>
    <div v-for="object in objects" :key="object.name">
        <div class="flex items-center gap-3 overflow-hidden p-2">
            <p class="text-sm truncate">{{ object.name }}</p>
        </div>
    </div>
</template>

<script setup>
import ReadObjects from '../editor/plugins/object/readers/ReadObjects.js';
import { computed } from 'vue';

const props = defineProps({
    editor: {
        type: Object,
        required: true
    }
});

const readObjects = props.editor.newReader(ReadObjects);
const objects = computed(() => readObjects.read());
</script>
