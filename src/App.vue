<script setup>
import * as THREE from 'three';

import Loader from './components/Loader.vue';
import Tools from './components/Tools.vue';
import Settings from './components/Settings.vue';
import Inspector from './components/Inspector.vue';
import Editor from './components/Editor.vue';

import { ViewConfiguration } from './editor/editor.js';
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
  const scene = await fetch('/scene.json').then(res => res.json());

  preload.value = { meshes, materials, textures, objects, scene };
  isInitialized.value = true;
})
</script>

<template>
  <Loader v-if="!isInitialized" title="Loading Editor Preload" message="This may take a few seconds..." />

  <div v-if="isInitialized">
    <Editor :preload="preload" :viewConfiguration="viewConfiguration" :frameRate="frameRate">
      <template v-slot:executing="{ editor }">
        <div class="bg-gray-500/50 shadow-md text-white fixed top-3 bottom-3 left-3 rounded">
          <Inspector :editor="editor" />
        </div>
        
        <div class="fixed top-0 right-0 p-3 flex flex-col gap-2 items-end">
          <Tools :editor="editor" />
          <Settings :editor="editor" />
        </div>    
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
