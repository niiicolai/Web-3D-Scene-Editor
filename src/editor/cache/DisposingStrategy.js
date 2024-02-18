import * as THREE from 'three'
import { DisposeStrategy } from "../abstractions/Cache.js";

class MeshStrategy extends DisposeStrategy {
    dispose(cached) {
        cached.mesh.traverse(child => {
            if (child instanceof THREE.Mesh) {
                child.geometry.dispose()
            }
        })
    }
}

class MaterialStrategy extends DisposeStrategy {
    dispose(cached) {
        cached.material.dispose()
    }
} 

class TextureStrategy extends DisposeStrategy {
    dispose(cached) {
        cached.texture.dispose()
    } 
}

export default {
    MeshStrategy,
    MaterialStrategy,
    TextureStrategy
}
