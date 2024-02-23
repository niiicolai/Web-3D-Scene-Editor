import CloningStrategy from '../../src/CloningStrategy.js'

/**
 * @extends CloningStrategy
 * @class
 * @classdesc TextureStrategy is a strategy for cloning textures
 */
export default class TextureStrategy extends CloningStrategy {

    /**
     * Clone the texture
     * 
     * @param {Object} cached - The cached object
     * @returns {Texture} the cloned texture
     */
    clone(cached) {
        return {texture: cached.texture, type: cached.type};
    }
}
