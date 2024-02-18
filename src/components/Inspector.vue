<template>
    <div class="w-52">
        <div class="rounded bg-gray-500/50 p-3">
            <h2 class="text-sm uppercase font-bold border-b border-black mb-2 pb-2">
                Inspector
            </h2>

            <p>objects</p>
            <p>meshes</p>
            <p>materials</p>
            <p>textures</p>
        </div>
    </div>
</template>

<script setup>
defineProps({
  editor: {
    type: Object,
    required: true
  }
});
</script>