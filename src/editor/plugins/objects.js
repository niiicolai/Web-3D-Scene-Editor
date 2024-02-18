import Plugin from "../abstractions/Plugin.js"
import * as THREE from "three"

export default class Objects extends Plugin {
    constructor() {
        super();

        this.objects = []
        this.scene = null
        this.meshCache = null
    }

    setup(context) {
        const { scene } = context.options.view
        const meshCache = context.options.plugins.caches.find('meshes')
        
        if (scene === null) {
            throw new Error('Unable to find scene')
        }

        if (meshCache === null) {
            throw new Error('Unable to find meshCache')
        }

        this.scene = scene
        this.meshCache = meshCache
    }

    clear() {
        if (this.scene !== null) {
            for (const object of this.objects) {
                this.scene.remove(object)
            }
        }

        this.objects = []
    }

    addMeshByName(meshName) {
        if (this.scene === null || this.meshCache === null) {
            throw new Error('Must execute setup first')
        }

        if (typeof meshName !== 'string') {
            throw new Error('Must be a string')
        }
        
        const clone = this.meshCache.clone(meshName)
        if (!clone) {
            throw new Error('Unable to clone mesh')
        }

        this.objects.push(clone)
        this.scene.add(clone)
        return clone
    }

    add(object) {
        if (this.scene === null || this.meshCache === null) {
            throw new Error('Must execute setup first')
        }

        if (!(object instanceof THREE.Object3D)) {
            throw new Error('Must be a THREE.Object3D')
        }

        if (object instanceof THREE.Light) {
            const helper = Objects.getLightHelper(object)
            object.add(helper)
        }

        this.objects.push(object)
        this.scene.add(object)
        return object
    }

    static getLightHelper(light) {
        switch (light.type) {
            case 'DirectionalLight':
                return new THREE.DirectionalLightHelper(light, 5)
            case 'PointLight':
                return new THREE.PointLightHelper(light, 5)
            case 'SpotLight':
                return new THREE.SpotLightHelper(light, 5)
            default:
                return new THREE.Mesh(
                    new THREE.SphereGeometry(1, 16, 8),
                    new THREE.MeshBasicMaterial({ color: light.color })
                )
        }
    }
}
