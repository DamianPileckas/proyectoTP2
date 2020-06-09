import express from 'express'

class App {

    constructor() {
        const app = express()
        app.use(express.json())
        app.set('json spaces', 4)
        this.app = app
    }

    setOnReady(cb) {
        this.app.on('app_ready', cb)
    }

    async start(port) {
        if (!port) {
            port = 0
        }

        const server = this.app.listen(port, () => {
            const actualPort = server.address().port
            this.app.emit("app_ready", actualPort)
        })
    }
}

export default App
