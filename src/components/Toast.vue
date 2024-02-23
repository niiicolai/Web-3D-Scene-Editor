<template>
    <div class="fixed bottom-0 right-0 p-4">
        <div v-for="toast in toasts" :key="toast" class="shadow-lg rounded-lg p-4 w-60 mb-3" :class="type[toast.type]">
            <div class="flex items-center justify-between">
                <p class="text-xs font-bold">{{ toast.msg }}</p>
                <button class="border border-black p-1 rounded" @click="remove(toast)">
                    <MinusIcon width="1em" fill="black" />
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
import MinusIcon from './icons/MinusIcon.vue';
import { computed } from 'vue';
import { useToast } from '../composables/useToast.js';

const toastComposable = useToast();
const toasts = computed(() => toastComposable.toasts.value);
const remove = (toast) => toastComposable.removeToast(toast);

const type = {
    success: 'bg-green-500/50 text-white',
    error: 'bg-red-500/50 text-white',
    warning: 'bg-yellow-500/50 text-white',
    info: 'bg-blue-500/50 text-white'
};
</script>
