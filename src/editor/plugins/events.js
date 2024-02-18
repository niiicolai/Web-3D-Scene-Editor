import Handler from "../abstractions/Plugin.js"
import * as THREE from 'three'

const setupEvents = (canvas, eventDispatcher) => {
    canvas.addEventListener('pointerdown', (event) => eventDispatcher.dispatchEvent({type: 'pointerdown', event}))
    canvas.addEventListener('pointerup', (event) => eventDispatcher.dispatchEvent({type: 'pointerup', event}))
    canvas.addEventListener('pointermove', (event) => eventDispatcher.dispatchEvent({type: 'pointermove', event}))
}

const clearEvents = (canvas, eventDispatcher) => {
    canvas.removeEventListener('pointerdown', (event) => eventDispatcher.dispatchEvent({type: 'pointerdown', event}))
    canvas.removeEventListener('pointerup', (event) => eventDispatcher.dispatchEvent({type: 'pointerup', event}))
    canvas.removeEventListener('pointermove', (event) => eventDispatcher.dispatchEvent({type: 'pointermove', event}))
}

export default class Events {
    constructor(canvas) {

        if (!(canvas instanceof HTMLCanvasElement)) {
            throw new Error('Must be a HTMLCanvasElement')
        }

        this.canvas = canvas
        this.eventDispatcher = new THREE.EventDispatcher()
        this.isInitialized = false
    }

    setup(context) {
        if (this.isInitialized) {
            return
        }

        this.isInitialized = true
    }

    clear() {
        if (!this.isInitialized) {
            return
        }

        this.isInitialized = false
        clearEvents(this.canvas, this.eventDispatcher)
    }

    pause() {
        if (!this.isInitialized) {
            return
        }

        clearEvents(this.canvas, this.eventDispatcher)
    }

    resume() {
        if (!this.isInitialized) {
            return
        }

        setupEvents(this.canvas, this.eventDispatcher)
    }

    addListener(type, listener) {
        this.eventDispatcher.addEventListener(type, listener)
    }

    removeListener(type, listener) {
        this.eventDispatcher.removeEventListener(type, listener)
    }
}
