
/**
 * @abstract
 * @class
 * @name DisposeStrategy
 * @description DisposeStrategy is an abstract class that defines how the object of a cache is disposed
 * @example
 * 
 * class MaterialStrategy extends DisposeStrategy {
 *  dispose(cached) {
 *      cached.material.dispose()
 *  }
 * }
 * 
 */
export default class DisposeStrategy {

    /**
     * @abstract
     * @function
     * @name DisposeStrategy#dispose
     * @param {object} cached - the cached object
     * @returns {void}
     * @throws {Error} if the method is not implemented
     * @description Dispose the cached object
     */
    dispose(cached) {
        throw new Error('dispose method must be implemented');
    }
}
