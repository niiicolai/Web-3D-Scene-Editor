import CloningStrategy from '../../src/CloningStrategy.js'

/**
 * @extends CloningStrategy
 * @class
 * @classdesc MeshStrategy is a strategy for cloning meshes
 */
export default class MeshStrategy extends CloningStrategy {

    /**
     * Clone the mesh
     * 
     * @param {Object} cached - The cached object
     * @returns {Mesh} the cloned mesh
     */
    clone(cached) {
        return cached.mesh.clone();
    }
}
