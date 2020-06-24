/* eslint-disable no-console */
import CustomError from '../errores/CustomError.js';
import mysql from 'mysql';
import DbClient from './DbClient.js';
import config from '../../../config.js';
import knexLib from 'knex';

class MysqlClient extends DbClient {
    /*
            this.knex = {
                client: 'mysql',
                connection: {
                    host: '127.3.3.1',
                    user: 'root',
                    password: '',
                    port: 3306,
                    database: 'gestionpermisos'
                }*/
    constructor() {
        super();
        this.connected = true;
        this.knex = new knexLib({
            client: 'mysql',
            connection: {
                host: '127.3.3.1',
                user: 'root',
                password: '',
                port: 3306,
                database: 'gestionpermisos'
            }
        });

    }

    async connect() {
        try {
            await this.knex.connect();
        } catch (error) {
            throw new CustomError(500, 'error al conectarse a mysql', error);
        }
    }

    async disconnect() {
        try {
            await this.knex.end();
            this.connected = false;
        } catch (error) {
            throw new CustomError(500, 'error al conectarse a mysql', error);
        }
    }

    async _getClient() {
        if (!this.connected) {
            await this.connect();
            this.connected = true;
        }
        return this.knex;
    }

    async getKnex() {

        return this.knex;
    }
}

export default MysqlClient;