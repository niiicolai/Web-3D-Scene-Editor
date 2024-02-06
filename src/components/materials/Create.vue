<template>
    <div class="materials__create">
        <h2>Create Material</h2>

        <div v-if="materialErrors.length > 0" class="error">
            <ul>
                <li v-for="error in materialErrors" :key="error">{{ error }}</li>
            </ul>
        </div>
        <input type="text" v-model="materialName" placeholder="Material Name" />

        <select v-model="materialTexturePack" class="materials__create__texture_pack__select">
            <option v-for="texturePack in texturePacks" :key="texturePack.name" :value="texturePack.name">{{ texturePack.name }}</option>
        </select>

        <select v-model="materialType" class="materials__create__type__select">
            <option v-for="type in types" :key="type" :value="type">{{ type }}</option>
        </select>

        <div class="materials__create__button__container">
            <button @click="createMaterial" class="materials__create__button">Create Material</button>
            <button @click="cancel" class="materials__create__button">Cancel</button>
        </div>
    </div>
</template>

<script setup>
import { useTextures } from '../../composables/textures.js';
import { useMaterials } from '../../composables/materials.js';
import { ref, defineEmits, computed } from 'vue';

const emits = defineEmits(['create', 'cancel']);

const textureManager = useTextures();
const texturePacks = ref(textureManager.texturePacks);

const materialManager = useMaterials();
const materialName = ref('');
const materialTexturePack = ref(texturePacks.value[0].name);
const materialType = ref('MeshStandardMaterial');
const materialErrors = ref([]);

const types = [
    'MeshStandardMaterial',
    'MeshBasicMaterial',
    'MeshLambertMaterial',
    'MeshPhongMaterial',
    'MeshToonMaterial',
    'MeshPhysicalMaterial',
    'MeshDepthMaterial',
    'MeshNormalMaterial',
]

const createMaterial = () => {
    materialErrors.value = [];

    if (!materialName.value) {
        materialErrors.value.push('Material name is required');
    }

    if (!materialTexturePack.value) {
        materialErrors.value.push('Texture pack is required');
    }

    if (!materialType.value) {
        materialErrors.value.push('Material type is required');
    }

    if (materialManager.findMaterial(materialName.value)) {
        materialErrors.value.push('Material name already exists');
    }

    if (materialErrors.value.length > 0) {
        return;
    }

    emits('create', {
        name: materialName.value,
        texture_pack: materialTexturePack.value,
        type: materialType.value,
        color: { r:0, g:0, b:0 },
    });
}


</script>

<style scoped>

</style>