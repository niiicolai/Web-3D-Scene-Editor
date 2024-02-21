import * as THREE from 'three';
import Axis from './Axis.js';
import Util from './util.js';

export default class VisualTool {
    constructor(tool) {
        this.tool = tool;
        this.selected = null;
        this.group = null;

        this.axis = new Axis('x');
        this.axisSelectOffset = new THREE.Vector3();
        this.colliders = [];
    }

    setup() {
        /**
         * No reason to setup if there is no selected object
         */
        const selected = this.tool.getSelected()
        if (selected === null) {
            return
        }

        /**
         * No reason to setup twice for the same object
         */
        if (this.group && this.selected?.uuid === selected.uuid) {
            return
        }

        /**
         * If we have a group, but the selected object is different, 
         * then we want to clear the group
         */
        if (this.group) {
            this.clear()
        }

        this.selected = selected;
        this.group = new THREE.Group();
        this.tool.options.view.scene.add(this.group);
        this.updatePosition();
    }

    clear() {
        if (this.group) {
            this.tool.options.view.scene.remove(this.group)
            this.group = null
        }

        for (const collider of this.colliders) {
            collider.material.dispose()
            collider.geometry.dispose()
        }

        this.selected = null;
    }

    updatePosition() {
        /**
         * No group, nothing to update
         */
        if (!this.group) {
            return
        }

        /**
         * No selected, nothing to update
         */
        if (!this.selected) {
            return
        }

        /**
         * Move to the center of the selected object
         */
        const box = new THREE.Box3().setFromObject(this.selected)
        const center = box.getCenter(new THREE.Vector3())
        this.group.position.copy(center)
    }

    selectAxisCollider(object) {
        if (!this.group) {
            return false
        }
        
        const view = this.tool.options.view
        const intersections = Util.calculateObjectsIntersection(object, view.camera, this.colliders)
        if (intersections && intersections.length > 0) {
            const intersection = intersections[0]
            this.axisSelectOffset.copy(intersection.point).sub(this.group.position)
            this.axis.setName(intersection.object.name)
            this.axis.select();
            view.controls.enabled = false
            return true
        }

        return false
    }

    deselectAxisCollider() {
        if (this.axis.isSelected) {
            this.axis.deselect();
            this.tool.options.view.controls.enabled = true
        }
    }
}
