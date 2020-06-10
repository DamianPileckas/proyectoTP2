/* eslint-disable no-console */
import CustomError from '../errores/CustomError.js'
import mysql from 'mysql'
import DbClient from './DbClient.js'
import config from '../../../config.js'

class MysqlClient extends DbClient {
    constructor() {
        super()
        this.connected = false
        this.client = mysql.createConnection({
          host: config.db.host,
          user: config.db.user,
          password: config.db.pass,
          database: config.db.name
        })
    }

    async connect() {
        try {
            await this.client.connect()
        } catch (error) {
            throw new CustomError(500, 'error al conectarse a mysql', error)
        }
    }

    async disconnect() {
        try {
            await this.client.end()
            this.connected = false
        } catch (error) {
            throw new CustomError(500, 'error al conectarse a mysql', error)
        }
    }

    async _getClient() {
        if (!this.connected) {
            await this.connect()
            this.connected = true
        }
        return this.client
    }
}

export default MysqlClient