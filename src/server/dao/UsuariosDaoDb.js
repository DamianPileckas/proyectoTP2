import UsuariosDao from './UsuariosDao.js'
import Usuario from '../models/Usuario.js'
import CustomError from '../errores/CustomError.js'
import DbClientFactory from '../db/DbClientFactory.js'


class UsuariosDaoDb extends UsuariosDao {

    constructor(){
        super()
        this.client = DbClientFactory.getDbClient()
    }

    async getAll() {
        try {
            const usuarios = await this.client.query("SELECT * FROM usuarios ORDER BY id DESC")
            return usuarios
        } catch (err) {
            console.log(err)
            throw new CustomError(500, 'error al obtener todos los usuarios', err)
        }
    }

    async getByEmail(email) {
        let buscado
        try {
            let sql = "SELECT * FROM usuarios WHERE email = ?"
            buscado = await this.client.query(sql, email)
        } catch (err) {
            throw new CustomError(500, 'error al buscar usuario por email', err)
        }

        if (!buscado) {
            throw new CustomError(404, 'usuario no encontrado con ese EMAIL', { dni: dniBuscado })
        }

        return [buscado]
    }

    async add(usuarioNuevo) {
        let result
        try {
            let sql = "INSERT INTO usuarios(email, password, nombre, perfil, habilitado) VALUES (?,?,?,?,?)"
            let valores = [usuarioNuevo.email, usuarioNuevo.password, usuarioNuevo.nombre, usuarioNuevo.perfil, usuarioNuevo.habilitado]
            result = await this.client.query(sql, valores)
            usuarioNuevo.id = result.insertId
        } catch (error) {
            throw new CustomError(500, 'error al crear un nuevo usuario', error)
        }

        return estuNuevo
    }

    async deleteById(idParaBorrar) {
        let result
        try {
            let sql = "UPDATE usuarios SET habilitado = 'NO' where id = ?"
            result = await this.client.query(sql, idParaBorrar)
        } catch (error) {
            throw new CustomError(500, `error al borrar al usuario`, error)
        }

        if (result.affectedRows == 0) {
            throw new CustomError(404, `no existe un usuario para borrar con id: ${idParaBorrar}`, { idParaBorrar })
        }
    }

    async updateById(idParaReemplazar, nuevoUsu) {
        let result
        try {
            let sql = "UPDATE usuarios SET email = ?, password = ?, nombre = ?, perfil = ?, habilitado = ? where id = ?"
            let valores = [nuevoUsu.email, nuevoUsu.password, nuevoUsu.nombre, nuevoUsu.perfil, nuevoUsu.habilitado, nuevoUsu.id]
            result = await this.client.query(sql, valores)
        } catch (error) {
            throw new CustomError(500, `error al reemplazar al usuario`, error)
        }
        
        if (result.affectedRows != 1) {
            throw new CustomError(404, `no se encontró para actualizar un usuario con id: ${idParaReemplazar}`, { idParaReemplazar })
        }

        return nuevoUsu
    }
}

export default UsuariosDaoDb