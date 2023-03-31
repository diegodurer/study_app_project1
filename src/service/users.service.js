const { sequelize } = require("../connection");
const { UserModel } = require("../model/users.model");

const listar = async function (textoBuscar) {
    console.log("listar usuarios");

    try {
        const users = await sequelize.query(`SELECT * 
                                            FROM users 
                                            WHERE 1=1
                                                AND UPPER(name)
                                                LIKE UPPER ('%${textoBuscar}%')
                                                AND deleted IS false
                                            ORDER BY id`);

        if (users && users[0]) {
            return users[0];
        } else {
            return [];
        }
    } catch (error) {
        console.log(error);
        throw error;
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

const actualizar = async function (id, name, last_name, avatar, email, password, deleted) {
    console.log("actualizar usuarios");
    //Variables
    let usuarioRetorno = null; //Guardará el usuario que se va a incluir o editar
    const data = {id, name, last_name, avatar, email, password, deleted};
    //const data = req.body; //Se obtiene los datos del cuerpo de la petición.
    //const id = req.body.id;

    try {
        let userModelResult = null;
        if (id) {
            userModelResult = await UserModel.findByPk(id);//Buscar usuario por id pasado.
        }
        if (userModelResult) {
            //Asegurar que el usuario existe, entonces actualizar
            usuarioRetorno = await UserModel.update(data, { where: { id: id } });
            usuarioRetorno = data;
        } else {
            //Incluir
            usuarioRetorno = await UserModel.create(data);
        }
        return usuarioRetorno;
    } catch (error) {
        console.log(error);
        throw error;
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