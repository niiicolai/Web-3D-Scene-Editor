import { ref } from 'vue'
import * as THREE from 'three'
import { useTextures } from './textures.js';

const materials = ref([])
const materialsJson = ref([])
const initialized = ref(false)

let id = 0;
const createMaterialInstance = (material, texturePack) => {
    let instance;
    switch (material.type) {
        case 'basic':
            instance = new THREE.MeshBasicMaterial()
            break;
        case 'lambert':
            instance = new THREE.MeshLambertMaterial()
            break;
        case 'phong':
            instance = new THREE.MeshPhongMaterial()
            break;
        case 'standard':
            instance = new THREE.MeshStandardMaterial()
            break;
        case 'physical':
            instance = new THREE.MeshPhysicalMaterial()
            break;
        default:
            instance = new THREE.MeshBasicMaterial()
            break;
    }

    if (material.color) {
        instance.color = new THREE.Color(material.color.r, material.color.g, material.color.b)
    }
    
    if (texturePack.textures.length > 0) {
        for (let i = 0; i < texturePack.textures.length; i++) {
            const { type, instance } = texturePack.textures[i]
            instance[type] = instance
        }
    }

    return instance
}

export const useMaterials = () => {
    const textures = useTextures()

    const findMaterial = (name) => {
        return materials.value.find(material =>  {
            return material.data.name.toLowerCase() === name.toLowerCase()
        })
    }

    const findById = (id) => {
        for (let i = 0; i < materials.value.length; i++) {
            if (materials.value[i].id === id) {
                return { index: i, material: materials.value[i] }
            }
        }

        return null
    }

    const removeMaterial = (id) => {
        const { index, material } = findById(id)
        if (isDefaultMaterial(materials.value[index].data.name)) return
        material.instance.dispose()
        materials.value.splice(index, 1)
    }

    const loadMaterial = async (material) => {
        const existingMaterial = findMaterial(material.name)
        if (existingMaterial) return existingMaterial;

        const texturePack = textures.findtexturePack(material.texture_pack);
        if (!texturePack) throw new Error(`Texture pack ${material.texture_pack} not found`)
        const instance = createMaterialInstance(material, texturePack)
        const data = { id: id++, data: material, texturePack, instance }
        materials.value.push(data)
        return data
    }

    const isDefaultMaterial = (name) => {
        for (let i = 0; i < materialsJson.value.length; i++) {
            if (materialsJson.value[i].name.toLowerCase() === name.toLowerCase()) {
                return true;
            }
        }

        return false;
    }

    const init = async () => {
        if (!initialized.value) {
            initialized.value = true
            /** materials.js depends on textures.js */
            await textures.init()
            
            const response = await fetch('/materials.json')
            materialsJson.value = await response.json()
            for (let i = 0; i < materialsJson.value.length; i++) {
                await loadMaterial(materialsJson.value[i])
            }
        }
    }

    return {
        init,
        isDefaultMaterial,
        findMaterial,
        removeMaterial,
        loadMaterial,
        materials
    }
}
