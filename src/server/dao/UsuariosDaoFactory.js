import UsuariosDaoCache from './UsuariosDaoCache.js'
import UsuariosDaoDb from './UsuariosDaoDb.js'
import Config from '../../../config.js'


class UsuariosDaoFactory {
    static getDao() {
        switch (Config.mode) {
            case 'db': return new UsuariosDaoDb()
            case 'cache': return new UsuariosDaoCache()
            default: throw "invalid mode. check system config!"
        }
    }
}

export default UsuariosDaoFactory
