import Tool from "../src/Tool.js";
import VisualTool from "../src/VisualTool.js";
import Util from "../src/util.js";
import * as THREE from "three";

class MoveVisualTool extends VisualTool {
    constructor(tool) {
        super(tool)
        this.arrows = []
    }

    setupArrows(size) {
        const position = new THREE.Vector3()
        const zAxis = new THREE.ArrowHelper(new THREE.Vector3(0, 0, 1), position, size.z, 0x0000ff)
        const yAxis = new THREE.ArrowHelper(new THREE.Vector3(0, 1, 0), position, size.y, 0x00ff00)
        const xAxis = new THREE.ArrowHelper(new THREE.Vector3(1, 0, 0), position, size.x, 0xff0000)

        zAxis.name = 'z'
        yAxis.name = 'y'
        xAxis.name = 'x'

        this.group.add(zAxis)
        this.group.add(yAxis)
        this.group.add(xAxis)

        this.arrows.push(zAxis, yAxis, xAxis)
    }

    setupColliders(size) {
        const wireframeMaterial = new THREE.MeshBasicMaterial({ color: 0x000000, wireframe: true })
        const zCollider = new THREE.Mesh(new THREE.CylinderGeometry(0.15, 0.15, size.z, 10), wireframeMaterial)
        const yCollider = new THREE.Mesh(new THREE.CylinderGeometry(0.15, 0.15, size.y, 10), wireframeMaterial)
        const xCollider = new THREE.Mesh(new THREE.CylinderGeometry(0.15, 0.15, size.x, 10), wireframeMaterial)

        zCollider.rotation.x = Math.PI / 2
        xCollider.rotation.z = Math.PI / 2

        zCollider.position.z += size.z / 2
        yCollider.position.y += size.y / 2
        xCollider.position.x += size.x / 2

        zCollider.name = 'z'
        yCollider.name = 'y'
        xCollider.name = 'x'

        zCollider.material.visible = false
        yCollider.material.visible = false
        xCollider.material.visible = false

        this.group.add(zCollider)
        this.group.add(yCollider)
        this.group.add(xCollider)

        this.colliders.push(zCollider, yCollider, xCollider)
    }

    setup() {
        super.setup()
        
        if (this.selected === null) {
            return
        }

        const box = new THREE.Box3().setFromObject(this.selected)
        const size = box.getSize(new THREE.Vector3())
        this.setupArrows(size)
        this.setupColliders(size)
    }

    clear() {
        super.clear()

        for (const arrow of this.arrows) {
            arrow.dispose()
        }

        this.arrows = []
    }

    onPointerMove(event) {
        if (!this.axis.isSelected) {
            return
        }
        
        const camera = this.tool.options.view.camera
        const normal = Util.calculateNormalFromAxis(this.axis.name)
        const { isIntersecting, intersection } = Util.calculatePlaneIntersection(event, camera, normal)
        if (isIntersecting) {
            intersection.sub(this.axisSelectOffset)
            Util.clampPositionToObjectAxis(intersection, this.selected, this.axis.name)
            this.selected.position.copy(intersection)
            this.updatePosition()
        }
    }
}

export default class MoveTool extends Tool {
    constructor() {
        super()
        this.visualTool = new MoveVisualTool(this)
    }

    activate(options) {
        super.activate(options)
        this.visualTool.setup()
    }

    deactivate() {
        super.deactivate()
        this.visualTool.clear()
    }

    setSelected(object) {
        super.setSelected(object)
        this.visualTool.setup()
    }

    onSelected(object) {
        super.onSelected(object)
        this.visualTool.setup()
    }

    onDeselected(object) {
        super.onDeselected(object)
    }

    onPointerDown(object) {
        super.onPointerDown(object)

        /**
         * If we select one of the axis, we don't want to deselect the object,
         * before the move operation is finished
         */
        if (this.visualTool.selectAxisCollider(object)) {
            return
        }

        /**
         * If we do not select an axis, and no longer have a selected object,
         * we want to clear the visual tool
         */
        if (!this.getSelected()) {
            this.visualTool.clear()
        }
    }

    onPointerUp(object) {
        super.onPointerUp(object)

        /**
         * If an axis is selected, we want to deselect it,
         * when the mouse is released
         */
        this.visualTool.deselectAxisCollider()
    }

    onPointerMove(object) {
        super.onPointerMove(object)

        /**
         * If an axis is selected we want to move the object by the axis
         */
        this.visualTool.onPointerMove(object)
    }

    isReadyToDeselect() {
        /**
         * Do not allow deselection, if an axis is selected.
         * Because we want to finish the move operation first
         */
        return !this.visualTool.axis.isSelected
    }
}
