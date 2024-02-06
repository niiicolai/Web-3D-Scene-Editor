<template>
    <div class="meshes__create">
        <h2>Create Mesh</h2>

        <div v-if="meshErrors.length > 0" class="error">
            <ul>
                <li v-for="error in meshErrors" :key="error">{{ error }}</li>
            </ul>
        </div>
        
        <input type="text" v-model="meshName" placeholder="Mesh Name" />

        <div>
            <label for="meshGLTFInputRef">GLTF File</label>
            <input type="file" ref="meshGLTFInputRef" @change="onGLTFChange" />
        </div>

        <div>
            <label for="meshThumbnailInputRef">Thumbnail</label>
            <input type="file" ref="meshThumbnailInputRef" @change="onThumbnailChange" />
        </div>
        
        <div class="meshes__create__submeshes">
            <h3>SubMeshes</h3>
            <div v-if="meshSubMeshesErrors.length > 0" class="error">
                <ul>
                    <li v-for="error in meshSubMeshesErrors" :key="error">{{ error }}</li>
                </ul>
            </div>

            <div v-for="subMesh in meshSubMeshes" :key="subMesh.name" class="meshes__create__submesh__item">
                <p>{{ subMesh.name }}</p>
                <small>Material: {{ subMesh.material }}</small>
                <button @click="removeSubMesh(subMesh)">Remove</button>
            </div>
            <div v-if="meshSubMeshes.length === 0">
                <p>No submeshes added</p>
            </div>

            <label for="meshThumbnailInputRef">Add SubMesh</label>
            <input type="text" v-model="meshSubMeshName" placeholder="SubMesh Name" />
            <select v-model="meshSubMeshMaterial">
                <option v-for="material in materials" :key="material.data.name" :value="material.data.name">{{ material.data.name }}</option>
            </select>
            <button @click="addSubMesh">Add SubMesh</button>
        </div>
        

        <div class="meshes__create__button__container">
            <button @click="createMesh" class="meshes__create__button">Create Mesh</button>
            <button @click="cancel" class="meshes__create__button">Cancel</button>
        </div>
    </div>
</template>

<script setup>
import { useMaterials } from '../../composables/materials.js';
import { useMeshes } from '../../composables/meshes.js';
import { ref, defineEmits, computed } from 'vue';

const emits = defineEmits(['create', 'cancel']);
const fileReader = new FileReader();

const materialsManager = useMaterials();
const materials = ref(materialsManager.materials);

const meshesManager = useMeshes();
const meshGLTFInputRef = ref(null);
const meshThumbnailInputRef = ref(null);
const meshGLTF = ref(null);
const meshThumbnail = ref(null);
const meshName = ref('');
const meshSubMeshes = ref([]);
const meshSubMeshName = ref('');
const meshSubMeshMaterial = ref(materials.value[0].data.name);
const meshSubMeshesErrors = ref([]);
const meshErrors = ref([]);

const removeSubMesh = (subMesh) => {
    meshSubMeshes.value = meshSubMeshes.value.filter((sm) => sm.name !== subMesh.name);
}

const onGLTFChange = (e) => {
    const files = e.target.files;
    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        fileReader.readAsDataURL(file);
        fileReader.onload = () => {
            meshGLTF.value = fileReader.result;
        }
    }
}

const onThumbnailChange = (e) => {
    const files = e.target.files;
    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        fileReader.readAsDataURL(file);
        fileReader.onload = () => {
            meshThumbnail.value = fileReader.result
        }
        
    }
}

const addSubMesh = () => {
    meshSubMeshesErrors.value = [];

    if (!meshSubMeshName.value) {
        meshSubMeshesErrors.value.push('SubMesh name is required');
    }

    const nameExists = meshSubMeshes.value.find((sm) => sm.name === meshSubMeshName.value);
    if (nameExists) {
        meshSubMeshesErrors.value.push('SubMesh name already exists');
    }

    if (meshSubMeshesErrors.value.length > 0) {
        return;
    }

    meshSubMeshes.value.push({
        name: meshSubMeshName.value,
        material: meshSubMeshMaterial.value
    });

    meshSubMeshName.value = '';
}

const createMesh = () => {
    meshErrors.value = [];

    if (!meshName.value) {
        meshErrors.value.push('Mesh name is required');
    }

    if (!meshGLTF.value) {
        meshErrors.value.push('GLTF File is required');
    }

    if (!meshThumbnail.value) {
        meshErrors.value.push('Thumbnail is required');
    }

    if (meshesManager.findMesh(meshName.value)) {
        meshErrors.value.push('Mesh name already exists');
    }

    if (meshErrors.value.length > 0) {
        return;
    }

    emits('create', {
        name: meshName.value,
        src: meshGLTF.value,
        thumbnail: meshThumbnail.value,
        sub_meshes: meshSubMeshes.value
    });
}
</script>

<style scoped>

.meshes__create {
    border-bottom: 1px solid #ddd;
    border-top: 1px solid #ddd;
    padding-top: 1em;
    padding-bottom: 1em;
}

.meshes__create h3 {
    margin-top: 0em;
    margin-bottom: 0.5em;
}

.meshes__create label {
    display: block;
    margin-bottom: 0.5em;
}

.meshes__create input[type="text"] {
    width: 100%;
    padding: 0.5em;
    margin-bottom: 0.5em;    
}

.meshes__create input[type="file"] {
    width: 100%;
    padding: 0.5em;
    margin-bottom: 0.5em;
    border: 1px solid #000000;
    background: #fff;
}

.meshes__create select {
    width: 100%;
    padding: 0.5em;
    margin-bottom: 0.5em;
}

.meshes__create button {
    margin-top: 0.5em;
    padding: 0.5em 1em;
    background-color: #fff;
    border: 1px solid #000000;
    border-radius: 5px;
    cursor: pointer;
}

.meshes__create__submeshes {
    margin-bottom: 1em;
    margin-top: 1em;
    border-bottom: 1px solid #ddd;
    border-top: 1px solid #ddd;
    padding-top: 1em;
    padding-bottom: 1em;
}

.meshes__create__submeshes h3 {
    margin-top: 0em;
    margin-bottom: 0.5em;
}

.meshes__create__submeshes label {
    display: block;
    margin-bottom: 0.5em;
}

.meshes__create__submesh__item {
    display: block;
    margin-bottom: 1em;
    border-bottom: 1px solid #ddd;
    padding-bottom: 1em;
}

.meshes__create__submesh__item p {
    margin-bottom: 0em;
    font-weight: bold;
}

.meshes__create__submesh__item small {
    display: block;
}

.meshes__create__submesh__item button {
    margin-top: 0.5em;
    padding: 0.5em 1em;
    background-color: #fff;
    border: 1px solid #000000;
    border-radius: 5px;
    cursor: pointer;
}

.meshes__create__button__container {
    display: flex;
    justify-content: space-between;
    margin-top: 1em;
}

.meshes__create__button {
    margin-top: 1em;
    padding: 0.5em 1em;
    background-color: #fff;
    border: 1px solid #000000;
    border-radius: 5px;
    cursor: pointer;
}
</style>
