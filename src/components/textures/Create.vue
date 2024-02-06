<template>
    <div class="textures__create">
        <h2>Create Texture Pack</h2>

        <div v-if="texturePackErrors.length > 0" class="error">
            <ul>
                <li v-for="error in texturePackErrors" :key="error">{{ error }}</li>
            </ul>
        </div>
        <input type="text" v-model="texturePackName" placeholder="Texture Pack Name" />

        <div class="textures__create__files">            
            <div v-for="file in textureFiles" :key="file.name" class="textures__create__file">
                <p class="textures__create__type">{{ file.type }}</p>

                <div class="textures__create__image">
                    <img :src="file.image.src" :alt="file.name" />
                </div>

                <div>
                    <button @click="removeFile(file)">Remove</button>
                </div>
            </div>
            <div v-if="textureFiles.length === 0">
                <p>No files added</p>
            </div>
        </div>

        <div class="textures__create__file__actions" v-if="availableTextureTypes.length > 0">
            <div v-if="textureFileError" class="error">{{ textureFileError }}</div>

            <input type="file" @change="onFileChange" ref="fileInputRef" />
            <select v-model="textureFileType">
                <option v-for="type in availableTextureTypes" :key="type" :value="type">{{ type }}</option>
            </select>

            <button @click="addFile">Add File</button>
        </div>
        <div v-else>
            <p>No more files can be added</p>
        </div>

        <div class="textures__create__button__container">
            <button @click="createTexturePack" class="textures__create__button">{{ createBtnText }}</button>
            <button @click="cancel" class="textures__create__button">Cancel</button>
        </div>
    </div>
</template>

<script setup>
import { useTextures } from '../../composables/textures.js';
import { ref, defineEmits, computed } from 'vue';

const props = defineProps({
    texturePack: {
        type: Object,
        default: () => {
            return {
                id: 0,
                name: '',
                textures: []
            }
        }
    }
});

const textureManager = useTextures();
const emits = defineEmits(['create', 'cancel']);

const startName = props.texturePack.name;
const startFiles = props.texturePack.textures.map(texture => {
    const image = new Image();
    image.src = texture.data.src;
    return {
        image,
        name: texture.data.src,
        type: texture.data.type
    }
});

const createBtnText = props.texturePack.id > 0 ? 'Update Texture Pack' : 'Create Texture Pack';
const texturePackName = ref(startName);
const texturePackErrors = ref([]);
const textureFiles = ref(startFiles);
const textureFileError = ref(null);
const textureFile = ref(null);

const textureFileReader = new FileReader();
const fileInputRef = ref(null);

const textureTypes = ref([
    'map',
    'normalMap',
    'specularMap'
]);
const availableTextureTypes = computed(() => {
    return textureTypes.value.filter(type => {
        return !textureFiles.value.find(file => file.type === type);
    });
});

const startFileType = startFiles.length > 0 ? availableTextureTypes.value[0] : 'map';
const textureFileType = ref(startFileType);

/**
 * Check if a texture pack with the same name already exists
 */
const texturePackExists = (name) => {
    return textureManager.texturePacks.value.find(pack => pack.name.toLowerCase() === name.toLowerCase());
}

/**
 * Reset texture file type
 */
const resetTextureFileType = () => {
    if (availableTextureTypes.value.length > 0) {
        textureFileType.value = availableTextureTypes.value[0];
    }
}

/**
 * File change callback
 * 
 * @param {Event} e 
 */
const onFileChange = (e) => {
    const files = e.target.files;
    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        textureFileReader.readAsDataURL(file);
        textureFile.value = file;
    }
}

/**
 * Add file to texture files
 */
const addFile = () => {

    if (textureFile.value === null) {
        textureFileError.value = 'No file selected';
        return;
    }

    if (textureFiles.value.find(file => file.name === textureFile.value.name)) {
        textureFileError.value = 'File already added';
        return;
    }

    if (textureFileType.value === null) {
        textureFileError.value = 'No file type selected';
        return;
    }

    textureFileError.value = null;

    const image = new Image();
    image.src = textureFileReader.result;
    image.onload = () => {
        textureFiles.value.push({ image, name: textureFile.value.name, type: textureFileType.value });
        fileInputRef.value.value = '';
        textureFile.value = null;
        resetTextureFileType();
    }
}

/**
 * Remove file from texture files
 * 
 * @param {Object} file 
 */
const removeFile = (file) => {
    const index = textureFiles.value.indexOf(file);
    textureFiles.value.splice(index, 1);
    resetTextureFileType();
}

/**
 * Create texture pack
 */
const createTexturePack = async () => {

    let errors = [];

    if (texturePackName.value === '') {
        errors.push('Texture pack name is required');
    }

    if (textureFiles.value.length === 0) {
        errors.push('At least one file is required');
    }

    if (texturePackExists(texturePackName.value)) {
        errors.push('Texture pack with the same name already exists');
    }

    if (errors.length > 0) {
        texturePackErrors.value = errors;
        return;
    }

    texturePackErrors.value = [];

    const texturePack = {
        name: texturePackName.value,
        textures: textureFiles.value.map(file => {
            return {
                src: file.image.src,
                data: file
            }
        })
    }

    if (props.texturePack.id > 0) {
        texturePack.id = props.texturePack.id;
    }

    emits('create', texturePack)

    texturePackName.value = '';
    textureFiles.value = [];
}

/**
 * Cancel texture pack creation
 */
const cancel = () => {
    emits('cancel');
    textureFileError.value = null;
    texturePackErrors.value = [];
    texturePackName.value = '';
    textureFiles.value = [];
}
</script>

<style scoped>

.textures__create input[type="text"] {
    width: 100%;
    padding: 0.5em;
}

.textures__create .error {
    color: red;
    margin-bottom: 1em;
    font-size: 0.8em;
}

.textures__create .error ul {
    padding-left: 1em;
}

.textures__create__files {
    margin-top: 1em;
    display: flex;
    flex-wrap: wrap;
    gap: 1em;
    border: 1px solid #ddd;
    padding: 1em;
}

.textures__create__file {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5em;
}

.textures__create__file p {
    margin-bottom: 0.5em;
    margin-top: 0;
    text-transform: capitalize;
    font-weight: bold;
}

.textures__create__image {
    width: 50px;
    height: 50px;
    overflow: hidden;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.textures__create__file__actions {
    margin-top: 1em;
    border: 1px solid #ddd;
    padding: 1em;
}

.textures__create__file__actions .error {
    color: red;
    margin-bottom: 1em;
}

.textures__create__file__actions input[type="file"] {
    margin-bottom: 1em;
    padding: 0.5em;
    width: 100%;
    background: #fff;
    border: 1px solid #000000;
}

.textures__create__file__actions select {
    margin-bottom: 1em;
    border: 1px solid #000000;
    padding: 0.5em;
    width: 100%;
}

.textures__create__file__actions button {
    padding: 0.5em 1em;
    background-color: #fff;
    border: 1px solid #000000;
    cursor: pointer;
}

.textures__create__button__container {
    display: flex;
    justify-content: space-between;
    margin-top: 1em;
}

.textures__create__button {
    margin-top: 1em;
    padding: 0.5em 1em;
    background-color: #fff;
    border: 1px solid #000000;
    cursor: pointer;
}
</style>