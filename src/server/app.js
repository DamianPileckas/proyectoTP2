import express from 'express'
//import getUsuariosRouter from './routers/usuariosRouter.js'
import mysql from 'mysql';
import getUsuariosRouter from "./routers/getUsuariosRouter.js";
class App {


    constructor() {
        const app = express();
        app.use(express.json());

        app.set('json spaces', 4);
        app.use('/api/usuarios', getUsuariosRouter());
        app.use(mysql.createConnection({
            host: '127.3.3.1',
            user: 'root',
            password: '',
            port: 3306,
            database: 'gestionpermisos'
        }));
        this.app = app;

    }

    setOnReady(cb) {
        this.app.on('app_ready', cb);
    }

    async start(port) {
        if (!port) {
            port = 0;
        }

        const server = this.app.listen(port, () => {
            const actualPort = server.address().port;
            this.app.emit("app_ready", actualPort);
        });
    }
}

export { App };