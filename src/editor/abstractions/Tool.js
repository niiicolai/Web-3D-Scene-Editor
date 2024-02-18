
export default class Tool {
    constructor() {
        this.selected = null
        this.isActive = false
    }

    activate() {
        this.isActive = true
    }

    deactivate() {
        this.isActive = false
    }

    setSelected(object) {
        this.selected = object
    }

    onSelected(object) {
        if (this.selected && this.selected !== object
            && !this.isReadyToDeselect()) {
            return
        }

        this.selected = object
    }

    onDeselected(object) {
        if (!this.isReadyToDeselect()) {
            return
        }

        this.selected = null
    }

    onPointerDown(object) {
    }

    onPointerUp(object) {
    }

    onPointerMove(object) {
    }

    isReadyToDeselect() {
        return true
    }
}
