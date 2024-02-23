<template>
    <div>
        <div class="flex items-center justify-center">
            <button ref="button" @click="toggle()">
                <slot name="button" />
            </button>
        </div>

        <div v-if="showDropdown" ref="dropdown" class="absolute">
            <slot />
        </div>
    </div>
</template>

<script setup>
import { ref, defineExpose, onBeforeMount, onBeforeUnmount } from 'vue';

const button = ref();
const dropdown = ref();
const showDropdown = ref(false);

function toggle() {
    showDropdown.value = !showDropdown.value;
}

function setVisibility(value) {
    showDropdown.value = value;
}

function handleClick(event) {
    if (showDropdown.value && !dropdown.value.contains(event.target) && !button.value.contains(event.target)) {
        showDropdown.value = false;
    }
}

defineExpose({
    toggle,
    setVisibility
});

onBeforeMount(() => {
    document.addEventListener('click', handleClick);
});

onBeforeUnmount(() => {
    document.removeEventListener('click', handleClick);
});
</script>