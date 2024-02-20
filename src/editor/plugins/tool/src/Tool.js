
/**
 * @class
 * @classdesc Base class for all tools.
 * @property {Object} options
 * @property {Object} selected
 * @property {boolean} isActive
 */
export default class Tool {

    /**
     * @constructor
     */
    constructor() {
        this.options = null
        this.selected = null
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
     * Set the selected object
     * 
     * @param {Object} object
     * @returns {void}
     */
    setSelected(object) {
        this.selected = object
    }

    /**
     * Handle selected event
     * 
     * @param {Object} object
     * @returns {void}
     */
    onSelected(object) {
        if (this.selected && this.selected !== object
            && !this.isReadyToDeselect()) {
            return
        }

        this.selected = object
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

        this.selected = null
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

    /**
     * Transfer state from one tool to another
     * 
     * @param {Tool} fromTool
     * @param {Tool} toTool
     * @returns {void}
     */
    static transferState(fromTool, toTool) {
        toTool.selected = fromTool.selected
        fromTool.selected = null
    }
}
