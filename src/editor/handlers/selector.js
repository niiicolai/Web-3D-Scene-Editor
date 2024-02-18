import * as THREE from 'three'

import Objects from './objects.js'
import Events from './events.js'

export default class Selector {
    constructor(camera, scene, objects, events) {
        
        if (!(camera instanceof THREE.Camera)) {
            throw new Error('Must be a THREE.Camera')
        }

        if (!(scene instanceof THREE.Scene)) {
            throw new Error('Must be a THREE.Scene')
        }

        if (!(objects instanceof Objects)) {
            throw new Error('Must be a Objects')
        }

        if (!(events instanceof Events)) {
            throw new Error('Must be a Events')
        }

        this.camera = camera
        this.scene = scene
        this.objects = objects
        this.events = events
        this.raycaster = new THREE.Raycaster()
        this.mouseCoords = new THREE.Vector2()
        this.selected = null
    }

    setupListeners() {
        this.events.addListener('pointerdown', this.onPointerDown)
        this.events.addListener('pointerup', this.onPointerUp)
    }

    destroyListeners() {
        this.events.removeListener('pointerdown', this.onPointerDown)
        this.events.removeListener('pointerup', this.onPointerUp)
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
        const { event } = object
        this.mouseCoords.x = (event.clientX / window.innerWidth) * 2 - 1
        this.mouseCoords.y = -(event.clientY / window.innerHeight) * 2 + 1
        
        this.raycaster.setFromCamera(this.mouseCoords, this.camera)
        const { objects } = this.objects
        const intersects = this.raycaster.intersectObjects(objects)
        if (intersects.length > 0) {
            this.select(intersects[0].object)
        }
    }
    
    onPointerUp = (object) => {
        this.deselect()
    }
}
