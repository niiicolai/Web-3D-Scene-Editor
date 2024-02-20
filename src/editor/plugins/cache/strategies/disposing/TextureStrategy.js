import DisposeStrategy from '../../src/DisposeStrategy.js'

/**
 * @extends CloningStrategy
 * @class
 * @classdesc TextureStrategy is a strategy for disposing textures
 */
export default class TextureStrategy extends DisposeStrategy {

    /**
     * Dispose the texture
     * 
     * @param {Object} cached - The cached object
     * @returns {void}
     */
    dispose(cached) {
        cached.texture.dispose()
    } 
}
