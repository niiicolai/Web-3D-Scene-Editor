import BasePlugin from '../../src/abstractions/BasePlugin.js';
import Tool from './src/Tool.js'

/**
 * @extends BasePlugin
 * @class
 * @classdesc A plugin used to manage tools
 * @property {Tool|null} tool
 * @property {Events|null} events
 * @property {Object} callbacks
 * @property {Scene} scene
 * @property {Camera} camera
 */
export default class Tools extends BasePlugin {

    /**
     * @constructor
     */ 
    constructor() {
        super();
        this.tool = null
    }

    /**
     * Setup the plugin
     * 
     * @param {Object} context
     * @returns {void}
     * @throws {Error} if unable to find events
     * @throws {Error} if unable to find scene
     */
    setup(context) {
        const { events } = context.options.plugins
        const { scene, camera } = context.options.view

        if (events === null) {
            throw new Error('Unable to find events')
        }

        if (scene === null) {
            throw new Error('Unable to find scene')
        }

        this.scene = scene
        this.camera = camera
        this.events = events
    }

    /**
     * Clear the tool and events
     * 
     * @returns {void}
     */
    clear() {
        this.removeTool()
        Tools.clearEvents(this)
    }

    /**
     * Clear the events
     * 
     * @returns {void}
     */
    pause() {
        Tools.clearEvents(this)
    }

    /**
     * Setup the events
     * 
     * @returns {void}
     */
    resume() {
        Tools.setupEvents(this)
    }

    /**
     * Set the active tool
     * 
     * @param {Tool} newTool
     * @returns {void}
     * @throws {Error} if newTool is not a Tool
     */
    setTool(newTool) {
        if (!(newTool instanceof Tool)) {
            throw new Error('Must be a Tool')
        }
        
        if (this.tool) {
            Tool.transferState(this.tool, newTool)
            this.tool.deactivate()
        }

        this.tool = newTool
        this.tool.activate({ scene: this.scene, camera: this.camera })
    }

    /**
     * Remove the active tool
     * 
     * @returns {void}
     */
    removeTool() {
        if (this.tool) {
            this.tool.deactivate()
            this.tool = null
        }
    }

    /**
     * Handle pointer down event
     * 
     * @param {Object} object
     * @returns {void}
     */
    onPointerDown(object) {
        if (this.tool) this.tool.onPointerDown(object)
    }

    /**
     * Handle pointer up event
     * 
     * @param {Object} object
     * @returns {void}
     */
    onPointerUp(object) {
        if (this.tool) this.tool.onPointerUp(object)
    }

    /**
     * Handle pointer move event
     * 
     * @param {Object} object
     * @returns {void}
     */
    onPointerMove(object) {
        if (this.tool) this.tool.onPointerMove(object)
    }

    /**
     * Handle selected event
     * 
     * @param {Object} object
     * @returns {void}
     */
    onSelected(object) {
        if (this.tool) this.tool.onSelected(object)
    }

    /**
     * Handle deselected event
     * 
     * @param {Object} object
     * @returns {void}
     */
    onDeselected(object) {
        if (this.tool) this.tool.onDeselected(object)
    }

    /**
     * Setup events available to the tool
     * 
     * @param {Tools} tools
     */
    static setupEvents = (tools) => {
        tools.events.addListener('pointerdown', tools.onPointerDown.bind(tools))
        tools.events.addListener('pointerup', tools.onPointerUp.bind(tools))
        tools.events.addListener('pointermove', tools.onPointerMove.bind(tools))
        tools.events.addListener('select', tools.onSelected.bind(tools))
        tools.events.addListener('deselect', tools.onDeselected.bind(tools))
    }

    /**
     * Clear events available to the tool
     * 
     * @param {Tools} tools
     */
    static clearEvents = (tools) => {
        tools.events.removeListener('pointerdown', tools.onPointerDown.bind(tools))
        tools.events.removeListener('pointerup', tools.onPointerUp.bind(tools))
        tools.events.removeListener('pointermove', tools.onPointerMove.bind(tools))
        tools.events.removeListener('select', tools.onSelected.bind(tools))
        tools.events.removeListener('deselect', tools.onDeselected.bind(tools))
    }
}
