import { State } from '../abstractions/States.js'
import Stopped from './Stopped.js'

export default class Exiting extends State {
    enter() {
        /**
         * Stop the loop         
         */
        this.context.options.update.stop()

        /**
         * Destroy the event listeners
         */
        this.context.options.events.destroyListeners()

        /**
         * Destroy the selector listeners
         */
        this.context.selector.destroyListeners()

        /**
         * Destroy the tool listeners
         */
        this.context.options.tools.destroyListeners(this.context.options.events)
        this.context.options.tools.removeTool()

        /**
         * Clear the context's resources        
         */
        this.context.objects.clear() 
        this.context.meshCache.disposeAll()
        this.context.materialCache.disposeAll()
        this.context.textureCache.disposeAll()
        this.context.view.dispose()

        /**
         * Remove the context's references        
         */
        this.context.selector = null
        this.context.meshCache = null
        this.context.materialCache = null
        this.context.textureCache = null
        this.context.objects = null
        this.context.view = null
        this.context.loop = null 
        
        /**
         * Change the state to Stopped        
         */
        this.context.changeState(new Stopped()) 
    }
}
 