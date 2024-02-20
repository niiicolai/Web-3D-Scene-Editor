import CloningStrategy from './CloningStrategy.js';
import DisposeStrategy from './DisposeStrategy.js';

/**
 * @class
 * @classdesc A cache for objects
 * @property {object} cache
 * @property {string} name
 * @property {CloningStrategy} cloningStrategy
 * @property {DisposeStrategy} disposeStrategy
 * @property {number} clearPriority
 */
export default class Cache {

  /**
   * @constructor
   * @param {string} name
   * @param {CloningStrategy} cloningStrategy
   * @param {DisposeStrategy} disposeStrategy
   * @param {number} clearPriority
   * @throws {Error} if name is not a string
   * @throws {Error} if cloningStrategy is not a CloningStrategy
   * @throws {Error} if disposeStrategy is not a DisposeStrategy
   */
  constructor(name, cloningStrategy, disposeStrategy, clearPriority = 0) {

    if (!(typeof name === 'string')) {
      throw new Error('name must be a string');
    }

    if (!(cloningStrategy instanceof CloningStrategy)) {
      throw new Error('cloneStrategy must be a CloningStrategy');
    }

    if (!(disposeStrategy instanceof DisposeStrategy)) {
      throw new Error('disposeStrategy must be a DisposeStrategy');
    }

    this.cache = {};
    this.name = name;
    this.cloningStrategy = cloningStrategy;
    this.disposeStrategy = disposeStrategy;
    this.clearPriority = clearPriority;
  }

  /**
   * Add an object to the cache
   * 
   * @param {string} id
   * @param {object} object
   * @returns {void}
   */
  add(id, object) {
    this.cache[id] = object;
  }

  /**
   * Find an object in the cache by id
   * 
   * @param {string} id
   * @returns {object}
   */
  find(id) {
    return this.cache[id];
  }

  /**
   * Clone an object from the cache
   * 
   * @param {string} id
   * @returns {object} cloned object
   * @throws {Error} if the object is not found
   */
  clone(id) {
    const cached = this.find(id);
    if (!cached) {
      throw new Error('Cached object not found: ' + id);
    }

    return this.cloningStrategy.clone(cached);
  }

  /**
   * Dispose an object from the cache
   * 
   * @param {string} id
   * @returns {void}
   */
  dispose(id) {
    const cached = this.find(id);
    this.disposeStrategy.dispose(cached);
    delete this.cache[id];
  }

  /**
   * Clear the cache of all objects
   * 
   * @returns {void}
   */
  disposeAll() {
    for (const key of Object.keys(this.cache)) {
      this.dispose(key);
    }

    this.cache = {};
  }
}
