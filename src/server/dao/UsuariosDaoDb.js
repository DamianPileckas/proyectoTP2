import UsuariosDao from './UsuariosDao.js';
import Usuario from '../models/Usuario.js';
import CustomError from '../errores/CustomError.js';
import DbClientFactory from '../db/DbClientFactory.js';
import knexLib from 'knex';
import MysqlClient from '../db/MysqlClient.js';
class UsuariosDaoDb extends UsuariosDao {


    constructor() {
        super();
        //this.client = DbClientFactory.getDbClient();
        this.client = new MysqlClient();
    }

    async getAll() {
        try {
            //let sql = "'SELECT nombre from usuario'";
            //const usuarios = await this.client.query(sql);
            const usuarios = await this.client.getKnex("usuario");
            return usuarios;
        } catch (err) {
            console.error(err);
            throw new CustomError(500, 'error al obtener todos los usuarios', err);
        }
    }


    async add(queryParams) {
        try {
            console.log("llegue agregar 2");
            const result = await this.client.getKnex("usuario").insert({
                nombre: 'pepe',
                apellido: 'pepe',
                habilitado: 1,
                email: 'pepe@gmail.com',
                password: '123456',
                tipo_perfil: 1
            });
        } catch (error) {
            console.log(error);
            throw new CustomError(500, 'error al crear un nuevo usuario', error);
        }
        return result;
    }

    async deleteById(idParaBorrar) {
        let result;
        try {
            let sql = "UPDATE usuarios SET habilitado = 'NO' where id = ?";
            result = await this.client.query(sql, idParaBorrar);
        } catch (error) {
            throw new CustomError(500, `error al borrar al usuario`, error);
        }

        if (result.affectedRows == 0) {
            throw new CustomError(404, `no existe un usuario para borrar con id: ${idParaBorrar}`, { idParaBorrar });
        }
    }

    async updateById(idParaReemplazar, nuevoUsu) {
        let result;
        try {
            let sql = "UPDATE usuarios SET email = ?, password = ?, nombre = ?, perfil = ?, habilitado = ? where id = ?";
            let valores = [nuevoUsu.email, nuevoUsu.password, nuevoUsu.nombre, nuevoUsu.perfil, nuevoUsu.habilitado, nuevoUsu.id];
            result = await this.client.query(sql, valores);
        } catch (error) {
            throw new CustomError(500, `error al reemplazar al usuario`, error);
        }

        if (result.affectedRows != 1) {
            throw new CustomError(404, `no se encontró para actualizar un usuario con id: ${idParaReemplazar}`, { idParaReemplazar });
        }

        return nuevoUsu;
    }
}

export default UsuariosDaoDb;