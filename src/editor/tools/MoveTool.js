import Tool from "../abstractions/Tool.js";

export default class MoveTool extends Tool {
    constructor() {
        super()
    }

    activate() {
        super.activate()
        console.log('MoveTool activated')
    }

    deactivate() {
        super.deactivate()
        console.log('MoveTool deactivated')
    }

    setSelected(object) {
        super.setSelected(object)
        console.log('MoveTool selected:', object)
    }

    onSelected(object) {
        super.onSelected(object)
        console.log('MoveTool onSelected:', object)
    }

    onDeselected(object) {
        super.onDeselected(object)
        console.log('MoveTool onDeselected:', object)
    }

    onPointerDown(object) {
        super.onPointerDown(object)
        console.log('MoveTool onPointerDown:', object)
    }

    onPointerUp(object) {
        super.onPointerUp(object)
        console.log('MoveTool onPointerUp:', object)
    }

    onPointerMove(object) {
        super.onPointerMove(object)
        console.log('MoveTool onPointerMove:', object)
    }

    isReadyToDeselect() {
        return true
    }
}
