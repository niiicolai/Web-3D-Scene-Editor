import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { Command } from '../abstractions/Commands.js';
import Cache from '../abstractions/Cache.js';

export default class LoadMesh extends Command {
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
            if (typeof subMeshConfiguration.subMeshName !== 'string') {
                throw new Error('SubMeshConfiguration subMeshName must be a string')
            }

            if (typeof subMeshConfiguration.materialName !== 'string') {
                throw new Error('SubMeshConfiguration materialName must be a string')
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
        const meshCache = this.invoker.options.context.meshCache
        if (!meshCache) {
            throw new Error('Mesh cache not found')
        }

        const cacheKey = this.name
        const cached = meshCache.find(cacheKey)
        if (cached) {
            throw new Error('Mesh already loaded')
        }
        
        const materialCache = this.invoker.options.context.materialCache
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
