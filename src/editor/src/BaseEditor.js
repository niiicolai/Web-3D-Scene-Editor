import Context from './Context.js'
import Invoker from './Invoker.js'

import Command from './abstractions/Command.js'
import BasePlugin from './abstractions/BasePlugin.js'
import Plugin from './abstractions/Plugin.js'

import Initializing from './states/Initializing.js'
import Executing from './states/Executing.js'
import Exiting from './states/Exiting.js'
import Stopped from './states/Stopped.js'
import Paused from './states/Paused.js'

import ViewConfiguration from './view/src/ViewConfiguration.js'
import View from './view/view.js'

/**
 * @class
 * @classdesc The BaseEditor class is the main class of the editor.
 * @abstract
 * @property {View} view - The editor's 3D view.
 * @property {object} plugins - The editor's plugins.
 * @property {Context} context - The editor's context.
 * @property {Invoker} invoker - The editor's Invoker.
 */
export default class BaseEditor {

    /**
     * @constructor
     * @param {HTMLCanvasElement} canvas - The canvas to render the 3D view.
     * @param {ViewConfiguration} viewConfiguration - The view configuration.
     * @param {number} frameRate - The frame rate.
     * @param {object} plugins - The editor's plugins.
     * @throws {Error} - If the canvas is not a HTMLCanvasElement.
     * @throws {Error} - If the viewConfiguration is not a ViewConfiguration.
     * @throws {Error} - If the frameRate is not a number.
     */
    constructor(canvas, viewConfiguration, frameRate, plugins = {}) {

        if (!(canvas instanceof HTMLCanvasElement)) {
            throw new Error('Must be a HTMLCanvasElement')
        }

        if (!(viewConfiguration instanceof ViewConfiguration)) {
            throw new Error('Must be a ViewConfiguration')
        }

        if (typeof frameRate !== 'number') {
            throw new Error('Must be a number')
        }

        /**
         * The editor's plugins.
         */
        this.plugins = plugins

        /**
         * The editor's 3D view.
         */
        this.view = new View(canvas, viewConfiguration, frameRate)

        /**
         * The editor's context.
         */
        this.context = new Context(new Stopped(), { plugins: this.plugins, view: this.view, })

        /**
         * The editor's Invoker.
         */
        this.invoker = new Invoker({ plugins: this.plugins, view: this.view, })
    }

    /**
     * The invoke method is called to invoke a command.
     * 
     * @param {Command} command - The command to invoke.
     * @throws {Error} - If the command is not a Command.
     * @returns {Promise<void>}
     * @async
     */
    async invoke(command) {
        if (!(command instanceof Command)) {
            throw new Error('Must be a Command')
        }

        await this.invoker.invoke(command)
    }

    /**
     * The addPlugin method is called to add a plugin to the editor.
     * 
     * @param {string} key - The key of the plugin.
     * @param {object} plugin - The plugin to add.
     * @throws {Error} - If the plugin already exists.
     * @returns {void}
     */
    addPlugin(key, plugin) {
        if (typeof key !== 'string') {
            throw new Error('Must be a string')
        }

        if (!(plugin instanceof Plugin) && !(plugin instanceof BasePlugin)) {
            throw new Error('Must be a Plugin or BasePlugin')
        }

        if (this.plugins[key]) {
            throw new Error('Plugin already exists')
        }

        this.plugins[key] = plugin
    }

    /**
     * The removePlugin method is called to remove a plugin from the editor.
     * 
     * @param {string} key - The key of the plugin.
     * @throws {Error} - If the plugin does not exist.
     * @throws {Error} - If the plugin is a BasePlugin.
     * @returns {void}
     */
    removePlugin(key) {
        if (typeof key !== 'string') {
            throw new Error('Must be a string')
        }

        if (!this.plugins[key]) {
            throw new Error('Plugin does not exist')
        }

        if (this.plugins[key] instanceof BasePlugin) {
            throw new Error('Cannot remove a BasePlugin - These are built-in plugins.')
        }

        delete this.plugins[key]
    }

    /**
     * The start method is called to start the editor.
     * 
     * @throws {Error} - If the editor is not in the Stopped state.
     * @returns {void}
     */
    start() {
        if (this.context.isStateType(Stopped)) {
            this.context.changeState(new Initializing())
        } else {
            throw new Error('Cannot start when not stopped')
        }
    }

    /**
     * The resume method is called to resume the editor.
     * 
     * @throws {Error} - If the editor is not in the Paused state.
     * @returns {void}
     */
    resume() {
        if (this.context.isStateType(Paused)) {
            this.context.changeState(new Executing())
        } else {
            throw new Error('Cannot resume when not paused')
        }
    }

    /**
     * The pause method is called to pause the editor.
     * 
     * @throws {Error} - If the editor is not in the Executing state.
     * @returns {void}
     */
    pause() {
        if (this.context.isStateType(Executing)) {
            this.context.changeState(new Paused())
        } else {
            throw new Error('Cannot pause when not executing')
        }
    }

    /**
     * The stop method is called to stop the editor.
     * 
     * @throws {Error} - If the editor is already stopped.
     * @returns {void}
     */
    stop() {
        if (!this.context.isStateType(Stopped)) {
            this.context.changeState(new Exiting())
        } else {
            throw new Error('Is already stopped')
        }
    }
}
