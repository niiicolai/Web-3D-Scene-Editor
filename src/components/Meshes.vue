<template>
    <div class="meshes" v-if="inspector.isPanel('meshes')">
        <div v-if="isCreatingMesh" class="meshes__create">
            <Create @create="createMesh" @cancel="isCreatingMesh = false" />
        </div>

        <div v-else>
            <div class="meshes__header">
                <button @click="isCreatingMesh = !isCreatingObjisCreatingMeshct">Create Mesh</button>
            </div>

            <div class="meshes__list">
                <div v-for="mesh in meshes" :key="mesh.data.name">
                    <Item :mesh="mesh">
                        <template v-slot:actions="{ mesh }">
                            <button 
                                v-if="!meshesManager.isDefaultMesh(mesh.data.name)" 
                                @click="meshesManager.removeMesh(mesh.id)">Remove</button>
                        </template>
                    </Item>
                </div>
                
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useInspector } from '../composables/inspector.js';
import { useMeshes } from '../composables/meshes.js';
import Create from './meshes/Create.vue';
import Item from './meshes/Item.vue';

const inspector = useInspector();
const meshesManager = useMeshes();
const meshes = ref(meshesManager.meshes);
const isCreatingMesh = ref(false);

const createMesh = async (object) => {
    await meshesManager.loadMesh(object);
    isCreatingMesh.value = false;
}

onMounted(async () => {
    await meshesManager.init();
})
</script>

<style scoped>
.meshes__header {
    border-bottom: 1px solid #ddd;
}

.meshes__header button {
    padding: 0.5em 1em;
    width: 100%;
    background-color: #fff;
    border: 1px solid #ddd;
    border-radius: 5px;
    cursor: pointer;
}

.meshes {
    padding: 1em;
}

.meshes h2 {
    margin-bottom: 0em;
    margin-top: 0em;
}

.meshes button {
    margin-bottom: 0.5em;
    margin-top: 0em;
}
</style>