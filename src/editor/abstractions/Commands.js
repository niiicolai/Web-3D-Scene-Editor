
class Command {
    constructor() {
        this.invoker = null;
    }

    setInvoker(invoker) {
        this.invoker = invoker;
    }
    
    async execute() {
        throw new Error('execute method must be implemented');
    }
}

class Invoker {
    constructor(options = {}) {
        this.options = options
    }

    setCommand(command) {
        if (!(command instanceof Command)) {
            throw new Error('Must be a Command')
        }

        this.command = command
        this.command?.setInvoker(this)
    }

    async execute() {
        if (this.command) {
            await this.command.execute()
        }
    }

    async invoke(command) {
        this.setCommand(command)
        await this.execute()
    }
}

export {
    Command,
    Invoker
}
