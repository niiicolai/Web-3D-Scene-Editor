<template>
    <div>
        <input type="file" ref="fileInput" class="hidden" @change="onFileChange" />
        <p class="text-sm bg-white border border-black rounded-lg px-2 py-1 mb-1">{{ fileInfo }} </p>
        <button @click="openFileInput" class="w-full bg-gray-200 hover:bg-gray-100 text-gray-700 rounded-lg text-sm py-1">Choose File</button>
    </div>
</template>

<script setup>
import { ref, defineExpose } from 'vue';

const fileInput = ref(null);
const fileInfo = ref('No file chosen');

const onFileChange = () => {
    const file = fileInput.value.files[0];
    fileInfo.value = file.name;
};

const openFileInput = () => {
    fileInput.value.click();
};

const getFile = () => {
    return fileInput.value.files[0];
};

const clear = () => {
    fileInfo.value = 'No file chosen';
    fileInput.value.value = '';
};

defineExpose({
    getFile,
    clear
});
</script>