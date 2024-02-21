import BasePlugin from '../../src/abstractions/BasePlugin.js';
import * as THREE from 'three'

const eventDispatcher = new THREE.EventDispatcher()

function dispatch(event) {
    eventDispatcher.dispatchEvent({type: event.type, event})
}

/**
 * @extends BasePlugin
 * @class
 * @classdesc Events is a plugin used to manage events
 */
export default class Events extends BasePlugin {

    /**
     * @constructor
     * 
     * @param {HTMLCanvasElement} canvas
     * @throws {Error} if canvas is not a HTMLCanvasElement
     */
    constructor(canvas) {
        super()
        
        if (!(canvas instanceof HTMLCanvasElement)) {
            throw new Error('Must be a HTMLCanvasElement')
        }

        this.canvas = canvas
        this.isInitialized = false
    }

    /**
     * Setup the plugin
     * 
     * @param {Object} context
     * @returns {void}
     */
    setup(context) {
        if (this.isInitialized) {
            return
        }

        this.isInitialized = true
    }

    /**
     * Clear the plugin
     * 
     * @returns {void}
     */
    clear() {
        if (!this.isInitialized) {
            return
        }

        this.isInitialized = false
        Events.clearDispatcher(this)
    }

    /**
     * Pause the plugin
     * 
     * @returns {void}
     */
    pause() {
        if (!this.isInitialized) {
            return
        }

        Events.clearDispatcher(this)
    }

    /**
     * Resume the plugin
     * 
     * @returns {void}
     */
    resume() {
        if (!this.isInitialized) {
            return
        }
        
        Events.setupDispatcher(this)
    }

    /**
     * Add an event listener
     * 
     * @param {string} type
     * @param {function} listener
     * @returns {void}
     * @throws {Error} if type is not a string
     * @throws {Error} if listener is not a function
     */
    addListener(type, listener) {
        if (typeof type !== 'string') {
            throw new Error('Must be a string')
        }

        if (typeof listener !== 'function') {
            throw new Error('Must be a function')
        }

        eventDispatcher.addEventListener(type, listener)
    }

    /**
     * Remove an event listener
     * 
     * @param {string} type
     * @param {function} listener
     * @returns {void}
     * @throws {Error} if type is not a string
     * @throws {Error} if listener is not a function
     */
    removeListener(type, listener) {
        if (typeof type !== 'string') {
            throw new Error('Must be a string')
        }

        if (typeof listener !== 'function') {
            throw new Error('Must be a function')
        }

        eventDispatcher.removeEventListener(type, listener)
    }

    dispatchEvent(type, event) {
        dispatch({type, event})
    }

    /**
     * Setup canvas event dispatcher
     * 
     * @param {Object} events
     * @returns {void}
     */
    static setupDispatcher = (events) => {
        const { canvas } = events
        const names = ['pointerdown', 'pointerup', 'pointermove']
        
        for (const name of names) {
            canvas.addEventListener(name, dispatch, false)
        }
    } 
    
    /**
     * Clear canvas event dispatcher
     * 
     * @param {Object} events
     * @returns {void}
     */
    static clearDispatcher = (events) => {
        const { canvas } = events
        const names = ['pointerdown', 'pointerup', 'pointermove']

        for (const name of names) {
            canvas.removeEventListener(name, dispatch, false)
        }
    }
}
