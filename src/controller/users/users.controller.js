const { sequelize } = require("../../connection");
const { UserModel } = require("../../model/users.model");
const UserService = require("../../service/users.service");

const listar = async function (req, res) {
    console.log("listar usuarios");

    try {
        const users = await UserService.listar(req.query.filtro || "");

        //console.log("users", users);
        if (users && users[0]) {
            res.json({
                success: true,
                usuarios: users[0]
            });
        } else {
            res.json({
                success: true,
                usuarios: []
            });
        }
    } catch (error) {
        console.log (error);
        res.json({
            success: false,
            error: error.message
        });
    }
};

const consultarPorCodigo = async function (req, res) {
    console.log("consultar usuario");

    try {
        const userModelResult = await UserModel.findByPk(req.params.id);
        if (userModelResult) {
            res.json({
                success: true,
                usuario: userModelResult
            });
        } else {
            res.json({
                success: true,
                usuario: null
            });
        }
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            error: error.message
        });
    }
};

const actualizar = async function (req, res) {
    console.log("actualizar usuarios");
    //Variables
    let usuarioRetorno = null; //Guardará el usuario que se va a incluir o editar
    //const data = req.body; //Se obtiene los datos del cuerpo de la petición.
    //const id = req.body.id;

    try {
            usuarioRetorno = await UserService.actualizar(req.body.id, 
                req.body.name, 
                req.body.last_name, 
                req.body.avatar, 
                req.body.email, 
                req.body.password, 
                req.body.deleted);
        res.json({
            success: true,
            user: usuarioRetorno
        });
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            error: error.message
        });
    }
};

const eliminar = async function (req, res) {
    console.log("eliminar usuarios");
    //BorradoFisico
    //UserModel.destroy(req.params.id);
    try {
        await sequelize.query("UPDATE users SET deleted = true WHERE id = " + req.params.id);
        res.json({
            success: true
        });
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            error: error.message
        });
    }
};


module.exports = {
    listar, consultarPorCodigo, actualizar, eliminar
};