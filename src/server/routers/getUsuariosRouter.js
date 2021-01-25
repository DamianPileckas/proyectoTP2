import express from 'express';
import UsuariosApi from '../apis/UsuariosApi.js';
import nodemailer from 'nodemailer';

function getUsuariosRouter() {

    const router = express.Router();
    const usuariosApi = new UsuariosApi();

    //LISTADO DE USUARIOS - ENDPOINT http://localhost:8080/api/usuarios?email=perez@perez.com&habilitado=SI
    router.get('/get', async(req, res) => {
        try {
            console.log("llego");
            const queryParams = new Map(Object.entries(req.query));
            const usuarios = await usuariosApi.buscar(queryParams);
            res.json(usuarios);
        } catch (err) {
            res.status(err.estado).json(err);
        }
    });

    //AGREGAR USUARIOS - ENDPOINT http://localhost:8080/api/usuarios
    router.post('/save', async(req, res) => {
        const usuParaAgregar = req.body;
        try {
            const queryParams = new Map(Object.entries(req.query));
            const usuAgregado = await usuariosApi.agregar(usuParaAgregar);
            res.status(201).json(usuAgregado);
        } catch (err) {
            res.status(err.estado).json(err);
            console.log(err);
        }
    });

    //ELIMINAR USUARIOS - ENDPOINT http://localhost:8080/api/usuarios
    router.delete('/:id', async(req, res) => {
        try {
            const resultado = await usuariosApi.borrar(req.params.id);
            res.status(204).json(resultado);
        } catch (err) {
            res.status(err.estado).json(err);
        }
    });

    //MODIFICAR USUARIOS - ENDPOINT http://localhost:8080/api/usuarios
    router.put('/:id', async(req, res) => {
        const usuParaReemplazar = req.body;

        try {
            const usuReemplazado = await usuariosApi.reemplazar(req.params.id, usuParaReemplazar);
            res.json(usuReemplazado);
        } catch (err) {
            res.status(err.estado).json(err);
        }
    });

    //LISTADO DE USUARIOS - ENDPOINT http://localhost:8080/api/usuarios?email=perez@perez.com&habilitado=SI
    router.post('/sendmail', async(req, res) => {
        try {
            const mail = req.body;
            console.log("llego mail 1");
            const usuarios = await usuariosApi.sendMail(mail);
            res.json(usuarios);
        } catch (err) {
            res.status(err.estado).json(err);
        }
    });

    return router;
}
export default getUsuariosRouter;