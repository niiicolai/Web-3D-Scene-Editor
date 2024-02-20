import Tool from "../src/Tool.js";
import * as THREE from "three";

const createVisualTool = (moveTool) => {
    if (moveTool.selected === null) {
        return
    }

    if (moveTool.visualTool !== null && moveTool.lastToolObject?.uuid === moveTool.selected.object.uuid) {
        return
    }

    if (moveTool.visualTool !== null) {
        removeVisualTool(moveTool)
    }

    const { scene } = moveTool.options
    const { object } = moveTool.selected

    const box = new THREE.Box3().setFromObject(object)
    const size = box.getSize(new THREE.Vector3())
    const center = box.getCenter(new THREE.Vector3())

    const zAxis = new THREE.ArrowHelper(new THREE.Vector3(0, 0, 1), center, size.z, 0x0000ff)
    const yAxis = new THREE.ArrowHelper(new THREE.Vector3(0, 1, 0), center, size.y, 0x00ff00)
    const xAxis = new THREE.ArrowHelper(new THREE.Vector3(1, 0, 0), center, size.x, 0xff0000)
    
    const wireframeMaterial = new THREE.MeshBasicMaterial({ color: 0x000000, wireframe: true })
    const zCapsule = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.1, size.z, 10), wireframeMaterial)
    const yCapsule = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.1, size.y, 10), wireframeMaterial)
    const xCapsule = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.1, size.x, 10), wireframeMaterial)
    
    zCapsule.rotation.x = Math.PI / 2
    xCapsule.rotation.z = Math.PI / 2

    zCapsule.position.copy(center)
    zCapsule.position.z += size.z / 2

    yCapsule.position.copy(center)
    yCapsule.position.y += size.y / 2

    xCapsule.position.copy(center)
    xCapsule.position.x += size.x / 2

    zAxis.name = 'z'
    yAxis.name = 'y'
    xAxis.name = 'x'

    zCapsule.name = 'z'
    yCapsule.name = 'y'
    xCapsule.name = 'x'

    const visualTool = new THREE.Group()
    visualTool.add(zAxis)
    visualTool.add(yAxis)
    visualTool.add(xAxis)
    visualTool.add(zCapsule)
    visualTool.add(yCapsule)
    visualTool.add(xCapsule)

    scene.add(visualTool)

    moveTool.visualTool = visualTool
    moveTool.lastToolObject = object
}

const removeVisualTool = (moveTool) => {
    if (moveTool.visualTool === null) {
        return
    }

    moveTool.options.scene.remove(moveTool.visualTool)
    moveTool.visualTool = null
}

const updateVisualTool = (moveTool) => {
    if (moveTool.visualTool === null) {
        return
    }

    if (moveTool.selected === null) {
        return
    }

    const { object } = moveTool.selected
    const box = new THREE.Box3().setFromObject(object)
    const center = box.getCenter(new THREE.Vector3())    
    visualTool.position.copy(center)
}

const raycaster = new THREE.Raycaster()
const selectAxis = (event, moveTool) => {
    const { camera } = moveTool.options
    const { visualTool } = moveTool

    const mouseCoords = new THREE.Vector2()
    mouseCoords.x = (event.clientX / window.innerWidth) * 2 - 1
    mouseCoords.y = -(event.clientY / window.innerHeight) * 2 + 1

    raycaster.setFromCamera(mouseCoords, camera)
    const intersects = raycaster.intersectObjects(visualTool.children, true)
    if (intersects.length > 0) {
        return intersects[0].object
    }
}

export default class MoveTool extends Tool {
    constructor() {
        super()
        this.visualTool = null
    }

    activate(options) {
        super.activate(options)
        createVisualTool(this)
    }

    deactivate() {
        super.deactivate()
        removeVisualTool(this)
    }

    setSelected(object) {
        super.setSelected(object)
        createVisualTool(this)
    }

    onSelected(object) {
        super.onSelected(object)
        createVisualTool(this)
    }

    onDeselected(object) {
        super.onDeselected(object)
    }

    onPointerDown(object) {
        super.onPointerDown(object)
        if (this.visualTool != null) {
            const axis = selectAxis(object.event, this)
            console.log('axis:', axis)
            if (axis != null) {
                this.axis = axis.name
                return
            }
        }
        
        if (this.selected === null && this.visualTool !== null) {
            removeVisualTool(this)
        }
    }

    onPointerUp(object) {
        super.onPointerUp(object)
        this.axis = null
    }

    onPointerMove(object) {
        super.onPointerMove(object)
    }

    isReadyToDeselect() {
        return true
    }
}
