import Usuario from '../models/Usuario.js'
import UsuariosDaoFactory from '../dao/UsuariosDaoFactory.js'
import CustomError from '../errores/CustomError.js'

class UsuariosApi {

    constructor() {
        this.usuariosDao = UsuariosDaoFactory.getDao() //Data Access Object
    }

    async agregar(usuParaAgregar) {
        UsuariosApi.asegurarUsuarioValido(usuParaAgregar)
        const usuAgregado = await this.usuariosDao.add(usuParaAgregar)
        return usuAgregado
    }

    async buscar(queryParams) {
        let usuarios
        if (queryParams.size == 0) {
            usuarios = await this.usuariosDao.getAll()
        } else if (queryParams.has('email')) {
            usuarios = await this.usuariosDao.getByEmail(queryParams.get('email'))
        } else {
            throw new CustomError(400, 'parametros de consulta invalidos', queryParams)
        }
        return usuarios
    }

    async borrar(id) {
        await this.usuariosDao.deleteById(id)
    }

    async reemplazar(id, usuParaReemplazar) {
        UsuariosApi.asegurarUsuarioValido(usuParaReemplazar)
        UsuariosApi.asegurarQueCoincidenLosIds(usuParaReemplazar.id, id)
        const usuReemplazado = await this.usuariosDao.updateById(id, usuParaReemplazar)
        return usuReemplazado
    }

    static asegurarQueCoincidenLosIds(id1, id2) {
        if (id1 != id2) {
            throw new CustomError(400, 'no coinciden los ids enviados', { id1, id2 })
        }
    }

    static asegurarUsuarioValido(usuario) {
        try {
            return true;
            //Usuario.validar(usuario)
        } catch (error) {
            throw new CustomError(400, 'el usuario posee un formato json invalido o faltan datos', error)
        }
    }
}

export default UsuariosApi