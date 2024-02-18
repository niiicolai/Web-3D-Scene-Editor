<script setup>
import * as THREE from 'three';

import Loader from './components/Loader.vue';
import Tools from './components/Tools.vue';
import Settings from './components/Settings.vue';
import Inspector from './components/Inspector.vue';
import Editor from './editor/vue/components/Editor.vue';

import { ViewConfiguration } from './editor/handlers/view.js';
import { ref, onMounted } from 'vue';

const frameRate = 15;
const viewConfiguration = new ViewConfiguration();
const preload = ref({});
const isInitialized = ref(false);

onMounted(async () => {
  viewConfiguration.sceneConfig.instance.background = new THREE.Color(0xCCCDDD);

  const meshes = await fetch('/meshes.json').then(res => res.json());
  const materials = await fetch('/materials.json').then(res => res.json());
  const textures = await fetch('/textures.json').then(res => res.json());
  const objects = await fetch('/objects.json').then(res => res.json());

  preload.value = { meshes, materials, textures, objects }
  isInitialized.value = true;
})
</script>

<template>
  <Loader v-if="!isInitialized" title="Loading Editor Preload" message="This may take a few seconds..." />

  <div v-if="isInitialized">
    <Editor :preload="preload" :viewConfiguration="viewConfiguration" :frameRate="frameRate">
      <template v-slot:executing="{ editor }">
        <div class="fixed top-0 left-0 flex items-start justify-start gap-3 p-3">
          <Inspector :editor="editor" />
          <Tools :editor="editor" />
        </div>
        
        <Settings :editor="editor" />        
      </template>

      <template v-slot:initializing="{ editor }">
        <Loader title="Initializing Editor" message="Did you know you can upload your own 3D models?" />
      </template>

      <template v-slot:paused="{ editor }">
        <Loader title="Paused Editor" message="Processing Calculations. This may take a few seconds..." />
      </template>

      <template v-slot:exiting="{ editor }">
        <Loader title="Stopping Editor" message="This may take a few seconds..." />
      </template>

      <template v-slot:stopped="{ editor }">
        <Loader title="Editor Stopped" message="Reload the page to start the editor again." />
      </template>

    </Editor>
  </div>
</template>
