
import { CloningStrategy } from "../abstractions/Cache.js";

class MeshStrategy extends CloningStrategy {
    clone(cached) {
        return cached.mesh.clone();
    }
}

class MaterialStrategy extends CloningStrategy {
    clone(cached) {
        return cached.material;
    }
}

class TextureStrategy extends CloningStrategy {
    clone(cached) {
        return cached.texture;
    }
}

export default {
    MeshStrategy,
    MaterialStrategy,
    TextureStrategy
}
