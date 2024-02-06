<template>
    <div class="materials__item">
        <div class="materials__item__header">
            <p>{{ material.data.name }}</p>
            <small>Type: {{ material.data.type }}</small>
            <small>Texture Pack: {{ material.texturePack.name }}</small>
        </div>
        <div class="material__textures__item__list">
            <div class="material__textures__item__textures" v-for="texture in material.texturePack.textures" :key="texture.src">
                <img :src="texture.data.src" :alt="texture.data.src" />
            </div>
        </div>

        <slot name="actions" :material="material"></slot>
        
    </div>
</template>

<script setup>
defineProps({
    material: {
        type: Object,
        default: () => {}
    }
});
</script>

<style scoped>
.materials__item {
    display: block;
    margin-bottom: 1em;
}

.materials__item__header {
    display: block;
    margin-bottom: 0.5em;
}

.materials__item p {
    margin-bottom: 0em;
    font-weight: bold;
}

.materials__item small {
    display: block;
}

.material__textures__item__list {
    display: flex;
    gap: 10px;
}

.material__textures__item__textures {
    display: flex;
    gap: 10px;
}

.material__textures__item__textures {
    width: 50px;
    height: 50px;
    overflow: hidden;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
</style>