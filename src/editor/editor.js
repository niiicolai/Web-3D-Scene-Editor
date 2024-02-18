import { Context } from './abstractions/States.js'
import { Invoker } from './abstractions/Commands.js'
import Tool from './abstractions/Tool.js'

import { ViewConfiguration } from './view.js'
import Events from './plugins/events.js'
import Tools from './plugins/tools.js'
import Objects from './plugins/objects.js'
import Selector from './plugins/selector.js'
import Caches from './plugins/caches.js'
import View from './view.js'

import Initializing from './states/Initializing.js'
import Executing from './states/Executing.js'
import Exiting from './states/Exiting.js'
import Stopped from './states/Stopped.js'
import Paused from './states/Paused.js'

export default class Editor {
    constructor(canvas, viewConfiguration = new ViewConfiguration(), frameRate = 1000 / 60) {
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
         * The editor's 3D view.
         * Configures a basic THREE.js scene.
         */
        this.view = new View(canvas, viewConfiguration, frameRate)

        /**
         * The editor's context.
         * Controls the state of the editor.
         */
        this.context = new Context(new Stopped(), this)

        /**
         * The editor's Invoker.
         * Controls the execution of external commands.
         */
        this.invoker = new Invoker(this)

        /**
         * The editor's plugins.
         * Controls the functionality of the editor.
         * The plugins below are the default plugins.
         */
        this.plugins = {
            /**
             * The events plugin handles mouse and keyboard events
             * when the user interacts with the canvas.
             */
            events: new Events(canvas),

            /**
             * The tools plugin handles the activation and deactivation
             * of a tool that can interact with selected objects.
             */
            tools: new Tools(),

            /**
             * The objects plugin handles the adding and removing of objects
             * from the scene. Every object in this container is a THREE.Object3D.
             */
            objects: new Objects(),
            
            /**
             * The selector plugin handles the selection of objects in the scene.
             * It uses a raycaster to determine which object is selected.
             */
            selector: new Selector(),
            
            /**
             * The caches plugin handles the caching of objects.
             * It is used to specifically cache 3D resources,
             * such as meshes, textures, and materials.
             */
            caches: new Caches()
        }
    }

    addPlugin(key, plugin) {
        if (this.plugins[key]) {
            throw new Error('Plugin already exists')
        }

        this.plugins[key] = plugin
    }

    start() {
        if (this.isState(Stopped) || this.context.state == null) {
            this.context.changeState(new Initializing())
        } else {
            throw new Error('Cannot start when not stopped')
        }
    }

    resume() {
        if (this.isState(Paused)) {
            this.context.changeState(new Executing())
        } else {
            throw new Error('Cannot resume when not paused')
        }
    }

    pause() {
        if (this.isState(Executing)) {
            this.context.changeState(new Paused())
        } else {
            throw new Error('Cannot pause when not executing')
        }
    }

    stop() {
        if (!this.isState(Stopped)) {
            this.context.changeState(new Exiting())
        } else {
            throw new Error('Is already stopped')
        }
    }

    isState(stateType) {
        return this.context.isState(stateType)
    }

    addEventListener(event, callback) {
        this.plugins.events.addEventListener(event, callback)
    }

    removeEventListener(event, callback) {
        this.plugins.events.removeEventListener(event, callback)
    }

    activateTool(tool) {
        if (!(tool instanceof Tool)) {
            throw new Error('Must be a Tool')
        }

        this.plugins.tools.setTool(tool)
    }

    deactivateTool() {
        this.plugins.tools.removeTool()
    }

    isTool(tool) {
        return this.plugins.tools.isTool(tool)
    }

    async invoke(command) {
        await this.invoker.invoke(command)
    }
}

Editor.STATES = {
    Initializing,
    Executing,
    Exiting,
    Paused,
    Stopped
}
