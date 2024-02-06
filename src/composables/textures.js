import { ref } from 'vue'
import * as THREE from 'three'

const texturePacks = ref([])
const textureLoader = new THREE.TextureLoader()
const texturesJson = ref([])
const initialized = ref(false)

let id = 0
export const useTextures = () => {

    const findtexturePack = (name) => {
        for (let i = 0; i < texturePacks.value.length; i++) {
            if (texturePacks.value[i].name.toLowerCase() === name.toLowerCase()) {
                return texturePacks.value[i]
            }
        }

        return null
    }

    const findById = (id) => {
        for (let i = 0; i < texturePacks.value.length; i++) {
            if (texturePacks.value[i].id === id) {
                return { index: i, texturePack: texturePacks.value[i] }
            }
        }
    }

    const disposeAll = () => {
        texturePacks.value.forEach(texturePack => {
            texturePack.textures.forEach(texture => {
                texture.instance.dispose()
            })
        })
        texturePacks.value = []
    }

    const removeTexturePack = (id) => {
        const { index, texturePack } = findById(id)
        if (isDefaultTexturePack(texturePacks.value[index].name)) return
        texturePack.textures.forEach(texture => texture.instance.dispose())
        texturePacks.value.splice(index, 1)
    }

    const loadTexturePack = async (texturePack) => {
        const existingTexturePack = findtexturePack(texturePack.name)
        if (existingTexturePack) return existingTexturePack

        const newTexturePack = {
            id: id++,
            name: texturePack.name,
            textures: []
        }

        for (let i = 0; i < texturePack.textures.length; i++) {
            const texture = await textureLoader.loadAsync(texturePack.textures[i].src)
            newTexturePack.textures.push({ data: texturePack.textures[i], instance: texture })
        }

        texturePacks.value.push(newTexturePack)

        return texturePack
    }

    const isDefaultTexturePack = (name) => {
        for (let i = 0; i < texturesJson.value.length; i++) {
            if (texturesJson.value[i].name.toLowerCase() === name.toLowerCase()) {
                return true;
            }
        }

        return false;
    }

    const init = async () => {
        if (!initialized.value) {
            initialized.value = true
            const response = await fetch('/textures.json')
            texturesJson.value = await response.json()
            for (let i = 0; i < texturesJson.value.length; i++) {
                await loadTexturePack(texturesJson.value[i])
            }
        }
    }

    return {
        init,
        isDefaultTexturePack,
        removeTexturePack,
        findtexturePack,
        loadTexturePack,
        disposeAll,
        texturePacks
    }
}
