import { ref } from 'vue'

/**
 * @property {object} toasts - An array of toasts
 */
const toasts = ref([])

/**
 * @function
 * @name useToast
 * @description A composable function for adding and removing toasts
 * @returns {object} An object containing the toasts, addToast, and removeToast
 */
export function useToast() {

    /**
     * @function
     * @name addToast
     * @description Adds a toast to the toasts array
     */
    function addToast(msg, type = 'info', duration = 5000) {
        const toast = { msg, type, duration }
        const timeout = setTimeout(() => {
            removeToast(toast)
        }, duration)

        toasts.value.push({ ...toast, timeout })
    }

    /**
     * @function
     * @name removeToast
     * @description Removes a toast from the toasts array
     */
    function removeToast(toast) {
        const index = toasts.value.indexOf(toast)
        clearTimeout(toast.timeout)
        toasts.value.splice(index, 1)
    }

    return {
        toasts,
        addToast,
        removeToast
    }
}
