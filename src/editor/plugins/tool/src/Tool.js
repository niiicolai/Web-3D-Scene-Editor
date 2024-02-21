
let selected = null

/**
 * @class
 * @classdesc Base class for all tools.
 * @property {Object} options
 * @property {boolean} isActive
 */
export default class Tool {

    /**
     * @constructor
     */
    constructor() {
        this.options = null
        this.isActive = false
    }

    /**
     * Activate the tool
     * 
     * @param {Object} options
     * @returns {void}
     */
    activate(options) {
        this.isActive = true
        this.options = options
    }

    /**
     * Deactivate the tool
     * 
     * @returns {void}
     */
    deactivate() {
        this.isActive = false
    }

    /**
     * Get the selected object
     * 
     * @returns {Object}
     */
    getSelected() {
        return selected
    }

    /**
     * Set the selected object
     * 
     * @param {Object} object
     * @returns {void}
     */
    setSelected(object) {
        selected = object
    }

    /**
     * Handle selected event
     * 
     * @param {Object} object
     * @returns {void}
     */
    onSelected(object) {
        if (selected && selected !== object && !this.isReadyToDeselect()) {
            return
        }
        
        selected = object
    }

    /**
     * Handle deselected event
     * 
     * @param {Object} object
     * @returns {void}
     */
    onDeselected(object) {
        if (!this.isReadyToDeselect()) {
            return
        }

        selected = null
    }

    /**
     * Handle pointer down event
     * 
     * @param {Object} object
     * @returns {void}
     * @abstract
     */
    onPointerDown(object) {
    }

    /**
     * Handle pointer up event
     * 
     * @param {Object} object
     * @returns {void}
     * @abstract
     */
    onPointerUp(object) {
    }

    /**
     * Handle pointer move event
     * 
     * @param {Object} object
     * @returns {void}
     * @abstract
     */
    onPointerMove(object) {
    }

    /**
     * Determine if the tool is ready to deselect
     * 
     * @returns {boolean}
     */
    isReadyToDeselect() {
        return true
    }
}
