<template>
    <div class="p-3">
        <div class="border-b border-white mb-1 pb-1 flex items-center justify-between gap-3">
            <p>Background:</p>
            <p>{{ background }}</p>
        </div>

        <div>
            <p class="text-xs uppercase text-bold mb-1">
                Set color
            </p>

            <div class="flex items-center justify-between gap-3">
                <input type="color" v-model="colorInput" class="w-full h-6 border-none px-1 bg-black" />
                <button class="bg-slate-600 hover:bg-slate-500 rounded text-xs px-2 py-1 h-6" @click="setBackgroundColor()">Save</button>
            </div>
        </div>
        
    </div>
</template>

<script setup>
import * as THREE from 'three';
import ReadScene from '../editor/src/view/readers/ReadScene.js';
import SetSceneColor from '../editor/src/view/commands/SetSceneColor.js';
import { ref, computed, onMounted } from 'vue';

const props = defineProps({
    editor: {
        type: Object,
        required: true
    }
});

const readView = props.editor.newReader(ReadScene);
const scene = ref(readView.read());
const background = ref('No scene');

const colorInput = ref(0x000000)
const setBackgroundColor = async () => {
    const color = new THREE.Color(colorInput.value);
    await props.editor.invoke(new SetSceneColor(color));
    scene.value = readView.read();
    background.value = calculateBackground(scene.value.background);
}
const calculateBackground = (background) => {
    if (background instanceof THREE.Color) {
        return "#" + background.getHexString();
    }

    if (background instanceof THREE.Texture) {
        return "Cube Texture";
    }

    return "No scene";
}

onMounted(() => {
    const color = scene.value.background;
    const bgg = calculateBackground(color);
    colorInput.value = bgg;
    background.value = bgg;
});

</script>
