<template>
    <div v-for="texture in textures" :key="texture.texture.name">
        <div class="flex items-center gap-3 overflow-hidden">
            <img :src="texture.texture.image.src" class="w-8 h-8" />
            <p class="text-sm truncate">{{ texture.texture.name }}</p>
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

const readTextures = props.editor.newReader(ReadCache, 'textures');
const textures = computed(() => readTextures.read()); 
</script>
