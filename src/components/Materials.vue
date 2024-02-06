<template>
    <div class="materials" v-if="inspector.isPanel('materials')">
        <div v-if="isCreatingMaterial" class="materials__create">
            <Create @create="createMaterial" @cancel="isCreatingMaterial = false" />
        </div>

        <div v-else>
            <div class="materials__header">
                <button @click="isCreatingMaterial = !isCreatingMaterial">Create Material</button>
            </div>

            <div class="materials__list">
                <div v-for="material in materials" :key="material.data.name">
                    <Item :material="material">
                        <template v-slot:actions="{ material }">
                            <button 
                                v-if="!materialManager.isDefaultMaterial(material.data.name)" 
                                @click="materialManager.removeMaterial(material.id)">Remove</button>
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
import { useMaterials } from '../composables/materials.js';
import Create from './materials/Create.vue';
import Item from './materials/Item.vue';

const inspector = useInspector();
const materialManager = useMaterials();
const materials = ref(materialManager.materials);
const isCreatingMaterial = ref(false);

const createMaterial = async (material) => {
    await materialManager.loadMaterial(material);
    isCreatingMaterial.value = false;
}

</script>

<style scoped>
.materials__header {
    border-bottom: 1px solid #ddd;
}

.materials__header button {
    padding: 0.5em 1em;
    width: 100%;
    background-color: #fff;
    border: 1px solid #ddd;
    border-radius: 5px;
    cursor: pointer;
}

.materials {
    padding: 1em;
}

.materials h2 {
    margin-bottom: 0em;
    margin-top: 0em;
}

.materials button {
    margin-bottom: 0.5em;
    margin-top: 0em;
}
</style>