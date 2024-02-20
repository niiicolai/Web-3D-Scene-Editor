import * as THREE from "three"

/**
 * Get the helper for the light
 * 
 * @param {THREE.Light} light
 * @throws {Error} if light is not a THREE.Light
 * @throws {Error} if light type is not supported
 * @returns {THREE.Object3D}
 */
const getLightHelper = (light) => {
    if (!(light instanceof THREE.Light)) {
        throw new Error('Must be a THREE.Light')
    }

    switch (light.type) {
        case 'DirectionalLight':
            return new THREE.DirectionalLightHelper(light, 5)
        case 'PointLight':
            return new THREE.PointLightHelper(light, 5)
        case 'SpotLight':
            return new THREE.SpotLightHelper(light, 5)
        case 'AmbientLight':
            // No helper for ambient light
            return new THREE.Mesh(
                new THREE.SphereGeometry(1, 16, 8),
                new THREE.MeshBasicMaterial({ color: light.color })
            )
        default:
            throw new Error('Unsupported light type')
    }
}

export default {
    getLightHelper
}
