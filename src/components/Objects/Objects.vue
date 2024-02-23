<template>
    <div v-for="object in objects" :key="object.uuid">
        <div class="flex items-center justify-between gap-3 overflow-hidden p-2">
            <p class="text-sm truncate">{{ object.name }}</p>

            <button class="bg-red-500 hover:bg-red-400 p-1 rounded" @click="remove(object)">
                <MinusIcon width="1em" fill="white" />
            </button>
        </div>
    </div>
</template>

<script setup>
import MinusIcon from '../icons/MinusIcon.vue';
import RemoveObject from '../../editor/plugins/object/commands/RemoveObject.js';
import ReadObjects from '../../editor/plugins/object/readers/ReadObjects.js';
import { ref } from 'vue';

const props = defineProps({
    editor: {
        type: Object,
        required: true
    }
});

const readObjects = props.editor.newReader(ReadObjects);
const objects = ref(readObjects.read());

const remove = async (object) => {
    await props.editor.invoke(new RemoveObject(object));
    objects.value = [...readObjects.read()]
};

</script>
