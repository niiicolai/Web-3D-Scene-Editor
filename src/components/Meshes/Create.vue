<template>
    <Form :errors="errors" class="text-black">

        <div class="input-control">
            <label class="text-sm">Name</label>
            <input type="text" class="w-full" v-model="name" />
        </div>

        <div class="input-control">
            <label class="text-sm">3D Model (GLTF or GLB)</label>
            <FileInput ref="meshInput" class="w-full" />
        </div>

        <div class="input-control">
            <label class="text-sm">Submeshes</label>
            <MultipleInput ref="multipleInputRef" :resources="materials"
                @error="onMultipleInputError" @success="onMultipleInputSuccess">

                <template #selected="{ selected }">
                    <div class="flex items-center gap-3 mb-1">
                        <p class="text-sm truncate capitalize">{{ selected.text }}</p>
                        <p class="text-sm truncate capitalize">{{ selected.resource.material.name }}</p>
                    </div>
                </template>

                <template #no_selected>
                    <p class="text-sm">No submeshes added</p>
                </template>

                <template #resource_option="{ option }">
                    {{ option.material.name }}
                </template>

                <template #no_options>
                    <p class="text-sm">No material available</p>
                </template>

            </MultipleInput>
        </div>

        <div>
            <button class="w-full" type="submit" @click="submit">Submit</button>
        </div>
    </Form>
</template>

<script setup>
import Form from '../Form/Form.vue';
import FileInput from '../Form/FileInput.vue';
import MultipleInput from '../Form/MultipleInput.vue';
import ReadCache from '../../editor/plugins/cache/readers/ReadCache.js';
import LoadMesh, { SubMeshConfiguration } from '../../editor/plugins/cache/commands/LoadMesh.js';
import { ref, computed } from 'vue';

const props = defineProps({
    editor: {
        type: Object,
        required: true
    }
});

const readMeshes = props.editor.newReader(ReadCache, 'meshes');
const readMaterials = props.editor.newReader(ReadCache, 'materials');

const meshes = ref(readMeshes.read());
const materials = ref(readMaterials.read());

const name = ref('');
const meshInput = ref(null);
const multipleInputRef = ref();
const errors = ref([]);

const onMultipleInputError = (error) => {
    if (error === 'no_resource_selected') {
        errors.value = ['A material is required'];
    } else if (error === 'resource_already_selected') {
        errors.value = ['A submesh with the same name already exists'];
    } else if (error === 'no_text_input') {
        errors.value = ['A submesh must have a name'];
    } else {
        throw new Error(`Unsupported error: ${error}`);
    }
};

const onMultipleInputSuccess = (subMeshName, materialName) => {
    errors.value = [];
};

const submit = () => {
    errors.value = [];

    if (!name.value) {
        errors.value.push('Name is required');
    }
    console.log(multipleInputRef.value)
    const submeshConfigurations = multipleInputRef.value.selectedResources.map(selected => {
        return new SubMeshConfiguration(selected.text, selected.resource.material.name);
    });
    if (submeshConfigurations.length > 1) {
        for (let i = 0; i < submeshConfigurations.length; i++) {
            const submesh = submeshConfigurations[i];
            if (!submesh.subMeshName) {
                errors.value.push(`Submesh ${i + 1} subMeshName is required`);
                break;
            }

            if (!submesh.materialName) {
                errors.value.push(`Submesh ${i + 1} materialName is required`);
                break;
            }
        }
    }

    const file = meshInput.value.getFile();
    if (!file) {
        errors.value.push('3D Model is required');
    }

    if (errors.value.length > 0) {
        return;
    }

    errors.value = [];
    const reader = new FileReader();
    reader.onload = async () => {
        await props.editor.invoke(new LoadMesh(name.value, reader.result, submeshConfigurations));
        meshes.value = readMeshes.read();
        meshInput.value.clear();
        multipleInputRef.value.clear();
        name.value = '';
    };
    reader.readAsDataURL(file);
};
</script>