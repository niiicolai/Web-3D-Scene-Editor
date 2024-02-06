import { useObjects } from "../composables/objects.js";
import { useScene } from "../composables/scene.js";

export const sceneObjectMediator = () => {
    const objectsManager = useObjects();
    const sceneManager = useScene();

    const init = () => {
        objectsManager.addCreateCallback((data) => {
            sceneManager.scene.value.add(data.object.instance);
        });
    
        objectsManager.addRemoveCallback((data) => {
            sceneManager.scene.value.remove(data.object.instance);
        });
    }
    
    return {
        init
    };
}
