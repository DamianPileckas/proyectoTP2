import Usuario from '../models/Usuario.js';
import UsuariosDaoFactory from '../dao/UsuariosDaoFactory.js';
import CustomError from '../errores/CustomError.js';

class UsuariosApi {

    constructor() {
        this.usuariosDao = UsuariosDaoFactory.getDao(); //Data Access Object
    }

    async agregar(usuario) {
        UsuariosApi.asegurarUsuarioValido(usuario);
        console.log("llega agregar");
        const usuAgregado = await this.usuariosDao.add(usuario);
        return usuAgregado;
    }

    async buscar(queryParams) {
        let usuarios;
        console.log("llego2");
        usuarios = this.usuariosDao.getAll();
        if (queryParams.size == 0) {

        } else if (queryParams.has('email')) {
            usuarios = await this.usuariosDao.getByEmail(queryParams.get('email'));
        } else {
            throw new CustomError(400, 'parametros de consulta invalidos', queryParams);
        }
        return usuarios;
    }

    async borrar(id) {
        const usuario = await this.usuariosDao.deleteById(id);
        return usuario;
    }

    async reemplazar(id, usuParaReemplazar) {
        UsuariosApi.asegurarUsuarioValido(usuParaReemplazar);
        UsuariosApi.asegurarQueCoincidenLosIds(usuParaReemplazar.id, id);
        const usuReemplazado = await this.usuariosDao.updateById(id, usuParaReemplazar);
        return usuReemplazado;
    }

    async sendMail(mail) {
        let usuarios;
        console.log("llego mail 2");
        usuarios = await this.usuariosDao.sendData(mail.service, mail.user, mail.pass, mail.from, mail.to, mail.subject, mail.text);
        return usuarios;
    }

    static asegurarQueCoincidenLosIds(id1, id2) {
        if (id1 != id2) {
            throw new CustomError(400, 'no coinciden los ids enviados', { id1, id2 });
        }
    }

    static asegurarUsuarioValido(usuario) {
        try {
            return true;
            //Usuario.validar(usuario)
        } catch (error) {
            throw new CustomError(400, 'el usuario posee un formato json invalido o faltan datos', error);
        }
    }
}

export default UsuariosApi;