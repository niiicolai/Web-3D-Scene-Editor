import * as THREE from 'three'

const raycaster = new THREE.Raycaster()
const mouseCoords = new THREE.Vector2()

/**
 * Get the intersected object
 * 
 * @param {Event} event
 * @param {THREE.Camera} camera
 * @param {Array} objects
 * @returns {Object|null}
 */
const getIntersect = (event, camera, objects) => {
    mouseCoords.x = (event.event.clientX / window.innerWidth) * 2 - 1
    mouseCoords.y = -(event.event.clientY / window.innerHeight) * 2 + 1

    raycaster.setFromCamera(mouseCoords, camera)
    const intersects = raycaster.intersectObjects(objects)
    if (intersects.length > 0) {
        return intersects[0].object
    }

    return null
}

/**
 * Find the parent object before the scene
 * 
 * @param {Object} object
 * @returns {Object}
 */
const findParentBeforeScene = (object, scene) => {
    if (object.parent.uuid === scene.uuid) {
        return object
    }

    return findParentBeforeScene(object.parent, scene)
}

export default {
    getIntersect,
    findParentBeforeScene
}
