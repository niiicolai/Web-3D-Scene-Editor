import { ref } from 'vue'
import * as THREE from 'three'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { useMaterials } from './materials.js';

const meshes = ref([])
const meshesJson = ref([])
const loaderGLTF = new GLTFLoader()
const initialized = ref(false)

let id = 0;

const findSubMeshMaterial = (subMesh, materialsManager) => {
    const material = materialsManager.findMaterial(subMesh.material);
    if (!material) throw new Error(`SubMesh Material ${subMesh.material} not found`)
    return material.instance
}

const createObject3DInstance = async (mesh, materialsManager) => {
    const { scene: object } = await loaderGLTF.loadAsync(mesh.src)
    object.traverse(child => {
        const subMesh = mesh.sub_meshes.find(subMesh => subMesh.name === child.name)
        if (subMesh) {
            child.material = findSubMeshMaterial(subMesh, materialsManager)
        }
    })

    return object
}

export const useMeshes = () => {
    const materials = useMaterials()

    const findMesh = (name) => {
        return meshes.value.find(mesh =>  {
            return mesh.data.name.toLowerCase() === name.toLowerCase()
        })
    }

    const findById = (id) => {
        for (let i = 0; i < meshes.value.length; i++) {
            if (meshes.value[i].id === id) {
                return { index: i, object: meshes.value[i] }
            }
        }

        return null
    }

    const removeMesh = (id) => {
        const { index, mesh } = findById(id)
        if (isDefaultMesh(meshes.value[index].data.name)) return
        
        meshes.value.splice(index, 1)
    }

    const loadMesh = async (mesh) => {
        const existingMesh = findMesh(mesh.name)
        if (existingMesh) return existingMesh;

        const instance = await createObject3DInstance(mesh, materials)
        const data = { id: id++, data: mesh, instance }
        meshes.value.push(data)
        return data
    }

    const isDefaultMesh = (name) => {
        for (let i = 0; i < meshesJson.value.length; i++) {
            if (meshesJson.value[i].name.toLowerCase() === name.toLowerCase()) {
                return true;
            }
        }

        return false;
    }

    const init = async () => {
        if (!initialized.value) {
            initialized.value = true
            /** meshes.js depends on materials.js */
            await materials.init()
            
            const response = await fetch('/meshes.json')
            meshesJson.value = await response.json()
            for (let i = 0; i < meshesJson.value.length; i++) {
                await loadMesh(meshesJson.value[i])
            }
        }
    }

    return {
        init,
        isDefaultMesh,
        findMesh,
        removeMesh,
        loadMesh,
        meshes
    }
}
