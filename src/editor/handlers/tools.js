import Tool from '../abstractions/Tool.js'
import Events from './events.js'

export default class Tools {
    constructor() {
        this.tool = null
    }

    setTool(tool) {
        if (!(tool instanceof Tool)) {
            throw new Error('Must be a Tool')
        }

        if (this.tool) {
            tool.setSelected(this.tool.selected)
            this.tool.deactivate()
        }

        this.tool = tool
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

    setupListeners(events) {
        if (!(events instanceof Events)) {
            throw new Error('Must be a Events')
        }

        events.addListener('pointerdown', this.onPointerDown.bind(this))
        events.addListener('pointerup', this.onPointerUp.bind(this))
        events.addListener('pointermove', this.onPointerMove.bind(this))
        events.addListener('select', this.onSelected.bind(this))
        events.addListener('deselect', this.onDeselected.bind(this)) 
    }

    destroyListeners(events) {
        events.removeListener('pointerdown', this.onPointerDown)
        events.removeListener('pointerup', this.onPointerUp)
        events.removeListener('pointermove', this.onPointerMove)
        events.removeListener('select', this.onSelected)
        events.removeListener('deselect', this.onDeselected)
    }
}
