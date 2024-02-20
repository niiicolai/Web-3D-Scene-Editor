
/**
 * @abstract
 * @class
 * @name CloningStrategy
 * @description CloningStrategy is an abstract class that defines how the object of a cache is cloned
 * @example
 * 
 * class MeshStrategy extends CloningStrategy {
 *    clone(cached) {
 *       return cached.mesh.clone();
 *   }
 * }
 * 
 */
export default class CloningStrategy {

    /**
     * @abstract
     * @function
     * @name CloningStrategy#clone
     * @param {object} cached - the cached object
     * @returns {object} the cloned object
     * @throws {Error} if the method is not implemented
     * @description Clone the cached object
     */
    clone(cached) {
        throw new Error('clone method must be implemented');
    }
}
