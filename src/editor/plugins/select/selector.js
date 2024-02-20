import BasePlugin from '../../src/abstractions/BasePlugin.js';
import Util from "./src/util.js";

/**
 * @class Selector
 * @classdesc Selector selects objects in the scene
 * @extends BasePlugin
 * @property {Object} selected the selected object
 * @property {Camera} camera the camera
 * @property {Scene} scene the scene
 * @property {Objects} objects the objects
 * @property {Events} events the events
 */
export default class Selector extends BasePlugin {

    /**
     * @constructor
     */
    constructor() {
        super();

        this.selected = null
        this.camera = null
        this.scene = null
        this.objects = null
        this.events = null
    }

    /**
     * Setup the plugin
     * 
     * @param {Object} context
     * @returns {void}
     * @throws {Error} if unable to find camera
     * @throws {Error} if unable to find scene
     * @throws {Error} if unable to find objects
     * @throws {Error} if unable to find events
     */
    setup(context) {
        const { camera, scene } = context.options.view
        const { events, objects } = context.options.plugins

        if (camera === null) {
            throw new Error('View Error: Unable to find camera')
        }

        if (scene === null) {
            throw new Error('View Error: Unable to find scene')
        }

        if (objects === null) {
            throw new Error('Dependency Error: Unable to find objects plugin')
        }

        if (events === null) {
            throw new Error('Dependency Error: Unable to find events plugin')
        }

        this.camera = camera
        this.scene = scene
        this.objects = objects
        this.events = events
    }

    /**
     * Clear the selected object and events
     * 
     * @returns {void}
     */
    clear() {
        this.selected = null
        Selector.clearEvents(this)
    }

    /**
     * Clear the events
     * 
     * @returns {void}
     */
    pause() {
        Selector.clearEvents(this)
    }

    /**
     * Setup the events
     * 
     * @returns {void}
     */
    resume() {
        Selector.setupEvents(this)
    }

    onPointerUp = (object) => {
        if (this.selected) {
            this.events.eventDispatcher.dispatchEvent({ type: 'deselect', object: this.selected })
            this.selected = null
        }
    }

    onPointerDown = (object) => {
        const intersect = Util.getIntersect(object, this.camera, this.objects.objects)
        if (intersect && intersect !== this.selected) {
            this.selected = Util.findParentBeforeScene(intersect, this.scene)
            this.events.eventDispatcher.dispatchEvent({ type: 'select', object: intersect })
        }
    }

    /**
     * Setup the events for the selector
     * 
     * @param {Selector} selector
     * @returns {void}
     */
    static setupEvents = (selector) => {
        selector.events.addListener('pointerdown', selector.onPointerDown.bind(selector))
        selector.events.addListener('pointerup', selector.onPointerUp.bind(selector))
    }

    /**
     * Clear the events for the selector
     * 
     * @param {Selector} selector
     * @returns {void}
     */
    static clearEvents = (selector) => {
        selector.events.removeListener('pointerdown', selector.onPointerDown.bind(selector))
        selector.events.removeListener('pointerup', selector.onPointerUp.bind(selector))
    }
}
