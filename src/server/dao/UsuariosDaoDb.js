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
        try {
            const result = await this.client.getKnex('usuario')
                .where('id', '=', idParaBorrar)
                .del();

            if (result != 1) {
                throw new CustomError(404, `no existe un usuario para borrar con id: ${idParaBorrar}`, { idParaBorrar });
            } else {
                return new CustomAcierto(200, `Se elimino correctamente el usuario`, { idParaBorrar });
            }
        } catch (error) {
            throw new CustomError(500, `error al borrar al usuario`, error);
        }
    }

    async updateById(idParaReemplazar, nuevoUsu) {
        try {
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