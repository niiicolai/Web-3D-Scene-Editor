import * as THREE from 'three'
import Util from './util.js'

export default class Axis {
    constructor(name) {
        this.name = name;
        this.isSelected = false;
    }

    setName(name) {
        this.name = name;
    }

    select() {
        this.isSelected = true;
    }

    deselect() {
        this.isSelected = false;
    }
}
