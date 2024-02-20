import { Command } from '../../../editor.js'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

/**
 * @class
 * @classdesc SubMeshConfiguration is a configuration for a sub mesh
 */
export class SubMeshConfiguration {
    constructor(subMeshName, materialName) {
        this.subMeshName = subMeshName
        this.materialName = materialName
    }
}

/**
 * @extends Command
 * @class
 * @classdesc LoadMesh, loads a mesh from a file and creates a mesh
 */
export default class LoadMesh extends Command {

    /**
     * @constructor
     * 
     * @param {string} name the name of the mesh
     * @param {string} src the source of the mesh
     * @param {Array<SubMeshConfiguration>} subMeshConfigurations the sub mesh configurations
     * @throws {Error} if name is not a string
     * @throws {Error} if src is not a string
     * @throws {Error} if subMeshConfigurations is not an array
     * @throws {Error} if subMeshConfiguration is not a SubMeshConfiguration
     */
    constructor(name, src, subMeshConfigurations) {
        super()

        if (typeof name !== 'string') {
            throw new Error('Must be a string')
        }
        
        if (typeof src !== 'string') {
            throw new Error('Must be a string')
        }

        if (!Array.isArray(subMeshConfigurations)) {
            throw new Error('Must be an array')
        }

        for (const subMeshConfiguration of subMeshConfigurations) {
            if (!(subMeshConfiguration instanceof SubMeshConfiguration)) {
                throw new Error('Must be a SubMeshConfiguration')
            }
        }
        
        this.name = name
        this.src = src
        this.subMeshConfigurations = subMeshConfigurations
    }

    /**
     * Execute the command
     * 
     * @returns {void}
     */
    async execute() {
        const meshCache = this.invoker.options.plugins.caches.find('meshes')
        if (!meshCache) {
            throw new Error('Mesh cache not found')
        }

        const cacheKey = this.name
        const cached = meshCache.find(cacheKey)
        if (cached) {
            throw new Error('Mesh already loaded')
        }
        
        const materialCache = this.invoker.options.plugins.caches.find('materials')
        if (!materialCache) {
            throw new Error('Material cache not found')
        }

        const loaderGLTF = new GLTFLoader()
        const gltf = await loaderGLTF.loadAsync(this.src)
        const mesh = gltf.scene
        
        mesh.name = this.name
        mesh.traverse(child => {
            const subMeshConfiguration = this.subMeshConfigurations
                .find(config => config.subMeshName === child.name)

            if (subMeshConfiguration) {
                child.material = materialCache.clone(subMeshConfiguration.materialName)
            }
        })
        const cacheValue = {mesh, 
            src: this.src, subMeshConfigurations: this.subMeshConfigurations}
        
        meshCache.add(cacheKey, cacheValue)
    }
}
