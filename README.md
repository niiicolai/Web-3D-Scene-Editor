# Web 3D Scene Editor
The 3D Scene Editor is a JavaScript-based tool for creating and manipulating 3D scenes. Built with modularity and extensibility in mind, the editor provides a flexible architecture that allows developers to customize and enhance its functionality through plugins and commands.

## Install
```
$ npm install
```

## Development
```
$ npm run dev
```

## Getting Started
To get started with the 3D Editor, follow these simple steps:

**Initialization:** Create an instance of the Editor class, passing the canvas element as the first argument. Optionally, you can specify a custom view configuration and frame rate.

```javascript
const canvas = document.getElementById('canvas');
const editor = new Editor(canvas);
```

### Adding Plugins: 
*Note: Plugins should be added using addPlugin(name, implementation) before executing start to ensure the lifecycle methods are called correctly.*

Customize the editor's functionality by adding plugins. The editor comes with several built-in plugins, including events, tools, objects, selector, and caches.

```javascript
// Example: Adding a custom plugin
const customPlugin = new CustomPlugin();
editor.addPlugin('custom', customPlugin);
```

#### Example Plugin: Random Scene Color
The following example demonstrates how to define a simple plugin that changes the scene's background to a random color whenever the editor starts or resumes after being paused.

```javascript
// Define the RandomSceneColorPlugin class
class RandomSceneColorPlugin extends Plugin {
    constructor() {
        super();
    }

    // Implement the setup method to read the scene property from the view.
    setup(context) {
        this.scene = context.options.view.scene
    }

    // Implement the clear method to define what should happen when the editor stops.
    clear() {
        // Do nothing.
    }

    // Implement the pause method to define what should happen when the editor pauses.
    pause() {
        // Do nothing.
    }

    // Implement the resume method to define what should happen whenever the editor resumes.
    // Note: Resume is called when the editor enters its Executing state.
    resume() {
        const r = Math.floor(Math.random() * 256);
        const g = Math.floor(Math.random() * 256);
        const b = Math.floor(Math.random() * 256);

        this.scene.background = new THREE.Color(r, g, b);
    }
}

// Instantiate the RandomSceneColorPlugin and add it to the editor
const randomSceneColorPlugin = new RandomSceneColorPlugin();
editor.addPlugin('randomSceneColorPlugin', randomSceneColorPlugin);
```

### Starting the Editor: 
Start the editor by calling the start method. This initializes the editor's state and begins rendering the 3D scene.

```javascript
editor.start();
```

### Interacting with the Editor: 
Use the editor's API methods to interact with the scene, manipulate objects, activate tools, and execute commands.
The editor got two abstractions that can be used to modify the behavior of the editor, Command and Tool. 

#### Command
Commands are executed instantly when they are passed to the editor's `invoke(command)` method. They are designed to be executed when the editor is not stopped, or in other words, when the state of the editor is Executing or Paused. 


```javascript
// Example: Executing a command
const command = new CustomCommand();
await editor.invoke(command);
```

#### Tool
```javascript
// Example: Activating a tool
const moveTool = new MoveTool();
editor.activateTool(moveTool);
```

## Architecture Overview
The 3D Editor follows a modular architecture, with the following key components:

**View:** Manages the 3D viewport and rendering of the scene using THREE.js.
**Context:** Controls the state of the editor and manages state transitions.
**Invoker:** Executes external commands using the Command Pattern.
**Plugins:** Extends the editor's functionality with custom features and behaviors.

## Contributing
Contributions to the 3D Scene Editor project are welcome! Whether it's bug fixes, new features, or improvements to the documentation, feel free to open a pull request or submit an issue on GitHub.
