<template>
  <div class="w-52 h-full overflow-y-auto">
    <div class="flex items-center justify-between p-2 h-6">
      <h2 class="text-sm uppercase font-bold text-white">
        Inspector
      </h2>

      <button v-if="createType" @click="createType = ''">
        <MinusIcon width="1em" fill="white" />
      </button>

      <Dropdown ref="dropdown" v-show="!createType">
        <template #button>
          <PlusIcon width="1em" fill="white" />
        </template>

        <div class="bg-gray-800 text-white rounded shadow-md overflow-hidden">

          <button @click="createResource('Create object')"
            class="w-full text-xs px-2 py-1 hover:bg-gray-700">Object</button>

          <button @click="createResource('Create light')"
            class="w-full text-xs px-2 py-1 hover:bg-gray-700">Light</button>

          <button @click="createResource('Create mesh')" class="w-full text-xs px-2 py-1 hover:bg-gray-700">Mesh</button>

          <button @click="createResource('Create material')"
            class="w-full text-xs px-2 py-1 hover:bg-gray-700">Material</button>

          <button @click="createResource('Create texture')"
            class="w-full text-xs px-2 py-1 hover:bg-gray-700">Texture</button>

        </div>
      </Dropdown>
    </div>

    <div v-if="createType">
      <div v-if="createType === 'Create material'">
        <CreateMaterial :editor="editor" />
      </div>

      <div v-else-if="createType === 'Create texture'">
        <CreateTexture :editor="editor" />
      </div>

      <div v-else-if="createType === 'Create mesh'">
        <CreateMesh :editor="editor" />
      </div>

      <div v-else-if="createType === 'Create object'">
        <CreateObject :editor="editor" />
      </div>

      <div v-else-if="createType === 'Create light'">
        <CreateLight :editor="editor" />
      </div>

    </div>

    <div v-else>
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
import PlusIcon from './icons/PlusIcon.vue';
import MinusIcon from './icons/MinusIcon.vue';

import Dropdown from './UI/Dropdown.vue';

import Materials from './Materials/Materials.vue';
import CreateMaterial from './Materials/Create.vue';

import Textures from './Textures/Textures.vue';
import CreateTexture from './Textures/Create.vue';

import Meshes from './Meshes/Meshes.vue';
import CreateMesh from './Meshes/Create.vue';

import Objects from './Objects/Objects.vue';
import CreateObject from './Objects/CreateMesh.vue';
import CreateLight from './Objects/CreateLight.vue';

import Scene from './Scene.vue';
import Tab from './UI/Tab.vue';

import { useTabs } from '../composables/useTabs.js';
import { ref } from 'vue';

defineProps({
  editor: {
    type: Object,
    required: true
  }
});

const tabs = useTabs();
const dropdown = ref();
const createType = ref('');
const createResource = (name) => {
  createType.value = name;
  tabs.setTab(name);
  dropdown.value.setVisibility(false);
};
</script>
