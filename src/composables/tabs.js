import { ref } from 'vue'

const tab = ref('')

export const useTabs = () => {

    const setTab = (value) => {
        tab.value = value
    }

    const isTab = (value) => {
        return tab.value === value
    }

    return {
        isTab,
        setTab
    }
}
