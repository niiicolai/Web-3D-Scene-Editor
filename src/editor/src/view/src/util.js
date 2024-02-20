
/**
 * A method used to check if the renderer needs to be resized.
 * Used to keep the canvas responsive.
 */
const resizeRendererToDisplaySize = (renderer) => {
    const canvas = renderer.domElement;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const needResize = canvas.width !== width || canvas.height !== height;
    if (needResize) {
        renderer.setSize(width, height, false);
    }
    return needResize;
}

/**
 * A method used to render the scene.
 */
const render = (renderer, scene, camera, controls) => {
    if (resizeRendererToDisplaySize(renderer)) {
        const canvas = renderer.domElement;
        const aspect = canvas.clientWidth / canvas.clientHeight;
        camera.aspect = aspect;
        camera.updateProjectionMatrix();
    }

    controls.update();
    renderer.render(scene, camera);
}

export default {
    render
}
