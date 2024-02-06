<template>
    <div class="textures__item">
        <p>{{ texturePack.name }}</p>
        <div class="textures__item__textures">
            <div class="textures__item__texture" v-for="texture in texturePack.textures" :key="texture.src">
                <img :src="texture.data.src" :alt="texture.data.src" />
            </div>
        </div>

        <slot name="actions" :texturePack="texturePack"></slot>
        
    </div>
</template>

<script setup>
defineProps({
    texturePack: {
        type: Object,
        default: () => {}
    }
});

</script>

<style scoped>
.textures__item {
    display: block;
    margin-bottom: 1em;
}

.textures__item p {
    margin-bottom: 0.5em;
    font-weight: bold;
}

.textures__item__textures {
    display: flex;
    gap: 10px;
}

.textures__item__texture {
    width: 50px;
    height: 50px;
    overflow: hidden;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
</style>