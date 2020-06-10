import Joi from '@hapi/joi'

class Usuario {

    constructor(id, email, password, nombre, perfil, habilitado) {
        this.id = id
        this.email = email
        this.password = password
        this.nombre = nombre
        this.perfil = perfil
        this.habilitado = habilitado
    }

    equals(otroUsuario) {
        if (!(otroUsuario instanceof Usuario)) {
            return false
        }
        if (this.email != otroUsuario.email) {
            return false
        }
        return true
    }

    static validar(usuario) {
        const usuarioSchema = {
            id: Joi.number().integer().min(0),
            email: Joi.string().alphanum().min(1).required(),
            nombre: Joi.string().alphanum().min(1).required(),
            password: Joi.string().alphanum().min(1).required(),
            perfil: Joi.string().validate(['A','O','M']).required(),
            habilitado: Joi.string().validate(['SI','NO']).required()
        }

        const { error } = Joi.validate(usuario, usuarioSchema)
        if (error) {
            throw error
        }
    }

    static getNewId() {
        return Usuario.currentId++
    }
}

Usuario.currentId = 0

export default Usuario