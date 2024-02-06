import { ref } from 'vue'
import * as THREE from 'three'
import { useMeshes } from './meshes.js';

const objects = ref([])
const initialized = ref(false)
const onAddEvents = []
const onRemoveEvents = []
let id = 0;

export const useObjects = () => {
    const meshes = useMeshes()

    const addCreateCallback = (callback) => {
        onAddEvents.push(callback)
    }

    const addRemoveCallback = (callback) => {
        onRemoveEvents.push(callback)
    }

    const findById = (id) => {
        for (let i = 0; i < objects.value.length; i++) {
            if (objects.value[i].id === id) {
                return { index: i, object: objects.value[i] }
            }
        }

        return null
    }

    const removeObject = (id) => {
        const { index, object } = findById(id)
        objects.value.splice(index, 1)
        for (let i = 0; i < onRemoveEvents.length; i++) {
            onRemoveEvents[i]({ id, object })
        }
    }

    const addObject = async (mesh) => {
        const loadedMesh = meshes.findMesh(mesh.name)
        const clone = loadedMesh.instance.clone()
        const data = { id: id++, data: loadedMesh.data, instance: clone }
        objects.value.push(data)
        for (let i = 0; i < onAddEvents.length; i++) {
            onAddEvents[i]({ id: data.id, object: data })
        }
        return data
    }

    const init = async () => {
        if (!initialized.value) {
            initialized.value = true
            /** objects.js depends on meshes.js */
            await meshes.init()
        }
    }

    return {
        init,
        addCreateCallback,
        addRemoveCallback,
        findById,
        removeObject,
        addObject,
        objects
    }
}
