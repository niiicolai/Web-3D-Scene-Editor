<template>
    <div v-if="editor.isInitializing()">
        <slot name="initializing" :editor="editor" />
    </div>

    <div v-if="editor.isExecuting()">
        <slot name="executing" :editor="editor" /> 
    </div>

    <div v-if="editor.isExiting()">
        <slot name="exiting" :editor="editor" />
    </div>

    <div v-if="editor.isStopped()">
        <slot name="stopped" :editor="editor" />
    </div>

    <div v-if="editor.isPaused()">
        <slot name="paused" :editor="editor" />
    </div>

    <div v-show="editor.isExecuting() || editor.isPaused()">
        <canvas ref="canvas" class="block w-full h-screen"></canvas>
    </div>
</template>

<script setup>
import { useEditor } from '../composables/useEditor.js'
import { ViewConfiguration } from '../../view.js';
import { ref, onMounted, onUnmounted } from 'vue'

const canvas = ref(null)
const editor = useEditor()

const props = defineProps({
    preload: {
        type: Object,
        required: false,
        default: () => ({})
    },
    viewConfiguration: {
        type: Object,
        required: false,
        default: () => new ViewConfiguration()
    },
    frameRate: {
        type: Number,
        required: false,
        default: 60
    }
})

onMounted(async () => {
    editor.init(canvas.value, props.viewConfiguration, props.frameRate)
    editor.start(props.preload)
})

onUnmounted(() => {
    editor.stop()
})
</script>
