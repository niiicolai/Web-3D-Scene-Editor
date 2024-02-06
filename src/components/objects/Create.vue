<template>
    <div class="objects__create">
        <h2>Add Object</h2>

        <div v-if="objectErrors.length > 0" class="error">
            <ul>
                <li v-for="error in objectErrors" :key="error">{{ error }}</li>
            </ul>
        </div>

        <select v-model="objectMeshName" class="objects__create__mesh__select">
            <option v-for="mesh in meshes" :key="mesh.data.name" :value="mesh.data.name">{{ mesh.data.name }}</option>
        </select>

        <div class="objects__create__button__container">
            <button @click="addObject" class="objects__create__button">Add Object</button>
            <button @click="cancel" class="objects__create__button">Cancel</button>
        </div>
    </div>
</template>

<script setup>
import { useMeshes } from '../../composables/meshes.js';
import { ref, defineEmits, computed } from 'vue';

const emits = defineEmits(['create', 'cancel']);

const meshesManager = useMeshes();
const meshes = ref(meshesManager.meshes);

const objectMeshName = ref(meshes.value[0].data.name);
const objectErrors = ref([]);

const addObject = async () => {
    objectErrors.value = [];

    if (!objectMeshName.value) {
        objectErrors.value.push('Mesh is required');
    }

    if (objectErrors.value.length > 0) {
        return;
    }

    const mesh = meshes.value.find(mesh => mesh.data.name === objectMeshName.value);
    emits('create', { ...mesh.data });
}

</script>

<style scoped>

</style>