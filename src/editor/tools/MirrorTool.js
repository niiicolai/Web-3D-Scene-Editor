import Tool from "../abstractions/Tool.js";

export default class MirrorTool extends Tool {
    constructor() {
        super()
    }

    activate() {
        super.activate()
        console.log('MirrorTool activated')
    }

    deactivate() {
        super.deactivate()
        console.log('MirrorTool deactivated')
    }

    setSelected(object) {
        super.setSelected(object)
        console.log('MirrorTool selected:', object)
    }

    onSelected(object) {
        super.onSelected(object)
        console.log('MirrorTool onSelected:', object)
    }

    onDeselected(object) {
        super.onDeselected(object)
        console.log('MirrorTool onDeselected:', object)
    }

    onPointerDown(object) {
        super.onPointerDown(object)
        console.log('MirrorTool onPointerDown:', object)
    }

    onPointerUp(object) {
        super.onPointerUp(object)
        console.log('MirrorTool onPointerUp:', object)
    }

    onPointerMove(object) {
        super.onPointerMove(object)
        console.log('MirrorTool onPointerMove:', object)
    }

    isReadyToDeselect() {
        return true
    }
}
