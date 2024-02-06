<script setup>
import * as THREE from 'three';
import Inspector from './components/Inspector.vue';
import Scene from './components/Scene.vue';

import { ref } from 'vue';
const sceneObjects = ref([]);


</script>

<template>
  <div class="editor">
    <Inspector />

    <div class="scene">
      <Scene :scene-objects="sceneObjects" />
    </div>
  </div>
</template>

<style scoped>
.editor {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100vh;
  box-sizing: border-box;
  background-color: #f5f5f5;
  overflow: hidden;
}

.scene {
  flex: 1;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}
</style>
