<template>
    <Form :errors="errors" class="text-black">

        <div class="input-control">
            <label class="text-sm">Light</label>
            <select class="w-full capitalize" v-model="lightTypeInput">
                <option v-for="lightType in lightTypes" :key="lightType" :value="lightType">
                    {{ lightType }}
                </option>
            </select>
        </div>

        <div class="input-control">
            <label class="text-sm">Color</label>
            <input type="color" class="w-full" v-model="color" />
        </div>

        <div class="input-control">
            <label class="text-sm">Intensity</label>
            <input type="number" class="w-full" v-model="intensity" />
        </div>

        <div>
            <button class="w-full" type="submit" @click="submit">Submit</button>
        </div>
    </Form>
</template>

<script setup>
import Form from '../Form/Form.vue';
import CreateLight from '../../editor/plugins/object/commands/CreateLight.js';
import { ref } from 'vue';

const props = defineProps({
    editor: {
        type: Object,
        required: true
    }
});

const lightTypes = [
    'Directional Light',
    'Point Light',
    'Spot Light',
    'Ambient Light'
];
const lightTypeInput = ref('');
const color = ref('#000000');
const intensity = ref(1);
const errors = ref([]);
const submit = async () => {
    errors.value = [];

    if (!lightTypeInput.value) {
        errors.value.push('Light type is required');
    }

    if (!color.value) {
        errors.value.push('Color is required');
    }

    if (!intensity.value) {
        errors.value.push('Intensity is required');
    }

    if (errors.value.length > 0) {
        return;
    }

    errors.value = [];
    await props.editor.invoke(new CreateLight(lightTypeInput.value, color.value, intensity.value));
    lightTypeInput.value = '';
    intensity.value = 1;
    color.value = '#000000';
};
</script>