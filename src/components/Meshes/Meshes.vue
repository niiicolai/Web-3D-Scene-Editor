<template>
    <div v-for="mesh in meshes" :key="mesh.mesh.name">
        <div class="flex items-center justify-between gap-3 overflow-hidden p-2">
            <p class="text-sm truncate">{{ mesh.mesh.name }}</p>

            <button class="bg-red-500 hover:bg-red-400 p-1 rounded" @click="dispose(mesh)">
                <MinusIcon width="1em" fill="white" />
            </button>
        </div>
    </div>
</template>

<script setup>
import MinusIcon from '../icons/MinusIcon.vue';
import DisposeMesh from '../../editor/plugins/cache/commands/DisposeMesh.js';
import CacheDisposeRefError from '../../editor/plugins/cache/errors/CacheDisposeRefError';
import ReadCache from '../../editor/plugins/cache/readers/ReadCache.js';
import { useToast } from '../../composables/useToast.js';
import { ref } from 'vue';

const props = defineProps({
    editor: {
        type: Object,
        required: true
    }
});

const toast = useToast();
const readMeshes = props.editor.newReader(ReadCache, 'meshes');
const meshes = ref(readMeshes.read());
const dispose = async (mesh) => {
    try {
        await props.editor.invoke(new DisposeMesh(mesh.mesh.name));
        meshes.value = readMeshes.read();
    } catch (error) {
        if (error instanceof CacheDisposeRefError) {
            const usedBy = error.usedBy.map((ref) => ref).join(', ');
            const message = `Mesh is in use by the following objects: ${usedBy}. Please remove all references to this mesh before disposing it`;
            toast.addToast(message, 'error', 10000);
        } else {
            toast.addToast(error, 'error');
        }
    }
};
</script>
