/* eslint-disable no-console */
import Servidor from './server/app.js'
import Config from '../config.js'

const app = new Servidor()

//////////////////////////////////////////////////////////////

// Esto esta para asegurarse que el servidor
// siempre termine adecuadamente

process.stdin.resume();//so the program will not close instantly

//do something when app is closing
process.on('exit', exitHandler.bind(null, { cleanup: true }));

//catches ctrl+c event
process.on('SIGINT', exitHandler.bind(null, { exit: true }));

// catches "kill pid" (for example: nodemon restart)
process.on('SIGUSR1', exitHandler.bind(null, { exit: true }));
process.on('SIGUSR2', exitHandler.bind(null, { exit: true }));

// catches uncaught exceptions
process.on('uncaughtException', exitHandler.bind(null, { exit: true }));

async function exitHandler(options, exitCode) {
    // await app.disconnect()

    if (options.cleanup) {
        await app.disconnect()
        console.log('\nprograma finalizado normalmente')
    }
    if (exitCode || exitCode === 0) {
        console.log(`\nprograma finalizado con codigo: ${exitCode}`)
    }
    if (options.exit) {
        process.exit()
    }
}

/////////////////////////////////////////////////////////////////

app.setOnReady(async (port) => {
    console.log(`escuchando en puerto: ${port}`)
})

app.start(Config.port)
