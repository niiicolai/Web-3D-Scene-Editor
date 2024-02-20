import DisposeStrategy from '../../src/DisposeStrategy.js'

/**
 * @extends CloningStrategy
 * @class
 * @classdesc MaterialStrategy is a strategy for disposing materials
 */
export default class MaterialStrategy extends DisposeStrategy {

    /**
     * Dispose the material
     * 
     * @param {Object} cached - The cached object
     * @returns {void}
     */
    dispose(cached) {
        cached.material.dispose()
    }
} 
