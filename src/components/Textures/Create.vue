<template>
    <Form :errors="errors" class="text-black">
        <div class="input-control">
            <label class="text-sm">Name</label>
            <input type="text" class="w-full" v-model="name" />
        </div>

        <div class="input-control">
            <label class="text-sm">Type</label>
            <select class="w-full capitalize" v-model="type">
                <option v-for="textureType in textureTypes" :key="textureType" :value="textureType">
                    {{ textureType }}
                </option>
            </select>
        </div>

        <div class="input-control">
            <label class="text-sm">Image</label>
            <FileInput ref="imageInput" class="w-full" />
        </div>

        <div>
            <button class="w-full" type="submit" @click="submit">Submit</button>
        </div>
    </Form>
</template>

<script setup>
import Form from '../Form/Form.vue';
import FileInput from '../Form/FileInput.vue';
import ReadCache from '../../editor/plugins/cache/readers/ReadCache.js';
import LoadTexture from '../../editor/plugins/cache/commands/LoadTexture.js';
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

const type = ref('map');
const name = ref('');
const imageInput = ref(null);
const errors = ref([]);
const textureTypes = [
    'map',
    'normalMap',
    'displacementMap',
    'roughnessMap',
    'metalnessMap',
    'aoMap',
    'envMap',
    'lightMap'
];
const submit = () => {
    errors.value = [];

    if (!name.value) {
        errors.value.push('Name is required');
    }

    const exists = textures.value.find(texture => texture.texture.name === name.value);
    if (exists) {
        errors.value.push('Texture with the same name already exists');
    }

    if (!type.value) {
        errors.value.push('Type is required');
    }

    const file = imageInput.value.getFile();
    if (!file) {
        errors.value.push('Image is required');
    }

    if (errors.value.length > 0) {
        return;
    }

    errors.value = [];
    const reader = new FileReader();
    reader.onload = async () => {
        await props.editor.invoke(new LoadTexture(name.value, reader.result, type.value));
        textures.value = readTextures.read();
        imageInput.value.clear();
        name.value = '';
        type.value = textureTypes[0];
        toast.addToast('Texture created', 'success');
    };
    reader.readAsDataURL(file);
};
</script>