<template>
    <div v-for="material in materials" :key="material.material.name">
        <div class="flex items-center justify-between gap-3 overflow-hidden p-2">
            <p class="text-sm truncate">{{ material.material.name }}</p>

            <button class="bg-red-500 hover:bg-red-400 p-1 rounded" @click="dispose(material)">
                <MinusIcon width="1em" fill="white" />
            </button>
        </div>
    </div>
</template>

<script setup>
import MinusIcon from '../icons/MinusIcon.vue';
import DisposeMaterial from '../../editor/plugins/cache/commands/DisposeMaterial.js';
import ReadCache from '../../editor/plugins/cache/readers/ReadCache.js';
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
const readMaterials = props.editor.newReader(ReadCache, 'materials');
const materials = ref(readMaterials.read());

const dispose = async (material) => {
    try {
        await props.editor.invoke(new DisposeMaterial(material.material.name));
        materials.value = readMaterials.read();
    } catch (error) {
        if (error instanceof CacheDisposeRefError) {
            const usedBy = error.usedBy.map((ref) => ref).join(', ');
            const message = `Material is in use by the following meshes: ${usedBy}. Please remove all references to this material before disposing it`;
            toast.addToast(message, 'error', 10000);
        } else {
            toast.addToast(error, 'error');
        }
    }
};
</script>
