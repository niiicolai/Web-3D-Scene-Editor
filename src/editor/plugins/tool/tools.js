import BasePlugin from '../../src/abstractions/BasePlugin.js';
import Tool from './src/Tool.js'

let tool = null

function onPointerDown(object) {
    if (tool) tool.onPointerDown(object.event)
}

function onPointerUp(object) {
    if (tool) tool.onPointerUp(object.event)
}

function onPointerMove(object) {
    if (tool) tool.onPointerMove(object.event)
}

function onSelected(object) {
    if (tool) tool.onSelected(object.event.event)
}

function onDeselected(object) {
    if (tool) tool.onDeselected(object.event.event)
}

/**
 * @extends BasePlugin
 * @class
 * @classdesc A plugin used to manage tools
 * @property {Tool|null} tool
 * @property {Events|null} events
 * @property {Context} context
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
        const events = context.options.getPlugin('events')

        this.context = context
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
        
        if (tool) {
            tool.deactivate()
        }

        tool = newTool
        tool.activate(this.context.options)
    }

    /**
     * Remove the active tool
     * 
     * @returns {void}
     */
    removeTool() {
        if (tool) {
            tool.deactivate()
            tool = null
        }
    }

    /**
     * Get the active tool
     * 
     * @returns {Tool|null} the active tool
     */
    getTool() {
        return tool
    }

    /**
     * Setup events available to the tool
     * 
     * @param {Tools} tools
     */
    static setupEvents = (tools) => {
        tools.events.addListener('pointerdown', onPointerDown)
        tools.events.addListener('pointerup', onPointerUp)
        tools.events.addListener('pointermove', onPointerMove)
        tools.events.addListener('select', onSelected)
        tools.events.addListener('deselect', onDeselected)
    }

    /**
     * Clear events available to the tool
     * 
     * @param {Tools} tools
     */
    static clearEvents = (tools) => {
        tools.events.removeListener('pointerdown', onPointerDown)
        tools.events.removeListener('pointerup', onPointerUp)
        tools.events.removeListener('pointermove', onPointerMove)
        tools.events.removeListener('select', onSelected)
        tools.events.removeListener('deselect', onDeselected)
    }
}
