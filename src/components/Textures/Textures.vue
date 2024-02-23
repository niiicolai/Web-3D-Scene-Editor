<template>
    <div v-for="texture in textures" :key="texture.texture.name">
        <div class="flex items-center justify-between gap-3 overflow-hidden pr-1">
            <img :src="texture.texture.image.src" class="w-8 h-8" />
            <p class="text-sm truncate">{{ texture.texture.name }}</p>

            <button class="bg-red-500 hover:bg-red-400 p-1 rounded" @click="dispose(texture)">
                <MinusIcon width="1em" fill="white" />
            </button>
        </div>
    </div>
</template>

<script setup>
import MinusIcon from '../icons/MinusIcon.vue';
import ReadCache from '../../editor/plugins/cache/readers/ReadCache.js';
import DisposeTexture from '../../editor/plugins/cache/commands/DisposeTexture.js';
import CacheDisposeRefError from '../../editor/plugins/cache/errors/CacheDisposeRefError';
import { useToast } from '../../composables/useToast.js';
import { ref } from 'vue';

const props = defineProps({
    editor: {
        type: Object,
        required: true
    }
});

const toast = useToast();
const readTextures = props.editor.newReader(ReadCache, 'textures');
const textures = ref(readTextures.read()); 

const dispose = async (texture) => {
    try {
        await props.editor.invoke(new DisposeTexture(texture.texture.name));
        textures.value = readTextures.read();
    } catch (error) {
        if (error instanceof CacheDisposeRefError) {
            const usedBy = error.usedBy.map((ref) => ref).join(', ');
            const message = `Texture is in use by the following materials: ${usedBy}. Please remove all references to this texture before disposing it`;
            toast.addToast(message, 'error', 10000);
        } else {
            toast.addToast(error, 'error');
        }
    }
};
</script>
