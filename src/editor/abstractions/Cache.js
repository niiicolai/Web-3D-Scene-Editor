export class CloningStrategy {
  clone(cached) {
      throw new Error('clone method must be implemented');
  }
}

export class DisposeStrategy {
  dispose(cached) {
      throw new Error('dispose method must be implemented');
  }
} 

export default class Cache {
  constructor(name, cloningStrategy, disposeStrategy, clearPriority = 0) {

    if (!(typeof name === 'string')) {
      throw new Error('name must be a string');
    }

    if (!(cloningStrategy instanceof CloningStrategy)) {
      throw new Error('cloneStrategy must be a CloningStrategy');
    }

    if (!(disposeStrategy instanceof DisposeStrategy)) {
      throw new Error('disposeStrategy must be a DisposeStrategy');
    }

    this.cache = {};
    this.name = name;
    this.cloningStrategy = cloningStrategy;    
    this.disposeStrategy = disposeStrategy;
    this.clearPriority = clearPriority;
  }

  add(id, object) {
    this.cache[id] = object;
  }

  find(id) {
    return this.cache[id];
  }

  clone(id) {
    const cached = this.find(id);
    if (!cached) {
      throw new Error('Cached object not found: ' + id);
    }

    return this.cloningStrategy.clone(cached);
  }

  dispose(id) {
    const cached = this.find(id);
    this.disposeStrategy.dispose(cached);
    delete this.cache[id];
  }

  disposeAll() {
    for (const key of Object.keys(this.cache)) {
      this.dispose(key);
    }

    this.cache = {};
  }
}
