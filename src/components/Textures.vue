<template>
    <div class="textures" v-if="inspector.isPanel('textures')">
        <div v-if="isCreatingTexturePack" class="textures__create">
            <Create @create="createTexturePack" @cancel="isCreatingTexturePack = false" />
        </div>

        <div v-else>
            <div class="textures__header">
                <button @click="isCreatingTexturePack = !isCreatingTexturePack">Create Texture Pack</button>
            </div>

            <div class="textures__list">
                <div v-for="texturePack in texturePacks" :key="texturePack.name">
                    <Item :texturePack="texturePack">
                        <template v-slot:actions="{ texturePack }">
                            <button 
                                v-if="!textureManager.isDefaultTexturePack(texturePack.name)" 
                                @click="textureManager.removeTexturePack(texturePack.id)">Remove</button>
                        </template>
                    </Item>
                </div>
                
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useInspector } from '../composables/inspector.js';
import { useTextures } from '../composables/textures.js';
import Create from './textures/Create.vue';
import Item from './textures/Item.vue';

const inspector = useInspector();
const textureManager = useTextures();
const texturePacks = ref(textureManager.texturePacks);
const isCreatingTexturePack = ref(false);

const createTexturePack = async (texturePack) => {
    await textureManager.loadTexturePack(texturePack);
    isCreatingTexturePack.value = false;
}

</script>

<style scoped>

.textures__header {
    border-bottom: 1px solid #ddd;
}

.textures__header button {
    padding: 0.5em 1em;
    width: 100%;
    background-color: #fff;
    border: 1px solid #ddd;
    border-radius: 5px;
    cursor: pointer;
}

.textures {
    padding: 1em;
}

.textures h2 {
    margin-bottom: 0em;
    margin-top: 0em;
}

.textures button {
    margin-bottom: 0.5em;
    margin-top: 0em;
}
</style>