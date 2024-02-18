<template>
    <div class="w-52 h-full">
        <div>
            <div class="flex items-center justify-between p-2">
              <h2 class="text-sm uppercase font-bold text-white">
                Inspector
              </h2>

              <button class="text-xs text-white bg-slate-600 px-2 py-1 rounded hover:bg-slate-700">
                Add
              </button>
            </div>

            <Tab title="Objects">
              <Objects :editor="editor" />
            </Tab>

            <Tab title="Meshes">
              <Meshes :editor="editor" />
            </Tab>

            <Tab title="Materials">
              <Materials :editor="editor" />
            </Tab>

            <Tab title="Textures">
              <Textures :editor="editor" />
            </Tab>

            <Tab title="Scene">
              <Scene :editor="editor" />
            </Tab>
        </div>
    </div>
</template>

<script setup>
import Textures from './Textures.vue';
import Materials from './Materials.vue';
import Meshes from './Meshes.vue';
import Objects from './Objects.vue';
import Scene from './Scene.vue';
import Tab from './Tab.vue';

defineProps({
  editor: {
    type: Object,
    required: true
  }
});

</script>
