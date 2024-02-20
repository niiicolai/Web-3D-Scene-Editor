<template>
    <div v-if="isInitializing">
        <slot name="initializing" :editor="editor" />
    </div>

    <div v-if="isExecuting">
        <slot name="executing" :editor="editor" /> 
    </div>

    <div v-if="isExiting">
        <slot name="exiting" :editor="editor" />
    </div>

    <div v-if="isStopped">
        <slot name="stopped" :editor="editor" />
    </div>

    <div v-if="isPaused">
        <slot name="paused" :editor="editor" />
    </div>

    <div v-show="isExecuting || isPaused">
        <canvas ref="canvas" class="block w-full h-screen" />
    </div>
</template>

<script setup>
import { useEditor } from '../composables/useEditor.js'
import { ViewConfiguration } from '../editor/editor.js'
import { ref, computed, onMounted, onUnmounted } from 'vue'

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

const isInitializing = computed(() => editor.isState("initializing"))
const isExecuting = computed(() => editor.isState("executing"))
const isExiting = computed(() => editor.isState("exiting"))
const isStopped = computed(() => editor.isState("stopped"))
const isPaused = computed(() => editor.isState("paused"))

onMounted(async () => {
    editor.init(canvas.value, props.viewConfiguration, props.frameRate)
    editor.start(props.preload)
})

onUnmounted(() => {
    editor.stop()
})
</script>

