<template>
    <div class="objects__item">
        <img :src="object.data.thumbnail" :alt="object.data.name" class="objects__item__thumbnail" />

        <slot name="actions" :object="object"></slot>
        
    </div>
</template>

<script setup>
defineProps({
    object: {
        type: Object,
        default: () => {}
    }
});
</script>

<style scoped>
.objects__item {
    display: block;
    margin-bottom: 1em;
    border-bottom: 1px solid #ddd;
    padding-bottom: 1em;
}

.objects__item__thumbnail {
    width: 100%;
    height: auto;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    margin-bottom: 1em;
}

</style>