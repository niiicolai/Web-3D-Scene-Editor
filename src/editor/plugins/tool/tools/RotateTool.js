import Tool from "../src/Tool.js";

export default class RotateTool extends Tool {
    constructor() {
        super()
    }

    activate(scene) {
        super.activate(scene)
    }

    deactivate() {
        super.deactivate()
        console.log('RotateTool deactivated')
    }

    setSelected(object) {
        super.setSelected(object)
        console.log('RotateTool selected:', object)
    }

    onSelected(object) {
        super.onSelected(object)
        console.log('RotateTool onSelected:', object)
    }

    onDeselected(object) {
        super.onDeselected(object)
        console.log('RotateTool onDeselected:', object)
    }

    onPointerDown(object) {
        super.onPointerDown(object)
        console.log('RotateTool onPointerDown:', object)
    }

    onPointerUp(object) {
        super.onPointerUp(object)
        console.log('RotateTool onPointerUp:', object)
    }

    onPointerMove(object) {
        super.onPointerMove(object)
        console.log('RotateTool onPointerMove:', object)
    }

    isReadyToDeselect() {
        return true
    }
}
