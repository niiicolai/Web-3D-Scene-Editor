<template>
    
    <div class="mb-1">
        <div v-for="selected in selectedResources" :key="selected" class="mb-3">
            <slot name="selected" :selected="selected" />
            <button @click="remove(selected)" class="w-full bg-red-500 hover:bg-red-400 text-white rounded-lg text-xs py-1">Remove</button>
        </div>

        <div v-if="selectedResources.length === 0">
            <slot name="no_selected" />
        </div>
    </div>

    <div v-if="resources.length === 0">
        <slot name="no_options" />
    </div>

    <div v-else>
        <input type="text" class="w-full capitalize mb-1" v-model="textInput" />

        <select class="w-full capitalize mb-1" v-model="input">
            <option v-for="resource in resources" :key="resource" :value="resource">
                <slot name="resource_option" :option="resource" />
            </option>
        </select>

        <button @click="add" class="w-full bg-gray-200 hover:bg-gray-100 text-gray-700 rounded-lg text-sm py-1">Add</button>
    </div>
</template>

<script setup>
import { ref, onMounted, defineExpose, defineEmits } from 'vue';

const props = defineProps({
    resources: {
        type: Array,
        required: true
    }
});

const emit = defineEmits(['error', 'success']);
const input = ref();
const textInput = ref();
const selectedResources = ref([]);
const refreshInput = () => {
    if (props.resources.length > 0) {
        input.value = props.resources[0];
    } else {
        input.value = null;
    }

    textInput.value = '';
};

const add = () => {
    if (!textInput.value) {
        emit('error', 'no_text_input');
        return;
    }

    const exist = selectedResources.value.find((resource) => resource.text === textInput.value);
    if (exist) {
        emit('error', 'resource_already_selected');
        return;
    }

    if (!input.value) {
        emit('error', 'no_resource_selected');
        return;
    }

    selectedResources.value.push({ text: textInput.value, resource: input.value });
    input.value = null;
    emit('success', 'resource_added');
};

const remove = (resource) => {
    const index = selectedResources.value.indexOf(resource);
    selectedResources.value.splice(index, 1);
    input.value = null;
};

const clear = () => {
    selectedResources.value = [];
    refreshInput();
};

onMounted(() => {
    refreshInput();
});

defineExpose({
    textInput,
    selectedResources,
    clear
});
</script>