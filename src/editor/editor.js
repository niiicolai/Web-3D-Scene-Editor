import BaseEditor from './src/BaseEditor.js'

import Events from './plugins/event/events.js'
import Tools from './plugins/tool/tools.js'
import Objects from './plugins/object/objects.js'
import Selector from './plugins/select/selector.js'
import Caches from './plugins/cache/caches.js'

import Command from './src/abstractions/Command.js'
import Reader from './src/abstractions/Reader.js'
import Plugin from './src/abstractions/Plugin.js'
import PluginError from './src/errors/PluginError.js'
import ViewConfiguration from './src/view/src/ViewConfiguration.js'

export default class Editor extends BaseEditor {
    constructor(canvas, viewConfiguration, frameRate) {
        super(canvas, viewConfiguration, frameRate)
        
        /**
          * The events plugin handles mouse and keyboard events
          * when the user interacts with the canvas.
          */
        this.addPlugin('events', new Events(canvas))

        /**
          * The tools plugin handles the activation and deactivation
          * of a tool that can interact with selected objects.
          */
        this.addPlugin('tools', new Tools())

        /**
          * The objects plugin handles the adding and removing of objects
          * from the scene. Every object in this container is a THREE.Object3D.
          */
        this.addPlugin('objects', new Objects())

        /**
          * The selector plugin handles the selection of objects in the scene.
          * It uses a raycaster to determine which object is selected.
          */
        this.addPlugin('selector', new Selector())

        /**
          * The caches plugin handles the caching of objects.
          * It is used to specifically cache 3D resources,
          * such as meshes, textures, and materials.
          */
        this.addPlugin('caches', new Caches())
    }
}

/**
 * Export reference to abstractions to ease importing
 */
export {
    Command,
    Reader,
    Plugin,
    PluginError,
    ViewConfiguration
}
