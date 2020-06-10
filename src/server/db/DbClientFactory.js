import MysqlClient from './MysqlClient.js'
import NullDbClient from './NullDbClient.js'
import Config from '../../../config.js'

let mysqlClient = null

function getMysqlClient() {
    if (!mysqlClient) {
      mysqlClient = new MysqlClient()
    }
    return mysqlClient
}

function getNullDbClient() {
    return new NullDbClient()
}

class DbClientFactory {
    static getDbClient() {
        switch (Config.db.client) {
            case 'mysql': return getMysqlClient()
            default: return getNullDbClient()
        }
    }
}

export default DbClientFactory