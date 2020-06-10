import UsuariosDao from './UsuariosDao.js'
import CustomError from '../errores/CustomError.js'
import Usuario from '../models/Usuario.js'

class UsuariosDaoCache extends UsuariosDao {

    constructor() {
        super()
        this.usuarios = []
    }

    async getAll() {
        try {
            return this.usuarios
        } catch (err) {
            throw new CustomError(500, 'error al obtener todos los usuarios', err)
        }
    }

    async getByEmail(email) {
        let buscado
        try {
            buscado = this.usuarios.find(e => e.email == email)
        } catch (err) {
            throw new CustomError(500, 'error al buscar usuario por email', err)
        }

        if (!buscado) {
            throw new CustomError(404, 'usuario no encontrado con ese EMAIL', { email })
        }

        return [buscado]
    }

    async add(usuNuevo) {
      try {
        await this.getByEmail(usuNuevo.email)
        throw new CustomError(404, 'ya existe un usuario con ese EMAIL', { email: usuNuevo.email })
      } catch (err) {
        try {
          usuNuevo.id = Usuario.getNewId()
          this.usuarios.push(usuNuevo)
          return usuNuevo
        } catch (error) {
          throw new CustomError(500, 'error al crear un nuevo usuario', error)
        }
      }
    }

    async deleteById(id) {
        const posBuscada = this.usuarios.findIndex(e => e.id == id)
        if (posBuscada == -1) {
            throw new CustomError(404, `no existe un usuario para borrar con id: ${id}`, { id } )
        }
        try {
            this.usuarios.splice(posBuscada, 1)
        } catch (error) {
            throw new CustomError(500, `error al borrar un usuarios con id: ${id}`, error)
        }
    }

    async updateById(id, nuevoUsu) {
        let posBuscada
        try {
            posBuscada = this.usuarios.findIndex(e => e.id == id)
        } catch (error) {
            throw new CustomError(500, `error inesperado al buscar usuarios con id: ${id}`, error)
        }

        if (posBuscada == -1) {
            throw new CustomError(404, `no se encontró para actualizar un usuario con id: ${id}`, { id })
        }

        try {
            this.usuarios.splice(posBuscada, 1, nuevoUsu)
            return nuevoUsu
        } catch (error) {
            throw new CustomError(500, `error al reemplazar usuario con id: ${id}`, error)
        }
    }
}

export default UsuariosDaoCache