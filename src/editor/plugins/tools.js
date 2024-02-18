import Plugin from "../abstractions/Plugin.js"
import Tool from '../abstractions/Tool.js'

const setupEvents = (events, callbacks) => {
    events.addListener('pointerdown', callbacks.onPointerDown)
    events.addListener('pointerup', callbacks.onPointerUp)
    events.addListener('pointermove', callbacks.onPointerMove)
    events.addListener('select', callbacks.onSelected)
    events.addListener('deselect', callbacks.onDeselected)
}

const clearEvents = (events, callbacks) => {
    events.removeListener('pointerdown', callbacks.onPointerDown)
    events.removeListener('pointerup', callbacks.onPointerUp)
    events.removeListener('pointermove', callbacks.onPointerMove)
    events.removeListener('select', callbacks.onSelected)
    events.removeListener('deselect', callbacks.onDeselected)
}

export default class Tools extends Plugin {
    constructor() {
        super();

        this.tool = null
        this.events = null
        this.callbacks = {
            onPointerDown: this.onPointerDown.bind(this),
            onPointerUp: this.onPointerUp.bind(this),
            onPointerMove: this.onPointerMove.bind(this),
            onSelected: this.onSelected.bind(this),
            onDeselected: this.onDeselected.bind(this)
        }
    }

    setup(context) {
        const { events } = context.options.plugins

        if (events === null) {
            throw new Error('Unable to find events')
        }

        this.events = events
    }

    clear() {
        this.removeTool()
        clearEvents(this.events, this.callbacks)
    }

    pause() {
        clearEvents(this.events, this.callbacks)
    }

    resume() {
        setupEvents(this.events, this.callbacks)
    }

    setTool(newTool) {
        if (!(newTool instanceof Tool)) {
            throw new Error('Must be a Tool')
        }

        if (this.tool) {
            Tool.transferState(this.tool, newTool)
            this.tool.deactivate()
        }

        this.tool = newTool
        this.tool.activate()
    }

    removeTool() {
        if (this.tool) {
            this.tool.deactivate()
            this.tool = null
        }
    }

    isTool(tool) {
        return this.tool === tool
    }

    onPointerDown(object) {
        if (this.tool) this.tool.onPointerDown(object)
    }

    onPointerUp(object) {
        if (this.tool) this.tool.onPointerUp(object)
    }

    onPointerMove(object) {
        if (this.tool) this.tool.onPointerMove(object)
    }

    onSelected(object) {
        if (this.tool) this.tool.onSelected(object)
    }

    onDeselected(object) {
        if (this.tool) this.tool.onDeselected(object)
    }
}
