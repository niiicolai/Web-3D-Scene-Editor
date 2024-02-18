import * as THREE from 'three'

export default class Events {
    constructor(canvas) {
        
        if (!(canvas instanceof HTMLCanvasElement)) {
            throw new Error('Must be a HTMLCanvasElement')
        }

        this.canvas = canvas
        this.eventDispatcher = new THREE.EventDispatcher()
        this.isInitialized = false
    }

    addListener(type, listener) {
        this.eventDispatcher.addEventListener(type, listener)
    }

    removeListener(type, listener) {
        this.eventDispatcher.removeEventListener(type, listener)
    }

    setupListeners() {
        if (this.isInitialized) {
            return
        }

        this.isInitialized = true
        this.canvas.addEventListener('pointerdown', (event) => this.eventDispatcher.dispatchEvent({type: 'pointerdown', event}))
        this.canvas.addEventListener('pointerup', (event) => this.eventDispatcher.dispatchEvent({type: 'pointerup', event}))
        this.canvas.addEventListener('pointermove', (event) => this.eventDispatcher.dispatchEvent({type: 'pointermove', event}))
    }

    destroyListeners() {
        if (!this.isInitialized) {
            return
        }

        this.isInitialized = false
        this.canvas.removeEventListener('pointerdown', (event) => this.eventDispatcher.dispatchEvent({type: 'pointerdown', event}))
        this.canvas.removeEventListener('pointerup', (event) => this.eventDispatcher.dispatchEvent({type: 'pointerup', event}))
        this.canvas.removeEventListener('pointermove', (event) => this.eventDispatcher.dispatchEvent({type: 'pointermove', event}))
    }
}
