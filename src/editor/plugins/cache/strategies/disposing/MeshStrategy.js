import DisposeStrategy from '../../src/DisposeStrategy.js'
import * as THREE from 'three'

/**
 * @extends CloningStrategy
 * @class
 * @classdesc MeshStrategy is a strategy for disposing meshes
 */
export default class MeshStrategy extends DisposeStrategy {

    /**
     * Dispose the mesh
     * 
     * @param {Object} cached - The cached object
     * @returns {void}
     */
    dispose(cached) {
        cached.mesh.traverse(child => {
            if (child instanceof THREE.Mesh) {
                child.geometry.dispose()
            }
        })
    }
}
