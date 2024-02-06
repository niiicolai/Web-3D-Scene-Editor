<template>
    <div class="inspector">

        <div class="inspector__item">
            <div class="inspector__header">
                <button @click="inspector.setPanel('objects')"
                    :class="{ active: inspector.isPanel('objects') }">Objects</button>
            </div>

            <div v-show="inspector.isPanel('objects')" class="inspector__panel">
                <Objects />
            </div>
        </div>

        <div class="inspector__item">
            <div class="inspector__header">
                <button @click="inspector.setPanel('meshes')"
                    :class="{ active: inspector.isPanel('meshes') }">Meshes</button>
            </div>

            <div v-show="inspector.isPanel('meshes')" class="inspector__panel">
                <Meshes />
            </div>
        </div>


        <div class="inspector__item">
            <div class="inspector__header">
                <button @click="inspector.setPanel('materials')"
                    :class="{ active: inspector.isPanel('materials') }">Materials</button>
            </div>

            <div v-show="inspector.isPanel('materials')" class="inspector__panel">
                <Materials />
            </div>
        </div>

        <div class="inspector__item">
            <div class="inspector__header">
                <button @click="inspector.setPanel('textures')"
                    :class="{ active: inspector.isPanel('textures') }">Textures</button>
            </div>

            <div v-show="inspector.isPanel('textures')" class="inspector__panel">
                <Textures />
            </div>
        </div>


    </div>
</template>

<script setup>
import Objects from './Objects.vue';
import Textures from './Textures.vue';
import Materials from './Materials.vue';
import Meshes from './Meshes.vue';
import { useInspector } from '../composables/inspector.js';

const inspector = useInspector();

</script>

<style scoped>
.inspector {
    width: 300px;
    height: 100%;
    background-color: #CCCDDD;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    box-sizing: border-box;
    overflow-y: auto;
}

.inspector__panel {
    background-color: #ffffff;
}

.inspector__header button {
    width: 100%;
    padding: 1em;
    background-color: #000000;
    border-bottom: 1px solid #ffffff;
    color: #ffffff;
    border: none;
    text-align: left;
    cursor: pointer;
    transition: background-color 0.3s;
}

.inspector__header button:hover {
    background-color: #f0f0f0;
    color: #000000;
}

.inspector__header button.active {
    background-color: #f0f0f0;
    color: #000000;
}
</style>