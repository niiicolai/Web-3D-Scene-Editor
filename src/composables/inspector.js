import { ref } from 'vue'

const panel = ref('objects');

export const useInspector = () => {
    const setPanel = (newPanel) => {
        panel.value = newPanel;
    }

    const isPanel = (panelName) => {
        return panel.value === panelName;
    }

    return {
        panel,
        isPanel,
        setPanel
    }
}
