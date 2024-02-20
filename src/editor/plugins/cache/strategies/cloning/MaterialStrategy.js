import CloningStrategy from '../../src/CloningStrategy.js'

/**
 * @extends CloningStrategy
 * @class
 * @classdesc MaterialStrategy is a strategy for cloning materials
 */
export default class MaterialStrategy extends CloningStrategy {

    /**
     * Clone the material
     * 
     * @param {Object} cached - The cached object
     * @returns {Material} the cloned material
     */
    clone(cached) {
        return cached.material;
    }
}
