import Tool from "../src/Tool.js";

export default class ScaleTool extends Tool {
    constructor() {
        super()
    }

    activate(scene) {
        super.activate(scene)
    }

    deactivate() {
        super.deactivate()
        console.log('ScaleTool deactivated')
    }

    setSelected(object) {
        super.setSelected(object)
        console.log('ScaleTool selected:', object)
    }

    onSelected(object) {
        super.onSelected(object)
        console.log('ScaleTool onSelected:', object)
    }

    onDeselected(object) {
        super.onDeselected(object)
        console.log('ScaleTool onDeselected:', object)
    }

    onPointerDown(object) {
        super.onPointerDown(object)
        console.log('ScaleTool onPointerDown:', object)
    }

    onPointerUp(object) {
        super.onPointerUp(object)
        console.log('ScaleTool onPointerUp:', object)
    }

    onPointerMove(object) {
        super.onPointerMove(object)
        console.log('ScaleTool onPointerMove:', object)
    }

    isReadyToDeselect() {
        return true
    }
}
