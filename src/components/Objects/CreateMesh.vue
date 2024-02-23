<template>
    <Form :errors="errors" class="text-black">

        <div class="input-control">
            <label class="text-sm">Mesh</label>
            <select class="w-full capitalize" v-model="meshInput">
                <option v-for="mesh in meshes" :key="mesh" :value="mesh.mesh.name">
                    {{ mesh.mesh.name }}
                </option>
            </select>
        </div>

        <div>
            <button class="w-full" type="submit" @click="submit">Submit</button>
        </div>
    </Form>
</template>

<script setup>
import Form from '../Form/Form.vue';
import ReadCache from '../../editor/plugins/cache/readers/ReadCache';
import CreateObject from '../../editor/plugins/object/commands/CreateObject.js';
import { ref } from 'vue';

const props = defineProps({
    editor: {
        type: Object,
        required: true
    }
});

const readMeshes = props.editor.newReader(ReadCache, 'meshes');
const meshes = ref(readMeshes.read());

const meshInput = ref('');
const errors = ref([]);
const submit = async () => {
    errors.value = [];

    if (!meshInput.value) {
        errors.value.push('Mesh is required');
    }

    if (errors.value.length > 0) {
        return;
    }

    errors.value = [];
    await props.editor.invoke(new CreateObject(meshInput.value));
    meshInput.value = '';
};
</script>