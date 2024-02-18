import { State } from '../abstractions/States.js'

import View, { ViewConfiguration } from '../handlers/view.js'
import Tools from '../handlers/tools.js';
import Objects from '../handlers/objects.js';
import Selector from '../handlers/selector.js';
import Executing from './executing.js';

import Cache from '../abstractions/Cache.js'
import Cloning from '../cache/CloningStrategy.js'
import Disposing from '../cache/DisposingStrategy.js'

export default class Initializing extends State {
    constructor(canvas, viewConfiguration = new ViewConfiguration()) {
        super()

        if (!(canvas instanceof HTMLCanvasElement)) {
            throw new Error('Must be a HTMLCanvasElement')
        }

        if (!(viewConfiguration instanceof ViewConfiguration)) {
            throw new Error('Must be a ViewConfiguration')
        }

        this.canvas = canvas
        this.viewConfiguration = viewConfiguration
    }

    enter() {
        /**
         * Create caches for meshes, materials and textures
         */
        this.context.meshCache = new Cache('meshes', 
            new Cloning.MeshStrategy(), 
            new Disposing.MeshStrategy(),
            1)
        
        this.context.materialCache = new Cache('materials',
            new Cloning.MaterialStrategy(), 
            new Disposing.MaterialStrategy(),
            2)

        this.context.textureCache = new Cache('textures', 
            new Cloning.TextureStrategy(), 
            new Disposing.TextureStrategy(),
            3)
        
        /**
         * Create the view which contains the three.js scene, camera and renderer
         */
        this.context.view = new View(this.canvas, this.viewConfiguration)
        
        /**
         * Create the objects handler which handles dynamic objects in the scene
         * This include all types of object3D such as meshes, lights.
         */
        this.context.objects = new Objects(this.context.view.scene, this.context.meshCache)

        /**
         * Init the default light
         */
        this.context.view.initLight(this.context.objects)

        /**
         * Setup the selector which handles object selection
         */
        this.context.selector = new Selector(
            this.context.view.camera, 
            this.context.view.scene, 
            this.context.objects, 
            this.context.options.events
        )  

        /**
         * Move to the executing state
         */
        this.context.changeState(new Executing())
    }
}
