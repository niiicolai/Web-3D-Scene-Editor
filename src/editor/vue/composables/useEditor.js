import { ref } from 'vue'
import { ViewConfiguration } from '../../handlers/view.js'

import Editor from '../../editor.js'
import LoadMesh from '../../commands/LoadMesh.js'
import LoadMaterial from '../../commands/LoadMaterial.js'
import LoadTexture from '../../commands/LoadTexture.js'
import CreateObject from '../../commands/CreateObject.js'

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
                await editor.value.invoke(new LoadTexture(texture.name, texture.src, texture.type))
            }
        }

        if (preload.materials) {
            for (const material of preload.materials) {
                await editor.value.invoke(new LoadMaterial(material.name, material.type, material.textures))
            }
        }

        if (preload.meshes) {
            for (const mesh of preload.meshes) {
                await editor.value.invoke(new LoadMesh(mesh.name, mesh.src, mesh.subMeshConfigurations))
            }
        }

        if (preload.objects) {
            for (const object of preload.objects) {
                await editor.value.invoke(new CreateObject(object.name, object.position, object.rotation, object.scale))
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

    const invoke = (command) => {
        editor.value.invoke(command)
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
        invoke
    }
}
