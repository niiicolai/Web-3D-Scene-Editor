import { ref } from 'vue'
import { ViewConfiguration } from '../../view.js'

import Editor from '../../editor.js'
import CreateMesh from '../../commands/CreateMesh.js'
import CreateMaterial from '../../commands/CreateMaterial.js'
import CreateTexture from '../../commands/CreateTexture.js'
import CreateObject from '../../commands/CreateObject.js'
import SetSceneCubeMap from '../../commands/SetSceneCubeMap.js'
const editor = ref(null)

export const useEditor = () => {

    const init = (canvas, viewConfiguration = new ViewConfiguration(),  frameRate = 1000 / 60) => {        
        editor.value = new Editor(canvas, viewConfiguration, frameRate)
    }

    const start = async (preload={}) => {
        editor.value.start()
        editor.value.pause()

        if (preload.textures) {
            for (const texture of preload.textures) {
                await editor.value.invoke(new CreateTexture(texture.name, texture.src, texture.type))
            }
        }

        if (preload.materials) {
            for (const material of preload.materials) {
                await editor.value.invoke(new CreateMaterial(material.name, material.type, material.textures))
            }
        }

        if (preload.meshes) {
            for (const mesh of preload.meshes) {
                await editor.value.invoke(new CreateMesh(mesh.name, mesh.src, mesh.subMeshConfigurations))
            }
        }

        if (preload.objects) {
            for (const object of preload.objects) {
                await editor.value.invoke(new CreateObject(object.name, object.position, object.rotation, object.scale))
            }
        }
        
        if (preload.scene) {
            if (preload.scene.color) {
                await editor.value.invoke(new SetSceneColor(preload.scene.color))
            }
            
            if (preload.scene.cubeMap) {
                const { path, px, nx, py, ny, pz, nz } = preload.scene.cubeMap
                await editor.value.invoke(new SetSceneCubeMap(path, px, py, pz, nx, ny, nz))
            }
        }

        editor.value.resume()
    }

    const stop = () => {
        editor.value.stop()
    }

    const isInitializing = () => {
        return editor.value?.isState(Editor.STATES.Initializing) || false
    }

    const isExecuting = () => {
        return editor.value?.isState(Editor.STATES.Executing) || false
    }

    const isExiting = () => {
        return editor.value?.isState(Editor.STATES.Exiting) || false
    }

    const isStopped = () => {
        return editor.value?.isState(Editor.STATES.Stopped) || false
    }

    const isPaused = () => {
        return editor.value?.isState(Editor.STATES.Paused) || false
    }

    const addEventListener = (event, callback) => {
        editor.value.addEventListener(event, callback)
    }

    const removeEventListener = (event, callback) => {
        editor.value.removeEventListener(event, callback)
    }

    const activateTool = (tool) => {
        editor.value.activateTool(tool)
    }

    const deactivateTool = () => {
        editor.value.deactivateTool()
    }

    const isTool = (tool) => {
        return editor.value.isTool(tool)
    }

    const invoke = async (command) => {
        await editor.value.invoke(command)
    }

    const createReader = (reader) => {
        const context = editor.value.context

        if (!context) {
            throw new Error('Context not found')
        }

        reader.setContext(context)

        return reader
    }

    return {
        init,
        start,
        stop,
        isInitializing,
        isExecuting,
        isExiting,
        isStopped,
        isPaused,
        addEventListener,
        removeEventListener,
        activateTool,
        deactivateTool,
        isTool,
        invoke,
        createReader
    }
}
