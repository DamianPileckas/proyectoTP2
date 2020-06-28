import UsuariosDao from './UsuariosDao.js';
import Usuario from '../models/Usuario.js';
import CustomError from '../errores/CustomError.js';
import CustomAcierto from '../errores/CustomAcierto.js';
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


    async add(usuario) {
        try {
            console.log("llegue agregar 2");
            const result = await this.client.getKnex("usuario").insert({
                nombre: usuario.nombre,
                apellido: usuario.apellido,
                habilitado: usuario.habilitado,
                email: usuario.email,
                password: usuario.password,
                tipo_perfil: usuario.tipo_perfil
            });
            return result;
        } catch (error) {
            console.log(error);
            throw new CustomError(500, 'error al crear un nuevo usuario', error);
        }
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
            //let sql = "UPDATE usuarios SET email = ?, password = ?, nombre = ?, perfil = ?, habilitado = ? where id = ?";
            //let valores = [nuevoUsu.email, nuevoUsu.password, nuevoUsu.nombre, nuevoUsu.perfil, nuevoUsu.habilitado, nuevoUsu.id];
            const result = await this.client.getKnex('usuario')
                .where('id', '=', nuevoUsu.id)
                .update({
                    nombre: nuevoUsu.nombre,
                    apellido: nuevoUsu.apellido,
                    habilitado: nuevoUsu.habilitado,
                    email: nuevoUsu.email,
                    password: nuevoUsu.password,
                    tipo_perfil: nuevoUsu.tipo_perfil
                });
            if (result != 1) {
                throw new CustomError(404, `no se encontró para actualizar un usuario con id: ${idParaReemplazar}`, { idParaReemplazar });
            } else {
                return new CustomAcierto(200, `Se actualizo correctamente el id-- > ${ idParaReemplazar }`, { idParaReemplazar });
            }
        } catch (error) {
            throw new CustomError(500, `error al reemplazar al usuario`, error);
        }
    }
}

export default UsuariosDaoDb;