/* eslint-disable no-unused-vars */
import CustomError from '../errores/CustomError.js'

class UsuariosDao {

    async getAll() {
        throw new CustomError(500, 'falta implementar getAll!')
    }

    async getByEmail(email) {
        throw new CustomError(500, 'falta implementar getByDni!')
    }

    async add(estuNuevo) {
        throw new CustomError(500, 'falta implementar add!')
    }

    async deleteById(id) {
        throw new CustomError(500, 'falta implementar deleteById!')
    }

    async updateById(id, nuevoEstu) {
        throw new CustomError(500, 'falta implementar updateById!')
    }

    async sendData(service, user, pass, from, to, subject, text) {
        throw new CustomError(500, 'falta implementar sendData!')
    }
}

export default UsuariosDao