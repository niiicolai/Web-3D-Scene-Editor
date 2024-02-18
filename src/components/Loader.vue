<template>
    <div class="fixed left-0 top-0 right-0 bottom-0 flex items-center justify-center bg-black text-white">
        <div>
            <h2 class="text-3xl font-bold mb-4">
                {{ title }}
            </h2>
            
            <p class="text-lg" v-if="message">
                {{ message }}
            </p>
        </div>
    </div>
</template>

<script setup>
defineProps({
    title: {
        type: String,
        required: true
    },
    message: {
        type: String,
        default: ''
    }
});
</script>
