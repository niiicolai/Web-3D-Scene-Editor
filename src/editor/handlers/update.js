
export default class Update {
    constructor(framerate = 1000 / 60) {
        
        if (!(typeof framerate === 'number')) {
            throw new Error('Must be a number')
        }

        this.framerate = framerate
        this.interval = null
    }

    start(callback) {
        if (this.interval) {
            clearInterval(this.interval)
        }

        this.interval = setInterval(() => {
            callback()
        }, this.framerate)
    }

    stop() {
        clearInterval(this.interval)
    }
}
