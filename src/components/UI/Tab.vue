<template>
    <div>
        <button @click="toggle" class="w-full text-sm uppercase py-2"
                :class="tabs.isTab(title) ? 'bg-gray-800/50 text-white' : 'bg-black/50 text-white hover:bg-gray-800'">
            {{ title }}
        </button>

        <div v-if="tabs.isTab(title)">
            <slot />
        </div>
    </div>
</template>

<script setup>
import { useTabs } from '../../composables/useTabs.js';
const props = defineProps({
    title: {
        type: String,
        required: true
    }
})

const tabs = useTabs()
const toggle = () => {
    const title = props.title

    if (tabs.isTab(title)) {
        tabs.setTab('')
    } else {
        tabs.setTab(title)
    }
}
</script>
