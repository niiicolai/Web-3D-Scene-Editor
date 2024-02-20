import { ref, toRaw } from 'vue'

import Editor, { ViewConfiguration } from '../editor/editor.js'
import LoadMesh, { SubMeshConfiguration } from '../editor/plugins/cache/commands/LoadMesh.js'
import LoadMaterial from '../editor/plugins/cache/commands/LoadMaterial.js'
import LoadTexture from '../editor/plugins/cache/commands/LoadTexture.js'
import CreateObject from '../editor/plugins/object/commands/CreateObject.js'
import SetSceneCubeMap from '../editor/src/view/commands/SetSceneCubeMap.js'

import IsState from '../editor/src/readers/IsState.js'

const editor = ref(null)
const stateReader = ref(null)

export const useEditor = () => {

    const init = (canvas, viewConfiguration = new ViewConfiguration(),  frameRate = 1000 / 60) => {
        editor.value = new Editor(canvas, viewConfiguration, frameRate)
        stateReader.value = new IsState(editor.value)
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
                const subMeshConfigurations = mesh.subMeshConfigurations.map(subMeshConfiguration => {
                    return new SubMeshConfiguration(subMeshConfiguration.subMeshName, subMeshConfiguration.materialName)
                })

                await editor.value.invoke(new LoadMesh(mesh.name, mesh.src, subMeshConfigurations))
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

    const isState = (stateType) => {
        if (!editor.value) return false
        return stateReader.value.compare(stateType)
    }

    const invoke = async (command) => {
        await editor.value.invoke(command)
    }

    const newReader = (ReaderType, ...args) => {
        return new ReaderType(toRaw(editor.value), ...args)
    }

    return {
        init,
        start,
        stop,
        isState,
        invoke,
        newReader
    }
}
