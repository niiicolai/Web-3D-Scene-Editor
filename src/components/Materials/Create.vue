<template>
    <Form :errors="errors" class="text-black">

        <div class="input-control">
            <label class="text-sm">Name</label>
            <input type="text" class="w-full" v-model="name" />
        </div>

        <div class="input-control">
            <label class="text-sm">Type</label>
            <select class="w-full capitalize" v-model="type">
                <option v-for="materialType in materialTypes" :key="materialType" :value="materialType">
                    {{ materialType }}
                </option>
            </select>
        </div>

        <div class="input-control">
            <label class="text-sm">Textures</label>
            <MultipleSelect ref="multipleSelectRef" :resources="filteredTextures"
                @error="onMultipleSelectError" @success="onMultipleSelectSuccess">
                <template #selected="{ selected }">
                    <div class="flex items-center gap-3 mb-1">
                        <img :src="selected.texture.image.src" class="w-8 h-8 rounded" />
                        <p class="text-sm truncate">{{ selected.texture.name }}</p>
                    </div>
                </template>

                <template #no_selected>
                    <p class="text-sm">No textures added</p>
                </template>

                <template #resource_option="{ option }">
                    {{ option.texture.name }}
                </template>

                <template #no_options>
                    <p class="text-sm">No textures or types available</p>
                </template>

            </MultipleSelect>
        </div>

        <div>
            <button class="w-full" type="submit" @click="submit">Submit</button>
        </div>
    </Form>
</template>

<script setup>
import Form from '../Form/Form.vue';
import MultipleSelect from '../Form/MultipleSelect.vue';
import ReadCache from '../../editor/plugins/cache/readers/ReadCache.js';
import LoadMaterial from '../../editor/plugins/cache/commands/LoadMaterial.js';
import { ref, computed } from 'vue';

const props = defineProps({
    editor: {
        type: Object,
        required: true
    }
});

const readTextures = props.editor.newReader(ReadCache, 'textures');
const readMaterials = props.editor.newReader(ReadCache, 'materials');

const materials = ref(readMaterials.read());
const textures = ref(readTextures.read());

const multipleSelectRef = ref();
const selectedTextures = computed(() => multipleSelectRef.value?.selectedResources ?? []);
const filteredTextures = computed(() => {
    if (selectedTextures.value.length === 0) {
        return textures.value;
    }

    return textures.value.filter(texture => {
        const selectedTypes = selectedTextures.value.map(addedTexture => addedTexture.type);
        const selectedNames = selectedTextures.value.map(addedTexture => addedTexture.texture.name);
        
        return !selectedNames.includes(texture.texture.name) && !selectedTypes.includes(texture.type);
    });
});
const onMultipleSelectError = (error) => {
    if (error === 'no_resource_selected') {
        errors.value = ['Cannot add empty texture'];
    } else if (error === 'resource_already_selected') {
        errors.value = ['Texture already added'];
    } else {
        throw new Error(`Unsupported error: ${error}`);
    }
};

const onMultipleSelectSuccess = (success) => {
    errors.value = [];
};

const errors = ref([]);
const name = ref('');
const materialTypes = [
    'MeshStandardMaterial',
    'MeshBasicMaterial',
    'MeshPhysicalMaterial',
    'MeshLambertMaterial',
    'MeshToonMaterial',
    'MeshPhongMaterial',
    'MeshNormalMaterial'
];
const type = ref(materialTypes[0]);
const submit = async () => {
    errors.value = [];

    if (!name.value) {
        errors.value.push('Name is required');
    }

    if (!type.value) {
        errors.value.push('Type is required');
    }

    if (selectedTextures.value.length === 0) {
        errors.value.push('At least one texture is required');
    }

    const isNameTaken = materials.value.some(material => material.material.name === name.value);
    if (isNameTaken) {
        errors.value.push('Name is already taken');
    }

    if (errors.value.length > 0) {
        return;
    }

    errors.value = [];
    
    const textureNames = selectedTextures.value.map(selected => selected.texture.name);
    await props.editor.invoke(new LoadMaterial(name.value, type.value, textureNames));
    materials.value = readMaterials.read();
    name.value = '';
    type.value = materialTypes[0];
    multipleSelectRef.value.clear();
};
</script>