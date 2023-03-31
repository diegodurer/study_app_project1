const { sequelize } = require("../../connection");
const { TopicModel } = require("../../model/topics.model");

const listar = async function (req, res) {
    console.log("listar topicos");
    try {
        const topics = await sequelize.query("SELECT * FROM topics");
        console.log("topics", topics);
        if (topics && topics[0]) {
            res.json({
                success: true,
                topicos: topics[0]
            });
        } else {
            res.json({
                success: true,
                topicos: []
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

const buscarPorCodigo = async function (req, res) {
    console.log("consultar topico");

    try {
        const topicModelResult = await TopicModel.findByPk(req.params.id);
        if (topicModelResult) {
            res.json({
                success: true,
                tema: topicModelResult
            });
        } else {
            res.json({
                success: true,
                topico: null
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
    console.log("actualizar topico");
    let topicoRetorno = null; 
    const data = req.body; 
    const id = req.body.id;

    try {
        let topicModelResult = null;
        if (id) {
            topicModelResult = await TopicModel.findByPk(id);
        }
        if (userModelResult) {
            topicoRetorno = await TopicModel.update(data, { where: { id: id } });
            topicoRetorno = data;
        } else {
            topicoRetorno = await TopicModel.create(data);
        }
        res.json({
            success: true,
            tema: topicoRetorno
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
    console.log("eliminar topico");

    try {

        const topics = await sequelize.query("DELETE FROM topics WHERE topic_id = " + req.params.id);
        console.log("topico eliminado");
        res.json({
            success: true,
            theme: null
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
    listar, buscarPorCodigo, actualizar, eliminar
};