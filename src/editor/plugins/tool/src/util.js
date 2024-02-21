import * as THREE from 'three';

const plane = new THREE.Plane()        
const mouseCoords = new THREE.Vector2()
const intersection = new THREE.Vector3()
const normal = new THREE.Vector3()

const calculateMouseCoords = (event) => {
    mouseCoords.x = (event.clientX / window.innerWidth) * 2 - 1
    mouseCoords.y = -(event.clientY / window.innerHeight) * 2 + 1

    return mouseCoords
}

const clampPositionToObjectAxis = (position, object, axis) => {
    if (axis === 'x') {
        position.y = object.position.y
        position.z = object.position.z
    } else if (axis === 'y') {
        position.x = object.position.x
        position.z = object.position.z
    } else if (axis === 'z') {
        position.x = object.position.x
        position.y = object.position.y
    } else {
        throw new Error('Invalid axis')
    }
}

const calculateNormalFromAxis = (axis) => {
    if (axis === 'x') {
        normal.x = 0
        normal.y = 1
        normal.z = 0
    } else if (axis === 'y') {
        normal.x = 0
        normal.y = 0
        normal.z = 1
    } else if (axis === 'z') {
        normal.x = 0
        normal.y = 1
        normal.z = 0
    } else {
        throw new Error('Invalid axis')
    }

    return normal
}

const calculatePlaneIntersection = (event, camera, normal) => {
    plane.setFromNormalAndCoplanarPoint(normal, intersection)
    
    const coords = calculateMouseCoords(event)
    const raycaster = new THREE.Raycaster()
    raycaster.setFromCamera(coords, camera)
    const isIntersecting = raycaster.ray.intersectPlane(plane, intersection)
    return {isIntersecting, intersection}
}

const calculateObjectsIntersection = (event, camera, objects) => {
    const coords = calculateMouseCoords(event)
    const raycaster = new THREE.Raycaster()
    raycaster.setFromCamera(coords, camera)

    return raycaster.intersectObjects(objects)
}

export default {
    clampPositionToObjectAxis,
    calculateMouseCoords,
    calculateNormalFromAxis,
    calculatePlaneIntersection,
    calculateObjectsIntersection
}
