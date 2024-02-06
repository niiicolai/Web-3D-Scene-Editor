<template>
    <div class="objects" v-if="inspector.isPanel('objects')">
        <div v-if="isAddingObject" class="objects__create">
            <Create @create="addObject" @cancel="isAddingObject = false" />
        </div>

        <div v-else>
            <div class="objects__header">
                <button @click="isAddingObject = !isAddingObject">Add Object</button>
            </div>

            <div class="objects__list">
                <div v-for="object in objects" :key="object.data.name">
                    <Item :object="object">
                        <template v-slot:actions="{ object }">
                            <button @click="objectsManager.removeObject(object.id)">Remove</button>
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
import { useObjects } from '../composables/objects.js';
import { sceneObjectMediator } from '../mediators/sceneObjectMediator.js';
import Create from './objects/Create.vue';
import Item from './objects/Item.vue';

const inspector = useInspector();
const sceneMediator = sceneObjectMediator();
const objectsManager = useObjects();
const objects = ref(objectsManager.objects);
const isAddingObject = ref(false);

const addObject = async (mesh) => {
    await objectsManager.addObject(mesh);
    isAddingObject.value = false;
}

onMounted(async () => {
    await sceneMediator.init();
    await objectsManager.init();
})

</script>

<style scoped>
.objects__header {
    border-bottom: 1px solid #ddd;
}

.objects__header button {
    padding: 0.5em 1em;
    width: 100%;
    background-color: #fff;
    border: 1px solid #ddd;
    border-radius: 5px;
    cursor: pointer;
}

.objects {
    padding: 1em;
}

.objects h2 {
    margin-bottom: 0em;
    margin-top: 0em;
}

.objects button {
    margin-bottom: 0.5em;
    margin-top: 0em;
}
</style>