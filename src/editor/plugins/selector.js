import Plugin from "../abstractions/Plugin.js"
import * as THREE from 'three'

const raycaster = new THREE.Raycaster()
const mouseCoords = new THREE.Vector2()

const setupEvents = (events, onPointerDown, onPointerUp) => {
    events.addListener('pointerdown', onPointerDown)
    events.addListener('pointerup', onPointerUp)
}

const clearEvents = (events, onPointerDown, onPointerUp) => {
    events.removeListener('pointerdown', onPointerDown)
    events.removeListener('pointerup', onPointerUp)
}

export default class Selector extends Plugin {
    constructor() {
        super();
        
        this.selected = null
        this.camera = null
        this.scene = null
        this.objects = null
        this.events = null
    }

    setup(context) {
        const { camera, scene } = context.options.view
        const { events, objects } = context.options.plugins

        if (camera === null) {
            throw new Error('Unable to find camera')
        }

        if (scene === null) {
            throw new Error('Unable to find scene')
        }

        if (objects === null) {
            throw new Error('Unable to find objects')
        }

        if (events === null) {
            throw new Error('Unable to find events')
        }

        this.camera = camera
        this.scene = scene
        this.objects = objects
        this.events = events
    }

    clear() {
        clearEvents(this.events, this.onPointerDown, this.onPointerUp)
    }

    pause() {
        clearEvents(this.events, this.onPointerDown, this.onPointerUp)
    }

    resume() {
        setupEvents(this.events, this.onPointerDown, this.onPointerUp)
    }

    select(object) {
        if (object == null || object === this.selected) {
            return
        }
        
        this.selected = object
        this.events.eventDispatcher.dispatchEvent({ type: 'select', object: this.selected })
    }

    deselect() {
        if (this.selected) {
            this.events.eventDispatcher.dispatchEvent({ type: 'deselect', object: this.selected })
            this.selected = null
        }
    }

    onPointerDown = (object) => {
        mouseCoords.x = (object.event.clientX / window.innerWidth) * 2 - 1
        mouseCoords.y = -(object.event.clientY / window.innerHeight) * 2 + 1
        
        raycaster.setFromCamera(mouseCoords, this.camera)
        const intersects = raycaster.intersectObjects(this.objects.objects)
        if (intersects.length > 0) {
            this.select(intersects[0].object)
        }
    }
    
    onPointerUp = (object) => {
        this.deselect()
    }
}
